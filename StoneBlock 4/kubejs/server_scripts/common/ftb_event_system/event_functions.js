var debug = false;
const checks = {
  player: {
    getRandomPlayer: function (players) {
      if (players.length === 0) {
        if (debug) console.log("No players found for events");
        return;
      }
      var chosenPlayer = players[Math.floor(Math.random() * players.length)];
      if (debug) console.log("Chose player for event " + chosenPlayer.username);
      return chosenPlayer;
    },
    isCreativeOrSpectator: function (player) {
      if (player.isCreative() || player.isSpectator()) {
        if (debug) console.log("Player is creative or spectator, returning");
        Statistics().addFailure("Player is creative or spectator");
        return true;
      }
      return false;
    },
    hasTimer: function (player) {
      if (player.persistentData.timer) return true;
      // let Statistics = player.level.server.persistentData.Statistics;

      if (debug) console.log("Player has no timer, returning");
      Statistics().addFailure("No Timer");
      // if (!Statistics.failure.contains("No Timer")) {
      //   Statistics.failure.putInt("No Timer", 1);
      // } else {
      //   const count = Statistics.failure.getInt("No Timer");
      //   Statistics.failure.putInt("No Timer", count + 1);
      // }

      return false;
    },
    isAlive: function (player) {
      if (player.alive) return true;
      // let Statistics = player.level.server.persistentData.Statistics;
      if (debug) console.log("Player is dead, returning");
      Statistics().addFailure("Player Dead");
      // Statistics.failure["Player Dead"] = Statistics.failure["Player Dead"]
      //   ? Statistics.failure["Player Dead"].getAsInt() + 1
      //   : 1;
      return false;
    },
    getDisabledEvents: function (player) {
      let tagList
      try{
        tagList = player.persistentData.disabledEvents;
      } catch (e) {
        if (debug) console.log("No disabled events found for player, returning empty list");
        return [];
      }
      if (!tagList || tagList.size() <= 0) return [];
      let disabledEvents = [];

      for (let i = 0; i < tagList.size(); i++) {
        disabledEvents.push(tagList.getString(i));
      }
      return disabledEvents;
    },
    isOnCooldown: function (player, timeCooldown) {
      if (player.persistentData.getInt("timer") >= timeCooldown) return false;
      // let Statistics = player.level.server.persistentData.Statistics;
      if (debug) console.log("Player is on cooldown, returning");
      Statistics().addFailure("On Cooldown");
      // Statistics.failure["On Cooldown"] = Statistics.failure["On Cooldown"]
      //   ? Statistics.failure["On Cooldown"].getAsInt() + 1
      //   : 1;
      return true;
    },
    hasStage: function (event, player) {
      if (!event.stage || player.stages.has(event.stage)) return true;
      // let Statistics = player.level.server.persistentData.Statistics;

      if (debug)
        console.log("Player does not have required stage for event, returning");
      Statistics().addFailure("Missing Stage");
      player.persistentData.timer = timeCooldown; //reset their event timer since no event was able to trigger
      // Statistics.failure["Missing Stage"] = Statistics.failure["Missing Stage"]
      //   ? Statistics.failure["Missing Stage"].getAsInt() + 1
      //   : 1;
      return false;
    },
    isInTeamDimension: function (player) {
      if (player.level.dimension.toString().includes("ftbteambases")) return true;
      Statistics().addFailure("Player not in Team Dimension");
      return false;
    },
    isInVault: function (player) {
      return isEntityInVault(player);
    }
  },
  event: {
    inBiome: function (event, player) {
      // let Statistics = player.level.server.persistentData.Statistics;

      if (!event.requiredBiomes || event.requiredBiomes.length <= 0)
        return true;

      let biomeHolder = player.level.minecraftLevel.getBiome(
        player.getBlock().getPos()
      );
      let foundBiome = event.requiredBiomes.find((e) => biomeHolder.is(e));

      if (!foundBiome) {
        if (debug) console.log("Required biome not found, returning");
        Statistics().addFailure("Required Biome");
        // Statistics.failure["Required Biome"] = Statistics.failure[
        //   "Required Biome"
        // ]
        //   ? Statistics.failure["Required Biome"].getAsInt() + 1
        //   : 1;
        return false;
      }
      return true;
    },
    filterEvents: function (events, disabledEvents) {
      //Filter event based on their chance, disabled events
      var filteredEvents = events.filter(
        (e) =>
          Math.random() <= e.chance &&
          !Array.from(disabledEvents).includes(e.name)
      );

      // If no event return
      if (filteredEvents.length === 0) {
        if (debug) console.log("No events found after filtering, returning");
        Statistics().addFailure("No Event");
        //Statistics.failure['No Event'] = //Statistics.failure['No Event'] ? //Statistics.failure['No Event'].getAsInt() + 1 : 1;
        return [];
      }
      return filteredEvents;
    },
    getRandomEvent: function (events) {
      if (events.length === 0) {
        if (debug) console.log("No events found, returning");
        Statistics().addFailure("No Event");
        //Statistics.failure['No Event'] = //Statistics.failure['No Event'] ? //Statistics.failure['No Event'].getAsInt() + 1 : 1;
        return null;
      }
      var chosenEvent = events[Math.floor(Math.random() * events.length)];
      if (debug) console.log("Chose event " + chosenEvent.name);
      return chosenEvent;
    },
    findSpawnLocation: function (event, player, maxAttempts) {
      // let Statistics = player.level.server.persistentData.Statistics;
      if (debug) console.log("Finding spawn location for event: " + event.name);
      if (event.size < 0 || !event.minDistance || !event.maxDistance) return null; // No valid event size or distance

      let tries = 0;
      let spawnFound;
      let playerPos = player.getBlock().getPos();

      while (tries < maxAttempts && !spawnFound) {
        let randomLoc = new Ku.Level(player.getLevel()).getRandomLocation(
          playerPos,
          event.minDistance,
          event.maxDistance
        );
        if (debug && !spawnFound)
          console.log("Checking spawn location for event: " + event.name);

        let spawnCheck = checkSpawnLocation(
          player.getLevel(),
          randomLoc,
          event.size,
          event.checkBlocks,
          event.requireBlockBelow
        );
        if (spawnCheck.okay) {
          spawnFound = { pos: randomLoc, locationInfo: spawnCheck };

          if (debug)
            console.log(
              "Spawn found for event: " +
                event.name +
                " at " +
                randomLoc.toString()
            );
          return spawnFound; // Valid spawn found
        } else {
          tries++;
        }
      }
      if (debug && !spawnFound) {
        console.log("Spawn not found for event");
        Statistics().addFailure("Spawn not found");
        // Statistics.failure["Spawn not found"] = Statistics.failure[
        //   "Spawn not found"
        // ]
        //   ? Statistics.failure["Spawn not found"].getAsInt() + 1
        //   : 1;
        return null; // No valid spawn found
      }

      return spawnFound;
    },
  },
};

const checkSpawnLocation = (
  level,
  pos,
  size,
  checkBlocks,
  requireBlockBelow
) => {
  let blocks = new Ku.Level(level).seekCollectionOfBlocks(
    pos,
    size,
    (pos) => checkBlocks.includes(level.getBlock(pos).blockState.block.id),
    requireBlockBelow
      ? (pos) => Ku.Utils.notNullOrEmpty(level.getBlock(pos))
      : null
  );
  return {
    okay: blocks.length > 0,
    blocks: Ku.Streams.mapToBlock(level, blocks),
  };
};
