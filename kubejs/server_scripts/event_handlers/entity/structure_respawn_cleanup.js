// Handles duplicate boss removal when structures respawn
// When a boss spawns, remove other instances of that boss type in range

const BOSS_CLEANUP_CONFIG = {
  "cataclysm:ignis": {
    searchRadius: 128
  }
};

const WATCHED_ENTITY_TYPES = Object.keys(BOSS_CLEANUP_CONFIG);

if (WATCHED_ENTITY_TYPES.length > 0) {
  EntityEvents.spawned(WATCHED_ENTITY_TYPES, (event) => {
    const { entity, level } = event;

    if (!entity || !entity.isAlive()) return;

    const entityType = String(entity.type);
    const config = BOSS_CLEANUP_CONFIG[entityType];
    if (!config) return;

    const newEntityId = entity.getId();
    const pos = entity.blockPosition();
    const radius = config.searchRadius;

    const searchArea = AABB.of(
      pos.x - radius, pos.y - radius, pos.z - radius,
      pos.x + radius, pos.y + radius, pos.z + radius
    );

    const allNearbyEntities = level.getEntities(null, searchArea);

    let removedCount = 0;
    for (let i = 0; i < allNearbyEntities.size(); i++) {
      let ent = allNearbyEntities.get(i);
      if (!ent) continue;
      if (String(ent.type) !== entityType) continue;
      if (ent.getId() === newEntityId) continue;

      if (ent.isAlive()) {
        ent.discard();
        removedCount++;
      }
    }

    if (removedCount > 0) {
      console.log("[StructureRespawnCleanup] Removed " + removedCount + " duplicate " + entityType);
    }
  });
}
