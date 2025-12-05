// server_scripts/recipes/mods/ftb/custom_machinery/enderic_infuser.js

ServerEvents.recipes((event) => {
  // --- Helpers --------------------------------------------------------------

  function addEndericInfuserRecipe(input, input_1, fluid_input, fluid_amount, output) {
    event.recipes.custommachinery
      .custom_machine("ftb:enderic_infuser", 20)
      .requireSU(256, 128)
      .requireItem(input, "item_input")
      .requireItem(input_1, "item_input_1")
      .requireFluid(Fluid.of(fluid_input, fluid_amount))
      .produceItem(output, "item_output")
      .requireTempCelsius("(450,)")
      .id(`ftb:enderic_infuser/${output.split(":")[1]}`);

    console.log(`Adding Enderic Infuser Recipe for: ${output.split(":")[1]}`);
  }

  // --- Data -----------------------------------------------------------------

  const enderic_infuser_recipes = [
    {input: "8x minecraft:iron_ingot", input_1: "ftbmaterials:platinum_ingot" , fluid_input: "mffs:fortron_fluid", fluid_amount: 4000, output: "9x ftb:fortron_infused_ingot"},
    {input: "8x minecraft:iron_block", input_1: "ftbmaterials:platinum_block" , fluid_input: "mffs:fortron_fluid", fluid_amount: 36000, output: "9x ftb:fortron_infused_block"},
    {input: "8x minecraft:ender_pearl", input_1: "minecraft:dragon_egg" , fluid_input: "mffs:fortron_fluid", fluid_amount: 1000, output: "18x chicken_roost:ingot_enderium"}
  ];

  // --- Builder --------------------------------------------------------------

  enderic_infuser_recipes.forEach((recipe) => {

    addEndericInfuserRecipe(recipe.input, recipe.input_1, recipe.fluid_input, recipe.fluid_amount, recipe.output);

  });

});
