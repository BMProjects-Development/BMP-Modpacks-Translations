// priority: 800

const $LootParams$Builder = Java.loadClass("net.minecraft.world.level.storage.loot.LootParams$Builder");
const $LootContextParams = Java.loadClass("net.minecraft.world.level.storage.loot.parameters.LootContextParams");
const $LootContextParamSets = Java.loadClass("net.minecraft.world.level.storage.loot.parameters.LootContextParamSets");

/**
 * Loot Bee Event
 * Spawns a glowing bee that periodically drops items from a tiered weighted table.
 * Supports bracket-style components (id[key=value,...]), JSON components (id{...}),
 * and raw/SNBT strings as a fallback. No changes needed to your loot_tables.js entries.
 */
const event_loot_bee = {
  name: "ftb:loot_bee",
  displayName: "Loot Bee Event",
  description: "A random Bee event that spawns a loot bee with a glowing effect.",
  chance: 0.4,
  stage: null,
  disableStage: null,

  size: 0,
  minDistance: 4,
  maxDistance: 8,

  maxRounds: Math.floor(Math.random() * 8 + 3), // 3..10
  delay: 60,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: false,
  commandSuggestions: [],

  /**
   * @param {Event} event
   * @param {Player} player
   * @param {Location} location
   */
  execute(event, player, location, name, options) {
    var level = player.getLevel();

    var bee = level.createEntity("minecraft:bee");
    bee.setPos(location.pos.x + 0.5, location.pos.y + 0.5, location.pos.z + 0.5);
    if (name) {
      bee.setCustomName(name);
      bee.setCustomNameVisible(true);
    }
    bee.glowing = true;
    bee.spawn();

    var bPData = bee.getPersistentData();
    bPData.maxRounds = this.maxRounds;
    bPData.rounds = 0;
    
    player.tell(Text.translate("ftb.event.loot_bee.spawned",location.pos.x, location.pos.y, location.pos.z))

    var selectedLootTable = getBeeLootTable(player);
    this.cycle(level.getServer(), bee, player, selectedLootTable);
  },

  cycle: function (server, entity, player, lootTable) {
    if (!entity.isAlive()) return;

    var bPData = entity.getPersistentData();
    if (bPData.rounds >= bPData.maxRounds) {
      player.tell(Text.translate("ftb.event.loot_bee.despawned"));
      entity.discard();
      return;
    }

    server.scheduleInTicks(this.delay, function () {
      spawnRandomItem(entity, lootTable);
      event_loot_bee.cycle(server, entity, player, lootTable);
    });
  }
};

// -------------------------
// Helpers for loot parsing
// -------------------------

/**
 * Parse bracket components from strings like:
 *   [ns:key=123L,other.key="val",flag=true]
 * Returns an object map of component keys to values.
 */
function _parseBracketComponents(bracketStr) {
  var comps = {};
  try {
    if (!bracketStr) return comps;
    if (bracketStr.charAt(0) !== "[" || bracketStr.charAt(bracketStr.length - 1) !== "]") return comps;

    var inner = bracketStr.substring(1, bracketStr.length - 1);

    var parts = [];
    var current = "";
    var inQuote = false;
    var i = 0;
    while (i < inner.length) {
      var ch = inner.charAt(i);
      if (ch === '"' || ch === "'") {
        if (inQuote === false) {
          inQuote = ch;
        } else if (inQuote === ch) {
          inQuote = false;
        }
        current += ch;
      } else if (ch === "," && !inQuote) {
        if (current.trim().length > 0) parts.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
      i++;
    }
    if (current.trim().length > 0) parts.push(current.trim());

    for (var j = 0; j < parts.length; j++) {
      var kv = parts[j];
      if (!kv) continue;
      var eq = kv.indexOf("=");
      if (eq < 0) continue;

      var key = kv.substring(0, eq).trim();
      var raw = kv.substring(eq + 1).trim();

      var val;
      if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
        val = raw.substring(1, raw.length - 1);
      } else if (raw.endsWith("L") || raw.endsWith("l")) {
        var numL = raw.substring(0, raw.length - 1);
        var nL = Number(numL);
        val = isNaN(nL) ? raw : nL;
      } else if (raw === "true" || raw === "false") {
        val = (raw === "true");
      } else if (!isNaN(Number(raw))) {
        val = Number(raw);
      } else {
        val = raw;
      }

      if (key.length > 0) comps[key] = val;
    }
  } catch (e) {
    console.log("[LootBee] _parseBracketComponents error: " + e);
  }
  return comps;
}

/**
 * Make an ItemStack from a string that may include
 * - bracket components:  id[key=value,...]
 * - JSON components:     id{ ... }
 * - or be a raw/SNBT string.
 */
function makeStackFromEntryString(s) {
  try {
    // Bracket components id[...]
    var idxB = s.indexOf("[");
    if (idxB > 0 && s.endsWith("]")) {
      var idB = s.substring(0, idxB);
      var compStr = s.substring(idxB);
      var compObj = _parseBracketComponents(compStr);
      var stB = Item.of(idB);
      for (var k in compObj) {
        if (Object.prototype.hasOwnProperty.call(compObj, k)) {
          stB = stB.withComponent(k, compObj[k]);
        }
      }
      return stB;
    }

    // JSON components id{...}
    var idxJ = s.indexOf("{");
    if (idxJ > 0) {
      var idJ = s.substring(0, idxJ);
      var jsonStr = s.substring(idxJ);
      try {
        var comp = JSON.parse(jsonStr);
        var stJ = Item.of(idJ);
        for (var key in comp) {
          if (Object.prototype.hasOwnProperty.call(comp, key)) {
            stJ = stJ.withComponent(key, comp[key]);
          }
        }
        return stJ;
      } catch (jsonErr) {
        // fall through to SNBT/legacy parsing
      }
    }

    // Raw or SNBT fallback (let KubeJS parse)
    return Item.of(s);
  } catch (e) {
    console.log("[LootBee] makeStackFromEntryString fatal parse error for: " + s);
    console.log(e);
    return Item.of("minecraft:stone");
  }
}

/**
 * Handles both plain strings and objects { entry, weight } from your loot_tables.js.
 * Returns an ItemStack.
 */
function makeStackFromWeightedChoice(chosen) {
  try {
    if (chosen == null) return Item.of("minecraft:stone");
    if (typeof chosen === "string") return makeStackFromEntryString(chosen);
    if (typeof chosen.entry === "string") return makeStackFromEntryString(chosen.entry);
    return Item.of(chosen);
  } catch (e) {
    console.log("[LootBee] makeStackFromWeightedChoice error: " + e);
    return Item.of("minecraft:stone");
  }
}

// ---------------
// Existing logic
// ---------------

function getBeeLootTable(player) {
  var stages = player.stages.getAll();
  if (stages.contains("ftb:bee_1")) return lootTable.bee_1;
  if (stages.contains("ftb:bee_2")) return lootTable.bee_2;
  if (stages.contains("ftb:bee_3")) return lootTable.bee_3;
  return lootTable.bee_1;
}

function spawnRandomItem(bee, lootTable) {
  var chosen = Ku.Lists.getEntryBasedOnWeight(lootTable);
  var stack = makeStackFromWeightedChoice(chosen);

  var itemEntity = bee.getLevel().createEntity("item");
  itemEntity.setItem(stack); // required for 1.20.5+
  itemEntity.setPos(bee.getX(), bee.getY(), bee.getZ());
  itemEntity.glowing = true;
  itemEntity.spawn();

  var pdata = bee.getPersistentData();
  var prev = 0;
  try {
    prev = pdata["rounds"] && pdata["rounds"].getAsInt ? pdata["rounds"].getAsInt() : pdata["rounds"] || 0;
  } catch (_) {
    prev = pdata["rounds"] || 0;
  }
  pdata.rounds = prev + 1;

  try {
    var id = stack.id || (stack.getId && stack.getId()) || "<unknown>";
    console.log("[LootBee] Dropped " + id);
  } catch (_) {}
}
