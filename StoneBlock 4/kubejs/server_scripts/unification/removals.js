// priority: 10

ServerEvents.recipes((event) => {
  // === Remove explicit recipes

  if (Array.isArray(global.removeRecipe) && global.removeRecipe.length > 0) {
    event.remove(global.removeRecipe)
  }
})
