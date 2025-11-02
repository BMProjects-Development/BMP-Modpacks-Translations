const portalStage = "echo_guidance_meet";
NativeEvents.onEvent("dev.ftb.mods.ftbteambases.events.neoforge.TeamBasesPortalEvent", (event) => {
  try {
    if (!event.entity.isPlayer()) return;
    let server = event.entity.getServer()
    if (server.isDedicated()) {
      let enabled_command_block = server.isCommandBlockEnabled()
      let enabled_flight = server.isFlightAllowed()
      let nether = server.getLevel("minecraft:the_nether")
      let enabled_nether = server.isLevelEnabled(nether)
      let enabled_mobs = server.isSpawningMonsters()
      let ignored = server.getPersistentData().contains("ignore_ftb_pack_warnings")
      if (!(ignored) && (!(enabled_command_block) || !(enabled_flight) || enabled_nether || !(enabled_mobs))) {
        server.tell(Text.translate("ftb.teams.bases.portal.invalid_server_settings").red().bold())
        if (!(enabled_command_block)) {
          server.tell(Text.translate("ftb.teams.bases.portal.enable_command_block").red())
        }
        if (!(enabled_flight)) {
          server.tell(Text.translate("ftb.teams.bases.portal.allow_flight").red())
        }
        if (enabled_nether) {
          server.tell(Text.translate("ftb.teams.bases.portal.allow_nether").red())
        }
        if (!(enabled_mobs)) {
          server.tell(Text.translate("ftb.teams.bases.portal.difficulty").red())
        }
        server.tell(Text.translate("ftb.teams.bases.portal.ignore_warnings").red())
        let spawn = event.entity.level.getSharedSpawnPos();
        event.entity.level.server.scheduleInTicks(1, () => {
          event.entity.teleportTo(spawn.x, spawn.y, spawn.z);
        })
        event.cancelWithReason(Text.empty())
        return
      }
    }

    if (!event.entity.stages.has(portalStage)) {
      let spawn = event.entity.level.getSharedSpawnPos();
      event.entity.level.server.scheduleInTicks(1, () => {
        event.entity.teleportTo(spawn.x, spawn.y, spawn.z);
      })
      event.cancelWithReason(Text.translate("ftb.teams.bases.portal.no_access").red().bold());
    }
  } catch (e) {
    console.error(e);
  }
});
let entityOverworldBlacklist = [
  "mecrh:ender_chicken",
]
NativeEvents.onEvent("net.neoforged.neoforge.event.entity.EntityTravelToDimensionEvent", (event) => {
  try {
    if (!entityOverworldBlacklist.includes(event.entity.type)) return;
    if (event.dimension == "minecraft:overworld") {
      event.setCanceled(true);
    }

  } catch (e) {
    console.error(e);
  }
})

ServerEvents.commandRegistry((event) => {
  let { commands: Commands, } = event
  let root = Commands.literal("ignoreftbpackwarnings").requires(src => src.hasPermission(3)).executes((ctx) => {
    let data = ctx.getSource().getServer().getPersistentData()
    if (data.contains("ignore_ftb_pack_warnings")) {
      data.remove("ignore_ftb_pack_warnings")
    } else {
      data.put("ignore_ftb_pack_warnings", {})
    }
    ctx.getSource().getPlayer().tell(Text.translate("ftb.teams.bases.portal.ignore_command", Text.of(data.contains("ignore_ftb_pack_warnings"))).bold())
    return 1
  })
  event.register(root)
})