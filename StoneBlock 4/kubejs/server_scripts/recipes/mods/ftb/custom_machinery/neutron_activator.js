ServerEvents.recipes((event) => {
  function addNeutronActivatorRecipe(chemical_input, chemical_output, ticks) {
    event.recipes.custommachinery
      .custom_machine("ftb:neutron_activator", ticks)
      .requireItem("avaritia:neutron_pile")
      .requireTempCelsius("(120,)")
      .requireChemicalPerTick(`${chemical_input}`)
      .produceChemicalPerTick(`${chemical_output}`)
      .requireStructure([["aaa","a a","aaa"," m "],["aba","bcb","aba","   "],["aba","bdb","aba","   "],["aaa","aea","aaa","   "]], {"a":"oritech:carbon_plating_block","b":"cognition:whisperglass","c":"oritech:reactor_reflector","d":"oritech:reactor_vent","e":"actuallyadditions:empowered_void_crystal_block"})
    console.log(`Adding Neutron Activation Recipe for: ${chemical_output.split(":")[1]} from ${chemical_input.split(":")[1]}`);
  }

  const neutron_activator_recipes = [
    { chemical_input: "5x mekanism:nuclear_waste", chemical_output: "1x mekanism:polonium", ticks: 14400 },
    { chemical_input: "1x mekanism:lithium", chemical_output: "1x mekanismgenerators:tritium", ticks: 14400 }
  ]

  neutron_activator_recipes.forEach((recipe) => {
    addNeutronActivatorRecipe(recipe.chemical_input, recipe.chemical_output, recipe.ticks)
  });

})
