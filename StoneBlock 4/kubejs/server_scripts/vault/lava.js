let $DamageSources = Java.loadClass("net.minecraft.world.damagesource.DamageSources");

const fireSettings = {
    structure: "ftb:vaults/create_vault",
    structureCheck: true, // DEV ONLY: Set to true to enable structure check
    healthThreshold: 6, // NOTE: Lava does 2.5hearts (5) Damage without armor
    duration: 100, // in ticks (5 seconds)
    amplifier: 1
}
EntityEvents.beforeHurt("minecraft:player", event => {
    const {source, entity, level} = event;
    if (!entity.isPlayer()) return;

    if (level.isClientSide()) return;

    /**@type {$ServerLevel_} */
    let server = level;
    if (!(server.structureManager().getStructureAt(entity.block.pos, fireSettings.structure).isValid()) && fireSettings.structureCheck) return;
    if (entity.health >= fireSettings.healthThreshold) return;

    let sourceName = source.toString();
    if (
        sourceName.includes("lava") || 
        sourceName.includes("inFire") || 
        sourceName.includes("onFire") || 
        sourceName.includes("hotFloor")
    ) {
        entity.extinguish();
        entity.extinguishFire();
        if(!entity.hasEffect("minecraft:fire_resistance")) {
            entity.potionEffects.add("minecraft:fire_resistance", fireSettings.duration, fireSettings.amplifier, false, false);
        }
        event.cancel();
    }
})