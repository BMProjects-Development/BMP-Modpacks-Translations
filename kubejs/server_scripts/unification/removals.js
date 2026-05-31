// priority: 10

ServerEvents.recipes((event) => {
  // === Remove explicit recipes

  if (Array.isArray(removeRecipe) && removeRecipe.length > 0) {
    event.remove(removeRecipe)
  }
})
