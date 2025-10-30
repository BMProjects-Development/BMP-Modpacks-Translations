// KubeJS 7, MC 1.21.x
// server_scripts/handlers/structure_compass_finder.js

(function () {
  'use strict';

  // ---------- Java imports ----------
  var $Registries = Java.loadClass("net.minecraft.core.registries.Registries");
  var $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
  var $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey");
  var $BlockPos = Java.loadClass("net.minecraft.core.BlockPos");
  var $ResourceLocationArgument = Java.loadClass("net.minecraft.commands.arguments.ResourceLocationArgument");
  var $TagKey = Java.loadClass("net.minecraft.tags.TagKey");

  // ---------- Config ----------
  var SEARCH_RADIUS = 5000;

  // Optional fixed-location overrides
  var STRUCTURE_OVERRIDES = {
    // General Structures
    "ftb:healing_spring":{x: -5,  y: 127, z: -151, nameKey: "ftb.structure.healing_spring" },
    "ftb:arcane_grove":  {x: 558, y: 100, z: 511,  nameKey: "ftb.structure.arcane_grove"},
    // Boss Arenas
    "ftb:chesed_arena":  {x: -128,   y: 132, z: 1872, nameKey: "ftb.structure.chesed_arena"},
    "ftb:malkuth_arena": {x: 3680, y: 132, z: 1248, nameKey: "ftb.structure.malkuth_arena"},
    // Vaults
    "ftb:vault/create": {x: 256,  y: 131, z: -784, nameKey: "ftb.structure.vault.create"},
    "ftb:vault/portal": {x: -628, y: 163, z: 438,  nameKey: "ftb.structure.vault.portal"},
    "ftb:vault/mffs":   {x: 937,  y: 129, z: -77, nameKey: "ftb.structure.vault.mffs"},
    "ftb:vault/jockey_north": {x: 20, y: 139, z: -1704, nameKey: "ftb.structure.vault.jockey_north"},
    "ftb:vault/jockey_south": {x: 19, y: 140, z: 1744,  nameKey: "ftb.structure.vault.jockey_south"},
    "ftb:vault/burning_disco":   {x: -192,  y: 163, z: -1208, nameKey: "ftb.structure.vault.burning_disco"},
    "ftb:vault/twilight/lich":   {x: 2203,  y: 132, z: 17,     nameKey: "ftb.structure.vault.twilight.lich"},
    "ftb:vault/twilight/yeti":   {x: -1435, y: 202, z: 1731,  nameKey: "ftb.structure.vault.twilight.yeti"},
    "ftb:vault/twilight/hydra":  {x: -1799, y: 54, z: -1429, nameKey: "ftb.structure.vault.twilight.hydra"},
    "ftb:vault/twilight/knight": {x: -230,   y: 144, z: -2209, nameKey: "ftb.structure.vault.twilight.knight"},
    "ftb:vault/twilight/snow_queen": {x: 1525, y: 180, z: 1684, nameKey: "ftb.structure.vault.twilight.snow_queen"},
    // NYI
    "ftb:vault/echoing_dread": {x: 0, y: 100, z: 0, nameKey: "ftb.structure.vault.echoing_dread"},
  };

  // ---------- Utils ----------
  function callOrGet(obj, name) {
    var v = obj[name];
    return (typeof v === "function") ? v.call(obj) : v;
  }
  function rlFromString(str) {
    try {
      if (typeof $ResourceLocation.parse === "function") return $ResourceLocation.parse(str);
      if (typeof $ResourceLocation.tryParse === "function") return $ResourceLocation.tryParse(str);
      return new $ResourceLocation(str); // last-resort
    } catch (_e) { return null; }
  }
  // RL → "namespace:path" (avoid toString())
  function rlToId(rl) {
    if (!rl) return null;
    var ns =
      (typeof rl.getNamespace === "function") ? rl.getNamespace() :
      (typeof rl.namespace === "function") ? rl.namespace() : rl.namespace;
    var path =
      (typeof rl.getPath === "function") ? rl.getPath() :
      (typeof rl.path === "function") ? rl.path() : rl.path;
    if (ns != null && path != null) return String(ns + ":" + path);
    try { return String(rl + ""); } catch (_e) { return null; }
  }
  function structureNameKeyFromRL(rl) {
    var ns =
      (typeof rl.getNamespace === "function") ? rl.getNamespace() :
      (typeof rl.namespace === "function") ? rl.namespace() : rl.namespace;
    var path =
      (typeof rl.getPath === "function") ? rl.getPath() :
      (typeof rl.path === "function") ? rl.path() : rl.path;
    return "structure." + ns + "." + path;
  }
  function pathOf(rl) {
    return (typeof rl.getPath === "function") ? rl.getPath() :
           (typeof rl.path === "function") ? rl.path() : rl.path;
  }
  function nsOf(rl) {
    return (typeof rl.getNamespace === "function") ? rl.getNamespace() :
           (typeof rl.namespace === "function") ? rl.namespace() : rl.namespace;
  }
  function makeRL(ns, path) {
    var s = ns + ":" + path;
    try {
      if (typeof $ResourceLocation.parse === "function") return $ResourceLocation.parse(s);
      if (typeof $ResourceLocation.tryParse === "function") return $ResourceLocation.tryParse(s);
      return new $ResourceLocation(s);
    } catch (_e) { return null; }
  }

  /** Resolve base ServerLevel via Team Bases (your exact class path). */
  function getBaseLevel(player) {
    var TBBaseInstanceManager = Java.loadClass("dev.ftb.mods.ftbteambases.data.bases.BaseInstanceManager");

    var manager = TBBaseInstanceManager.get(player.server);
    if (!manager) { player.tell(Text.translate("ftb.compass.error.invalid_tbm").red()); return null; }

    var baseOpt = manager.getBaseForPlayer(player);
    if (!baseOpt || !baseOpt.isPresent()) { player.tell(Text.translate("ftb.compass.error.no_base").red()); return null; }

    var base = baseOpt.get();
    var dimKey = callOrGet(base, "dimension");                // ResourceKey<Level>
    if (!dimKey) { player.tell(Text.translate("ftb.compass.error.invalid_dim_key").red()); return null; }

    var dimLoc = callOrGet(dimKey, "location");               // ResourceLocation
    if (!dimLoc) { player.tell(Text.translate("ftb.compass.error.invalid_dim_location").red()); return null; }

    var level  = player.server.getLevel(dimLoc);              // RL overload
    if (!level) { player.tell(Text.translate("ftb.compass.error.dimension_not_loaded").red()); return null; }

    var dimId = rlToId(dimLoc);
    if (!dimId) { player.tell(Text.translate("ftb.compass.error.dimension_id").red()); return null; }

    return { base: base, level: level, dimId: dimId };
  }

  /** Current ServerLevel + dim id. */
  function getHereLevel(player) {
    var level  = player.level;
    var dimKey = callOrGet(level, "dimension");
    if (!dimKey) return null;
    var dimLoc = callOrGet(dimKey, "location");
    if (!dimLoc) return null;
    var dimId = rlToId(dimLoc);
    if (!dimId) return null;
    return { level: level, dimId: dimId };
  }

/** Give lodestone compass pointed at pos in dimId, with localized lore. */
function giveCompass(player, translatableKey, pos, dimId) {
  var customNameJson = JSON.stringify({
    translate: "ftb.compass.locator",
    with: [{ translate: translatableKey }]
  }).replace(/'/g, "\\'");

  var loreEntry = JSON.stringify({ translate: "ftb.compass.lore.teleport_hint" }).replace(/'/g, "\\'");

  // Pos as int list
  var posArray = pos.getX() + "," + pos.getY() + "," + pos.getZ();

  var cmd =
    "give " + player.username + " minecraft:compass[" +
      "minecraft:custom_name='" + customNameJson + "'," +
      "minecraft:lore=['" + loreEntry + "']," +                // <-- list, not a quoted array
      "minecraft:custom_data={can_spawn_timedoor:{}}," +
      "minecraft:lodestone_tracker={tracked:false,target:{dimension:\"" + dimId + "\",pos:[I;" + posArray + "]}}" +
    "]";

  player.server.runCommand(cmd);
}



  /** Map a *structure* id -> list of *structure set* RLs that contain it. */
  function findStructureSetIds(server, structureIdRL) {
    var out = [];
    var targetId = rlToId(structureIdRL);
    if (!targetId) return out;

    var setLookup = server.registryAccess().lookupOrThrow($Registries.STRUCTURE_SET);

    setLookup.listElements().forEach(function (setHolder) {
      try {
        var setVal = callOrGet(setHolder, "value"); // StructureSet
        var entries = callOrGet(setVal, "structures") || callOrGet(setVal, "entries");
        var matched = false;

        if (entries && typeof entries.size === "function" && typeof entries.get === "function") {
          for (var i = 0; i < entries.size(); i++) {
            var entry = entries.get(i);
            var sHolder = callOrGet(entry, "structure") || callOrGet(entry, "holder");
            if (!sHolder) continue;
            var sKey = callOrGet(sHolder, "key");
            if (!sKey) continue;
            var sLoc = callOrGet(sKey, "location");
            var sId = rlToId(sLoc);
            if (sId && sId === targetId) { matched = true; break; }
          }
        }

        if (matched) {
          var setKey = callOrGet(setHolder, "key");
          var setLoc = setKey ? callOrGet(setKey, "location") : null;
          if (setLoc) out.push(setLoc);
        }
      } catch (_e) { /* skip */ }
    });

    return out;
  }

  /** Heuristic set ids when the mod uses slashes (e.g. ftb:dungeons/stone). */
  function buildSetCandidates(structureRL) {
    var out = [];
    var ns = nsOf(structureRL);
    var p  = pathOf(structureRL) || "";

    var idx = p.indexOf("/");
    if (idx > 0) { var rl1 = makeRL(ns, p.substring(0, idx)); if (rl1) out.push(rl1); }
    if (p.indexOf("/") >= 0) {
      var rl2 = makeRL(ns, p.replace(/\//g, "_")); if (rl2) out.push(rl2);
      var rl3 = makeRL(ns, p.replace(/\//g, "-")); if (rl3) out.push(rl3);
    }

    // Dedupe
    var seen = {}, uniq = [];
    for (var i = 0; i < out.length; i++) {
      var id = rlToId(out[i]);
      if (id && !seen[id]) { seen[id] = 1; uniq.push(out[i]); }
    }
    return uniq;
  }

  /** Tag fallback: ns + prefix before the first slash -> TagKey<Structure> like #ftb:dungeons */
  function buildTagFallback(structureRL) {
    var p = pathOf(structureRL) || "";
    var idx = p.indexOf("/");
    if (idx <= 0) return null; // nothing to tagify
    var ns = nsOf(structureRL);
    var tagRL = rlFromString(ns + ":" + p.substring(0, idx));
    if (!tagRL) return null;
    try {
      return $TagKey.create($Registries.STRUCTURE, tagRL);
    } catch (_e) {
      return null;
    }
  }

  /** Search using ID overload; if nothing, try structure-set ids (registry → heuristics) → TAG fallback. */
  function searchAndGive(player, idRL, level, origin, dimId) {
    var found = level.findNearestMapStructure(idRL, origin, SEARCH_RADIUS, false);

    if (!found) {
      // Try actual structure-set registry matches
      var fromSets = findStructureSetIds(player.server, idRL);
      for (var i = 0; i < fromSets.length && !found; i++) {
        found = level.findNearestMapStructure(fromSets[i], origin, SEARCH_RADIUS, false);
      }
      // Heuristics as a next step (covers slashy paths)
      if (!found) {
        var candidates = buildSetCandidates(idRL);
        for (var j = 0; j < candidates.length && !found; j++) {
          found = level.findNearestMapStructure(candidates[j], origin, SEARCH_RADIUS, false);
        }
      }
      // Final fallback: try a STRUCTURE TAG derived from prefix (e.g. #ftb:dungeons)
      if (!found) {
        var tag = buildTagFallback(idRL);
        if (tag) {
          found = level.findNearestMapStructure(tag, origin, SEARCH_RADIUS, false);
        }
      }
    }

    if (!found) {
      player.tell(Text.translate("ftb.compass.error.none_near", rlToId(idRL), SEARCH_RADIUS));
      return 0;
    }

    var nameKey = structureNameKeyFromRL(idRL);
    giveCompass(player, nameKey, found, dimId);
    player.tell(Text.translate("ftb.compass.granted", Text.translate(nameKey)));
    return 1;
  }

  /** Locate in player's BASE dimension. */
  function locateInBase(player, idRL) {
    var baseInfo = getBaseLevel(player);
    if (!baseInfo) return 0;

    var level = baseInfo.level;
    var dimId = baseInfo.dimId;

    // Overrides first
    var ov = STRUCTURE_OVERRIDES[rlToId(idRL)];
    if (ov) {
      var posOv = new $BlockPos(ov.x, ov.y, ov.z);
      giveCompass(player, ov.nameKey || structureNameKeyFromRL(idRL), posOv, dimId);
      player.tell(Text.translate("ftb.compass.granted", Text.translate(ov.nameKey || structureNameKeyFromRL(idRL))));
      return 1;
    }

    // Validate structure id exists (friendlier error)
    var lookup = player.server.registryAccess().lookupOrThrow($Registries.STRUCTURE);
    var key = $ResourceKey.create($Registries.STRUCTURE, idRL);
    var optHolder = lookup.get(key);
    if (!optHolder || !optHolder.isPresent()) {
      player.tell(Text.translate("ftb.compass.error.not_found", rlToId(idRL)));
      return 0;
    }

    // Origin: if you're already in the base world use your pos, else that world's spawn
    var here = getHereLevel(player);
    var origin = (here && here.dimId === dimId)
      ? (function () { var p = player.blockPosition(); return new $BlockPos(p.getX(), p.getY(), p.getZ()); })()
      : level.getSharedSpawnPos();

    return searchAndGive(player, idRL, level, origin, dimId);
  }

  /** Locate in the CURRENT dimension (debug/utility). */
  function locateHere(player, idRL) {
    var here = getHereLevel(player);
    if (!here) { player.tell(Text.translate("ftb.compass.error.invalid_dim").red()); return 0; }

    // Overrides first
    var ov = STRUCTURE_OVERRIDES[rlToId(idRL)];
    if (ov) {
      var posOv = new $BlockPos(ov.x, ov.y, ov.z);
      giveCompass(player, ov.nameKey || structureNameKeyFromRL(idRL), posOv, here.dimId);
      player.tell(Text.translate("ftb.compass.granted", Text.translate(ov.nameKey || structureNameKeyFromRL(idRL))));
      return 1;
    }

    // Validate structure id exists
    var lookup = here.level.server.registryAccess().lookupOrThrow($Registries.STRUCTURE);
    var key = $ResourceKey.create($Registries.STRUCTURE, idRL);
    var optHolder = lookup.get(key);
    if (!optHolder || !optHolder.isPresent()) {
      player.tell(Text.translate("ftb.compass.error.not_found", rlToId(idRL)));
      return 0;
    }

    var p = player.blockPosition();
    var origin = new $BlockPos(p.getX(), p.getY(), p.getZ());
    return searchAndGive(player, idRL, here.level, origin, here.dimId);
  }

  // ---------- /compass command ----------
  ServerEvents.commandRegistry(function (event) {
    var root = event.commands.literal("compass").requires(function (src) {
      return src.hasPermission(2); // OP only
    });

    // /compass locate <namespace:id>  -> BASE dimension
    root.then(
      event.commands.literal("locate")
        .then(
          event.commands.argument("structure", $ResourceLocationArgument.id())
            .executes(function (ctx) {
              var src = ctx.source;
              var player = src.player;
              if (!player) {
                if (src.sendFailure) src.sendFailure(Text.translate("ftb.compass.error.player_only"));
                return 0;
              }
              var id = $ResourceLocationArgument.getId(ctx, "structure");
              return locateInBase(player, id);
            })
        )
    );

    // /compass locate_here <namespace:id> -> CURRENT dimension (sanity check)
    root.then(
      event.commands.literal("locate_here")
        .then(
          event.commands.argument("structure", $ResourceLocationArgument.id())
            .executes(function (ctx) {
              var src = ctx.source;
              var player = src.player;
              if (!player) {
                if (src.sendFailure) src.sendFailure(Text.translate("ftb.compass.error.player_only"));
                return 0;
              }
              var id = $ResourceLocationArgument.getId(ctx, "structure");
              return locateHere(player, id);
            })
        )
    );

    event.register(root);
  });

})(); // end IIFE
