const addItems = [
  {
    itemID: "stone_pebble",
    food: (food) => {
      food
        .eatSeconds(1)
        .effect("minecraft:hunger", 200, 0, 1)
        .effect("minecraft:slowness", 200, 1, 1)
        .effect("minecraft:resistance", 200, 1, 1)
        .nutrition(1)
    }
  },
  {
    itemID: "andesite_pebble"
  },
  {
    itemID: "diorite_pebble"
  },
  { itemID: "portal_gun", fireResistant: true, maxStackSize: 1, glow: true },
  { itemID: "fortron_star", fireResistant: true },
  { itemID: "fortron_infused_ingot", fireResistant: true, glow: true },
  { itemID: "depleted_fortron_star", fireResistant: true, glow: false },
  { itemID: "magmalith", fireResistant: true },
  { itemID: "dark_matter_smithing_template", fireResistant: true, glow: true },
  { itemID: "red_matter_smithing_template", fireResistant: true, glow: true },
  { itemID: "infernal_dust", fireResistant: true },
  { itemID: "iron_amulet" },
  { itemID: "blank_slate" },
  { itemID: "stable_antimatter", 
    food: (food) => {
      food
        .eatSeconds(1)
        .effect("minecraft:resistance", 2000, 4, 1)
        .effect("apothic_attributes:knowledge", 2000, 4, 1)
        .effect("apothic_attributes:flying", 2000, 1, 1)
        .effect("ars_nouveau:mana_regen", 2000, 4, 1)
        .effect("ars_nouveau:spell_damage", 2000, 4, 1)
        .effect("minecraft:strength", 2000, 5, 1)
        .effect("minecraft:speed", 2000, 10, 1)
        .nutrition(80).saturation(2.0)
    },   
    glow: true, fireResistant: true,  },
  { itemID: "chronon_resonator", glow: true, fireResistant: true },
  { itemID: "mighty_chicken_egg", glow: true, fireResistant: true },
  { itemID: "codex_glyph_1", glow: true, fireResistant: true },
  { itemID: "codex_glyph_2", glow: true, fireResistant: true },
  { itemID: "codex_glyph_3", glow: true, fireResistant: true },
  {
    itemID: "clapple",
    food: (food) => {
      food.eatSeconds(3).nutrition(3).effect("minecraft:resistance", 200, 1, 1)
    }
  }
]

StartupEvents.registry("item", (event) => {
  addItems.forEach((item) => {
    let newItem = event.create(`ftb:${item.itemID}`)

    if (item.rarity !== undefined) newItem = newItem.rarity(item.rarity)
    if (item.fireResistant !== undefined) newItem = newItem.fireResistant(item.fireResistant)
    if (item.maxStackSize !== undefined) newItem = newItem.maxStackSize(item.maxStackSize)
    if (item.glow !== undefined) newItem = newItem.glow(item.glow)
    if (item.food !== undefined) newItem = newItem.food(item.food)
  })
      event.create("ftb:soulcage").maxDamage(40).unstackable().glow(true).fireResistant(true)

})

