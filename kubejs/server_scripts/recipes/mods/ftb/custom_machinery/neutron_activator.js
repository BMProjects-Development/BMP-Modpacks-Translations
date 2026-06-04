ServerEvents.recipes((event) => {
  function addNeutronActivatorRecipe(chemical_input, chemical_output, ticks) {
    event.recipes.custommachinery
      .custom_machine("ftb:neutron_activator", ticks)
      .requireItem("avaritia:neutron_pile")
      .requireTempCelsius("(420,)")
      .requireChemicalPerTick(`${chemical_input}`)
      .produceChemicalPerTick(`${chemical_output}`)
      .requireStructure(
        FTBStructures$NeutronActivator.main.pattern,
        FTBStructures$NeutronActivator.main.keys,
      );
    console.log(
      `Adding Neutron Activation Recipe for: ${chemical_output.split(":")[1]} from ${chemical_input.split(":")[1]}`
    );
  }

  const neutron_activator_recipes = [
    { chemical_input: "10x mekanism:nuclear_waste", chemical_output: "2x mekanism:polonium", ticks: 900 },
    { chemical_input: "32x mekanism:lithium", chemical_output: "32x mekanismgenerators:tritium", ticks: 900 },
  ];

  neutron_activator_recipes.forEach((recipe) => {
    addNeutronActivatorRecipe(recipe.chemical_input, recipe.chemical_output, recipe.ticks);
  });
});
