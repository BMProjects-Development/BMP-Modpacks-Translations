let $IWrenchable = Java.loadClass(
  "com.simibubi.create.content.equipment.wrench.IWrenchable"
);

EntityEvents.spawned(
  ["projecte:lava_projectile", "projecte:water_projectile", "minecraft:wither", "minecraft:wither_skull"],
  (event) => {
    const { entity } = event;
    if (!isEntityInVault(entity) && !isEntityInBiome(entity, "minecraft:the_void")) return; //not in a vault, or the void, do nothing
    event.cancel();// in a vault, stop the entity from spawning
  }
);

let SB4$KILL_BLACKLIST = [];
let SB4$GLADIOS_SNARK_LANG = [
  "ftb.vaults.portal.message.gladios.death_snark_1",
  "ftb.vaults.portal.message.gladios.death_snark_2",
  "ftb.vaults.portal.message.gladios.death_snark_3",
  "ftb.vaults.portal.message.gladios.death_snark_4",
  "ftb.vaults.portal.message.gladios.death_snark_5"
]
EntityEvents.death("minecraft:player", (event) => {
  /** @type {$ServerLevel_} */
  let server = event.getLevel();
  let player = event.getPlayer();

  if (!server.isClientSide()) {
    if (isEntityInStructure(player, "ftb:vaults/portal")) {
      let bb = player.getBoundingBox().inflate(5);
      server.getEntitiesWithin(bb).forEach((entity) => {
        console.log(entity.getType());
        if (
          entity == event.getEntity() ||
          SB4$KILL_BLACKLIST[entity.getType()] ||
          entity.isMonster()
        ) {
        } else {
          entity.discard();
        }
      });
      let random_snark = Utils.getRandom().fork().nextIntBetweenInclusive(0, SB4$GLADIOS_SNARK_LANG.length - 1)
      let snark = Text.translate(SB4$GLADIOS_SNARK_LANG[random_snark])
      player.tell(snark);
      player.setHealth(event.getEntity().getMaxHealth());
      event.cancel();
    } else if (isEntityInVault(player)) {
      let player = event.getPlayer()
      try {
        let { x, y, z } = player.getRespawnPosition()
        let yRot = player.getYaw()
        let xRot = player.getPitch()
        let dimension = event.getServer()["getLevel(net.minecraft.resources.ResourceKey)"](player.getRespawnDimension())
        if (dimension == null) {
          throw new Error("")
        }
        $FTBEPlayerData.addTeleportHistory(player)
        player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](dimension, x, y, z, yRot, xRot)
      } catch (EE) {
        let {x, y, z} = $BaseInstanceManager.get(player.getServer()).getLobbySpawnPos()
        let yRot = player.getYaw()
        let xRot = player.getPitch()
        let dimension = event.getServer()["getLevel(net.minecraft.resources.ResourceLocation)"]("minecraft:overworld")
        $FTBEPlayerData.addTeleportHistory(player)
        player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](dimension, x+0.5, y+1, z+0.5, yRot, xRot)
      } finally {

        player.setHealth(player.getMaxHealth())
        event.cancel()
      }


    }
  }
});

const SB4$NO_FALL_DAMAGE = ["ftb:vaults/portal", "ftb:vaults/create_vault"];
EntityEvents.beforeHurt("minecraft:player", (event) => {
  /** @type {$ServerLevel_} */
  let server = event.getLevel();

  if (!server.isClientSide()) {
    SB4$NO_FALL_DAMAGE.forEach((structure) => {
      if (
        server
          .structureManager()
          .getStructureAt(event.getPlayer().getBlock().getPos(), structure)
          .isValid()
      ) {
        if (
          event
            .getSource()
          ["is(net.minecraft.resources.ResourceKey)"]("minecraft:fall")
        )
          event.cancel();
      }
    });
  }
});

BlockEvents.broken((event) => {
  if (!(event.getBlock() instanceof $IWrenchable)) return;
  /**@type {$ServerLevel_} */
  let server = event.getLevel();
  if (server.isClientSide()) return;
  if (
    !server
      .structureManager()
      .getStructureAt(event.getBlock().getPos(), "ftb:vaults/create_vault")
      .isValid()
  )
    return;
  event.cancel();
});

BlockEvents.rightClicked((event) => {
  if (!event.getBlock().hasTag("create:wrench_pickup")) return;
  if (!(event.getItem() == Item.of("create:wrench"))) return;
  /**@type {$ServerLevel_} */
  let server = event.getLevel();
  if (server.isClientSide()) return;
  if (
    !server
      .structureManager()
      .getStructureAt(event.getBlock().getPos(), "ftb:vaults/create_vault")
      .isValid()
  )
    return;
  event.cancel();
});

let effect_throttle = 80;
const effect_ticker_id = 1694200;
LevelEvents.loaded((event) => {
  event
    .getServer()
    .getScheduledEvents()
    .events.forEach((ev) => {
      // console.log(ev.id);
      if (ev.id == effect_ticker_id) {
        ev.clear();
      }
    });
  // event.getServer().getScheduledEvents().events.clear()
  if (!event.getServer().getPersistentData().contains("ticking_effects")) {
    event.getServer().getPersistentData().put("ticking_effects", {});
  }
  event.getServer().scheduleRepeatingInTicks(effect_throttle, (schedule) => {
    if (schedule.id != effect_ticker_id) {
      schedule.id = effect_ticker_id;
    }
    if (!event.getServer().getPersistentData().contains("ticking_effects")) {
      schedule.clear();
    } else {
      schedule.timer = effect_throttle;
      event
        .getServer()
        .getPlayers()
        .forEach((player) => {
          if (isEntityInStructure(player, "ftb:vaults/create_vault")) {
            player.potionEffects.add(
              "minecraft:conduit_power",
              200,
              0,
              false,
              false
            );
          }
          if (isEntityInBiome(player, "minecraft:the_void")) {
            player.potionEffects.add(
              "apothic_attributes:flying",
              200,
              0,
              false,
              false
            );
          }
        });
    }
  });
});
