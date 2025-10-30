// --- Disco Vault (KubeJS 7, MC 1.21.1 / NeoForge) ---

const PALLETTE = [
  Blocks.RED_CONCRETE,
  Blocks.RED_CONCRETE_POWDER,
  Blocks.ORANGE_CONCRETE_POWDER,
  Blocks.ORANGE_CONCRETE,
];

let jukebox;
let tick = 0;

const { abs, atan2, hypot, max, min, random, sin, PI, E } = Math;
const noteStateMap = global.noteStateMap;

// UI refresh cadence for the status text (ticks)
const DISPLAY_UPDATE_TICKS = 60; // ~3 seconds at 20 tps

/**
 * @typedef {Object} Funk
 * @property {number} heat
 * @property {number} timestamp
 * @property {string} dim
 * @property {$BlockContainerJS_} jukebox
 * @property {number} mobs
 * @property {string} msgTag
 * @property {number} lastMsgUpdate
 */
let funkMap = {};

// --- Heat phrases ---
const HEAT_GOAL = 2900;

function heatPhraseKey(h) {
  if (h >= HEAT_GOAL) return "ftb.funk.heat.straight_fire";
  if (h >= 2500) return "ftb.funk.heat.sizzling";
  if (h >= 2000) return "ftb.funk.heat.scorching";
  if (h >= 1200) return "ftb.funk.heat.warming";
  return "ftb.funk.heat.ice";
}

// --- Persistent text_display management ---
function updateHeatDisplay(event, funk, displayHeat) {
  var h = displayHeat !== undefined ? displayHeat : funk.heat;
  var pct = Math.min(100, Math.floor((h / HEAT_GOAL) * 100));
  var key = heatPhraseKey(h);
  var pos = funk.jukebox.pos.center.add(0, 1.0, 0);
  var tag = funk.msgTag;

  // kill old
  var killCmd =
    "execute in " + funk.dim + " positioned " + pos.x + " " + pos.y + " " + pos.z +
    " run kill @e[type=minecraft:text_display,tag=" + tag + ",distance=..3]";
  event.server.runCommandSilent(killCmd);

  // build text component JSON, then quote it for SNBT
  var textJson = JSON.stringify({
    translate: key,
    extra: [{ text: " (" + pct + "% to goal)" }]
  });

  var summonCmd =
    "execute in " + funk.dim + " positioned " + pos.x + " " + pos.y + " " + pos.z + " run " +
    "summon minecraft:text_display ~ ~ ~ " +
    "{text:" + JSON.stringify(textJson) + // STRING value, not compound
    ',billboard:"center",shadow:1b,background:1b,view_range:32.0f,text_opacity:255b,Tags:["' + tag + '"]}';
  event.server.runCommandSilent(summonCmd);

  funk.lastMsgUpdate = event.server.tickCount;
}

function clearHeatDisplay(event, funk) {
  const pos = funk.jukebox.pos.center.add(0, 1.0, 0);
  const tag = funk.msgTag;
  const killCmd =
    `execute in ${funk.dim} positioned ${pos.x} ${pos.y} ${pos.z} run ` +
    `kill @e[type=minecraft:text_display,tag=${tag},distance=..8]`;
  event.server.runCommandSilent(killCmd);
}

// --- Finish helper: ends the vault immediately ---
function finishVault(event, funk, wasSuccess) {
  if (wasSuccess) {
    // Give a final celebratory message
    updateHeatDisplay(event, funk, HEAT_GOAL);

    // Remove jukebox stack and pop a tiny puff
    funk.jukebox.set("minecraft:air");
    event.level.setBlockAndUpdate(
      funk.jukebox.pos.offset(0, -1, 0),
      Blocks.AIR.defaultBlockState()
    );
    event.level.setBlockAndUpdate(
      funk.jukebox.pos.offset(0, -2, 0),
      Blocks.AIR.defaultBlockState()
    );
    event.level
      .createExplosion(funk.jukebox.pos.x, funk.jukebox.pos.y, funk.jukebox.pos.z)
      .strength(0)
      .explode();
  } else {
    // Failure: do NOT remove any blocks. Just stop the loop and clear UI/mobs.
    event.server.runCommandSilent(
      `execute in ${funk.dim} run particle smoke ${funk.jukebox.pos.x} ${funk.jukebox.pos.y} ${funk.jukebox.pos.z} 0.2 0.2 0.2 0.01 10`
    );
  }

  // Cleanup mobs and displays
  event.server.runCommandSilent(
    `execute in ${funk.dim} run kill @e[type=minecraft:blaze,tag=funky,distance=..32]`
  );
  clearHeatDisplay(event, funk);
}

// --- Utility ---
let posToString = (p) => "".concat(p.toString()).replace(/[\(\)\,]/g, "");

// --- Main tick painter + logic ---
PlayerEvents.tick((event) => {
  let funk = funkMap[event.player.uUID];
  if (!funk) return;

  const floor = funk.jukebox.pos.offset(0, -1, 0);
  const t = event.server.tickCount - funk.timestamp;

  // Paint the dance floor (unchanged cadence)
  for (let x = -7; x < 8; x++) {
    for (let z = -7; z < 8; z++) {
      event.level.setBlock(
        floor.offset(x, 0, z),
        PALLETTE[2 * main(t, x, z) + main(t + 10, x, z)].defaultBlockState(),
        3
      );
    }
  }

  // --- Heat gain/loss from tile color (read the block below; compare by ID) ---
  const feet = event.player.blockPosition();
  const underPos = feet.below();
  const underId = String(event.level.getBlock(underPos).id); // e.g. "minecraft:orange_concrete"

  const isCool =
    underId === "minecraft:red_concrete" ||
    underId === "minecraft:red_concrete_powder";
  const isWarm =
    underId === "minecraft:orange_concrete" ||
    underId === "minecraft:orange_concrete_powder";

  let playerPos = feet.center;
  let delta = funk.jukebox.pos.offset(0, 2, 0).center.subtract(playerPos);

  if (isCool) {
    funk.heat = max(0, funk.heat - 2);
    event.server.runCommandSilent(
      `execute in ${funk.dim} run particle soul_fire_flame ${posToString(
        playerPos
      )} ${posToString(delta)} 0.075 0 force`
    );
  } else if (isWarm) {
    funk.heat = funk.heat + 2;
    event.server.runCommandSilent(
      `execute in ${funk.dim} run particle flame ${posToString(
        playerPos
      )} ${posToString(delta)} 0.075 0 force`
    );
  }

  // Update the status display on cadence
  if (
    !funk.lastMsgUpdate ||
    event.server.tickCount - funk.lastMsgUpdate >= DISPLAY_UPDATE_TICKS
  ) {
    updateHeatDisplay(event, funk);
  }

  // Ambient heat burst at the jukebox
  let adjustedHeat = (funk.heat / 100 + random()) | 0;
  if (adjustedHeat > 0) {
    event.server.runCommandSilent(
      `execute in ${funk.dim} run particle flame ${posToString(
        funk.jukebox.pos.center.add(0, 2, 0)
      )} 1 1 1 0.075 ${adjustedHeat} force`
    );
  }

  // Spawn a funky blaze occasionally (unchanged)
  if (funk.mobs < 2 && t % 226 == 20) {
    funk.mobs++;
    let sx = funk.jukebox.pos.x + 7 * hash(t);
    let sy = funk.jukebox.pos.y;
    let sz = funk.jukebox.pos.z + 7 * hash(-~t);

    let blaze = event.level.createEntity("minecraft:blaze");
    blaze.setPosition(sx, sy, sz);
    blaze.addTag("funky");
    blaze.spawn();
  }

  // End immediately when reaching goal
  if (funk.heat >= HEAT_GOAL) {
    finishVault(event, funk, true);
    delete funkMap[event.player.uUID];
    return;
  }

  // Timeout end (unchanged threshold)
  if (t > 2965) {
    const success = funk.heat >= HEAT_GOAL;
    finishVault(event, funk, success);
    delete funkMap[event.player.uUID];
  }
});

// --- Blaze kills heat bump ---
EntityEvents.death((event) => {
  if (!event.source.player) return;
  if (!event.entity.tags.contains("funky")) return;

  let funk = funkMap[event.source.player.uUID];
  if (!funk) return;

  funk.heat = funk.heat + 100;
  funk.mobs = max(0, funk.mobs - 1);

  for (let i = 0; i < 16; i++) {
    let entityPos = event.entity
      .blockPosition()
      .center.offsetRandom(Utils.getRandom(), 2);
    let delta = funk.jukebox.pos.offset(0, 2, 0).center.subtract(entityPos);
    event.server.runCommandSilent(
      `execute in ${funk.dim} run particle flame ${posToString(
        entityPos
      )} ${posToString(delta)} 0.075 0 force`
    );
  }
});

// --- Start/reset handler ---
BlockEvents.rightClicked("minecraft:jukebox", (event) => {
  if (event.block.entityData["RecordItem"]) {
    const funk = funkMap[event.player.uUID];
    if (funk) clearHeatDisplay(event, funk);
    delete funkMap[event.player.uUID];
  } else if (event.item && event.item.id == "minecraft:music_disc_pigstep") {
    if (event.level.getBlock(event.block.pos.offset(0, 6, 0)).id.toString() != "minecraft:barrier") return;

    const msgTag = "funk_msg_" + event.server.tickCount + "_" + event.player.id;
    const funk = {
      heat: 0,
      timestamp: event.server.tickCount,
      dim: event.player.level.dimension.toString(),
      jukebox: event.block,
      mobs: 0,
      msgTag: msgTag,
      lastMsgUpdate: 0
    };
    funkMap[event.player.uUID] = funk;

    noteStateMap[event.player.uUID] = { notes: [], last: -1, step: 0, pos: event.block.pos.offset(1, -6, 7), timestamp: 0 };

    updateHeatDisplay(event, funk);
  }
});

/**
 * @typedef {(t: number, x: number, z: number) => number} Shader
 */

let hash = (/** @type {number} */ x) => (sin(x) * 69 * E) % 1;
/** @typedef {(start: number, end: number, z: number) => number} */
let lerp = (start, end, delta) => {
  delta = max(0, min(1, delta));
  return end * delta + start * (1 - delta);
};
let zero = () => 0;
let wave = (t, x, z) => abs(x + abs(((t * 0.3 + 7) % 28) - 14) - 7) / 3;
let spiral = (t, x, z) =>
  abs(sin(atan2(x, z) + hypot(x, z) / 10 + ((t % 100) / 50 - 1) * PI)) * 2;
let box = (t, x, z) =>
  0.5 + +!(x & 3 && z & 3 && (x & 4) ^ (z & 4) ^ ((t >> 3) & 4));
let squareLUT = [
  [0, 0],
  [0, 0],
  [5, 0],
  [0, 5],
  [-5, 5],
  [-5, 0],
  [0, -5],
  [0, 0],
  [0, 0],
];
let square = (t, x, z) =>
  0.3 *
  max(
    abs(
      x + lerp(squareLUT[t >> 5][0], squareLUT[(t >> 5) + 1][0], (t / 32) % 1)
    ),
    abs(
      z + lerp(squareLUT[t >> 5][1], squareLUT[(t >> 5) + 1][1], (t / 32) % 1)
    )
  );
let shaders = [
  [zero, 20],
  [square, 226],
  [spiral, 226],
  [wave, 226],
  [box, 226],
  [square, 226],
  [spiral, 226],
  [wave, 226],
  [box, 226],
  [square, 226],
  [spiral, 226],
  [wave, 226],
  [box, 226],
  [square, 226],
  [zero, 100],
];
let sum = shaders.reduce((a, b) => a + b[1], 0);

let main = (t, x, z) => {
  t = t % sum;
  for (let i = 0; i < shaders.length; i++) {
    let [shader, length] = shaders[i];
    t = t - length;
    if (t >= 0) continue;
    let [nextShader] = shaders[(i + 1) % shaders.length];
    return +(
      lerp(shader(t + length, x, z), nextShader(0, x, z), 1 + t / 20) -
        1 +
        0.1 * min(abs(t + 10), 10) <
      1
    );
  }
};
