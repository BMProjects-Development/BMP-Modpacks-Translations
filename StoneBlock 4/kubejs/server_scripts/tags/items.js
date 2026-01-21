const addItemTags = [
  {
    tagName: "c:ingots/fortron_infused",
    itemIDs: ["ftb:fortron_infused_ingot"],
  },
  {
    tagName: "c:storage_blocks/fortron_infused",
    itemIDs: ["ftb:fortron_infused_block"],
  },
  {
    tagName: "c:storage_blocks/enderium",
    itemIDs: ["ftb:enderium_block"],
  },

  // Bypass Chicken Shield Items
  {
    tagName: "ftb:chicken_stick",
    itemIDs: ["avaritia:infinity_sword"],
  },
  {
    tagName: "ftb:vanilla_planks",
    itemIDs: [
      "minecraft:oak_planks",
      "minecraft:spruce_planks",
      "minecraft:birch_planks",
      "minecraft:jungle_planks",
      "minecraft:acacia_planks",
      "minecraft:dark_oak_planks",
      "minecraft:mangrove_planks",
      "minecraft:cherry_planks",
      "minecraft:bamboo_planks",
      "minecraft:crimson_planks",
      "minecraft:warped_planks",
      "ars_nouveau:archwood_planks",
      "malum:runewood_planks",
    ],
  },
  {
    tagName: "ftb:jewelry_metal",
    itemIDs: [
      "avaritia:infinity_ingot",
      "avaritia:neutronium_ingot",
      "cataclysm:witherite_ingot",
      "chicken_roost:ingot_enderium",
      "draconicevolution:awakened_draconium_ingot",
      "draconicevolution:draconium_ingot",
      "enderio:dark_steel_ingot",
      "ftb:fortron_infused_ingot",
      "ftbmaterials:refined_glowstone_ingot",
      "ftbmaterials:refined_obsidian_ingot",
      "irons_spellbooks:arcane_ingot",
      "irons_spellbooks:mithril_ingot",
      "irons_spellbooks:pyrium_ingot",
      "irregular_implements:spectre_ingot",
      "justdirethings:blazegold_ingot",
      "justdirethings:eclipsealloy_ingot",
      "malum:hallowed_gold_ingot",
      "malum:soul_stained_steel_ingot",
      "occultism:iesnium_ingot",
      "oritech:duratium_ingot",
      "oritech:prometheum_ingot",
      "psi:psimetal",
    ],
  },
  {
    tagName: "ftb:jewelry_gem",
    itemIDs: [
      "actuallyadditions:black_quartz",
      "actuallyadditions:diamatine_crystal",
      "actuallyadditions:emeradic_crystal",
      "actuallyadditions:palis_crystal",
      "actuallyadditions:void_crystal",
      "ars_nouveau:source_gem",
      "cognition:cognitive_crystal",
      "draconicevolution:small_chaos_frag",
      "enderio:pulsating_crystal",
      "ftbmaterials:dimensional_shard_gem",
      "ftbmaterials:steel_ingot",
      "justdirethings:celestigem",
      "justdirethings:time_crystal",
      "malum:fused_consciousness",
      "malum:mnemonic_fragment",
      "minecraft:clay_ball",
      "oritech:fluxite",
      "projecte:dark_matter",
      "projecte:red_matter",
      "psi:psigem",
      "irons_jewelry:topaz",
      "irons_jewelry:moonstone",
      "irons_jewelry:peridot",
      "irons_jewelry:onyx",
      "irons_jewelry:garnet",
    ],
  },
  {
    tagName: "ftb:jewelry_rune",
    itemIDs: [
      "irons_spellbooks:arcane_rune",
      "irons_spellbooks:blood_rune",
      "irons_spellbooks:cooldown_rune",
      "irons_spellbooks:ender_rune",
      "irons_spellbooks:evocation_rune",
      "irons_spellbooks:fire_rune",
      "irons_spellbooks:holy_rune",
      "irons_spellbooks:ice_rune",
      "irons_spellbooks:lightning_rune",
      "irons_spellbooks:nature_rune",
      "irons_spellbooks:protection_rune",
    ],
  },
  {
    tagName: "curios:stick",
    itemIDs: ["minecraft:stick"],
  },
  {
    tagName: "curios:player_upgrade",
    itemIDs: ["ftb:player_upgrade"],
  },
  {
    tagName: "ftbunearthed:unlimited_food_source",
    itemIDs: [
      "relics:infinity_ham",
      "artifacts:eternal_steak",
      "artifacts:everlasting_beef",
      "ftb:stable_antimatter",
      "avaritia:cosmic_meatballs",
      "avaritia:ultimate_stew",
    ],
  },
  {
    tagName: "ftb:pebble",
    itemIDs: ["ftb:stone_pebble", "ftb:andesite_pebble", "ftb:diorite_pebble"],
  },
  {
    tagName: "ftb:chicken_stick",
    itemIDs: ["chicken_roost:chicken_stick"],
  },
  {
    tagName: "ftb:pistons",
    itemIDs: [
      "minecraft:piston",
      "minecraft:sticky_piston",
      "create:mechanical_piston",
      "create:sticky_mechanical_piston",
    ],
  },
  {
    tagName: "c:barrels/wood",
    itemIDs: ["#c:barrels/wooden"],
  },
  {
    tagName: "c:stones/normal",
    itemIDs: [
      "minecraft:andesite",
      "minecraft:stone",
      "minecraft:diorite",
      "minecraft:granite",
      "minecraft:tuff",
      "minecraft:polished_granite",
      "minecraft:polished_andesite",
      "minecraft:polished_diorite",
    ],
  },
  {
    tagName: "ftbultimine:included_tools",
    itemIDs: [
      "mekanism:atomic_disassembler",
      "ars_nouveau:enchanters_gauntlet",
      "ftbunearthed:unbreakable_brush",
      "mekanism:meka_tool",
      "actuallyadditions:drill_light_blue",
      "actuallyadditions:drill_black",
      "actuallyadditions:drill_blue",
      "actuallyadditions:drill_brown",
      "actuallyadditions:drill_cyan",
      "actuallyadditions:drill_gray",
      "actuallyadditions:drill_green",
      "actuallyadditions:drill_light_gray",
      "actuallyadditions:drill_lime",
      "actuallyadditions:drill_magenta",
      "actuallyadditions:drill_orange",
      "actuallyadditions:drill_pink",
      "actuallyadditions:drill_purple",
      "actuallyadditions:drill_red",
      "actuallyadditions:drill_white",
      "actuallyadditions:drill_yellow",
    ],
  },
  {
    tagName: "apothic_enchanting:cannot_be_converted_to_xp",
    itemIDs: [
      "minecraft:dragon_egg",
      "cataclysm:ignitium_ingot",
      "cataclysm:cursium_ingot",
      "cataclysm:abyssal_egg",
      "twilightforest:lich_trophy",
      "twilightforest:alpha_yeti_trophy",
      "twilightforest:hydra_trophy",
      "twilightforest:snow_queen_trophy",
      "twilightforest:knight_phantom_trophy",
      "fdbosses:chesed_trophy",
      "ars_nouveau:wilden_tribute",
      "minecraft:iron_sword",
    ],
  },
  {
    tagName: "replication:cant_be_scanned",
    itemIDs: ["gateways:gate_pearl", "compactmachines:new_machine", "enderio:conduit"],
  },
  {
    tagName: "ftb:vanilla_candles",
    itemIDs: [
      "minecraft:candle",
      "minecraft:white_candle",
      "minecraft:orange_candle",
      "minecraft:magenta_candle",
      "minecraft:light_blue_candle",
      "minecraft:yellow_candle",
      "minecraft:lime_candle",
      "minecraft:pink_candle",
      "minecraft:gray_candle",
      "minecraft:light_gray_candle",
      "minecraft:cyan_candle",
      "minecraft:purple_candle",
      "minecraft:blue_candle",
      "minecraft:brown_candle",
      "minecraft:green_candle",
      "minecraft:red_candle",
      "minecraft:black_candle",
    ],
  },
  {
    tagName: "ftb:cuckoo",
    itemIDs: ["create:cuckoo_clock", "create:mysterious_cuckoo_clock"],
  },
  {
    tagName: "ftb:mushroom_soils",
    itemIDs: [
      "minecraft:mycelium",
      "minecraft:podzol",
      "farmersdelight:organic_compost",
      "twilightforest:uberous_soil",
    ],
  },
  { tagName: "chisel:carving/charcoal", itemIDs: ["ftbmaterials:charcoal_block"] },
];

const removeItemTags = [
  //Fixing Issues caused by Malum's Tags ==========================================================
  {
    tagName: "c:ingots",
    itemIDs: ["malum:malignant_pewter_ingot"],
  },
  {
    tagName: "c:tools/knife",
    itemIDs: ["malum:soul_stained_steel_knife", "malum:sundering_anchor"],
  },
  {
    tagName: "minecraft:axes",
    itemIDs: ["malum:soul_stained_steel_axe", "malum:weight_of_worlds"],
  },
];

ServerEvents.tags("item", (event) => {
  const fire_immune_items = [
    "cognition:cognitive_flux",
    "minecraft:iron_block",
    "ftbmaterials:obsidian_dust",
    "cognition:primordial_assembly",
    "irons_spellbooks:scroll",
    "ftbmaterials:silver_block",
    "ftbmaterials:aluminum_block",
    "actuallyadditions:black_quartz",
    "minecraft:gravel",
    "enderio:grains_of_infinity",
  ];
  fire_immune_items.forEach((item) => {
    event.add("lychee:fire_immune", item);
  });

  addItemTags.forEach((tag) => {
    event.add(tag.tagName, tag.itemIDs);
  });

  event.add("c:buckets/lava", "chicken_roost:lava_egg");
  event.add("c:buckets/water", "chicken_roost:water_egg");
  removeItemTags.forEach((tag) => {
    event.remove(tag.tagName, tag.itemIDs);
  });
  event.add("ftb:soulcage_enchantable", ["ftb:soulcage"]);
  event.remove("c:chests", ["projecte:alchemical_chest"]);
  event.add("c:tools/mining_tool", [
    "mininggadgets:mininggadget_simple",
    "mininggadgets:mininggadget_fancy",
    "mininggadgets:mininggadget",
  ]);
});
