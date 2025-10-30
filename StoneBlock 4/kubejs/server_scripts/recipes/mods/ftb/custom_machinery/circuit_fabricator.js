ServerEvents.recipes((event) => {
  function addCircuitFabricatorRecipe(input, input_1, input_2, output) {
    event.recipes.custommachinery
  .custom_machine("ftb:circuit_fabricator", 140 /*Ticks*/)
      .requireEnergyPerTick(40)
      .requireItem(input)
      .requireItem(input_1, "input_2")
      .requireItem(input_2)
      .produceItem(output)
      .requireStructure([["aaa","a a","ama"],["aba","bcb","a a"],["aaa","aaa","a a"]], {"a":"immersiveengineering:sheetmetal_colored_blue","b":"ae2:quartz_vibrant_glass","c":"ae2:mysterious_cube"}).id(`ftb:circuit_fabricator/${output.split(":")[1]}`);
    console.log(`Adding Circuit Fabricator Recipe for: ${output.split(":")[1]}`);
  }
  function addSimpleCircuitFabricatorRecipe(input, output) {
    event.recipes.custommachinery
  .custom_machine("ftb:circuit_fabricator", 140 /*Ticks*/)
      .requireEnergyPerTick(40)
      .requireItem(input)
      .produceItem(output)
      .requireStructure([["aaa","a a","ama"],["aba","bcb","a a"],["aaa","aaa","a a"]], {"a":"immersiveengineering:sheetmetal_colored_blue","b":"ae2:quartz_vibrant_glass","c":"ae2:mysterious_cube"}).id(`ftb:circuit_fabricator_simple/${output.split(":")[1]}`);
    console.log(`Adding Simple Circuit Fabricator Recipe for: ${output.split(":")[1]}`);
  }

  const circuit_fabricator_recipes = [
    //Printed Components ===
    { input: "ae2:certus_quartz_crystal", output: "ae2:printed_calculation_processor"},
    { input: "minecraft:gold_ingot", output: "ae2:printed_logic_processor"},
    { input: "minecraft:diamond", output: "ae2:printed_engineering_processor"},
    { input: "ftbmaterials:silicon_gem", output: "ae2:printed_silicon"},
    { input: "appflux:charged_redstone", output: "appflux:printed_energy_processor"},
    { input: "megacells:sky_steel_ingot", output: "megacells:printed_accumulation_processor"},
    { input: "advanced_ae:quantum_alloy", output: "advanced_ae:printed_quantum_processor"},
    { input: "extendedae:entro_crystal", output: "extendedae:concurrent_processor_print"},

    //AE2 Processors ===
    {
      input: "ae2:printed_calculation_processor",
      input_1: "minecraft:redstone",
      input_2: "ae2:printed_silicon",
      output: "ae2:calculation_processor"
    },
    {
      input: "ae2:printed_calculation_processor",
      input_1: "minecraft:redstone",
      input_2: "ae2:printed_silicon",
      output: "ae2:calculation_processor"
    },
    {
      input: "ae2:printed_logic_processor",
      input_1: "minecraft:redstone",
      input_2: "ae2:printed_silicon",
      output: "ae2:logic_processor"
    },
    {
      input: "ae2:printed_engineering_processor",
      input_1: "minecraft:redstone",
      input_2: "ae2:printed_silicon",
      output: "ae2:engineering_processor"
    },
    //AppliedFlux Processors ===
    {
      input: "appflux:printed_energy_processor",
      input_1: "minecraft:redstone",
      input_2: "ae2:printed_silicon",
      output: "appflux:energy_processor"
    },
    //MegaCells Processors ===
    {
      input: "megacells:printed_accumulation_processor",
      input_1: "minecraft:redstone",
      input_2: "ae2:printed_silicon",
      output: "megacells:accumulation_processor"
    },
    //Advanced AE Processors ===
    {
      input: "advanced_ae:printed_quantum_processor",
      input_1: "minecraft:redstone",
      input_2: "ae2:printed_silicon",
      output: "advanced_ae:quantum_processor"
    },
    //Extended AE Processors ===
    {
      input: "extendedae:concurrent_processor_print",
      input_1: "minecraft:redstone",
      input_2: "ae2:printed_silicon",
      output: "extendedae:concurrent_processor"
    },
  ]

  circuit_fabricator_recipes.forEach((recipe) => {
    
    //Removing Original Recipes from the Inscriber.
    event.remove({ output: recipe.output, type: "ae2:inscriber" })

    if (recipe.input_1 || recipe.input_2) {
      addCircuitFabricatorRecipe(recipe.input, recipe.input_1, recipe.input_2, recipe.output);
    } else {
      addSimpleCircuitFabricatorRecipe(recipe.input, recipe.output);
    }
  });

  //Added Controller Block Recipe to the World Engine.

})
