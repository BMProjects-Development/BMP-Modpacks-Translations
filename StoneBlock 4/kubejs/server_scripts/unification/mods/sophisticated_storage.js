global.removeItem.push(
  "sophisticatedstorage:limited_barrel_1",
  "sophisticatedstorage:limited_barrel_2",
  "sophisticatedstorage:limited_barrel_3",
  "sophisticatedstorage:limited_barrel_4",
  "sophisticatedstorage:limited_copper_barrel_1",
  "sophisticatedstorage:limited_copper_barrel_2",
  "sophisticatedstorage:limited_copper_barrel_3",
  "sophisticatedstorage:limited_copper_barrel_4",
  "sophisticatedstorage:limited_diamond_barrel_1",
  "sophisticatedstorage:limited_diamond_barrel_2",
  "sophisticatedstorage:limited_diamond_barrel_3",
  "sophisticatedstorage:limited_diamond_barrel_4",
  "sophisticatedstorage:limited_gold_barrel_1",
  "sophisticatedstorage:limited_gold_barrel_2",
  "sophisticatedstorage:limited_gold_barrel_3",
  "sophisticatedstorage:limited_gold_barrel_4",
  "sophisticatedstorage:limited_iron_barrel_1",
  "sophisticatedstorage:limited_iron_barrel_2",
  "sophisticatedstorage:limited_iron_barrel_3",
  "sophisticatedstorage:limited_iron_barrel_4",
  "sophisticatedstorage:limited_netherite_barrel_1",
  "sophisticatedstorage:limited_netherite_barrel_2",
  "sophisticatedstorage:limited_netherite_barrel_3",
  "sophisticatedstorage:limited_netherite_barrel_4",
  "sophisticatedstorage:shulker_box",
  "sophisticatedstorage:controller",
  "sophisticatedstorage:chipped/glassblower_upgrade",
  "sophisticatedstorage:chipped/botanist_workbench_upgrade",
  "sophisticatedstorage:chipped/loom_table_upgrade",
  "sophisticatedstorage:chipped/mason_table_upgrade",
  "sophisticatedstorage:chipped/alchemy_bench_upgrade",
  "sophisticatedstorage:chipped/tinkering_table_upgrade",
  "sophisticatedstorage:debug_tool",
  "sophisticatedstorage:infinity_upgrade",
  "sophisticatedstorage:survival_infinity_upgrade"
)

ServerEvents.recipes((event) => {
  event.remove({
    not: [
      { id: "sophisticatedstorage:paintbrush" },
      { id: "sophisticatedstorage:decoration_table" },
      { id: "sophisticatedstorage:packing_tape" },
      { id: "sophisticatedstorage:upgrade_base" },
      { id: "sophisticatedstorage:jukebox_upgrade" },
      { id: "sophisticatedstorage:advanced_jukebox_upgrade" },
      { id: "sophisticatedstorage:hopper_upgrade" },
      { id: "sophisticatedstorage:advanced_hopper_upgrade" },
      { id: "sophisticatedstorage:alchemy_upgrade" },
      { id: "sophisticatedstorage:auto_smelting_upgrade" },
      { id: "sophisticatedstorage:smelting_upgrade" },
      { id: "sophisticatedstorage:advanced_void_upgrade" },
      { id: "sophisticatedstorage:void_upgrade" },
      { id: "sophisticatedstorage:advanced_compacting_upgrade" },
      { id: "sophisticatedstorage:compacting_upgrade" },
      { id: "sophisticatedstorage:advanced_feeding_upgrade" },
      { id: "sophisticatedstorage:blasting_upgrade" },
      { id: "sophisticatedstorage:auto_blasting_upgrade" },
      { id: "sophisticatedstorage:crafting_upgrade" },
      { id: "sophisticatedstorage:stonecutter_upgrade" },
      { id: "sophisticatedstorage:stack_upgrade_tier_1" },
      { id: "sophisticatedstorage:smoking_upgrade" },
      { id: "sophisticatedstorage:auto_smoking_upgrade" },
      { id: "sophisticatedstorage:feeding_upgrade" },
      { id: "sophisticatedstorage:advanced_magnet_upgrade" },
      { id: "sophisticatedstorage:magnet_upgrade" },
      { id: "sophisticatedstorage:advanced_filter_upgrade" },
      { id: "sophisticatedstorage:filter_upgrade" },
      { id: "sophisticatedstorage:advanced_pickup_upgrade" },
      { id: "sophisticatedstorage:pickup_upgrade" },
      { id: "sophisticatedstorage:advanced_alchemy_upgrade" },
      { id: "sophisticatedstorage:hopper_upgrade" },
      { id: "sophisticatedstorage:compression_upgrade" },
      { id: "sophisticatedstorage:xp_pump_upgrade" },
      { id: "sophisticatedstorage:advanced_pump_upgrade" },
      { id: "sophisticatedstorage:pump_upgrade" },
      { id: "sophisticatedstorage:copper_to_iron_tier_upgrade" },
      { id: "sophisticatedstorage:copper_to_gold_tier_upgrade" },
      { id: "sophisticatedstorage:copper_to_diamond_tier_upgrade" },
      { id: "sophisticatedstorage:copper_to_netherite_tier_upgrade" },
      { id: "sophisticatedstorage:iron_to_gold_tier_upgrade" },
      { id: "sophisticatedstorage:iron_to_diamond_tier_upgrade" },
      { id: "sophisticatedstorage:iron_to_netherite_tier_upgrade" },
      { id: "sophisticatedstorage:gold_to_diamond_tier_upgrade" },
      { id: "sophisticatedstorage:gold_to_netherite_tier_upgrade" },
      { id: "sophisticatedstorage:diamond_to_netherite_tier_upgrade" }
    ],
    mod: "sophisticatedstorage"
  })
})

// Remove Data Items
RecipeViewerEvents.removeEntries("item", (event) => {
  const removals = {
    chest: [
      {
        special: 'sophisticatedstorage:chest{"sophisticatedstorage:wood_type":"acacia"}'
      },
      { main: -393218, accent: -393218 },
      { main: -425955, accent: -425955 },
      { main: -3715395, accent: -3715395 },
      { main: -12827478, accent: -12827478 },
      { main: -7785800, accent: -7785800 },
      { main: -15295332, accent: -15295332 },
      { main: -6447721, accent: -6447721 },
      { main: -12103854, accent: -12103854 },
      { main: -816214, accent: -816214 },
      { main: -8337633, accent: -8337633 },
      { main: -75715, accent: -75715 },
      { main: -12930086, accent: -12930086 },
      { main: -8170446, accent: -8170446 },
      { main: -10585066, accent: -10585066 },
      { main: -5231066, accent: -5231066 },
      { main: -14869215, accent: -14869215 },
      { main: -75715, accent: -8337633 }
    ],
    barrel: [
      {
        special:
          'sophisticatedstorage:barrel[sophisticatedstorage:wood_type="acacia",sophisticatedstorage:flat_top=true]'
      },
      {
        special: 'sophisticatedstorage:barrel[sophisticatedstorage:wood_type="acacia"]'
      },
      { main: -393218, accent: -393218 },
      { main: -425955, accent: -425955 },
      { main: -3715395, accent: -3715395 },
      { main: -12930086, accent: -12930086 },
      { main: -75715, accent: -75715 },
      { main: -8337633, accent: -8337633 },
      { main: -816214, accent: -816214 },
      { main: -12103854, accent: -12103854 },
      { main: -6447721, accent: -6447721 },
      { main: -15295332, accent: -15295332 },
      { main: -7785800, accent: -7785800 },
      { main: -12827478, accent: -12827478 },
      { main: -8170446, accent: -8170446 },
      { main: -10585066, accent: -10585066 },
      { main: -5231066, accent: -5231066 },
      { main: -14869215, accent: -14869215 },
      { main: -75715, accent: -8337633 }
    ],
    shulker_box: [
      { main: -393218, accent: -393218 },
      { main: -425955, accent: -425955 },
      { main: -3715395, accent: -3715395 },
      { main: -12930086, accent: -12930086 },
      { main: -75715, accent: -75715 },
      { main: -8337633, accent: -8337633 },
      { main: -816214, accent: -816214 },
      { main: -12103854, accent: -12103854 },
      { main: -6447721, accent: -6447721 },
      { main: -15295332, accent: -15295332 },
      { main: -7785800, accent: -7785800 },
      { main: -12827478, accent: -12827478 },
      { main: -8170446, accent: -8170446 },
      { main: -10585066, accent: -10585066 },
      { main: -5231066, accent: -5231066 },
      { main: -14869215, accent: -14869215 },
      { main: -75715, accent: -8337633 }
    ]
  }

  for (const [type, list] of Object.entries(removals)) {
    list.forEach((entry) => {
      let id
      if (typeof entry === "string") {
        id = entry
      } else if (entry.special) {
        id = entry.special
      } else {
        id = `sophisticatedstorage:${type}[sophisticatedcore:main_color=${entry.main},sophisticatedcore:accent_color=${entry.accent}]`
      }
      event.remove(Ingredient.of(id))
    })
  }
})
