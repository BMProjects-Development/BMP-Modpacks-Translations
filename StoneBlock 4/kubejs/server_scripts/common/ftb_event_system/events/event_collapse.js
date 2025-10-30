// priority: 800

/**
 * Validates if a location is suitable for falling blocks
 * @param {Level} level - The level to check
 * @param {BlockPos} pos - Position to validate
 * @param {number} minAirGap - Minimum air blocks between spawn and floor (default: 5)
 * @returns {Object} {valid: boolean, floorPos: BlockPos, airGap: number, spawnHeight: number}
 */
function validateCollapseLocation(level, pos, minAirGap) {
    minAirGap = minAirGap || 2;
    let airCount = 0;
    
    // Check downward from spawn position
    for (let y = pos.y - 1; y >= Math.max(pos.y - 50, level.minBuildHeight); y--) {
        let checkPos = new BlockPos(pos.x, y, pos.z);
        let block = level.getBlock(checkPos);
        
        if (block.id === "minecraft:air" || block.id === "minecraft:cave_air") {
            airCount++;
        } else {
            // Found a solid block - validate it's suitable as floor
            if (isValidFloor(block) && airCount >= minAirGap) {
                return {
                    valid: true,
                    floorPos: checkPos,
                    airGap: airCount,
                    spawnHeight: pos.y
                };
            } else {
                return { valid: false, reason: "Invalid floor or insufficient air gap" };
            }
        }
    }
    
    return { valid: false, reason: "No floor found within range" };
}

/**
 * Checks if a block is valid for falling blocks to land on
 * @param {Block} block - The block to check
 * @returns {boolean} - Whether the block is valid as a floor
 */
function isValidFloor(block) {
    const invalidFloorBlocks = [
        "minecraft:torch", "minecraft:redstone_torch", "minecraft:soul_torch",
        "minecraft:grass", "minecraft:tall_grass", "minecraft:fern",
        "minecraft:dead_bush", "minecraft:sapling", "minecraft:flower_pot",
        "minecraft:lever", "minecraft:stone_button", "minecraft:oak_button",
        "minecraft:stone_pressure_plate", "minecraft:oak_pressure_plate",
        "minecraft:tripwire_hook", "minecraft:rail", "minecraft:powered_rail",
        "minecraft:detector_rail", "minecraft:activator_rail", "minecraft:ladder",
        "minecraft:vine", "minecraft:snow", "minecraft:carpet", "minecraft:string"
    ];
    
    // Check if block is in invalid list
    if (invalidFloorBlocks.includes(block.id.toString())) return false;
    
    // Check for slab variants
    if (block.id.toString().includes("slab") && !block.id.toString().includes("double")) return false;
    
    // Check for stairs, fences, walls, doors, trapdoors
    if (block.id.toString().includes("stairs") || block.id.toString().includes("fence") || 
        block.id.toString().includes("wall") || block.id.toString().includes("door") || 
        block.id.toString().includes("trapdoor") || block.id.toString().includes("sign")) {
        return false;
    }
    
    // Must not be air and should be solid
    return !block.isAir;
}

/**
 * Finds 4-12 valid spawn locations around the player in a scattered pattern
 * @param {Player} player - Target player
 * @param {Level} level - Game level
 * @param {number} minSpawns - Minimum spawns (default: 4)
 * @param {number} maxSpawns - Maximum spawns (default: 12)
 * @param {number} radius - Search radius around player (default: 10)
 * @returns {Array} Array of valid spawn positions
 */
function findCollapseSpawnLocations(player, level, minSpawns, maxSpawns, radius) {
    minSpawns = minSpawns || 4;
    maxSpawns = maxSpawns || 12;
    radius = radius || 10;
    
    let validLocations = [];
    let attempts = 0;
    let maxAttempts = 80;
    
    let playerPos = player.blockPosition();
    let targetSpawns = Math.floor(Math.random() * (maxSpawns - minSpawns + 1)) + minSpawns;
    
    // Generate candidate positions in expanding circles
    let searchRadii = [2, 4, 6, 8];
    
    for (let searchRadius of searchRadii) {
        if (validLocations.length >= targetSpawns) break;
        
        let angleStep = (2 * Math.PI) / Math.max(8, searchRadius);
        
        for (let angle = 0; angle < 2 * Math.PI && validLocations.length < targetSpawns; angle += angleStep) {
            if (attempts++ > maxAttempts) break;
            
            // Add randomization to avoid perfect circles
            let randRadius = searchRadius + (Math.random() - 0.5) * 3;
            let randAngle = angle + (Math.random() - 0.5) * angleStep;
            
            let x = Math.floor(playerPos.x + Math.cos(randAngle) * randRadius);
            let z = Math.floor(playerPos.z + Math.sin(randAngle) * randRadius);
            
            // Find appropriate Y level (look up from player level)
            for (let y = playerPos.y + 2; y <= playerPos.y + 20; y++) {
                let testPos = new BlockPos(x, y, z);
                
                // Skip if too close to existing spawn points (minimum 3 blocks apart)
                if (validLocations.some(loc => loc.pos.distSqr(testPos) < 9)) continue;

                let validation = validateCollapseLocation(level, testPos, 2);
                if (validation.valid) {
                    validLocations.push({
                        pos: new BlockPos(x, validation.spawnHeight, z),
                        floorPos: validation.floorPos,
                        airGap: validation.airGap
                    });
                    break;
                }
            }
        }
    }
    
    // Ensure minimum spawn count
    if (validLocations.length < minSpawns) {
        console.warn(`Collapse event: Only found ${validLocations.length} valid locations (minimum: ${minSpawns})`);
        return validLocations.length > 0 ? validLocations : null;
    }
    
    return validLocations.slice(0, targetSpawns);
}



/**
 * Converts all resources from uneartherRecipes into a weighted list
 * Each item appears only once with its highest weight (chance) value
 * @returns {Array<{weight: number, entry: {item: string, count: number}}>}
 */
function buildUneartherWeightedList() {
    const itemMap = {}

    uneartherRecipes.professions.forEach((professionData) => {
        professionData.inputBlocks.forEach((inputBlockData) => {
        inputBlockData.tiers.forEach((tierData) => {
            tierData.resources.forEach((resource) => {
            const key = resource.item;
            const existingEntry = itemMap[key];

            if (!existingEntry || resource.chance > existingEntry.weight) {
                itemMap[key] ={
                    weight: resource.chance,
                    entry: {
                    item: resource.item,
                    count: resource.count,
                    },
                }
            }
            });
        });
        });
    });
    // Inject additional items with specified weights
    injectedWeightedTable.forEach((injected) => {
        const key = injected.entry.item;
        const existingEntry = itemMap[key];
        if (!existingEntry || injected.weight > existingEntry.weight) {
            itemMap[key] = injected;
        }
    });

    return Object.values(itemMap);
}

const injectedWeightedTable = [
    { weight: 0.1, entry: { item: "minecraft:angler_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:archer_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:arms_up_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:blade_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:brewer_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:burn_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:danger_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:flow_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:explorer_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:scrape_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:sheaf_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:shelter_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:skull_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:snort_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:friend_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:heart_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:guster_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:heartbreak_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:howl_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:miner_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:mourner_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:plenty_pottery_sherd", count: 1 } },
    { weight: 0.1, entry: { item: "minecraft:prize_pottery_sherd", count: 1 } },
]


/**our events
 * Spawns a falling block entity with simplified NBT
 * @param {Level} level - The level to spawn in
 * @param {BlockPos} spawnPos - Position to spawn the falling block
 * @param {string} blockType - Block type ("sand" or "gravel")
 * @param {boolean} isSuspicious - Whether to make it suspicious sand/gravel
 * @param {Object} lootTable - Loot table reference for suspicious blocks
 * @returns {Entity} The spawned falling block entity
 */
function spawnFallingBlock(level, spawnPos, blockType, isSuspicious, lootTable) {
    try {
        let fallingBlock = level.createEntity("minecraft:falling_block");
        fallingBlock.setPos(spawnPos.x + 0.5, spawnPos.y-1, spawnPos.z + 0.5);
        
        let nbt = fallingBlock.nbt;
        
        if (isSuspicious && lootTable) {
            // Set suspicious sand/gravel NBT - equivalent to /give command with block_entity_data
            let suspiciousType = blockType === "sand" ? "minecraft:suspicious_sand" : "minecraft:suspicious_gravel";
            nbt.BlockState = {
                Name: suspiciousType
            };
            // Select a random item from the loot table for the suspicious block
            let selectedItem = Ku.Lists.getEntryBasedOnWeight(lootTable)

            ///give @a suspicious_sand[block_entity_data={id:brushable_block,item:{id:acacia_button,count:1}}]
                // Add block entity data with the item (equivalent to block_entity_data in /give command)
            nbt.TileEntityData = {
                id: "brushable_block",
                item: {
                    id: selectedItem.item,
                    count: Math.floor(Math.random() * 16) + 1
                }
            };
        } else {
            // Regular sand/gravel - simplified NBT
            nbt.BlockState = {
                Name: "minecraft:" + blockType
            };
        }
        
        // Set basic fall timing
        nbt.Time = 1;
        
        fallingBlock.nbt = nbt;
        fallingBlock.spawn();
        
        return fallingBlock;
    } catch (error) {
        console.error(`Error spawning falling block: ${error.message}`);
        return null;
    }
}

/**
 * Main collapse event definition
 */
const event_collapse = {
    name: "ftb:collapse",
    displayName: "Ceiling Collapse",
    description: "Random sand and gravel falls from the ceiling, with some suspicious blocks containing loot",
    chance: 0.15,
    stage: null,
    disableStage: null,

    size: -1, // No specific spawn location needed
    minDistance: 0,
    maxDistance: 0,

    checkBlocks: [],
    requireBlockBelow: false,

    execute(event, player, location, name, options) {
        try {
            let level = player.getLevel();
            let server = level.server;
            
            // Find valid collapse locations (need at least 5). Retry up to 5 times.
            let spawnLocations = null;
            let attempts = 0;
            let maxAttempts = 5;
            
            while (attempts < maxAttempts) {
                attempts++;
                // Ask for at least 5 spawns; function may still return fewer, so we check below.
                spawnLocations = findCollapseSpawnLocations(player, level, 5, 12, 10);
                
                let found = spawnLocations ? spawnLocations.length : 0;
                
                if (spawnLocations && spawnLocations.length >= 5) break;
            }
            
            if (!spawnLocations || spawnLocations.length < 5) {
                Statistics().addFailure("Ceiling Collapse - Insufficient locations");
                return;
            }

            // Send warning message
            player.tell(Text.translate("ftb.event.collapse.warning").red().bold());
            player.sendData('screenshake', { i1: 0.6, i2: 1.0, i3: 0.2, duration: 60 });

            // Play warning sound
            // level.playSound(null, player.x, player.y, player.z, "minecraft:block.gravel.break", "ambient", 1.0, 0.8);
            let lootTable = buildUneartherWeightedList();

            // Schedule falling blocks with staggered timing
            let suspiciousCount = 0;
            spawnLocations.forEach((location, index) => {
                let delay = Math.floor(Math.random() * 80) + 40; // 2-6 second random delay
                
                server.scheduleInTicks(delay, () => {
                    try {
                        // 25% chance for suspicious blocks
                        let isSuspicious = Math.random() < 1;
                        let blockType = Math.random() < 0.6 ? "sand" : "gravel";
                        
                        if (isSuspicious) suspiciousCount++;
                        
                        let fallingBlock = spawnFallingBlock(
                            level, 
                            location.pos, 
                            blockType, 
                            isSuspicious, 
                            lootTable
                        );
                        
                    } catch (blockError) {
                        console.log(`Error spawning individual falling block: ${blockError.message}`);
                    }
                });
            });
            
            server.scheduleInTicks(400, () => {
                try {
                    if (suspiciousCount > 0) {
                        player.tell(Text.translate("ftb.event.collapse.settled_with_loot", [suspiciousCount.toFixed(0)]).gray());
                    } else {
                        player.tell(Text.translate("ftb.event.collapse.settled").gray());
                    }
                } catch (msgError) {
                    console.log(`Error sending completion message: ${msgError.message}`);
                }
            });

            // Set cooldown timer (moderate - 10 minutes)
            player.persistentData.timer = 12000;
            
            Statistics().addSuccess("Ceiling Collapse", spawnLocations.length, suspiciousCount);
            
        } catch (error) {
            console.error(`Collapse event error for ${player.username}: ${error.message}`);
            Statistics().addFailure("Ceiling Collapse");
            return;
        }
    }
}
