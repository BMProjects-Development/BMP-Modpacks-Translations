// priority: 992

// ---------------------------------------------------------------------------
// Static JEI + Tooltip helpers and pairs
// ---------------------------------------------------------------------------

// Items that should show: "Obtainable only from the Echo Store"
const ECHO_STORE_ONLY = [
  "chancecubes:compact_giant_chance_cube",
  "functionalstorage:water_generator_upgrade",
  "powah:aerial_pearl",
  "justdynathings:blazegold_anvil",
  "oritechthings:addon_block_capacitor_tier_9",
  "oritechthings:addon_block_speed_tier_9",
  "rarcompat:mimi_dust",
  "oritechthings:particle_accelerator_speed_sensor",
  "justdynathings:eclipse_alloy_anvil",
  "sophisticatedstorage:stack_upgrade_omega_tier",
  "create:creative_blaze_cake",
  'gateways:gate_pearl{"gateways:gateway":"gateways:basic/enderman"}',
  'gateways:gate_pearl{"gateways:gateway":"gateways:hellish_fortress"}',
  'compactmachines:new_machine{"compactmachines:machine_color":"#43D6CD","compactmachines:room_template":"compactmachines:giant"}',
  "mob_grinding_utils:mob_swab",
  "mob_grinding_utils:nutritious_chicken_feed",
  "ars_nouveau:ring_of_lesser_discount",
  "justhammers:impact_core",
  "sophisticatedstorage:basic_to_copper_tier_upgrade",
  'gag:time_sand_pouch{"gag:grains_of_time":5040,"minecraft:custom_name":"\\"2.5 hrs\\""}',
  "projecte:watch_of_flowing_time",
  "chancecubes:chance_icosahedron",
  "extendedae:infinity_water_cell",
  "gaze:adaptive_wheel",
  "justdynathings:celestigem_anvil",
  "sophisticatedstorage:basic_to_netherite_tier_upgrade",
  "sophisticatedstorage:basic_to_diamond_tier_upgrade",
  "computercraft:turtle_normal",
  "computercraft:turtle_advanced",
  "oritechthings:addon_block_acceptor_tier_9",
  "immersiveengineering:thermoelectric_generator",
  "sophisticatedstorage:basic_to_iron_tier_upgrade",
  "functionalstorage:dripping_upgrade",
  "rftoolsutility:saturationplus_module",
  'compactmachines:new_machine{"compactmachines:machine_color":"#7B2FBE","compactmachines:room_template":"compactmachines:soaryn"}',
  "actuallyadditions:phantom_connector",
  'compactmachines:new_machine{"compactmachines:machine_color":"#D4D2D2","compactmachines:room_template":"compactmachines:small"}',
  "oritechthings:addon_block_efficiency_tier_9",
  "oritechthings:addon_block_efficient_speed_tier_9",
  "extendedae:infinity_cobblestone_cell",
  "functionalstorage:obsidian_upgrade",
  "oritechthings:addon_block_processing_tier_9",
  "ars_nouveau:ring_of_greater_discount",
  "ars_creo:starbuncle_wheel",
  "sophisticatedstorage:basic_tier_upgrade",
  "sophisticatedstorage:basic_to_gold_tier_upgrade",
  "chancecubes:chance_cube"
];

const uneartherFoods = [
  
];

// Static tooltip pairs
const tooltipPairs = [
  {
    items: ["ftb:portal_gun"],
    lines: [
      { key: "ftb.tooltip.portal_gun.1" },
      { key: "ftb.tooltip.portal_gun.2" },
      { key: "ftb.tooltip.portal_gun.3" }
    ]
  },
  { items: ECHO_STORE_ONLY, lines: [{ key: "ftb.tooltip.echo_store_only" }] },
  { items: [/mekanism:.*_factory/], lines: [{ key: "ftb.tooltip.mekanism.factory" }] },
  { items: [/minecraft:.*_bed/], lines: [{ key: "ftb.tooltip.bed" }] },
  { items: ["relics:infinity_ham", "artifacts:eternal_steak", "artifacts:everlasting_beef", "ftb:stable_antimatter", "avaritia:cosmic_meatballs", "avaritia:ultimate_stew"], lines: [{ key: "ftb.tooltip.unlimited_food_source" }] },
  { items: ["ftb:stable_antimatter"], lines: [{ key: "ftb.tooltip.antimatter" }] },
  {
    items: [
      "sophisticatedstorage:copper_barrel",
      "sophisticatedstorage:iron_barrel",
      "sophisticatedstorage:gold_barrel",
      "sophisticatedstorage:diamond_barrel",
      "sophisticatedstorage:netherite_barrel",
      "sophisticatedstorage:copper_chest",
      "sophisticatedstorage:iron_chest",
      "sophisticatedstorage:gold_chest",
      "sophisticatedstorage:diamond_chest",
      "sophisticatedstorage:netherite_chest",
      "sophisticatedstorage:copper_shulker_box",
      "sophisticatedstorage:iron_shulker_box",
      "sophisticatedstorage:gold_shulker_box",
      "sophisticatedstorage:diamond_shulker_box",
      "sophisticatedstorage:netherite_shulker_box"
    ],
    lines: [{ key: "ftb.tooltip.sophisticatedstorage.storage", color: Color.RED }]
  },
  { items: [
    "cookingforblockheads:sink",
    "cookingforblockheads:white_sink",
    "cookingforblockheads:orange_sink",
    "cookingforblockheads:magenta_sink",
    "cookingforblockheads:light_blue_sink",
    "cookingforblockheads:yellow_sink",
    "cookingforblockheads:lime_sink",
    "cookingforblockheads:pink_sink",
    "cookingforblockheads:gray_sink",
    "cookingforblockheads:light_gray_sink",
    "cookingforblockheads:cyan_sink",
    "cookingforblockheads:purple_sink",
    "cookingforblockheads:blue_sink",
    "cookingforblockheads:brown_sink",
    "cookingforblockheads:green_sink",
    "cookingforblockheads:red_sink",
    "cookingforblockheads:black_sink"
], lines: [{ key: "ftb.tooltip.sinks" }] },
  { items: ["minecraft:milk_bucket"], lines: [{ key: "ftb.tooltip.milk_bucket" }] },
  {
    items: [
      "sophisticatedstorage:basic_to_copper_tier_upgrade",
      "sophisticatedstorage:basic_to_diamond_tier_upgrade",
      "sophisticatedstorage:basic_to_gold_tier_upgrade",
      "sophisticatedstorage:basic_to_iron_tier_upgrade",
      "sophisticatedstorage:basic_to_netherite_tier_upgrade"
    ],
    lines: [{ key: "ftb.tooltip.sophisticatedstorage.upgrades", color: Color.RED }]
  },
  { items: ["ftb:clapple"], lines: [{ key: "ftb.tooltip.clapple" }] },
  { items: ["ftb:fortron_star"], lines: [{ key: "ftb.tooltip.fortron_star" }] },
  { 
    items: ["ftb:red_core", "ftb:orange_core", "ftb:purple_core", "ftb:blue_core"], 
    lines: [
      { key: "ftb.tooltip.portal.cores.1" },
      { key: "ftb.tooltip.portal.cores.2" }
    ]
  },
];

ItemEvents.modifyTooltips(event => {
  for (var i = 0; i < tooltipPairs.length; i++) {
    var pair = tooltipPairs[i];
    for (var j = 0; j < pair.items.length; j++) {
      var item = pair.items[j];
      event.add(
        item,
        pair.lines.map(function (line) {
          var t = Text.translate(line.key);
          if (line.color) t = t.color(line.color);
          return t;
        })
      );
    }
  }
  event.modify("petrock:kibble", tooltip => tooltip.removeLine(0));
});



// ---------------------------------------------------------------------------
// Helpers over the rules
// ---------------------------------------------------------------------------
function fluidsForRule(rule) {
  if (rule.fluid) return [rule.fluid];
  var out = [];
  if (rule.weighted) {
    for (var i = 0; i < rule.weighted.length; i++) {
      var id = rule.weighted[i].id;
      if (out.indexOf(id) === -1) out.push(id);
    }
  }
  return out;
}
function collectUniqueItems() {
  var items = [];
  for (var i = 0; i < global.COW_TRANSMUTE_RULES.length; i++) {
    var it = global.COW_TRANSMUTE_RULES[i].item;
    if (items.indexOf(it) === -1) items.push(it);
  }
  return items;
}
function collectUniqueFluids() {
  var fluids = [];
  for (var i = 0; i < global.COW_TRANSMUTE_RULES.length; i++) {
    var fList = fluidsForRule(global.COW_TRANSMUTE_RULES[i]);
    for (var j = 0; j < fList.length; j++) {
      var fid = fList[j];
      if (fluids.indexOf(fid) === -1) fluids.push(fid);
    }
  }
  return fluids;
}
function fluidsForItem(itemId) {
  var out = [];
  for (var i = 0; i < global.COW_TRANSMUTE_RULES.length; i++) {
    var r = global.COW_TRANSMUTE_RULES[i];
    if (r.item !== itemId) continue;
    var fList = fluidsForRule(r);
    for (var j = 0; j < fList.length; j++) {
      var fid = fList[j];
      if (out.indexOf(fid) === -1) out.push(fid);
    }
  }
  return out;
}
function itemsForFluid(fluidId) {
  var out = [];
  for (var i = 0; i < global.COW_TRANSMUTE_RULES.length; i++) {
    var r = global.COW_TRANSMUTE_RULES[i];
    var fList = fluidsForRule(r);
    for (var j = 0; j < fList.length; j++) {
      if (fList[j] === fluidId && out.indexOf(r.item) === -1) out.push(r.item);
    }
  }
  return out;
}
function prettyFluidText(fluidId) {
  try {
    var f = Fluid.of(fluidId);
    if (f && f.displayName) return f.displayName;
  } catch (e) {}
  var path = String(fluidId).split(":")[1] || String(fluidId);
  path = path.replace(/_/g, " ");
  var parts = path.split(" ");
  for (var i = 0; i < parts.length; i++) {
    var w = parts[i];
    if (w.length > 0) parts[i] = w.charAt(0).toUpperCase() + w.slice(1);
  }
  return Text.of(parts.join(" "));
}
function prettyItemText(itemId) {
  return Item.of(itemId).displayName;
}

// ---------------------------------------------------------------------------
// JEI: Information page on each FLUID that can be created via feeding
// Lang: ftb.tooltip.cow_feed.item_line = "ⓘ Feed a Cow %s to create this Fluid Cow"
// ---------------------------------------------------------------------------
function cowFeedInfoLine(itemId) {
  var prettyItem = prettyItemText(itemId);
  return Text.translate("ftb.tooltip.cow_feed.item_line", prettyItem).aqua();
}
RecipeViewerEvents.addInformation("fluid", event => {
  var allFluids = collectUniqueFluids();
  for (var i = 0; i < allFluids.length; i++) {
    var fid = allFluids[i];
    var items = itemsForFluid(fid);
    if (items.length === 0) continue;

    var lines = [];
    for (var j = 0; j < items.length; j++) {
      lines.push(cowFeedInfoLine(items[j]));
    }
    event.add(fid, lines);
  }
});

// ---------------------------------------------------------------------------
// JEI: Information page on each FEED ITEM
// ---------------------------------------------------------------------------
RecipeViewerEvents.addInformation("item", event => {
  var allItems = collectUniqueItems();
  for (var i = 0; i < allItems.length; i++) {
    var itemId = allItems[i];
    var fluids = fluidsForItem(itemId);
    if (fluids.length === 0) continue;

    var lines = [];
    lines.push(Text.translate("ftb.tooltip.cow_feed.header").aqua()); // "ⓘ Feed to a Cow to create"
    var arrow = Text.translate("ftb.tooltip.cow_feed.arrow").gray();

    var maxList = 10;
    var shown = Math.min(fluids.length, maxList);
    var listLine = Text.empty();
    for (var j = 0; j < shown; j++) {
      if (j > 0) listLine = listLine.append(Text.of(", ").gray());
      listLine = listLine.append(prettyFluidText(fluids[j]));
    }
    lines.push(arrow.copy().append(listLine));

    if (fluids.length > maxList) {
      var more = fluids.length - maxList;
      lines.push(Text.translate("ftb.tooltip.cow_feed.and_more", String(more)).darkGray());
    }

    event.add(itemId, lines);
  }
});

// ---------------------------------------------------------------------------
// Item tooltips: show which fluid cow(s) each feed item creates
// ---------------------------------------------------------------------------
ItemEvents.modifyTooltips(event => {
  var maxList = 5;
  var allItems = collectUniqueItems();

  for (var i = 0; i < allItems.length; i++) {
    var itemId = allItems[i];
    var fluids = fluidsForItem(itemId);
    if (fluids.length === 0) continue;

    var lines = [];
    lines.push(Text.translate("ftb.tooltip.cow_feed.header").aqua()); // "ⓘ Feed to a Cow to create"
    var arrow = Text.translate("ftb.tooltip.cow_feed.arrow").gray();

    var shown = Math.min(fluids.length, maxList);
    var listLine = Text.empty();
    for (var j = 0; j < shown; j++) {
      if (j > 0) listLine = listLine.append(Text.of(", ").gray());
      listLine = listLine.append(prettyFluidText(fluids[j]));
    }
    lines.push(arrow.copy().append(listLine));

    if (fluids.length > maxList) {
      var more = fluids.length - maxList;
      lines.push(Text.translate("ftb.tooltip.cow_feed.and_more", String(more)).darkGray());
    }

    event.add(itemId, lines);
  }
});

// ---------------------------------------------------------------------------
// Fluid hover tooltip (optional, guarded)
// Many environments don't expose FluidEvents or suppress fluid tooltips.
// If FluidEvents is unavailable, this section is safely skipped.
// ---------------------------------------------------------------------------
if (typeof FluidEvents !== "undefined" && FluidEvents && typeof Fluid !== "undefined") {
  FluidEvents.tooltip(event => {
    var maxList = 5;
    var allFluids = collectUniqueFluids();

    for (var i = 0; i < allFluids.length; i++) {
      var fid = allFluids[i];
      var items = itemsForFluid(fid);
      if (items.length === 0) continue;

      var lines = [];
      lines.push(Text.translate("ftb.tooltip.cow_feed.fluid_header").aqua()); // "ⓘ Created by feeding a Cow"
      var arrow = Text.translate("ftb.tooltip.cow_feed.arrow").gray();

      var shown = Math.min(items.length, maxList);
      var listLine = Text.empty();
      for (var j = 0; j < shown; j++) {
        if (j > 0) listLine = listLine.append(Text.of(", ").gray());
        listLine = listLine.append(prettyItemText(items[j]));
      }
      lines.push(arrow.copy().append(listLine));

      if (items.length > maxList) {
        var more = items.length - maxList;
        lines.push(Text.translate("ftb.tooltip.cow_feed.and_more", String(more)).darkGray());
      }

      event.add(fid, lines);
    }
  });
}
