ServerEvents.recipes((event) => {
  function addCokeRecipe(input, output, creosote_amount, ticks) {
    event.recipes.custommachinery
      .custom_machine("ftb:advanced_coke_oven", 900)
      .requireItem(input)
      .requireFuel()
      .requireEnergyPerTick(ticks)
      .produceItem(output)
      .produceFluid(Fluid.of("immersiveengineering:creosote", creosote_amount))
  }

  const coke_oven_recipes = [
    { input: "#minecraft:logs_that_burn", output: "minecraft:charcoal", creosote_amount: 500, ticks: 900 },
    { input: "minecraft:coal", output: "ftbmaterials:coal_coke_gem", creosote_amount: 500, ticks: 900 },
    { input: "minecraft:coal_block", output: "ftbmaterials:coal_coke_block", creosote_amount: 4500, ticks: 8100 }
  ]

  coke_oven_recipes.forEach((recipe) => {
    addCokeRecipe(recipe.input, recipe.output, recipe.creosote_amount, recipe.ticks)
  })
})
