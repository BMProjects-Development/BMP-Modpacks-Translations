const BLOCKED_DIMS = [
    "minecraft:the_nether",
    "minecraft:the_end"
];
NativeEvents.onEvent("net.neoforged.neoforge.event.entity.EntityTravelToDimensionEvent", (event) => {
    try {
        if (!BLOCKED_DIMS.includes(event.getDimension().location().toString())) return;
        if(!event.entity.isPlayer()) return;
        event.setCanceled(true);
    } catch (e) {
        console.error(e);
    }
})