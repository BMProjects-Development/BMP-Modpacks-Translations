ServerEvents.recipes((event) => {
  function addSnowmakerRecipe(output, ticks, slot) {
    event.recipes.custommachinery
      .custom_machine("ftb:snowmaker", ticks)
      .produceItem(output, slot)
      .id(`ftb:snowmaker/${output.split(":")[1]}`)
    console.log(`Adding Snow Maker Recipe for: ${output.split(":")[1]}`)
  }

  const snowmaker_recipes = [{ output: "8x minecraft:snowball", ticks: 80, slot: "item_output" }]

  snowmaker_recipes.forEach((recipe) => {
    addSnowmakerRecipe(recipe.output, recipe.ticks, recipe.slot)
  })

  //Adding a Recipe for the Controller Itself.
  event
    .shaped('custommachinery:custom_machine_item[custommachinery:machine="ftb:snowmaker"]', ["RPR", "CSC", "BBB"], {
      R: "#c:alloys/advanced",
      P: "ars_nouveau:water_essence",
      C: "#c:circuits/advanced",
      S: "enderio:void_chassis",
      B: "#c:ingots/aluminum"
    })
    .id("ftb:shaped/snowmaker")
})
