// priority: 800



/**
 * Questing Ram Event - Spawns a twilightforest:quest_ram for players who haven't completed the advancement
 * Only spawns in player's team base dimension and checks for existing rams nearby
 */
const event_questingram = {
    name: "ftb:questingram",
    displayName: "Questing Ram",
    description: "Spawns a Twilight Forest Questing Ram",
    chance: 0.2,
    stage: null,
    disableStage: null,

    size: 0,
    minDistance: 3,
    maxDistance: 15,
    checkBlocks: ["minecraft:air"],
    requireBlockBelow: true,

    /**
     * Executes the questing ram event
     * @param {Event} event - The event object
     * @param {Player} player - The player object
     * @param {Location} location - The location object
     * @param {string} name - Player name
     * @param {Object} options - Additional options
     */
    execute(event, player, location, name, options) {
        let level = player.getLevel();
        let server = level.server;

        try {
            let questingRamAdvancementId = ResourceLocation.parse("twilightforest:quest_ram");
            let advancement = server.getAdvancements().get(questingRamAdvancementId);
            
            if (advancement) {
                let playerAdvancements = player.getAdvancements();
                let progress = playerAdvancements.getOrStartProgress(advancement);
                if (progress.isDone()) {
                    if (global.debug) console.log(`Player ${player.username} already completed questing ram advancement`);
                    Statistics().addFailure("Questing Ram - Already completed");
                    return;
                }
            }

            try {
                let BaseInstanceManager = Java.loadClass("dev.ftb.mods.ftbteambases.data.BaseInstanceManager");
                let baseInstance = BaseInstanceManager.getBaseForPlayer(player.uuid);
                
                if (!baseInstance || !baseInstance.getLevel().equals(level)) {
                    if (global.debug) console.log(`Player ${player.username} not in their team base dimension`);
                    Statistics().addFailure("Questing Ram - Not in base dimension");
                    return;
                }
            } catch (baseError) {
                if (global.debug) console.log(`FTBTeambases check failed: ${baseError.message}`);
            }


            let existingRams = level.getEntities().filter(entity => 
                entity.type === "twilightforest:quest_ram"
            );
            if (existingRams.length > 0) {
                if (global.debug) console.log(`Questing ram already exists in level for ${player.username}`);
                Statistics().addFailure("Questing Ram - Already exists");
                return;
            }

            let questingRam = level.createEntity("twilightforest:quest_ram");
            questingRam.setPos(
                location.pos.x + 0.5,
                location.pos.y + 0.5,
                location.pos.z + 0.5
            );
            
            questingRam.glowing = true;
            if (name) {
                questingRam.setCustomName(`${name}'s Questing Ram`);
                questingRam.setCustomNameVisible(true);
            }
            
            questingRam.spawn();

            player.tell(Text.translate("ftb.event.questingram.spawn", 
                [location.pos.x, location.pos.y, location.pos.z]).green().bold());

            server.scheduleInTicks(20*30, () => {
                questingRam.glowing = false;
            });
                            player.persistentData.timer = 10000;


            Statistics().addSuccess("Questing Ram");
            
        } catch (error) {
            console.error(`Questing Ram event error for ${player.username}: ${error.message}`);
            Statistics().addFailure("Questing Ram - Error");
        }
    }
};

