ServerEvents.tags("item", (event) => {
  event.add(
    "c:hidden_from_recipe_viewers",
    Ingredient.of(/^ftbmaterials:/).itemIds.filter(
      (id) => Array.isArray(global.hide) && global.hide.some((hidden) => id.includes(hidden))
    )
  )

  const categories = {
    rod: global.enabledRods,
    plate: global.enabledPlates,
    gear: global.enabledGears,
    wire: global.enabledWires,
    blade: global.blades
  }

  for (const [suffix, list] of Object.entries(categories)) {
    if (!Array.isArray(list)) continue // Skip undefined or non-array entries

    event.add(
      "c:hidden_from_recipe_viewers",
      Ingredient.of(new RegExp(`^ftbmaterials:.*${suffix}$`)).itemIds.filter((id) => {
        return !list.some((item) => {
          const name = Array.isArray(item) ? item[0] : item
          return id.includes(name)
        })
      })
    )
  }

  event.remove("c:hidden_from_recipe_viewers", ["ftbmaterials:coal_coke_gem", "ftbmaterials:silicon_gem"])
})

RecipeViewerEvents.removeCategories((event) => {
  if (Array.isArray(global.removeRecipeCategories)) {
    global.removeRecipeCategories.forEach((type) => {
      event.remove(type)
    })
  }
})
