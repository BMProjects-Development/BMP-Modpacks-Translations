// priority: 50000

const $BaseInstanceManager = Java.loadClass(
  "dev.ftb.mods.ftbteambases.data.bases.BaseInstanceManager"
);

function checkTag(tags, requiredTag) {
  for (const tag of tags) {
    if (tag === requiredTag) return true
  }
  return false
}

const SB4$VAULTS = [
    "ftb:vaults/burning_disco",
    "ftb:vaults/chicken_jockey",
    "ftb:vaults/create_vault",
    // "ftb:vaults/drowned_abyss",
    "ftb:vaults/echoing_dread",
    "ftb:vaults/mffs",
    "ftb:vaults/portal",
    "ftb:vaults/twilight_forest/hydra",
    "ftb:vaults/twilight_forest/lich",
    "ftb:vaults/twilight_forest/snow_queen",
    "ftb:vaults/twilight_forest/knight",
    "ftb:vaults/twilight_forest/yeti",
]

/**
 * Is Entity is standing in any vaults
 * 
 * @param {$Entity_} entity 
 * @returns TRUE if {@link entity} is standing in {@linkplain SB4$VAULTS}, otherwise FALSE
 */
function isEntityInVault(entity) {
  /**@type {$Level_} */
  let level = entity.getLevel()
  if (level.isClientSide()) {
    throw new Error("\nutils.js isEntityInVault:\nCan not use this function on client level")
  }
  let result = false;
  SB4$VAULTS.forEach(vault => {
    try{
      if (isEntityInStructure(entity, vault)) {
        result = true
      }
    } catch (e) {
      if (debug) console.log(`Error Checking Vault Structure ${vault}`);
    }

  });
  return result
}

/**
 * Is Entity standing within Structure
 * 
 * @param {$Entity_} entity - Entity to check
 * @param {$Structure_} structure - Structure in resource location format eg. "minecraft:monument"
 * @returns {boolean} TRUE if {@link entity} is standing inside {@link structure}, otherwise FALSE
 */
function isEntityInStructure(entity, structure) {
  /**@type {$Level_} */
  let level = entity.getLevel()
  if (level.isClientSide()) {
    throw new Error("\nutils.js isEntityInStructure:\nCan not use this function on client level")
  }
  /**@type {$ServerLevel_} */
  let serverLevel = level;
  return serverLevel.structureManager().getStructureAt(entity.blockPosition(), structure).isValid()
}

/**
 * 
 * @param {$Entity_} entity 
 * @param {$AABB_} bb 
 */
function isEntityInAABB(entity, bb) {
  return isBlockInAABB(entity.blockPosition(), bb)
}

/**
 * Is Block contained within Bounding Box
 * 
 * @param {$BlockPos_} position - Block position to check
 * @param {$AABB_} bounding_box - The bounding box in which to refer
 * @returns {boolean} TRUE if {@link bounding_box} contains the {@link position} in question, otherwise FALSE
 */
function isBlockInAABB(position, bounding_box) {
  let {x: x, y: y, z: z} = position
  return bounding_box.contains(x,y,z)
}

/**
 * Is the Entity standing in Biome?
 * 
 * @param {$Entity_} entity - the entity being questioned
 * @param {$Biome_} biome - the biome resource location to check eg. "minecraft:plains"
 * @returns {boolean} TRUE if entity is standing in the {@link biome} referenced, otherwise FALSE
 */
function isEntityInBiome(entity, biome) {
  /**@type {$Level_} */
  let level = entity.getLevel()
  if (level.isClientSide()) {
    throw new Error("\nutils.js isEntityInBiome:\nCan not use this function on client level")
  }
  /**@type {$ServerLevel_} */
  let serverLevel = level;
  return serverLevel.getBiome(entity.blockPosition()).is(biome)
}

/**
 * 
 * Is Entity inside the Player's team base dimension
 * 
 * @param {$Entity_} entity - the entity being questioned
 * @param {$Player_} player - the player in which to retrieve the team base from
 * @returns {boolean} TRUE if entity is standing in the {@link player}'s team dimension referenced, otherwise FALSE
 */
function isEntityInPlayerDimension(entity, player) {
  let base = $BaseInstanceManager.get(player.getServer()).getBaseForPlayer(player);
  base = base.isPresent() ? base.get() : null;
  if (base == null) {
    // Player has no base
    return false
  }

  return base.dimension() == entity.getLevel().getDimension()
}

/**
 * Is the player in creative mode, spectator mode, or null
 * 
 * @param {$Player_} player - the player
 * @returns {boolean} TRUE if {@link player} is in creative/spectator or null, otherwise FALSE
 */
function isPlayerInCreativeSpectator(player) {
  if (player == null) {
    return true
  }
  return player.isCreative() || player.isSpectator()
}