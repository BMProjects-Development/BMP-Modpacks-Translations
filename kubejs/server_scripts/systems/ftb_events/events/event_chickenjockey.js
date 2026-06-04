// priority: 800

const CHICKEN_TTL_SECONDS = 90;

const event_chickenjockey = {
  name: "ftb:chicken_jockey",
  displayName: "Chicken Jockey Confetti",
  description:
    "Spawns a Chicken Jockey. If the CHICKEN dies before the TTL, burst 3–12 feathers and play a chicken sound. After TTL, no effects.",
  chance: 0.0,
  size: -1,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: false,
  itemDespawnTime: 400,
  stage: null,
  disableStage: null,

  // Spawn a real chicken jockey near the player. We only track the CHICKEN, with a TTL.
  execute(event, player, location, name) {
    const level = player && player.getLevel ? player.getLevel() : null;
    if (!level) return;

    // Spawn text (from your lang key)
    try {
      player.sendSystemMessage(Text.translate("ftb.event.chickenjockey.spawned").red(), true);
    } catch (_) {}

    const px = player.x, py = player.y, pz = player.z;
    const x = location && location.x != null ? location.x : (px + (Math.random() * 4 - 2));
    const y = location && location.y != null ? location.y : py;
    const z = location && location.z != null ? location.z : (pz + (Math.random() * 4 - 2));

    let cmd;
    if (name){
      cmd = `execute in ${level.dimension} run summon minecraft:chicken ${x.toFixed(2)} ${y.toFixed(2)} ${z.toFixed(2)} {CustomName:'"${name}"',Passengers:[{id:"minecraft:zombie",IsBaby:1b,CanPickUpLoot:0b}]}`;
    } else {
      cmd = `execute in ${level.dimension} run summon minecraft:chicken ${x.toFixed(2)} ${y.toFixed(2)} ${z.toFixed(2)} {Passengers:[{id:"minecraft:zombie",IsBaby:1b,CanPickUpLoot:0b}]}`;
    }
    level.server.runCommandSilent(cmd);

    // Register the chicken next tick (in case spawn hook timing skips it).
    level.server.scheduleInTicks(1, function () {
      trackNearbyChickenJockeys(level, x, y, z, 6, player);
    });
  },
};

function getEntitiesNear(level, x, y, z, radius, type) {
  var sx = (Math.round(x * 100) / 100);
  var sy = (Math.round(y * 100) / 100);
  var sz = (Math.round(z * 100) / 100);
  var sel = '@e[type=' + type + ',x=' + sx + ',y=' + sy + ',z=' + sz + ',distance=..' + radius + ']';
  try {
    return level.getEntities(sel) || [];
  } catch (_) {
    return [];
  }
}

function getPassengers(entity) {
  try {
    if (entity && typeof entity.getPassengers === "function") return entity.getPassengers();
    if (entity && entity.passengers) return entity.passengers;
  } catch (_) {}
  return [];
}

function isBabyZombie(e) {
  try {
    if (!e) return false;
    if (e.type !== "minecraft:zombie") return false;
    if (typeof e.isBaby === "function") return !!e.isBaby();
    if ("baby" in e) return !!e.baby;
  } catch (_) {}
  return false;
}

function isChickenWithBabyZombiePassenger(entity) {
  if (!entity || entity.type !== "minecraft:chicken") return false;
  var riders = getPassengers(entity);
  for (var i = 0; i < riders.length; i++) {
    var r = riders[i];
    if (r && isBabyZombie(r)) return true;
  }
  return false;
}

function coordsOf(e) {
  if (!e) return null;
  var x = e.x, y = e.y, z = e.z;
  if (x == null || y == null || z == null) {
    try {
      var bp = e.blockPos || e.block;
      if (bp) { x = bp.x; y = bp.y; z = bp.z; }
    } catch (_) {}
  }
  if (x == null || y == null || z == null) return null;
  return { x: x, y: y, z: z };
}

function dimKey(dim) {
  try {
    if (typeof dim === "string") return dim;
    if (dim && dim.location) return String(dim.location());
    if (dim && dim.toString) return String(dim.toString());
  } catch (_) {}
  return "minecraft:overworld";
}

function burstFeathers(level, x, y, z) {
  var count = 3 + Math.floor(Math.random() * 10); // 3..12
  var radius = 3;

  for (var i = 0; i < count; i++) {
    var theta = Math.random() * Math.PI * 2;
    var r = radius * Math.sqrt(Math.random());
    var dx = Math.cos(theta) * r;
    var dz = Math.sin(theta) * r;

    var item = level.createEntity("item");
    try { item.item = "minecraft:feather"; } catch (_) { try { item.item = Item.of("minecraft:feather"); } catch (_) {} }
    item.setPosition(x + dx, y + 0.5, z + dz);
    try {
      if (typeof item.setDeltaMovement === "function") {
        item.setDeltaMovement(dx * 0.05, 0.2 + Math.random() * 0.2, dz * 0.05);
      } else {
        item.motionX = dx * 0.05;
        item.motionY = 0.2 + Math.random() * 0.2;
        item.motionZ = dz * 0.05;
      }
    } catch (_) {}
    try { if ("pickupDelay" in item) item.pickupDelay = 10; if (typeof item.setPickUpDelay === "function") item.setPickUpDelay(10); } catch (_) {}
    try { item.glowing = true; } catch (_) {}
    item.spawn();
  }

  var sx = Math.round(x * 10) / 10, sy = Math.round(y * 10) / 10, sz = Math.round(z * 10) / 10;
  level.server.runCommandSilent(
    `execute in ${level.dimension} run playsound minecraft:entity.chicken.hurt master @a[x=${sx},y=${sy},z=${sz},distance=..24] ${sx} ${sy} ${sz} 1 1`
  );
}

var trackedChickens = Object.create(null); // uuid -> { dimension, x, y, z, lastSeenMs, expireMs, ownerId, ownerName }

function trackChicken(entity, ownerPlayer) {
  if (!entity || entity.type !== "minecraft:chicken" || !entity.level) return;
  var pos = coordsOf(entity);
  if (!pos) return;
  var id = String(entity.uuid);
  var now = Date.now();
  trackedChickens[id] = {
    dimension: dimKey(entity.level.dimension),
    x: pos.x, y: pos.y, z: pos.z,
    lastSeenMs: now,
    expireMs: now + CHICKEN_TTL_SECONDS * 1000,
    ownerId: ownerPlayer ? ownerPlayer.id : null,
    ownerName: ownerPlayer ? ownerPlayer.name : null
  };
}

function untrackChicken(id) {
  delete trackedChickens[id];
}

function updateChickenIfPresent(level, id, info) {
  if (!info || info.x == null || info.y == null || info.z == null) return false;

  var searchRadius = 8;
  var list = getEntitiesNear(level, info.x, info.y, info.z, searchRadius, "minecraft:chicken");

  for (var i = 0; i < list.length; i++) {
    var e = list[i];
    if (!e || e.type !== "minecraft:chicken") continue;
    if (String(e.uuid) !== id) continue;

    var p = coordsOf(e);
    if (p) { info.x = p.x; info.y = p.y; info.z = p.z; }
    info.lastSeenMs = Date.now();
    return true;
  }
  return false;
}

function trackNearbyChickenJockeys(level, x, y, z, radius, ownerPlayer) {
  var list = getEntitiesNear(level, x, y, z, radius, "minecraft:chicken");
  for (var i = 0; i < list.length; i++) {
    var e = list[i];
    if (!e || e.type !== "minecraft:chicken") continue;
    if (!isChickenWithBabyZombiePassenger(e)) continue;
    trackChicken(e, ownerPlayer);
  }
}

/* ---------------- Message helpers ---------------- */

function findPlayerFor(server, ownerId, ownerName, level, fallbackPos) {
  try { if (ownerId && server.getPlayer) { var p1 = server.getPlayer(ownerId); if (p1) return p1; } } catch (_) {}
  try { if (ownerName && server.getPlayer) { var p2 = server.getPlayer(ownerName); if (p2) return p2; } } catch (_) {}
  try {
    if (level && fallbackPos) {
      var list = level.getPlayers();
      var best = null, bestD2 = 1e18;
      for (var i = 0; i < list.length; i++) {
        var p = list[i];
        var dx = p.x - fallbackPos.x, dy = p.y - fallbackPos.y, dz = p.z - fallbackPos.z;
        var d2 = dx*dx + dy*dy + dz*dz;
        if (d2 < bestD2) { best = p; bestD2 = d2; }
      }
      if (best) return best;
    }
  } catch (_) {}
  return null;
}

function sendEndMessage(server, info, level) {
  var pos = { x: info.x, y: info.y, z: info.z };
  var player = findPlayerFor(server, info.ownerId, info.ownerName, level, pos);
  if (!player) return;
  try {
    player.sendSystemMessage(Text.translate("ftb.event.chickenjockey.vanished").green(), true);
  } catch (_) {}
}


// Track chicken if it spawns with a baby zombie passenger
EntityEvents.spawned(function (event) {
  var e = event.entity;
  if (!e || e.type !== "minecraft:chicken") return;
  if (!isChickenWithBabyZombiePassenger(e)) return;
  // owner is unknown in this path; still track without owner to avoid NPEs
  trackChicken(e, null);
});

EntityEvents.death(function (event) {
  var e = event.entity;
  if (!e || e.type !== "minecraft:chicken") return;

  var id = String(e.uuid);
  var info = trackedChickens[id];
  if (!info) return; 

  var level = e.level;
  if (!level) { untrackChicken(id); return; }

  var pos = coordsOf(e) || { x: info.x, y: info.y, z: info.z };
  if (pos && pos.x != null) {
    burstFeathers(level, pos.x, pos.y, pos.z);
    try { sendEndMessage(level.server, info, level); } catch (_) {}
  }
  untrackChicken(id);
});

var poll = 0;
ServerEvents.tick(function (event) {
  poll++;
  if (poll % 40 !== 0) return;

  var server = event.server;
  var now = Date.now();
  var ids = Object.keys(trackedChickens);

  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    var info = trackedChickens[id];
    if (!info) { untrackChicken(id); continue; }

    var level = server.getLevel(info.dimension);
    if (!level) { untrackChicken(id); continue; }

    updateChickenIfPresent(level, id, info);

    if (now >= info.expireMs) {
      try { sendEndMessage(server, info, level); } catch (_) {}
      untrackChicken(id);
    }
  }
});
