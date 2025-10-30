// server_scripts/handlers/codex_glyph.js (or random_ars_glyph.js)

const $CapabilityRegistry = Java.loadClass("com.hollingsworth.arsnouveau.setup.registry.CapabilityRegistry");

// Target items (runtime-checked)
const CODEX_IDS = {
  "ftb:codex_glyph_1": true,
  "ftb:codex_glyph_2": true,
  "ftb:codex_glyph_3": true
};

// Tiny weighted picker
function pickWeighted(entries) {
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
    if (r < wj) return entries[j].entry;
    r -= wj;
  }
  return entries[entries.length - 1].entry;
}

ItemEvents.rightClicked((event) => {
  // server + main hand only
  if (event.level.isClientSide()) return;
  if (String(event.hand || "") !== "MAIN_HAND") return;

  var itm = event.item;
  if (!itm) return;
  var id = String(itm.id || "");
  if (!CODEX_IDS[id]) return;

  var player = event.player;
  var playerCap = $CapabilityRegistry.getPlayerDataCap(player);

  // Build & sanitize pool
  var pool = getArsGlyphLootTable(id);

  pool = pool.filter(function (g) {
    try {
      var it = Item.of(g.entry);
      if (!it || it.isEmpty()) {
        console.warn("[codex] Unknown glyph item id: " + g.entry);
        return false;
      }
      var part = it.item ? it.item.spellPart : null;
      if (!part) {
        console.warn("[codex] No spellPart on glyph item: " + g.entry);
        return false;
      }
      return !playerCap.knowsGlyph(part);
    } catch (e) {
      console.warn("[codex] Error inspecting glyph " + g.entry + ": " + e);
      return false;
    }
  });

  if (pool.length === 0) {
    player.giveExperiencePoints(55);
    player.tell(Text.translate("ftb.codex.glyph.nomore").red());
    return;
  }

  if (!player.isCreative()) itm.count--;

  var pickedId = pickWeighted(pool);
  if (!pickedId) {
    console.warn("[codex] Weighted pick returned null; pool size: " + pool.length);
    return;
  }

  var pickedItem = Item.of(pickedId);
  if (!pickedItem || pickedItem.isEmpty() || !(pickedItem.item && pickedItem.item.spellPart)) {
    console.warn("[codex] Picked invalid glyph id: " + pickedId);
    return;
  }

  playerCap.unlockGlyph(pickedItem.item.spellPart);
  $CapabilityRegistry.EventHandler.syncPlayerCap(player);
  player.tell(Text.translate("ftb.codex.glyph.unlock", [pickedItem.displayName]).green());
});

function getArsGlyphLootTable(itemId) {
  switch (itemId) {
    case "ftb:codex_glyph_1": return codex_tier_1;
    case "ftb:codex_glyph_2": return codex_tier_2;
    case "ftb:codex_glyph_3": return codex_tier_3;
    default: return codex_tier_1;
  }
}
// ---------------------------
// Tier 1: Expanded + tuned weights
// ---------------------------
const codex_tier_1 = [
  // Core / building / utility
  { weight: 12, entry: "ars_nouveau:glyph_break" },
  { weight: 12, entry: "ars_nouveau:glyph_harvest" },
  { weight: 12, entry: "ars_nouveau:glyph_place_block" },
  { weight: 12, entry: "ars_nouveau:glyph_pickup" },
  { weight: 12, entry: "ars_nouveau:glyph_cut" },
  { weight: 12, entry: "ars_nouveau:glyph_craft" },
  { weight: 12, entry: "ars_nouveau:glyph_light" },

  // Movement / handy
  { weight: 10, entry: "ars_nouveau:glyph_rotate" },
  { weight: 10, entry: "ars_nouveau:glyph_prestidigitation" },
  { weight: 10, entry: "ars_nouveau:glyph_leap" },
  { weight: 10, entry: "ars_nouveau:glyph_launch" },
  { weight: 10, entry: "ars_nouveau:glyph_bounce" },
  { weight: 10, entry: "ars_nouveau:glyph_gust" },
  { weight: 10, entry: "ars_nouveau:glyph_wind_burst" },
  { weight: 10, entry: "ars_nouveau:glyph_toss" },

  // Control / early power
  { weight: 8, entry: "ars_nouveau:glyph_phantom_block" },
  { weight: 8, entry: "ars_nouveau:glyph_snare" },
  { weight: 8, entry: "ars_nouveau:glyph_pull" },
  { weight: 8, entry: "ars_nouveau:glyph_delay" },
  { weight: 8, entry: "ars_nouveau:glyph_randomize" },
  { weight: 8, entry: "ars_nouveau:glyph_ignite" },

  // Elemental / situational
  { weight: 6, entry: "ars_nouveau:glyph_bubble" },
  { weight: 6, entry: "ars_nouveau:glyph_burst" },
  { weight: 6, entry: "ars_nouveau:glyph_cold_snap" },
  { weight: 6, entry: "ars_nouveau:glyph_freeze" },
  { weight: 6, entry: "ars_nouveau:glyph_evaporate" },
  { weight: 6, entry: "ars_nouveau:glyph_fell" },
  { weight: 6, entry: "ars_nouveau:glyph_rune" },
  { weight: 6, entry: "ars_nouveau:glyph_underfoot" },

  // Uncommon / specialty
  { weight: 4, entry: "ars_nouveau:glyph_dispel" },
  { weight: 4, entry: "ars_nouveau:glyph_summon_steed" },
  { weight: 4, entry: "ars_nouveau:glyph_summon_wolves" },

  // New filters from Ars Elemental, slightly rarer than most existing entries
  { weight: 3, entry: "ars_elemental:glyph_aerial_filter" },
  { weight: 3, entry: "ars_elemental:glyph_aquatic_filter" },
  { weight: 3, entry: "ars_elemental:glyph_fiery_filter" },
  { weight: 3, entry: "ars_elemental:glyph_insect_filter" },
  { weight: 3, entry: "ars_elemental:glyph_not_aerial_filter" },
  { weight: 3, entry: "ars_elemental:glyph_not_aquatic_filter" },
  { weight: 3, entry: "ars_elemental:glyph_not_insect_filter" },
  { weight: 3, entry: "ars_elemental:glyph_not_fiery_filter" },
  { weight: 3, entry: "ars_elemental:glyph_not_summon_filter" },
  { weight: 3, entry: "ars_elemental:glyph_not_undead_filter" },
  { weight: 3, entry: "ars_elemental:glyph_summon_filter" },
  { weight: 3, entry: "ars_elemental:glyph_undead_filter" }
];

// ---------------------------
// Tier 2: Expanded + tuned weights
// ---------------------------
const codex_tier_2 = [
  // Common modifiers / QoL
  { weight: 12, entry: "ars_nouveau:glyph_aoe" },
  { weight: 12, entry: "ars_nouveau:glyph_pierce" },
  { weight: 12, entry: "ars_nouveau:glyph_extend_time" },
  { weight: 12, entry: "ars_nouveau:glyph_duration_down" },
  { weight: 12, entry: "ars_nouveau:glyph_dampen" },
  { weight: 12, entry: "ars_nouveau:glyph_accelerate" },
  { weight: 12, entry: "ars_nouveau:glyph_decelerate" },

  // Frequent utility
  { weight: 10, entry: "ars_nouveau:glyph_smelt" },
  { weight: 10, entry: "ars_nouveau:glyph_crush" },
  { weight: 10, entry: "ars_nouveau:glyph_extract" },
  { weight: 10, entry: "ars_nouveau:glyph_grow" },
  { weight: 10, entry: "ars_nouveau:glyph_slowfall" },

  // Solid combat/utility
  { weight: 8, entry: "ars_nouveau:glyph_wind_shear" },
  { weight: 8, entry: "ars_nouveau:glyph_flare" },
  { weight: 8, entry: "ars_nouveau:glyph_exchange" },
  { weight: 8, entry: "ars_nouveau:glyph_fortune" },
  { weight: 8, entry: "ars_nouveau:glyph_gravity" },

  // Uncommon / situational
  { weight: 6, entry: "ars_nouveau:glyph_cold_snap" },
  { weight: 6, entry: "ars_nouveau:glyph_infuse" },
  { weight: 6, entry: "ars_nouveau:glyph_name" },
  { weight: 6, entry: "ars_nouveau:glyph_sense_magic" },
  { weight: 6, entry: "ars_nouveau:glyph_ender_inventory" },

  // Rare / powerful
  { weight: 4, entry: "ars_nouveau:glyph_heal" },
  { weight: 4, entry: "ars_nouveau:glyph_invisibility" },
  { weight: 4, entry: "ars_nouveau:glyph_explosion" },

  // New Ars Elemental entries, slightly rarer than most existing entries
  { weight: 3, entry: "ars_elemental:glyph_arc_projectile" },
  { weight: 3, entry: "ars_elemental:glyph_bubble_shield" },
  { weight: 3, entry: "ars_elemental:glyph_charm" },
  { weight: 3, entry: "ars_elemental:glyph_discharge" },
  { weight: 3, entry: "ars_elemental:glyph_envenom" },
  { weight: 3, entry: "ars_elemental:glyph_phantom_grasp" },
  { weight: 3, entry: "ars_elemental:glyph_poison_spores" },
  { weight: 3, entry: "ars_elemental:glyph_spike" },
  { weight: 3, entry: "ars_elemental:glyph_watery_grave" },
  { weight: 3, entry: "ars_elemental:glyph_propagator_arc" }
];

// ---------------------------
// Tier 3: Expanded + tuned weights
// ---------------------------
const codex_tier_3 = [
  // Core advanced mobility/defense
  { weight: 12, entry: "ars_nouveau:glyph_blink" },
  { weight: 12, entry: "ars_nouveau:glyph_wall" },

  // Frequent high-impact combat
  { weight: 10, entry: "ars_nouveau:glyph_glide" },
  { weight: 10, entry: "ars_nouveau:glyph_burst" },
  { weight: 10, entry: "ars_nouveau:glyph_fangs" },
  { weight: 10, entry: "ars_nouveau:glyph_lightning" },

  // Control / shaping / meta
  { weight: 8, entry: "ars_nouveau:glyph_linger" },
  { weight: 8, entry: "ars_nouveau:glyph_orbit" },
  { weight: 8, entry: "ars_nouveau:glyph_split" },

  // Uncommon utility/control
  { weight: 6, entry: "ars_nouveau:glyph_hex" },
  { weight: 6, entry: "ars_nouveau:glyph_summon_decoy" },

  // Rare summons
  { weight: 3, entry: "ars_nouveau:glyph_summon_vex" },
  { weight: 3, entry: "ars_nouveau:glyph_summon_undead" },

  // Very rare / strong
  { weight: 2, entry: "ars_nouveau:glyph_wither" },
  { weight: 2, entry: "ars_nouveau:glyph_intangible" },
  { weight: 2, entry: "ars_nouveau:glyph_rewind" },

  // New Ars Elemental entries, slightly rarer than most existing entries
  { weight: 3, entry: "ars_elemental:glyph_homing_projectile" },
  { weight: 3, entry: "ars_elemental:glyph_conflagrate" },
  { weight: 3, entry: "ars_elemental:glyph_life_link" },
  { weight: 3, entry: "ars_elemental:glyph_nullify_defense" },
  { weight: 3, entry: "ars_elemental:glyph_propagator_homing" }
];
