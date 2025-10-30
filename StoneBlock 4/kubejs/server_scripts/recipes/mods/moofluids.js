// server_scripts: cow_transmutation.js

// ---- Weighted + generic fluid selection helpers ----
const pickFromWeighted = function (entries) {
  // entries: [{ id: "ns:fluid", weight: 10 }, ...]
  var total = 0;
  for (var i = 0; i < entries.length; i++) {
    var w = entries[i].weight || 0;
    if (w > 0) total += w;
  }
  if (total <= 0) return null;
  var r = Math.random() * total;
  for (var j = 0; j < entries.length; j++) {
    var wj = entries[j].weight || 0;
    if (wj <= 0) continue;
    if (r < wj) return entries[j].id;
    r -= wj;
  }
  return entries[entries.length - 1].id;
};

const pickFluidFromRule = function (rule) {
  // Supports: {fluid}, {fluids:[...]}, {weighted:[{id,weight},...]}
  if (rule.fluid) return rule.fluid;

  if (rule.weighted && rule.weighted.length > 0) {
    var chosen = pickFromWeighted(rule.weighted);
    if (chosen) return chosen;
  }

  if (rule.fluids && rule.fluids.length > 0) {
    var idx = Math.floor(Math.random() * rule.fluids.length);
    return rule.fluids[idx];
  }

  return null;
};

// --- Shared helper: wiggle → explode → discard → spawn target fluid cow ---
const transmuteCow = function (
  event,
  cow,
  targetFluidId,
  startMsgKey,
  completeMsgKey
) {
  const SoundEvents = Java.loadClass("net.minecraft.sounds.SoundEvents");
  const SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource");

  // Start SFX + message
  event.player.level.playSound(
    null,
    event.player.x,
    event.player.y,
    event.player.z,
    SoundEvents.ZOMBIE_VILLAGER_CURE,
    SoundSource.PLAYERS,
    1.0,
    1.0
  );
  event.player.tell(Text.translate(startMsgKey));

  // Capture start pos
  const x = cow.x;
  const y = cow.y;
  const z = cow.z;

  // Wiggle
  const wiggleTicks = 160;
  for (let i = 0; i < wiggleTicks; i++) {
    event.level.server.scheduleInTicks(i, (_) => {
      const offsetX = (Math.random() - 0.5) * 0.4;
      const offsetZ = (Math.random() - 0.5) * 0.4;
      const offsetY = Math.sin((i / wiggleTicks) * Math.PI) * 0.4;
      cow.setPos(x + offsetX, y + offsetY, z + offsetZ);

      event.level.spawnParticles(
        "minecraft:dragon_breath",
        true,
        x,
        y + 1,
        z,
        0.3,
        0.3,
        0.3,
        3,
        0.05
      );
    });
  }

  // Transform
  event.level.server.scheduleInTicks(wiggleTicks, (_) => {
    const ex = cow.x;
    const ey = cow.y + 0.1;
    const ez = cow.z;

    // Explosion without terrain damage. Fallback to instant TNT if needed.
    try {
      event.level.explode(cow, ex, ey, ez, 1.0, false, "none");
    } catch (e) {
      event.server.runCommandSilent(
        "summon tnt " +
          ex.toFixed(2) +
          " " +
          ey.toFixed(2) +
          " " +
          ez.toFixed(2) +
          " {Fuse:0b}"
      );
    }

    cow.discard();

    // Spawn baby cow after the boom resolves
    event.level.server.scheduleInTicks(2, (_) => {
      let fluidCow = event.level.createEntity("moofluids:fluid_cow");
      fluidCow.setPos(ex, ey, ez);
      fluidCow.mergeNbt({ FluidRegistryName: targetFluidId, Age: -6000 });
      fluidCow.spawn();

      // Particles + SFX
      event.level.spawnParticles(
        "minecraft:heart",
        true,
        ex,
        ey + 1,
        ez,
        0.5,
        0.5,
        0.5,
        10,
        0.5
      );
      event.level.spawnParticles(
        "minecraft:smoke",
        true,
        ex,
        ey + 0.5,
        ez,
        0.5,
        0.5,
        0.5,
        20,
        0.05
      );
      event.level.spawnParticles(
        "minecraft:happy_villager",
        true,
        ex,
        ey + 0.5,
        ez,
        0.5,
        0.5,
        0.5,
        10,
        0.1
      );

      event.player.level.playSound(
        null,
        event.player.x,
        event.player.y,
        event.player.z,
        SoundEvents.ELDER_GUARDIAN_CURSE,
        SoundSource.PLAYERS,
        1.0,
        1.0
      );

      // Friendly fluid name for message
      var nice =
        targetFluidId.indexOf(":") >= 0
          ? targetFluidId.split(":")[1]
          : targetFluidId;
      if (nice.indexOf("molten_") === 0)
        nice = nice.substring("molten_".length);
      nice = nice.split("_")[0];
      if (nice.length > 0) nice = nice.charAt(0).toUpperCase() + nice.slice(1);

      event.player.tell(Text.translate(completeMsgKey, [nice]).gold());
      console.log("Spawned baby FluidCow with fluid: " + targetFluidId);
    });
  });
};

// ---- Single universal cow interaction ----
ItemEvents.entityInteracted(function (event) {
  // Server side only and main hand only to avoid double fire
  if (event.level.isClientSide()) return;
  if (String(event.hand || "") !== "MAIN_HAND") return;

  if (event.target.type !== "minecraft:cow") return;
  if (!event.item || event.item.empty) return;

  // Prevent multi-feed: lock the cow after first valid feed
  var cow = event.target;
  var lockKey = "ftb_transmute_locked";
  if (cow.persistentData.getBoolean(lockKey)) {
    event.player.tell(Text.translate("ftb.clapple.transmutation.in_progress"));
    return;
  }

  var id = String(event.item.id);
  var matched = null;
  for (var i = 0; i < global.COW_TRANSMUTE_RULES.length; i++) {
    if (global.COW_TRANSMUTE_RULES[i].item === id) {
      matched = global.COW_TRANSMUTE_RULES[i];
      break;
    }
  }
  if (!matched) return;

  var fluidOut = pickFluidFromRule(matched);
  if (!fluidOut) return;

  // Lock immediately to avoid any race with fast clicks or multiple players
  cow.persistentData.putBoolean(lockKey, true);

  // consume the item unless creative
  if (!event.player.isCreative()) {
    event.item.count--;
  }

  transmuteCow(
    event,
    cow,
    fluidOut,
    "ftb.clapple.transmutation.start",
    "ftb.clapple.transmutation.complete"
  );
});

// ---- MooFluids alloy breeding recipe generation (kept) ----
const cow_recipes = [
  {
    success_chance: 0.5,
    result: "productivemetalworks:molten_bronze",
    parent_1: "productivemetalworks:molten_copper",
    parent_2: "productivemetalworks:molten_tin",
  },
  {
    success_chance: 0.5,
    result: "productivemetalworks:molten_brass",
    parent_1: "productivemetalworks:molten_copper",
    parent_2: "productivemetalworks:molten_zinc",
  },
  {
    success_chance: 0.5,
    result: "ftb:molten_tin_silver_alloy",
    parent_1: "productivemetalworks:molten_tin",
    parent_2: "productivemetalworks:molten_silver",
  },
  {
    success_chance: 0.5,
    result: "ftb:molten_shibuichi",
    parent_1: "productivemetalworks:molten_silver",
    parent_2: "productivemetalworks:molten_copper",
  },
  {
    success_chance: 0.3,
    result: "productivemetalworks:molten_electrum",
    parent_1: "productivemetalworks:molten_silver",
    parent_2: "productivemetalworks:molten_gold",
  },
  {
    success_chance: 0.3,
    result: "productivemetalworks:molten_invar",
    parent_1: "productivemetalworks:molten_iron",
    parent_2: "productivemetalworks:molten_nickel",
  },
  {
    success_chance: 0.4,
    result: "productivemetalworks:molten_constantan",
    parent_1: "productivemetalworks:molten_copper",
    parent_2: "productivemetalworks:molten_nickel",
  },
  {
    success_chance: 0.15,
    result: "productivemetalworks:molten_iridium",
    parent_1: "productivemetalworks:molten_lead",
    parent_2: "productivemetalworks:molten_platinum",
  },
  {
    success_chance: 0.15,
    result: "productivemetalworks:molten_platinum",
    parent_1: "productivemetalworks:molten_silver",
    parent_2: "productivemetalworks:molten_lumium",
  },
  {
    success_chance: 0.25,
    result: "productivemetalworks:molten_steel",
    parent_1: "productivemetalworks:molten_iron",
    parent_2: "productivemetalworks:molten_carbon",
  },
  {
    success_chance: 0.25,
    result: "productivemetalworks:molten_glowstone",
    parent_1: "productivemetalworks:molten_electrum",
    parent_2: "productivemetalworks:molten_redstone",
  },
  {
    success_chance: 0.25,
    result: "productivemetalworks:molten_lumium",
    parent_1: "ftb:molten_tin_silver_alloy",
    parent_2: "productivemetalworks:molten_glowstone",
  },
  {
    success_chance: 0.25,
    result: "productivemetalworks:molten_glowstone",
    parent_1: "ftb:molten_tin_silver_alloy",
    parent_2: "productivemetalworks:molten_osmium",
  },
];

ServerEvents.recipes((event) => {
  for (var i = 0; i < cow_recipes.length; i++) {
    var cow = cow_recipes[i];
    event
      .custom({
        type: "moofluids:alloy",
        inputs: [cow.parent_1, cow.parent_2],
        success_chance: cow.success_chance,
        output: cow.result,
      })
      .id(
        "ftb:moofluids/cow_alloying/" + cow.result.split(":")[1].split("_")[1]
      );

    console.log(
      "Added a Cow Breeding Recipe for " +
        cow.result.split(":")[1].split("_")[1] +
        " [" +
        cow.parent_1 +
        ", " +
        cow.parent_2 +
        "]"
    );
  }
});

ItemEvents.entityInteracted(function (event) {
  // Server only + main hand
  if (event.level.isClientSide()) return;
  if (String(event.hand || "") !== "MAIN_HAND") return;

  // Must be a vanilla cow, fed with ftb:stable_antimatter
  if (event.target.type !== "minecraft:cow") return;
  if (!event.item || event.item.empty) return;
  if (String(event.item.id) !== "ftb:stable_antimatter") return;

  var level = event.level;
  var server = event.server;
  var player = event.player;
  var cow = event.target;

  var SoundEvents = Java.loadClass("net.minecraft.sounds.SoundEvents");
  var SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource");

  // Prevent double triggers
  var lockKey = "ftb_antimatter_locked";
  if (cow.persistentData.getBoolean(lockKey)) return;
  cow.persistentData.putBoolean(lockKey, true);

  // Consume item unless creative
  if (!player.isCreative()) {
    event.item.count--;
  }

  // Immediate tiny feedback so the click feels responsive
  level.spawnParticles("minecraft:soul_fire_flame", true, cow.x, cow.y + 0.9, cow.z, 0.2, 0.2, 0.2, 8, 0.0);
  player.level.playSound(null, cow.x, cow.y, cow.z, SoundEvents.COW_AMBIENT, SoundSource.PLAYERS, 0.9, 0.9 + Math.random() * 0.2);

  // === Helper: reliable item entity spawn ===
  function spawnItemEntity(idOrItem, count, x, y, z) {
    try {
      var it = count != null ? Item.of(idOrItem, count) : Item.of(idOrItem);
      var e = level.createEntity("minecraft:item");
      e.x = x;
      e.y = y;
      e.z = z;
      e.item = it;
      e.setDeltaMovement((Math.random() - 0.5) * 0.2, 0.2 + Math.random() * 0.15, (Math.random() - 0.5) * 0.2);
      e.spawn();
      return true;
    } catch (err) {
      console.log("[MEATsplosion] Failed to spawn item " + idOrItem + " x" + (count || 1) + ": " + err);
      return false;
    }
  }

  // === Helper: place meat blocks with fallbacks (air only) ===
  function placeMeatInAirAround(cx, cy, cz, placements, radius) {
    // If your placeable differs, add here; order matters.
    var candidateIds = [
      "productivemetalworks:meat",                // try plain block id
      "productivemetalworks:meat_block",         // alternative conventional block name
      "productivemetalworks:meat_fluid_block",   // fluid block variants
      "productivemetalworks:meat_fluid"
    ];

    var placed = 0;

    for (var n = 0; n < placements; n++) {
      var done = false;

      // Up to N attempts per placement to find air and a valid block id
      for (var tries = 0; tries < 16 && !done; tries++) {
        var theta = Math.random() * Math.PI * 2;
        var dist = Math.floor(1 + Math.random() * radius);
        var dx = Math.floor(cx + Math.cos(theta) * dist);
        var dz = Math.floor(cz + Math.sin(theta) * dist);
        var dy = Math.floor(cy - 2 + Math.random() * 5);

        var blk = level.getBlock(dx, dy, dz);
        if (!blk) continue;
        if (String(blk.id) !== "minecraft:air") continue;

        // Try candidates in order; also try level=0 state for fluids if supported
        for (var c = 0; c < candidateIds.length && !done; c++) {
          var id = candidateIds[c];

          // 1) plain id
          try {
            blk.set(id);
            done = true;
          } catch (e1) {
            // 2) level=0 (fluid/source) state if block supports it
            try {
              blk.set(id + "[level=0]");
              done = true;
            } catch (e2) {
              // ignore and continue to next candidate
            }
          }
        }

        if (done) {
          placed++;
          level.spawnParticles("minecraft:poof", true, dx + 0.5, dy + 0.6, dz + 0.5, 0.3, 0.3, 0.3, 6, 0.0);
        }
      }
    }

    console.log("[MEATsplosion] Meat blocks placed: " + placed + " (requested " + placements + ")");
    return placed;
  }

  // === Timings ===
  var ARM_DELAY = 40;   // ~2 seconds before title/charge
  var SHAKE_TICKS = 40; // ~2 seconds of shaking

  // Delay before the dramatic sequence starts
  level.server.scheduleInTicks(ARM_DELAY, function (_) {
    // Title: "Oh no..." via lang key
    try {
      server.runCommandSilent(
        "title " +
          player.username +
          ' title {"translate":"ftb.clapple.antimatter.title","color":"red","bold":true}'
      );
    } catch (eTitle) {
      player.tell(Text.translate("ftb.clapple.antimatter.title").red().bold());
    }

    // Initial particles and a loud moo
    level.spawnParticles("minecraft:angry_villager", true, cow.x, cow.y + 1, cow.z, 0.6, 0.6, 0.6, 25, 0.2);
    level.spawnParticles("minecraft:portal", true, cow.x, cow.y + 0.5, cow.z, 0.8, 0.8, 0.8, 40, 0.1);
    player.level.playSound(null, cow.x, cow.y, cow.z, SoundEvents.COW_AMBIENT, SoundSource.PLAYERS, 2.0, 0.75);

    // Shake the cow 2 seconds with lots of mooing
    for (var i = 0; i <= SHAKE_TICKS; i++) {
      (function (ii) {
        level.server.scheduleInTicks(ii, function (_) {
          // Jitter position slightly
          var ox = (Math.random() - 0.5) * 0.25;
          var oz = (Math.random() - 0.5) * 0.25;
          var oy = Math.sin((ii / SHAKE_TICKS) * Math.PI) * 0.12;
          try { cow.setPos(cow.x + ox, cow.y + oy, cow.z + oz); } catch (eMove) {}

          // Random moos
          if (Math.random() < 0.35) {
            player.level.playSound(null, cow.x, cow.y, cow.z, SoundEvents.COW_AMBIENT, SoundSource.PLAYERS, 1.5, 0.6 + Math.random() * 0.8);
          }

          // Charged particles
          level.spawnParticles("minecraft:electric_spark", true, cow.x, cow.y + 0.9, cow.z, 0.5, 0.6, 0.5, 6, 0.0);
          level.spawnParticles("minecraft:crit", true, cow.x, cow.y + 0.8, cow.z, 0.4, 0.4, 0.4, 4, 0.0);
        });
      })(i);
    }

    // Boom after shake
    level.server.scheduleInTicks(SHAKE_TICKS + 1, function (_) {
      var ex = cow.x;
      var ey = cow.y + 0.1;
      var ez = cow.z;

      // Explosion with no block damage
      try {
        level.explode(cow, ex, ey, ez, 2.6, false, "none");
      } catch (eExpl) {
        server.runCommandSilent("summon tnt " + ex.toFixed(2) + " " + ey.toFixed(2) + " " + ez.toFixed(2) + " {Fuse:0s}");
      }

      // Remove cow
      try { cow.discard(); } catch (eDisc) {}

      // Post-explosion particles + sounds
      level.spawnParticles("minecraft:explosion", true, ex, ey + 0.2, ez, 0.0, 0.0, 0.0, 1, 0.0);
      level.spawnParticles("minecraft:smoke", true, ex, ey + 0.4, ez, 1.2, 0.8, 1.2, 40, 0.02);
      player.level.playSound(null, ex, ey, ez, SoundEvents.GENERIC_EXPLODE, SoundSource.PLAYERS, 1.6, 1.0);
      player.level.playSound(null, ex, ey, ez, SoundEvents.COW_HURT, SoundSource.PLAYERS, 1.4, 0.5);

      // Slight delay so items/blocks aren't eaten by explosion cleanup
      level.server.scheduleInTicks(2, function (_) {
        // --- Items: 5–10 raw beef, 1 Everlasting Beef ---
        var beefCount = 5 + Math.floor(Math.random() * 6); // 5–10
        spawnItemEntity("minecraft:beef", beefCount, ex, ey, ez);
        spawnItemEntity("artifacts:everlasting_beef", 1, ex, ey, ez);

        // --- Meat blocks: 6–10 placements within radius 10 (air only) ---
        var meatPlacements = 6 + Math.floor(Math.random() * 5); // 6–10
        var radius = 10;
        placeMeatInAirAround(ex, ey, ez, meatPlacements, radius);

        // Gross flourish
        level.spawnParticles("minecraft:item_slime", true, ex, ey + 0.5, ez, 1.0, 0.8, 1.0, 24, 0.0);
      });
    });
  });
});

// --- Revert fluid cow back to a normal cow with a milk bucket ---
ItemEvents.entityInteracted(function (event) {
  // Server only + main hand to prevent double fires
  if (event.level.isClientSide()) return;
  if (String(event.hand || "") !== "MAIN_HAND") return;

  // Need a milk bucket in hand and a fluid cow target
  if (!event.item || event.item.empty) return;
  if (String(event.item.id) !== "minecraft:milk_bucket") return;
  if (event.target.type !== "moofluids:fluid_cow") return;

  const player = event.player;
  const level = event.level;
  const cow = event.target;

  const SoundEvents = Java.loadClass("net.minecraft.sounds.SoundEvents");
  const SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource");

  // Swap milk bucket -> empty bucket (unless creative)
  if (!player.isCreative()) {
    // Consume the milk bucket in hand
    event.item.count--;
    // Give an empty bucket back
    player.give("minecraft:bucket");
  }

  // Position before removing
  const x = cow.x;
  const y = cow.y;
  const z = cow.z;

  // Particles: happy + poof to sell the "cure" vibe
  level.spawnParticles("minecraft:happy_villager", true, x, y + 1, z, 0.6, 0.6, 0.6, 20, 0.25);
  level.spawnParticles("minecraft:poof", true, x, y + 0.6, z, 0.4, 0.4, 0.4, 10, 0.0);

  // Sound: villager cure chime
  player.level.playSound(
    null,
    x,
    y,
    z,
    SoundEvents.TOTEM_USE,
    SoundSource.PLAYERS,
    1.0,
    1.0
  );

  // Remove the fluid cow and spawn a vanilla cow
  cow.discard();

  let vanillaCow = level.createEntity("minecraft:cow");
  vanillaCow.setPos(x, y, z);
  // Ensure adult cow
  vanillaCow.mergeNbt({ Age: 0 });
  vanillaCow.spawn();

  // Notify player with a lang key
  player.tell(Text.translate("ftb.clapple.transmutation.reverted").green());

  console.log("Reverted a MooFluids Fluid Cow to a vanilla cow at " + x + ", " + y + ", " + z);
});
