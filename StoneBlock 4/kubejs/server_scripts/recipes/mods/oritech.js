const oritechRecipeRemovals = [
  "oritech:crafting/techdoor",
  "oritech/atomicforge/compat/mekanism/advanced_control_circuit",
  "oritech/atomicforge/compat/mekanism/basic_control_circuit",
  "oritech/atomicforge/compat/mekanism/elite_control_circuit",
  "oritech/atomicforge/compat/mekanism/ultimate_control_circuit",
  "oritech/centrifuge/compat/enderio/endericcompound",
  "oritech/centrifuge/compat/immersiveengineering/carbon_fibre_strands",
  "oritech/compat/actuallyadditions/pressing/biomass",
  "oritech/compat/ae2/charger/fluxite",
  "oritech/compat/enderio/alloy/biosteel",
  "oritech/compat/enderio/alloy/biosteel",
  "oritech/compat/enderio/alloy/steel",
  "oritech/compat/enderio/crafting/fluidpipe",
  "oritech/compat/enderio/crafting/pump",
  "oritech/compat/enderio/firecrafting/endstone",
  "oritech/compat/enderio/firecrafting/sculk",
  "oritech/compat/immersiveengineering/alloying/biosteel",
  "oritech/compat/immersiveengineering/arcalloying/biosteel",
  "oritech/compat/mekanism/infusing/biosteel_dust",
  "oritech/compat/powah/energizing/energite",
  "oritech/compat/powah/energizing/fluxite",
  "oritech/compat/powah/energizing/uranite",
  "oritech/compat/productivemetalworks/alloying/biosteel",
  "oritech/compat/productivemetalworks/alloying/turbofuel",
  "oritech/cooler/compat/pneumaticcraft/plastic",
  "oritech/foundry/alloy/compat/enderio/copperalloy",
  "oritech/foundry/alloy/compat/enderio/darksteel",
  "oritech/foundry/alloy/compat/enderio/energeticalloy",
  "oritech/foundry/alloy/compat/enderio/pulsatingalloy",
  "oritech/foundry/alloy/compat/enderio/redstonealloy",
  "oritech/foundry/alloy/compat/enderio/soularium",
  "oritech/foundry/alloy/compat/enderio/vibrantalloy",
  "oritech/mixing/compat/create/biosteel",
  "oritech/mixing/compat/create/steel",
  "oritech:compat/enderio/crafting/fluidpipe",
  "oritech:crafting/pulverizer",
  "oritech:crafting/assembler",
  "oritech:crafting/electricfurnacealt",
  "oritech:crafting/droneportalt",
  "oritech:crafting/catalyst_alt",
  "oritech:compat/enderio/crafting/pump",
  "oritech:crafting/charger",
  "oritech:crafting/core2alt",
  "oritech:crafting/core3alt",
  "oritech:crafting/addon/processingalt",
  "oritech:centrifuge/fluid/siliconwafers",
  "oritech:compat/ae2/charger/fluxite",
];

ServerEvents.recipes((event) => {
  event
    .custom({
      type: "oritech:centrifuge_fluid",
      fluidInput: {
        amount: 1000,
        fluid: "productivemetalworks:molten_carbon",
      },
      ingredients: [
        {
          item: "ftbmaterials:charcoal_dust",
        },
      ],
      results: [
        {
          count: 1,
          id: "minecraft:diamond",
        },
      ],
      time: 80,
    })
    .id("ftb:oritech/centrifuge_fluid/charcoal_to_diamond");

  event
    .custom({
      type: "oritech:centrifuge_fluid",
      fluidInput: {
        amount: 1000,
        fluid: "productivemetalworks:molten_carbon",
      },
      ingredients: [
        {
          item: "ftbmaterials:coal_dust",
        },
      ],
      results: [
        {
          count: 1,
          id: "minecraft:diamond",
        },
      ],
      time: 80,
    })
    .id("ftb:oritech/centrifuge_fluid/coal_to_diamond");

  //Removing Oritech's Alternate or Not Needed Compat with other Mods.
  oritechRecipeRemovals.forEach((recipeId) => {
    event.remove({ id: recipeId });
  });

  //Reading Oritech's Tech Door Recipe so it avoids a conflict with IE.
  event
    .shaped(Item.of("oritech:tech_door", 1), ["SS ", "CC ", "SS "], {
      C: "#c:ingots/copper",
      S: "#c:ingots/steel",
    })
    .id("ftb:oritech/crafting/techdoor");

  event
    .shaped(Item.of("oritech:reactor_fuel_port", 1), [" P ", "EEE", "SFS"], {
      P: "oritech:transparent_item_pipe",
      E: "#c:ingots/electrum",
      S: "immersiveengineering:component_steel",
      F: "oritech:reactor_wall",
    })
    .id("ftb:oritech/crafting/reactor_fuel_port");

  event
    .shaped(Item.of("oritech:magnetic_coil", 2), ["CCC", "III", "CCC"], {
      C: "#c:wires/copper",
      I: "#c:ingots/invar",
    })
    .id("ftb:oritech/crafting/magnetic_coil");

  event
    .custom({
      type: "oritech:particle_collision",
      fluidInput: {
        amount: 0,
        fluid: "minecraft:empty",
      },
      fluidOutputs: [],
      ingredients: [
        {
          item: "projecte:red_matter",
        },
        {
          item: "mekanism:pellet_antimatter",
        },
      ],
      results: [
        {
          count: 1,
          id: "oritech:black_hole_block",
        },
      ],
      time: 50000,
    })
    .id("ftb:oritech/particle_collision/black_hole");

  event
    .custom({
      type: "oritech:particle_collision",
      fluidInput: {
        amount: 0,
        fluid: "minecraft:empty",
      },
      fluidOutputs: [],
      ingredients: [
        {
          item: "avaritia:neutronium_ingot",
        },
        {
          item: "mekanism:pellet_antimatter",
        },
      ],
      results: [
        {
          count: 64,
          id: "ftb:stable_antimatter",
        },
      ],
      time: 5000,
    })
    .id("ftb:oritech/particle_collision/stable_antimatter");

  event
    .custom({
      type: "oritech:pulverizer",
      fluidInput: {
        amount: 0,
        fluid: "minecraft:empty",
      },
      fluidOutputs: [],
      ingredients: [
        {
          tag: "c:obsidians",
        },
      ],
      results: [
        {
          count: 4,
          id: "ftbmaterials:obsidian_dust",
        },
      ],
      time: 120,
    })
    .id("ftb:oritech/pulverizer/obsidian_dust");

  event
    .custom({
      type: "oritech:refinery",
      fluidInput: {
        amount: 250,
        fluid: "productivemetalworks:molten_carbon",
      },
      fluidOutputs: [
        {
          amount: 2000,
          fluid: "oritech:still_oil",
        },
      ],
      ingredients: [
        {
          tag: "c:slime_balls",
        },
      ],
      results: [],
      time: 80,
    })
    .id("ftb:oritech/refinery/still_oil");

  //Exo Armor Requiring exclusively Carbon Plating
  const exo_recipes = [
    "oritech:crafting/exohelm",
    "oritech:crafting/exochest",
    "oritech:crafting/exolegs",
    "oritech:crafting/exoboots",
  ];

  exo_recipes.forEach((recipe) => {
    event.replaceInput(
      { id: recipe },
      "#oritech:plating",
      "oritech:carbon_plating_block"
    );
  });
});
