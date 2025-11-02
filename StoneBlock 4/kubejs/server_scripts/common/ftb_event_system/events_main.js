//priority: 100
const ftbEvents = [
    event_creeper,
    event_loot_bee,
    event_goat,
    event_trader,
    event_chickenjockey,
    event_stick,
    event_collapse,
    event_questingram
    // ,event_clavis_of_patience

];

const defaultSettings = {
    timer: 0,  //initial timer
    timerDelay: 1000, //time in ticks for the event to trigger
    debug: false, //debug mode
    maxAttempts: 50, //max attempts to find a spawn location
    chance: 0.4, //chance of no event for the player this time
    timeCooldown: 18000, //time in ticks to check if a player has had an event recently

}


ServerEvents.loaded((event) => {;
    let sPData = event.server.persistentData;
    sPData.eventSettings = sPData.eventSettings ?? defaultSettings;
    new Statistics(event.server);
});

PlayerEvents.tick((event) => {
    const {player:{persistentData}} = event;
    let timer = persistentData.contains('timer') ? persistentData.getInt('timer') : 0;    
    persistentData.timer = timer + 1;

});

ServerEvents.tick((event) => {
    const { server} = event;
    let persistentData = server.persistentData;
    if (!persistentData.contains("eventSettings")) {
        return; // Exit early if eventSettings is not yet initialized
    }

    const eventSettings = persistentData.getCompound("eventSettings");
    const timer = eventSettings.getInt("timer") ?? 0;
    eventSettings.timer = timer + 1;

    if ((timer + 1) > eventSettings.getInt("timerDelay")) {
        try{
            new Statistics(server);
            eventSystem(event);
        }catch (e) {
            console.log("An error occurred in the event system: " + e.message);
            Statistics().addFailure("Event System Error");

        } finally {
            eventSettings.timer = 0;
        }
    }
});


function eventSystem(event, forceEvent, server) {
    forceEvent = forceEvent ?? false;
    server = server ?? event.server;
    const { 
        // Statistics, 
        eventSettings 
    } = server.persistentData;
    var debug = eventSettings.contains("debug") ? eventSettings.getBoolean("debug") : false;

    let startTime = Date.now();
    if (debug) console.log("Event System Started at " + Date(startTime).toString());
    let maxAttempts = eventSettings.getInt("maxAttempts") ?? 50;
    let timeCooldown = eventSettings.getInt("timeCooldown") ?? 10000;
    let disabledEvents = [];
    if (debug) console.log("Events Triggered");
    // Statistics.totalEvents = Statistics.totalEvents ? Statistics.totalEvents.getAsInt() + 1 : 1;

    //Check if the player is valid for the event
    let chosenPlayer = checks.player.getRandomPlayer(server.players);
    if( !chosenPlayer ) return;
    if (debug) console.log("Chosen Player: " + chosenPlayer.username);

    if(!forceEvent){
        if( checks.player.isCreativeOrSpectator(chosenPlayer) ) return;
        if( !checks.player.isAlive(chosenPlayer) ) return;
        if( !checks.player.hasTimer(chosenPlayer) ) return;
        if (!chosenPlayer.stages.has("events_enabled")) return;
        if( checks.player.isOnCooldown(chosenPlayer, timeCooldown) ) return;
        if ( !checks.player.isInTeamDimension(chosenPlayer) ) return;
        if (checks.player.isInVault(chosenPlayer) ) return;
        if (checks.player.isInVoidBiome(chosenPlayer) ) return;

          const biomeId = String(chosenPlayer.level.getBiome(chosenPlayer.blockPosition()).id);
          if (biomeId === "minecraft:the_void") return;

        disabledEvents = checks.player.getDisabledEvents(chosenPlayer);
    }

    let filteredEvents = checks.event.filterEvents(ftbEvents, disabledEvents);
    if (debug) console.log("Filtered Events: " + filteredEvents.length);
    if(!filteredEvents) return;
    var chosenEvent = checks.event.getRandomEvent(filteredEvents);
    if (debug) console.log("Chosen Event: " + (chosenEvent ? chosenEvent.name : "None"));
    if (!chosenEvent) return;

    //Check for required biomes
    if(!checks.event.inBiome(chosenEvent, chosenPlayer)) return;

    let locationInfo = null;
    if(chosenEvent.size >= 0) {
        locationInfo = checks.event.findSpawnLocation(chosenEvent, chosenPlayer, maxAttempts);
        if(!locationInfo) return; //No valid spawn location found
    }

    chosenEvent.execute(event, chosenPlayer, locationInfo);
    Statistics().addSuccess(chosenEvent.displayName);
    chosenPlayer.persistentData.timer = 0; //reset the timer for the player
    let endTime = Date.now();
    console.log("Event " + chosenEvent.name + " triggered for player " + chosenPlayer.username + " in " + (endTime - startTime) + "ms");
}

