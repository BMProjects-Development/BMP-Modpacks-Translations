// priority: 987

ServerEvents.recipes((event) => {
  if (global.enableClusters === true) {
    global.clusterTypes.forEach((material) => {
      addFunctionalStorageCompactingRecipe(
        event,
        [`ftbmaterials:${material}_chunk`, 4],
        `ftbmaterials:${material}_cluster`,
        `ftb:functional_storage/compacting/chunks/${material}`
      )
    })
  }

  addFunctionalStorageCompactingRecipe(
    event,
    ["ftbmaterials:diamond_nugget", 9],
    ["minecraft:diamond", 1],
    "ftb:functional_storage/compacting/diamond_nugget"
  )

  addFunctionalStorageCompactingRecipe(
    event,
    ["ftbmaterials:copper_nugget", 9],
    ["minecraft:copper_ingot", 1],
    "ftb:functional_storage/compacting/copper_nugget"
  )

  addFunctionalStorageCompactingRecipe(
    event,
    ["ftbmaterials:charcoal_tiny", 8],
    ["minecraft:charcoal", 1],
    "ftb:functional_storage/compacting/tiny_charcoal"
  )

  addFunctionalStorageCompactingRecipe(
    event,
    ["ftbmaterials:coal_tiny", 8],
    ["minecraft:coal", 1],
    "ftb:functional_storage/compacting/tiny_coal"
  )

  addFunctionalStorageCompactingRecipe(
    event,
    ["actuallyadditions:black_quartz", 4],
    ["actuallyadditions:black_quartz_block", 1],
    "ftb:functional_storage/compacting/black_quartz"
  )

  addFunctionalStorageCompactingRecipe(
    event,
    ["minecraft:clay_ball", 4],
    ["minecraft:clay", 1],
    "ftb:functional_storage/compacting/clay_ball"
  )
})
