// // priority: 800
// /**
//  * Represents a template event. Object name should be added to the ftbEvents object in the main script.
//  * @property {string} name - The name of the event. Used for identification.
//  * @property {string} displayName - The display name of the event. Used for display purposes.
//  * @property {string} description - The description of the event. Not used at the moment
//  * @property {number} chance - The chance of the event occurring. 0.0 - 1.0
//  * @property {string|null} stage - The stage of the event. Stage needed before this Event can happen
//  * @property {string|null} disableStage - The stage needed to be able to disable this event
//  * 
//  * @property {number} size - The size of the event area / mob needed spawning area.
//  * @property {number} minDistance - The minimum distance for the event.
//  * @property {number} maxDistance - The maximum distance for the event.
//  * @property {string[]} checkBlocks - The blocks to check for the event. (Example minecraft:chest for the Mimic Event)
//  * @property {boolean} requireBlockBelow - Indicates if a block below is required for the event.
//  * 
//  * @property {Function} execute - The function to execute when the event occurs.
//  */

// let $LockManager = Java.loadClass("it.hurts.shatterbyte.clavis.common.LockManager")
// const event_clavis_of_patience = {
//   /* 
//   * 
//   */
//   name: "ftb:clavis_of_patience",
//   displayName: "Clavis of Patience",
//   description: "Toggles the Clavis of Patience Event. Spawns a Clavis chest for the player to open multiple times",
//   chance: 0.1,
//   stage: null,
//   disableStage: null,

//   size: 0,
//   minDistance: 1,
//   maxDistance: 24,

//   checkBlocks: ["minecraft:air"],
//   requireBlockBelow: true,



//   /**
//    * Executes the event.
//    * In here you can do almost everything you want.
//    * 
//    * @param {Event} event - The event object. limited use when triggering the event with the force command
//    * @param {Player} player - The player object.
//    * @param {Location} location - The location object.
//    */
//   execute(event, player, location) {
//     let level = player.getLevel();
//     let server = level.server;
//     let locks
//     let rand = Utils.getRandom().fork()
//     let seed = rand.nextLong()
//     console.log()


//     player.tell(["[Server]: This is a template for creating new events."]);
//     // console.log(`\nEvents:`)
//     // for (let i in event) console.log(`type: ${typeof event[i]} | ${i}`) // debug
//     // console.log(`\nServer:`)
//     // for (let i in server) console.log(`type: ${typeof server[i]} | ${i}`) // debug
//     console.log(`\nLocation:`)
//     for (let i in location) console.log(`type: ${typeof location[i]} | ${i}`) // debug
//     console.log(`\nPosition: ${location.pos}`)
//     console.log(`\nLocation Info:`)
//     for (let i in location.locationInfo) console.log(`type: ${typeof location.locationInfo[i]} | ${i}`)
//     console.log(`\nLevel (isClientSide: ${level.isClientSide()}):`)
//     for (let i in level) console.log(`type: ${typeof level[i]} | ${i}`) // debug
//     console.log(`\nRand:${rand}`)
//     console.log(`\nSeed:${seed}`)
//     let SomeVAR = 0;
    
//     let progress = 0;
//     let block_progress = [
//       "minecraft:glass",
//       "minecraft:stone",
//       "minecraft:clay",
//       "minecraft:coal_block",
//       "minecraft:copper_block",
//       "minecraft:iron_block",
//       "minecraft:redstone_block",
//       "minecraft:gold_block",
//       "minecraft:diamond_block",
//       "minecraft:emerald_block"
//     ]
//     level.setBlockAndUpdate(location.pos, block_progress[progress])
//     for (let dif = 0; dif < 10; dif++) {
//       level.runCommandSilent(`/clavis lock add clavis:gear ${0.1 + (dif * 0.1)} ${seed} false ${location.pos.x} ${location.pos.y} ${location.pos.z}`)
//     }
//     if ($LockManager.getLocksAt(level, player, location.pos).size() == 0) return
//     server.scheduleRepeatingInTicks(20, (ev) => {
      
//       locks = $LockManager.getLocksAt(level, player, location.pos)
//       progress = 10 - locks.size()
//       level.setBlockAndUpdate(location.pos, block_progress[progress])
//       if (SomeVAR >= 120 || progress == 10) {
//         ev.clear()
//       }
//       SomeVAR++
//     })
    
    
//   }
// }

// NetworkEvents.dataRecieved("clavis:finish_lockpick",(event) => {
//   console.log(event.getPlayer())
// })