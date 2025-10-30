const portalStage = "echo_guidance_meet";
NativeEvents.onEvent("dev.ftb.mods.ftbteambases.events.neoforge.TeamBasesPortalEvent", (event) => {
    try {
        if (!event.entity.isPlayer()) return;
        if (!event.entity.stages.has(portalStage)) {
            let spawn = event.entity.level.getSharedSpawnPos();
            event.entity.teleportTo(spawn.x, spawn.y, spawn.z);
            event.cancelWithReason(Text.translate("ftb.teams.bases.portal.no_access").red().bold());
        }
    }catch(e){
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

    }catch(e){
        console.error(e);
    }
})