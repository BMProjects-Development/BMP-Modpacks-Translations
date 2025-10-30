// priority: 987

function delight_crushing(event, material, multiplier) {
  if (material == "redstone") {
    event
      .custom({
        type: "farmersdelight:cutting",
        ingredients: [
          {
            item: `ftbmaterials:${material}_cluster`
          }
        ],
        result: [
          {
            item: {
              count: multiplier,
              id: `minecraft:${material}`
            }
          }
        ],
        sound: {
          sound_id: "minecraft:block.anvil.land"
        },
        tool: {
          tag: "ftbstuff:hammers"
        }
      })
      .id(`ftb:farmersdelight/crushing/${material}_dust`)
  } else {
    event
      .custom({
        type: "farmersdelight:cutting",
        ingredients: [
          {
            item: `ftbmaterials:${material}_cluster`
          }
        ],
        result: [
          {
            item: {
              count: multiplier,
              id: `ftbmaterials:${material}_dust`
            }
          }
        ],
        sound: {
          sound_id: "minecraft:block.anvil.land"
        },
        tool: {
          tag: "ftbstuff:hammers"
        }
      })
      .id(`ftb:farmersdelight/crushing/${material}_dust`)
  }
}

ServerEvents.recipes((event) => {
  if (global.enableClusters === true) {
    global.clusterTypes.forEach((material) => {
      if (["diamond", "lapis_lazuli", "emerald", "fluorite", "redstone", "quartz"].includes(material)) {
        return
      }
      switch (material) {
        case "redstone":
          delight_crushing(event, material, 5)
          break
        case "lapis_lazuli":
          delight_crushing(event, material, 4)
          break

        default:
          delight_crushing(event, material, 1)
          break
      }
    })
  }

  //Manually Adding Recipes =======================================================================

  const manual_hammering_recipes = [
    { input: "minecraft:amethyst_shard", output: "occultism:amethyst_dust", multiplier: 2 }
  ]

  manual_hammering_recipes.forEach((recipe) => {
    event
      .custom({
        type: "farmersdelight:cutting",
        ingredients: [
          {
            item: recipe.input
          }
        ],
        result: [
          {
            item: {
              count: 2,
              id: recipe.output
            }
          }
        ],
        sound: {
          sound_id: "minecraft:block.anvil.land"
        },
        tool: {
          tag: "ftbstuff:hammers"
        }
      })
      .id(`ftb:farmersdelight/crushing/${recipe.output.split(":")[1]}`)
  })

  // ==============================================================================================
})
