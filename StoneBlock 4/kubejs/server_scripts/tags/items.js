const addItemTags = [
  {
    tagName: "c:ingots/fortron_infused",
    itemIDs: ["ftb:fortron_infused_ingot"]
  },
  {
    tagName: "c:storage_blocks/fortron_infused",
    itemIDs: ["ftb:fortron_infused_block"]
  },
  {
    tagName: "c:storage_blocks/enderium",
    itemIDs: ["ftb:enderium_block"]
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
      "malum:runewood_planks"
    ]
  },
  {
    tagName: "curios:curio",
    itemIDs: ["minecraft:stick"]
  },
  {
    tagName: "ftbunearthed:unlimited_food_source",
    itemIDs: [
      "relics:infinity_ham",
      "artifacts:eternal_steak",
      "artifacts:everlasting_beef",
      "ftb:stable_antimatter",
      "avaritia:cosmic_meatballs",
      "avaritia:ultimate_stew"
    ]
  },
  {
    tagName: "ftb:pebble",
    itemIDs: ["ftb:stone_pebble", "ftb:andesite_pebble", "ftb:diorite_pebble"]
  },
  {
    tagName: "ftb:chicken_stick",
    itemIDs: ["chicken_roost:chicken_stick"]
  },
  {
    tagName: "ftb:pistons",
    itemIDs: [
      "minecraft:piston",
      "minecraft:sticky_piston",
      "create:mechanical_piston",
      "create:sticky_mechanical_piston"
    ]
  },
  {
    tagName: "c:barrels/wood",
    itemIDs: ["#c:barrels/wooden"]
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
      "minecraft:polished_diorite"
    ]
  }
]

const removeItemTags = [
  //Fixing Issues caused by Malum's Tags ==========================================================
  {
    tagName: "c:ingots",
    itemIDs: ["malum:malignant_pewter_ingot"]
  },
  {
    tagName: "c:tools/knife",
    itemIDs: ["malum:soul_stained_steel_knife", "malum:sundering_anchor"]
  },
  {
    tagName: "minecraft:axes",
    itemIDs: ["malum:soul_stained_steel_axe", "malum:weight_of_worlds"]
  }
]

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
    "enderio:grains_of_infinity"
  ]
  fire_immune_items.forEach((item) => {
    event.add("lychee:fire_immune", item)
  })

  addItemTags.forEach((tag) => {
    event.add(tag.tagName, tag.itemIDs)
  })

  removeItemTags.forEach((tag) => {
    event.remove(tag.tagName, tag.itemIDs)
  })
  event.add("ftb:soulcage_enchantable", ["ftb:soulcage"])
  event.remove("c:chests", ["projecte:alchemical_chest"])
})
