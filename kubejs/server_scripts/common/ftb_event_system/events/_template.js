// priority: 800
/**
 * Represents a template event. Object name should be added to the ftbEvents object in the main script.
 * @property {string} name - The name of the event. Used for identification.
 * @property {string} displayName - The display name of the event. Used for display purposes.
 * @property {string} description - The description of the event. Not used at the moment
 * @property {number} chance - The chance of the event occurring. 0.0 - 1.0
 * @property {string|null} stage - The stage of the event. Stage needed before this Event can happen
 * @property {string|null} disableStage - The stage needed to be able to disable this event
 * 
 * @property {number} size - The size of the event area / mob needed spawning area.
 * @property {number} minDistance - The minimum distance for the event.
 * @property {number} maxDistance - The maximum distance for the event.
 * @property {string[]} checkBlocks - The blocks to check for the event. (Example minecraft:chest for the Mimic Event)
 * @property {boolean} requireBlockBelow - Indicates if a block below is required for the event.
 * 
 * @property {Function} execute - The function to execute when the event occurs.
 */
const template = {
    name: "ftbskies:template",
    displayName: "Template",
    description: "Toggles the Template Event. This is a template for creating new events.",
    chance: 0.1,
    stage: null,
    disableStage: null,

    size: 0,
    minDistance: 1,
    maxDistance: 24,

    checkBlocks: ["minecraft:air"],
    requireBlockBelow: false,



    /**
     * Executes the event.
     * In here you can do almost everything you want.
     * 
     * @param {Event} event - The event object. limited use when triggering the event with the force command
     * @param {Player} player - The player object.
     * @param {Location} location - The location object.
     */
    execute(event, player, location) {
        let level = player.getLevel();
        let server = level.server;

        player.tell(["[Server]: This is a template for creating new events."]);
        level.server.scheduleInTicks(20, (_) => {
            player.persistentData.timer = 10; //lower their event timer instead of a full reset
        });
    }
}