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
        let source = event.getSource();
        if (source.getActual() != null) {
          showBuffForMob(player, source.getActual());
        }
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
  const { player, block, item, level } = event;
  if (!player) return;

  /** @type {$ServerLevel_} */
  if (level.isClientSide()) return;

  // Prevents Create wrench pickup inside Create Vault
  if (block.hasTag("create:wrench_pickup")) {
    if (item.id !== "create:wrench") return;

    let structure = level
      .registryAccess()
      .registryOrThrow(Registries.STRUCTURE)
      .get(ResourceLocation.of("ftb:vaults/create_vault", ":"));

    let result = level.structureManager().getStructureAt(block.pos, structure);
    if (!result.isValid()) return;

    event.cancel();
    return;
  }

  // Prevent EnderIO conduit interaction in vaults
  if (item.id == "enderio:conduit") {
    if (!isEntityInVault(player)) return;
    event.cancel();
    return;
  }
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

const $DeusExBuffsHelper = Java.loadClass("com.breakinblocks.deus_ex_machina.data.DeusExBuffsHelper");
const $DeusConfig = Java.loadClass("com.breakinblocks.deus_ex_machina.Config");
const $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");
const showBuffForMob = (player, mob) => {
  try{
    if (!player.hasEffect("deus_ex_machina:deus_ex_machina_effect")) return;
    let type = $BuiltInRegistries.ENTITY_TYPE.get(mob.getType())
    if (!$DeusConfig.isDeusExMob(type)) return;


    $DeusExBuffsHelper.withBuffsForMob(player, mob, (buff, key) => {
      let resistanceGain = $DeusConfig.resistanceIncrease
      let attackGain = $DeusConfig.attackBoostIncrease

      let command = `title ${player.username} title {"translate": "deus_ex_machina.death_screen.header", "with":[{"translate":${type.description.toNBT().translate}}], "color":"#FFAA00"}`
      player.server.runCommandSilent(command)
      let resistance = `{"translate":"deus_ex_machina.death_screen.resistance", "with":[{"text":"${resistanceGain}"}], "color":"#55FF55"}`
      let resistance_now = `{"translate":"deus_ex_machina.death_screen.resistance.now", "with":[{"text":"${buff.getResistance(key)}"}], "color":"#AAAAAA"}`
      let attack = `{"translate":"deus_ex_machina.death_screen.attack", "with":[{"text":"${attackGain}"}], "color":"#FF5555"}`
      let attack_now = `{"translate":"deus_ex_machina.death_screen.attack.now", "with":[{"text":"${buff.getStrength(key)}"}], "color":"#AAAAAA"}`
      let subtitle = `title ${player.username} subtitle [${resistance}, ${resistance_now}, ${attack}, ${attack_now}]`
      player.server.runCommandSilent(subtitle)
      // player.sendSystemMessage(
      //   Text.translate("deus_ex_machina.death_screen.resistance", resistanceGain).withColor(0x55FF55)
      //   .append(Text.translate("deus_ex_machina.death_screen.resistance.now", buff.getResistance(key)).withColor(0xAAAAAA))
      //   .append(
      //     Text.translate("deus_ex_machina.death_screen.attack", attackGain).withColor(0xFF5555)
      //   .append(Text.translate("deus_ex_machina.death_screen.attack.now", buff.getStrength(key)).withColor(0xAAAAAA)) 
      //   )
      //   , true
      // )

    });
  }catch(e){console.log(e)}
}


ItemEvents.rightClicked("minecraft:debug_stick", event => {
  const { player, level } = event;
  showBuffForMob(player, player);
})