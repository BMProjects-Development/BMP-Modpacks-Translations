let $IWrenchable = Java.loadClass(
  "com.simibubi.create.content.equipment.wrench.IWrenchable"
);

/*
PlayerEvents.tick((event) => {
    const {level, player} = event;
    if (player.isCreative() || player.isSpectator()) return;
    if(!isInVault(player)) return;

    //TODO: Add player Tick Stuff for Vaults here!
    
})
*/

// Convert this in a BlockEvent click maybe? (initially made this, bcause i thought projectiles are spawned through rightclick event)
// const vaultRightClickBlacklist = ['projecte:evertide_amulet', 'projecte:volcanite_amulet']
// ItemEvents.rightClicked(vaultRightClickBlacklist, event => {
//     const {player, item} = event;

//     if (player.isCreative() || player.isSpectator()) return;
//     if(!isInVault(player)) return;
//     if (!vaultRightClickBlacklist.includes(item.id.toString())) return;

//     player.sendSystemMessage(Text.translate("ftb.vaults.blacklist.denied").red())
//     event.cancel();
// })

EntityEvents.spawned(
  ["projecte:lava_projectile", "projecte:water_projectile", "minecraft:wither","minecraft:wither_skull"],
  (event) => {
    const { entity } = event;
    if (!isInVault(entity)) return;
    event.cancel();
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

  if (!server.isClientSide()) {
    let piece = server
      .structureManager()
      .getStructureAt(
        event.getPlayer().getBlock().getPos(),
        "ftb:vaults/portal"
      );
    if (piece.isValid()) {
      let bb = event.getEntity().getBoundingBox().inflate(5);
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
      let random_snark = Utils.getRandom().fork().nextIntBetweenInclusive(0,SB4$GLADIOS_SNARK_LANG.length-1)
      let snark = Text.translate(SB4$GLADIOS_SNARK_LANG[random_snark])
      event.getEntity().tell(snark);
      event.getEntity().setHealth(event.getEntity().getMaxHealth());
      event.cancel();
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
