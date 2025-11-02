// temppad.js

const $FTBEPlayerData = Java.loadClass(
  "dev.ftb.mods.ftbessentials.util.FTBEPlayerData"
);

const LANG = {
  WORLD_ENGINE_LOCKED: "ftb.portal.world_engine_locked",
  NO_BASE: "ftb.portal.no_base",
  TOO_FAR: "ftb.portal.too_far",                 // expects %1$s = shortBy, %2$s = maxRange
  VAULT_TOO_FAR: "ftb.portal.vault_too_far",     // expects %1$s = shortBy, %2$s = maxRange
  NOT_BOUND: "ftb.portal.not_bound",
  WRONG_DIMENSION: "ftb.portal.wrong_dimension",
  NOT_ENOUGH: "ftb.portal.not_enough_chronon",
  OPENING: "ftb.portal.opening",
  WORLD_ENGINE: "ftb.portal.world_engine",
  SPAWN: "ftb.portal.spawn",
  HIDDEN: "ftb.portal.hidden",
  BASE: "ftb.portal.base",
  SNEAK_REQUIRED: "ftb.portal.sneak_required",
  WRONG_ITEM: "ftb.portal.wrong_item",
  NULL_ENTITY: "ftb.portal.null_entity",
  OPEN_FAILED: "ftb.portal.open_failed",
  DISABLED: "ftb.command.disabled",
  T5_ZONE_LOCKED: "ftb.portal.t5_zone_locked",
  HOME_LOCKED: "ftb.portal.home_locked",
  INVALID_PORTAL: "ftb.portal.invalid_portal",
  INVALID_LOCATOR: "ftb.portal.invalid_locator"
};

const YAW = { SOUTH: 0, WEST: 90, NORTH: 180, EAST: -90 };

// Returns a float yaw in degrees, best-effort.
function getEntryYaw(player) {
  try { if (typeof player.getYRot === "function") return player.getYRot(); } catch (_) { }
  try { if (typeof player.getYHeadRot === "function") return player.getYHeadRot(); } catch (_) { }
  try {
    if (player.getDirection && player.getDirection().toYRot) return player.getDirection().toYRot();
  } catch (_) { }
  return 0;
}

/**
 * yawEntry: how the entry door (near the player) should face
 * yawExit: how the exit door (at the destination) should face
 */
const spawnTimeDoor = (level, player, position, dimension, color, yawEntry, yawExit) => {
  let [modid, path] = String(dimension).split(":");
  color = color || $Color.RAINBOW;
  let isSurvival = !player.isCreative() && !player.isSpectator()

  let NamedGlobalVec3 = new $NamedGlobalVec3(
    Component.literal("Portal"),
    new Vec3d(position.x + 0.5, position.y, position.z),
    ResourceKey.create(Registries.DIMENSION, new ResourceLocation.fromNamespaceAndPath(modid, path)),
    typeof yawExit === "number" ? yawExit : 180,
    color
  );

  let result = $TimeDoorEntity.Companion.getTimedoor(level, NamedGlobalVec3, true);
  let timedoor = result.left().get();
  timedoor.owner = player.id;

  const entryYaw = typeof yawEntry === "number" ? yawEntry : getEntryYaw(player);
  timedoor.sizing.placeTimedoor($DoorType.EXIT, player.position(), entryYaw, timedoor);

  // Get BoundBox area around entrance timedoor location
  let entry_aabb = timedoor.getBoundingBox().inflate(1.5, 0, 1.5)

  // Unpack size
  let {xsize: x_size, ysize: y_size, zsize: z_size} = entry_aabb

  // Get BoundBox area around exit timedoor location
  let exit_aabb = AABB.ofSize(timedoor.getTargetPos(), x_size, y_size, z_size)

  // Validate entry
  let invalid_entry = BlockPos.betweenClosedStream(entry_aabb).anyMatch((block) => {
    let block_state = level.getBlockState(block)
    return block_state.getId() == "ftbquests:stage_barrier"
  })

  // Validate Exit
  let invalid_exit = BlockPos.betweenClosedStream(exit_aabb).anyMatch((block) => {
    let block_state = level.getBlockState(block)
    return block_state.getId() == "ftbquests:stage_barrier"
  })

  // Do not spawn portal if invalid locations if in survival
  if ((invalid_exit || invalid_entry) && isSurvival) {
    return false
  } else {
    level.addFreshEntity(timedoor);
    return true
  }
};

const trySpawnTimeDoor = (location, level, player, position, dimension, color, yawEntry, yawExit) => {
  try {
    let spawned = spawnTimeDoor(level, player, position, dimension, color, yawEntry, yawExit);
    if (spawned) {
      player.tell(Text.translate(LANG.OPENING, location));
      return true
    } else {
      player.tell(Text.translate(LANG.INVALID_PORTAL, location));
      return false
    }
  } catch (error) {
    console.log(`\ntemppad.js spawnTimeDoor() error:\n${error}\nPlease Report this to FTB via Github Issues if you see this`);
    player.tell(Text.translate(LANG.OPEN_FAILED).red());
    return false
  }
};

const $ServerConfig = Java.loadClass(
  "dev.ftb.mods.ftbteambases.config.ServerConfig"
);
const $Level = Java.loadClass("net.minecraft.world.level.Level");

ServerEvents.commandRegistry((event) => {
  const {
    commands: Commands,
    arguments: Arguments,
    builtinSuggestions: Suggestions,
  } = event;

  event.register(
    Commands.literal("home").executes((context) => spawnHomePortal(context))
  );
  event.register(
    Commands.literal("ftbteambases").then(
      Commands.literal("home").executes((context) => spawnHomePortal(context))
    )
  );

  event.register(
    Commands.literal("spawn").executes((context) => spawnSpawnPortal(context))
  );
});

const disabledCommand = (context) => {
  var player = context.getSource().getPlayerOrException();
  if (player) {
    player.tell(Text.translate(LANG.DISABLED).red());
  }
  return 0;
};

function findChrononCellWithCharge(player, cost, debug) {
  // Creative/spectator bypass
  if (player.isCreative() || player.isSpectator()) {
    return { stack: Item.of("tempad:chronon_cell"), charge: 9999 };
  }

  // Predeclare locals once to keep Rhino happy
  var stack = null;
  var chargeVal = 0;
  var i = 0;
  var j = 0;
  var invAll = null;
  var curiosApiClass = null;
  var helper = null;
  var capOpt = null;
  var cap = null;
  var curiosMap = null;
  var stacksHandler = null;
  var stacks = null;
  var slots = 0;
  var candidate = null;

  // 1) Main hand
  stack = player.mainHandItem;
  if (stack && (stack.id === "tempad:chronon_cell" || stack.id === "tempad:chronon_battery")) {
    try {
      chargeVal = Number(getChronon(stack, player) || 0);
      if (chargeVal >= cost) return { stack: stack, charge: chargeVal };
    } catch (eA) {
      if (debug) console.log("getChronon failed for mainHand: " + eA);
    }
  }

  // 2) Offhand
  stack = player.offHandItem;
  if (stack && (stack.id === "tempad:chronon_cell" || stack.id === "tempad:chronon_battery")) {
    try {
      chargeVal = Number(getChronon(stack, player) || 0);
      if (chargeVal >= cost) return { stack: stack, charge: chargeVal };
    } catch (eB) {
      if (debug) console.log("getChronon failed for offHand: " + eB);
    }
  }

  // 3) Inventory
  try {
    if (player.inventory && player.inventory.allItems) {
      invAll = player.inventory.allItems;
      for (i = 0; i < invAll.length; i++) {
        stack = invAll[i];
        if (!stack || (stack.id !== "tempad:chronon_cell" && stack.id !== "tempad:chronon_battery")) continue;
        try {
          chargeVal = Number(getChronon(stack, player) || 0);
          if (chargeVal >= cost) return { stack: stack, charge: chargeVal };
        } catch (eC) {
          if (debug) console.log("getChronon failed for inv[" + i + "]: " + eC);
        }
      }
    }
  } catch (eInv) {
    if (debug) console.log("Inventory scan threw: " + eInv);
  }

  // 4) Curios (wrapped defensively)
  try {
    try {
      curiosApiClass = Java.loadClass("top.theillusivec4.curios.api.CuriosApi");
    } catch (e0) {
      if (debug) console.log("CuriosApi load threw: " + e0);
      curiosApiClass = null;
    }
    if (curiosApiClass) {
      try { helper = curiosApiClass.getCuriosHelper(); } catch (e1) { if (debug) console.log("Curios getCuriosHelper threw: " + e1); helper = null; }
      if (helper) {
        try { capOpt = helper.getCuriosHandler(player); } catch (e2) { if (debug) console.log("Curios getCuriosHandler threw: " + e2); capOpt = null; }

        try {
          cap =
            capOpt &&
            (capOpt.orElse
              ? capOpt.orElse(null)
              : capOpt.orElseGet
                ? capOpt.orElseGet(function () { return null; })
                : null);
        } catch (e3) {
          if (debug) console.log("Curios Optional access threw: " + e3);
          cap = null;
        }

        if (cap && cap.getCurios) {
          try {
            curiosMap = cap.getCurios();
            if (curiosMap && curiosMap.forEach) {
              curiosMap.forEach(function (identifier, sh) {
                if (candidate) return;
                stacksHandler = sh;
                try {
                  stacks = stacksHandler && stacksHandler.getStacks && stacksHandler.getStacks();
                  slots = stacksHandler && stacksHandler.getSlots && stacksHandler.getSlots();
                  if (!stacks || slots == null) return;

                  for (j = 0; j < slots; j++) {
                    var curioStack = null;
                    try { curioStack = stacks.getStackInSlot(j); } catch (inner0) { if (debug) console.log("Curios getStackInSlot threw: " + inner0); continue; }
                    if (!curioStack || (curioStack.id !== "tempad:chronon_cell" && curioStack.id !== "tempad:chronon_battery")) continue;

                    try {
                      chargeVal = Number(getChronon(curioStack, player) || 0);
                      if (chargeVal >= cost) { candidate = { stack: curioStack, charge: chargeVal }; return; }
                    } catch (inner1) {
                      if (debug) console.log("getChronon failed for curios:" + identifier + "[" + j + "]: " + inner1);
                    }
                  }
                } catch (inner) {
                  if (debug) console.log("Curios handler iteration error: " + inner);
                }
              });
            }
          } catch (eMap) {
            if (debug) console.log("Curios map iteration threw: " + eMap);
          }
        }
      }
    }
  } catch (outer) {
    if (debug) console.log("Curios block outer catch: " + outer);
  }

  return candidate || null;
}

// consume Chronon from ANY qualifying cell
function spawnHomePortal(ctx) {
  var src = ctx.getSource();
  var player = src.getPlayerOrException();
  let is_survival = !player.isCreative() && !player.isSpectator()
  if (is_survival) {
    if (!player.stages.has("home_unlocked")) {
      src.sendFailure(Text.translate(LANG.HOME_LOCKED));
      return 0;
    }
  }

  var baseOpt = $BaseInstanceManager
    .get(player.server)
    .getBaseForPlayer(player);
  if (!baseOpt.isPresent()) {
    src.sendFailure(Text.translate(LANG.NO_BASE));
    return 0;
  }

  var found = findChrononCellWithCharge(player, CHRONON_COST, true);
  if (!found) {
    src.sendFailure(Text.translate(LANG.NOT_ENOUGH, CHRONON_COST));
    return 0;
  }

  var base = baseOpt.get();
  var pos = base.spawnPos();
  var dim = base.dimension();
  var dimStr = dim.getNamespace() + ":" + dim.getPath();

  $FTBEPlayerData
    .getOrCreate(player)
    .map((data) => {
      let homes = data.homeManager();
      homes.destinations().forEach((home) => {
        if (home.name() == "home") {
          let tag = home.destination().write();
          dimStr = tag.getString("dim");
          pos = home.destination().getPos();
        }
      });
      console.log("Home dim: " + dim);
      console.log("Home pos: " + pos);
      return 0;
    })
    .orElse(0);

  let portal_spawned = trySpawnTimeDoor(
    Text.of(Text.translate(LANG.BASE)),
    player.level,
    player,
    pos,
    dimStr,
    $Color.RAINBOW,
    getEntryYaw(player),
    getEntryYaw(player)
  );

  if (is_survival && portal_spawned) {
    setChronon(found.stack, found.charge - CHRONON_COST, player);
  }

  return 1;
}

function spawnSpawnPortal(ctx) {
  var src = ctx.getSource();
  var player = src.getPlayerOrException();
  
  let portal_spawned = false

  if (!player.isCreative() && !player.isSpectator()) {
    portal_spawned = trySpawnTimeDoor(
      Text.of(Text.translate(LANG.SPAWN)),
      player.level,
      player,
      player.level.getSharedSpawnPos(),
      "minecraft:overworld",
      $Color.RAINBOW,
      getEntryYaw(player),
      180
    );
    return 1;
  }

  var baseOpt = $BaseInstanceManager
    .get(player.server)
    .getBaseForPlayer(player);

  if (!baseOpt.isPresent()) {
    // What is this for? Nyxane
    portal_spawned = trySpawnTimeDoor(
      Text.of(Text.translate(LANG.SPAWN)),
      player.level,
      player,
      player.level.getSharedSpawnPos(),
      "minecraft:overworld",
      $Color.RAINBOW,
      getEntryYaw(player),
      180
    );
    return 1;
  }

  var base = baseOpt.get();
  var base_dim = base.dimension();
  if (player.level.dimension == "minecraft:overworld") {
    //Always work in overworld?
    portal_spawned = trySpawnTimeDoor(
      Text.of(Text.translate(LANG.SPAWN)),
      player.level,
      player,
      player.level.getSharedSpawnPos(),
      "minecraft:overworld",
      $Color.RAINBOW,
      getEntryYaw(player),
      180
    );
    return 1;
  } else if (!(player.level.dimension.path.contains("private_for_"))) {
    src.sendFailure(Text.translate(LANG.WRONG_DIMENSION));
    return 0;
  }

  var basePos = base.spawnPos();
  let deltaX = player.getX() - (basePos.getX() + 0.5);
  let deltaZ = player.getZ() - (basePos.getZ() + 0.5);
  let distanceSqr = deltaX * deltaX + deltaZ * deltaZ;

  if (distanceSqr > 128 * 128) {
    src.sendFailure(Text.translate(LANG.TOO_FAR));
    return 0;
  }

  portal_spawned = trySpawnTimeDoor(
    Text.of(Text.translate(LANG.SPAWN)),
    player.level,
    player,
    player.level.getSharedSpawnPos(),
    "minecraft:overworld",
    $Color.RAINBOW,
    getEntryYaw(player),
    180
  );
  return 1;
}

const CHRONON_KEY = "tempad:chronon_content";
const CHRONON_COST = 5;

function getChronon(stack) {
  const components = stack.componentMap;
  const raw = components.get(CHRONON_KEY);
  if (raw != null) {
    return Number(raw) || 0;
  }
}

const JInt = Java.loadClass("java.lang.Integer");

function setChronon(stack, value) {
  var components = stack.componentMap;
  var next = (Number(value) || 0) | 0;
  components.set(CHRONON_KEY, JInt.valueOf(String(next)));
  return next;
}

// Fixed World Engine target
const WORLD_ENGINE_TARGET = { x: 3, y: -20, z: 12 };

// existing chronon cell handler for world engine
ItemEvents.rightClicked((event) => {
  const player = event.player;
  const item = event.item;

  if (!player || !item) return;
  if (item.id !== "tempad:chronon_cell") return;
  if (!player.isShiftKeyDown()) return;
  if (player.level.isClientSide()) return;

  if (!player.stages.has("world_engine_unlocked")) {
    player.tell(Text.translate(LANG.WORLD_ENGINE_LOCKED));
    return;
  }

  const baseOpt = $BaseInstanceManager
    .get(player.server)
    .getBaseForPlayer(player);
  if (!baseOpt.isPresent()) {
    player.tell(Text.translate(LANG.NO_BASE));
    return;
  }

  // Pull charge from any qualifying cell: hands, inventory, Curios
  const found = findChrononCellWithCharge(player, CHRONON_COST, true);
  if (!found) {
    player.tell(Text.translate(LANG.NOT_ENOUGH, CHRONON_COST));
    return;
  }

  const base = baseOpt.get();
  const dim = base.dimension();
  const dimStr = dim.getNamespace() + ":" + dim.getPath();
  const targetPos = {
    x: WORLD_ENGINE_TARGET.x,
    y: WORLD_ENGINE_TARGET.y,
    z: WORLD_ENGINE_TARGET.z,
  };
  let is_survival = !player.isCreative() && !player.isSpectator()

  let portal_spawned = trySpawnTimeDoor(
    Text.of(Text.translate(LANG.WORLD_ENGINE)),
    player.level,
    player,
    targetPos,
    dimStr
  );

  if (is_survival && portal_spawned) {
    setChronon(found.stack, found.charge - CHRONON_COST, player);
  }
  event.cancel();
});

// new chronon battery handler for T5 zone door to Overworld at -10 -71 0, facing East
const OVERWORLD_DEST = { x: -10, y: -71, z: 0 };

ItemEvents.rightClicked((event) => {
  const player = event.player;
  const item = event.item;

  if (!player || !item) return;
  if (item.id !== "tempad:chronon_battery") return;
  if (!player.isShiftKeyDown()) return;
  if (player.level.isClientSide()) return;

  if (!player.stages.has("t5_zone_unlocked")) {
    player.tell(Text.translate(LANG.T5_ZONE_LOCKED));
    event.cancel();
    return;
  }

  const cost = CHRONON_COST;
  const current = Number(getChronon(item) || 0);
  if (!player.isCreative() && !player.isSpectator() && current < cost) {
    player.tell(Text.translate(LANG.NOT_ENOUGH, cost));
    event.cancel();
    return;
  }

  const dimStr = "minecraft:overworld";
  const targetPos = {
    x: OVERWORLD_DEST.x,
    y: OVERWORLD_DEST.y,
    z: OVERWORLD_DEST.z + 0.5,
  };

  let is_survival = !player.isCreative() && !player.isSpectator()

  let portal_spawned = trySpawnTimeDoor(
    Text.of(Text.translate(LANG.HIDDEN)).obfuscated(),
    player.level,
    player,
    targetPos,
    dimStr,
    $Color.RAINBOW,
    getEntryYaw(player),
    YAW.EAST
  );

  if (is_survival && portal_spawned) {
    setChronon(item, current - cost, player);
  }
  event.cancel();
});

// Post-teleport FX: particles + sound after a successful Tempad teleport
function playPostTeleportFX(player) {
  // 1 tick delay to ensure the client is settled at destination
  player.server.scheduleInTicks(1, (_) => {
    player.server.runCommandSilent(`execute as ${player.username} at @s run particle twilightforest:twilight_orb ~ ~1 ~ 0.6 0.8 0.6 0.02 120 force`);
    player.server.runCommandSilent(`execute as ${player.username} at @s run playsound gateways:gate_start master @s ~ ~ ~ 1 1`);
  });
}

NativeEvents.onEvent("earth.terrarium.tempad.api.event.TimedoorEvent$Enter", (event) => {
  try {
    let entity = event.entity;
    let teleportee = event.teleportee;
    if (!teleportee) return;

    // Only allow non-player entities if not to Overworld
    if (teleportee.type != "minecraft:player") {
      if (entity.targetDimension == "minecraft:overworld") event.setCanceled(true);
      return;
    }

    // Player successfully arrived: play FX on them
    playPostTeleportFX(teleportee);
  } catch (error) {
    console.log(`\ntemppad.js TimedoorEvent$Enter error:\n${error}\nPlease Report this to FTB via Github Issues if you see this`);
  }
});

// --- Register only /timedoor worldengine ---
ServerEvents.commandRegistry((event) => {
  const { commands: Commands } = event;

  event.register(
    Commands.literal("timedoor")
      .then(Commands.literal("worldengine").executes((ctx) => spawnWorldEnginePortal(ctx)))
  );
});

// --- Handler: opens a Time Door to the World Engine target ---
function spawnWorldEnginePortal(ctx) {
  var src = ctx.getSource();
  var player = src.getPlayerOrException();
  let is_survival = !player.isCreative() && !player.isSpectator()

  // Stage gate (creative/spectator bypass)
  if (is_survival) {
    if (!player.stages.has("world_engine_unlocked")) {
      src.sendFailure(Text.translate(LANG.WORLD_ENGINE_LOCKED));
      return 0;
    }
  }

  // Must have a base to resolve the World Engine dimension
  var baseOpt = $BaseInstanceManager.get(player.server).getBaseForPlayer(player);
  if (!baseOpt.isPresent()) {
    src.sendFailure(Text.translate(LANG.NO_BASE));
    return 0;
  }

  // Charge check (creative/spectator bypass)
  var found = null;
  if (is_survival) {
    found = findChrononCellWithCharge(player, CHRONON_COST, true);
    if (!found) {
      src.sendFailure(Text.translate(LANG.NOT_ENOUGH, CHRONON_COST));
      return 0;
    }
  }

  // Resolve destination
  var base = baseOpt.get();
  var dim = base.dimension();
  var dimStr = dim.getNamespace() + ":" + dim.getPath();
  var targetPos = { x: WORLD_ENGINE_TARGET.x, y: WORLD_ENGINE_TARGET.y, z: WORLD_ENGINE_TARGET.z };

  // Spawn Time Door
  let portal_spawned = trySpawnTimeDoor(
    Text.translate(LANG.WORLD_ENGINE),
    player.level,
    player,
    targetPos,
    dimStr,
    $Color.RAINBOW
  );

  if (is_survival && found && portal_spawned) {
    setChronon(found.stack, found.charge - CHRONON_COST, player);
  }

  return 1;
}

// ---------------------------------------------------------------------------
// Lodestone Compass -> Time Door (sneak + right-click)
// Teleports to the compass's bound lodestone if:
//   - same dimension
//   - within MAX_COMPASS_DISTANCE blocks (horizontal)
//   - player has enough Chronon
// ---------------------------------------------------------------------------

const MAX_COMPASS_DISTANCE = 256;
ItemEvents.rightClicked("minecraft:compass", (event) => {
  let { player: player, item: itemstack, level: level } = event
  if (player == null || itemstack == null || level == null) return

  if (!(player.isShiftKeyDown())) return
  if (level.isClientSide()) return

  let components = itemstack.getComponents()
  let label;

  if (!(components.has("minecraft:custom_data"))) return
  if (!(components.get("minecraft:custom_data").contains("can_spawn_timedoor"))) return
  
  if (!(components.has("minecraft:lodestone_tracker"))) {
    return
  } else {
    try {
      label = itemstack.getCustomName().copy().toJson().get("with").get(0).get("translate").getAsString();
    } catch (_) {
      player.tell(`${Text.translate(LANG.INVALID_LOCATOR)}`)
      return
    }
  }

  let tracker = components.get("minecraft:lodestone_tracker")
  let target = tracker.target()

  if (target.isEmpty()) {
    player.tell(Text.translate(LANG.NOT_BOUND).red())
    return
  }

  target = target.get()

  let target_dimension = target.dimension().location()
  if (level.getDimension() != target_dimension) {
    player.tell(Text.translate(LANG.WRONG_DIMENSION).red())
    return
  }
  let target_pos = target.pos()

  let { x: xP, z: zP } = player.blockPosition().getCenter()
  let { x: xT, z: zT } = target_pos.getCenter()

  let dx = xP - xT
  let dz = zP - zT
  let horizontalDist = Math.sqrt(dx * dx + dz * dz)

  let is_survival = !player.isCreative() && !player.isSpectator()

  // Range check with shortfall message (no const re-declaration)
  if (is_survival) {
    if (horizontalDist > MAX_COMPASS_DISTANCE) {
      var shortfall = Math.ceil(horizontalDist - MAX_COMPASS_DISTANCE);
      player.tell(Text.translate(LANG.VAULT_TOO_FAR, [String(shortfall), String(MAX_COMPASS_DISTANCE)]).red())
      return
    }
  }

  let found = null;

  if (is_survival) {
    found = findChrononCellWithCharge(player, CHRONON_COST, true);
    if (!found) {
      player.tell(Text.translate(LANG.NOT_ENOUGH, CHRONON_COST));
      return;
    }
  }

  label = Text.translate(label)
  let yaw
  if (components.get("minecraft:custom_data").getUnsafe().contains("facing")) {
    yaw = components.get("minecraft:custom_data").getUnsafe().getInt("facing");
  } else {
    yaw = getEntryYaw(player);
  }

  // Open the Time Door
  let portal_spawned = trySpawnTimeDoor(
    label,
    level,
    player,
    target_pos,
    target_dimension,
    $Color.RAINBOW,
    getEntryYaw(player),
    yaw
  );

  if (is_survival && found && portal_spawned) {
    setChronon(found.stack, found.charge - CHRONON_COST, player);
  }

  event.cancel();
});

NativeEvents.onEvent("earth.terrarium.tempad.api.event.TimedoorEvent$Exit", (event) => {
  try {
    let entrance = event.entity.linkedPortalEntity;
    let exit = event.entity;
    entrance.placePortalTicket(entrance.blockPosition());
    exit.placePortalTicket(exit.blockPosition());
  } catch (error) {
    console.log(`\ntemppad.js TimedoorEvent$Enter error:\n${error}\nPlease Report this to FTB via Github Issues if you see this`);
  }
});
