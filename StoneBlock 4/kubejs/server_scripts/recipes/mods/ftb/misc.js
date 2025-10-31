const hammerTypes = [
  ["#c:cobblestones", "stone"],
  ["#c:ingots/iron", "iron"],
  ["#c:ingots/gold", "gold"],
  ["#c:gems/diamond", "diamond"],
  ["#c:ingots/netherite", "netherite"]
]

ServerEvents.recipes((event) => {
  event
    .shaped(Item.of("minecraft:cobblestone"), ["CC", "CC"], {
      C: "ftb:stone_pebble"
    })
    .id("ftb:ftb/crafting/stone_pebble")

  event
    .shaped(Item.of("minecraft:andesite"), ["CC", "CC"], {
      C: "ftb:andesite_pebble"
    })
    .id("ftb:ftb/crafting/andesite_pebble")

  event
    .shaped(Item.of("minecraft:diorite"), ["CC", "CC"], {
      C: "ftb:diorite_pebble"
    })
    .id("ftb:ftb/crafting/diorite_pebble")

  hammerTypes.forEach((type) => {
    event
      .shaped(`ftbstuff:${type[1]}_hammer`, ["RSR", " S ", " S "], {
        R: type[0],
        S: ["ftbstuff:stone_rod", "minecraft:stick"]
      })
      .id(`ftb:ftbstuff/crafting/${type[1]}_hammer`)
  })

  event
    .shaped("ftb:mighty_chicken_egg", ["DPD", "PMP", "DPD"], {
      D: "#c:gems/dimensional_shard",
      P: "#c:ender_pearls",
      M: "projecte:dark_matter"
    })
    .id("ftb:crafting/mighty_chicken_egg")

  event
    .shaped("ftbunearthed:crude_brush", ["  S", " P ", "I  "], {
      S: "farmersdelight:straw",
      P: "#ftb:pebble",
      I: "minecraft:stick"
    })
    .id("ftb:unearthed/crafting/crude_brush")

  event
    .shaped("ftbunearthed:core", ["TTT", "T T", "SSS"], {
      T: "minecraft:tinted_glass",
      S: "minecraft:polished_deepslate_slab"
    })
    .id("ftb:unearthed/crafting/unearther")

  //Magmalith =========================
  addRecipeProductiveMetalworksBlockCastingRecipe(
    event,
    "ftbstuff:compressed_basalt_2",
    true,
    "minecraft:lava",
    1000,
    "ftb:magmalith",
    "ftb:productivemetalworks/casting/magmalith"
  )

  event.custom({
    type: "ftbstuff:supercooler",
    energy: {
      fe_per_tick: 250,
      ticks_to_process: 100
    },
    fluid: {
      amount: 1000,
      fluid: "minecraft:lava"
    },
    inputs: [
      {
        item: "ftbstuff:compressed_basalt_2"
      }
    ],
    result: {
      count: 1,
      id: "ftb:magmalith"
    }
  })

  // ==================================

  event
    .shaped("ftb:clapple", ["CCC", "CAC", "CCC"], {
      C: "minecraft:clay_ball",
      A: "minecraft:apple"
    })
    .id("ftb:ftb/crafting/clapple")

  //reinforced brush
  event
    .custom({
      type: "minecraft:smithing_transform",
      template: { item: "apotheosis:iron_upgrade_smithing_template" },
      base: { item: "minecraft:brush" },
      addition: { item: "minecraft:diamond" },
      // ItemStack schema: id (+ optional count/components)
      result: { id: "ftbunearthed:reinforced_brush", count: 1 }
    })
    .id("ftb:smithing/reinforced_brush")

  //Fortron Block Recipe
  event
    .shaped(Item.of("ftb:fortron_infused_block"), ["FFF", "FFF", "FFF"], {
      F: "ftb:fortron_infused_ingot"
    })
    .id("ftb:ftb/crafting/fortron_block")
  event
    .shapeless(Item.of("ftb:fortron_infused_ingot", 9), ["ftb:fortron_infused_block"])
    .id("ftb:ftb/decompressing/fortron_block")

  //Enderium Block Recipe
  event
    .shaped(Item.of("ftb:enderium_block"), ["FFF", "FFF", "FFF"], {
      F: "chicken_roost:ingot_enderium"
    })
    .id("ftb:ftb/crafting/enderium_block")
  event
    .shapeless(Item.of("chicken_roost:ingot_enderium", 9), ["ftb:enderium_block"])
    .id("ftb:ftb/decompressing/enderium_block")

  event
    .shaped(Item.of("ftbstuff:stone_rod", 2), ["C", "C"], {
      C: "#c:cobblestones"
    })
    .id("ftb:crafting/stone_rod")

  event
    .shaped(Item.of("ftbstuff:wooden_basin"), ["W W", "W W", "WWW"], {
      W: "#minecraft:logs"
    })
    .id("ftb:crafting/wooden_basin")

  event.campfireCooking("ftb:dry_leaves", "#minecraft:leaves", 0.1, 600).id("ftb:campfire/dry_leaves")

  //Adding Alloying Recipes for and with Ported Custom Alloys from NC ===================

  //Shibuichi =====
  event
    .custom({
      type: "productivemetalworks:fluid_alloying",
      fluids: [
        {
          amount: 3,
          tag: "c:molten_copper"
        },
        {
          amount: 1,
          tag: "c:molten_silver"
        }
      ],
      result: {
        amount: 4,
        id: "ftb:molten_shibuichi"
      },
      speed: 10
    })
    .id("ftb:productivemetalworks/fluid_alloying/shibuichi")

  event
    .custom({
      type: "productivemetalworks:fluid_alloying",
      fluids: [
        {
          amount: 20,
          tag: "c:molten_redstone"
        },
        {
          amount: 90,
          fluid: "ftb:molten_shibuichi"
        }
      ],
      result: {
        amount: 90,
        id: "productivemetalworks:molten_signalum"
      },
      speed: 10
    })
    .id("ftb:productivemetalworks/fluid_alloying/signalum_from_alloy")

  //Tin Silver Alloy =====
  event
    .custom({
      type: "productivemetalworks:fluid_alloying",
      fluids: [
        {
          amount: 3,
          tag: "c:molten_tin"
        },
        {
          amount: 1,
          tag: "c:molten_silver"
        }
      ],
      result: {
        amount: 4,
        id: "ftb:molten_tin_silver_alloy"
      },
      speed: 10
    })
    .id("ftb:productivemetalworks/fluid_alloying/tin_silver_alloy")

  event
    .custom({
      type: "productivemetalworks:fluid_alloying",
      fluids: [
        {
          amount: 20,
          tag: "c:molten_glowstone"
        },
        {
          amount: 90,
          fluid: "ftb:molten_tin_silver_alloy"
        }
      ],
      result: {
        amount: 90,
        id: "productivemetalworks:molten_lumium"
      },
      speed: 10
    })
    .id("ftb:productivemetalworks/fluid_alloying/lumium_from_alloy")

  event
    .shapeless(Item.of("minecraft:lapis_lazuli", 4), ["supplementaries:lapis_bricks"])
    .id("ftb:supplementaries/lapis_uncraft")
  // ==============================================================================================
})
