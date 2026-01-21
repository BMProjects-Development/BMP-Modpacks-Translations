ServerEvents.recipes((event) => {


  function addAdvancedEmpowererRecipe(input_main, input_1, input_2, input_3, input_4, output, energy) {
    event.recipes.custommachinery
      .custom_machine("ftb:advanced_empowerer", 200)
      .requireItem(input_main, "input_main")
      .requireItem(input_1)
      .requireItem(input_2)
      .requireItem(input_3)
      .requireItem(input_4)
      .produceItem(output, "output")
      .requireEnergy(energy)
      .requireStructure(
        FTBStructures$AdvancedEmpowerer.main.pattern,
        FTBStructures$AdvancedEmpowerer.main.keys
      )
      .id(`ftb:advanced_empowerer/${output.split(":")[1]}`);

    console.log(`Adding Advanced Empowerer Recipe for: "${output}"`);
  };

  const advanced_empowerer_recipes = [
    // Crystals
    {
      input: "actuallyadditions:restonia_crystal",
      input_1: "minecraft:red_dye",
      input_2: "minecraft:redstone",
      input_3: "minecraft:nether_brick",
      input_4: "minecraft:brick",
      output: "actuallyadditions:empowered_restonia_crystal",
      energy: 50000,
    },
    {
      input: "actuallyadditions:palis_crystal",
      input_1: "minecraft:cyan_dye",
      input_2: "minecraft:prismarine_crystals",
      input_3: "minecraft:prismarine_shard",
      input_4: "minecraft:prismarine_shard",
      output: "actuallyadditions:empowered_palis_crystal",
      energy: 50000,
    },
    {
      input: "actuallyadditions:diamatine_crystal",
      input_1: "minecraft:light_blue_dye",
      input_2: "minecraft:blue_dye",
      input_3: "minecraft:clay_ball",
      input_4: "minecraft:clay_ball",
      output: "actuallyadditions:empowered_diamatine_crystal",
      energy: 50000,
    },
    {
      input: "actuallyadditions:void_crystal",
      input_1: "minecraft:black_dye",
      input_2: "minecraft:coal",
      input_3: "minecraft:gravel",
      input_4: "minecraft:stone",
      output: "actuallyadditions:empowered_void_crystal",
      energy: 50000,
    },
    {
      input: "actuallyadditions:emeradic_crystal",
      input_1: "minecraft:lime_dye",
      input_2: "minecraft:slime_ball",
      input_3: "minecraft:grass_block",
      input_4: "minecraft:short_grass",
      output: "actuallyadditions:empowered_emeradic_crystal",
      energy: 50000,
    },
    {
      input: "actuallyadditions:enori_crystal",
      input_1: "minecraft:gray_dye",
      input_2: "minecraft:snowball",
      input_3: "minecraft:stone_button",
      input_4: "minecraft:cobblestone",
      output: "actuallyadditions:empowered_enori_crystal",
      energy: 50000,
    },

    // Blocks
    {
      input: "actuallyadditions:restonia_crystal_block",
      input_1: "minecraft:red_dye",
      input_2: "minecraft:redstone_block",
      input_3: "minecraft:nether_bricks",
      input_4: "minecraft:bricks",
      output: "actuallyadditions:empowered_restonia_crystal_block",
      energy: 150000,
    },
    {
      input: "actuallyadditions:palis_crystal_block",
      input_1: "minecraft:cyan_dye",
      input_2: "minecraft:sea_lantern",
      input_3: "minecraft:prismarine",
      input_4: "minecraft:prismarine",
      output: "actuallyadditions:empowered_palis_crystal_block",
      energy: 150000,
    },
    {
      input: "actuallyadditions:diamatine_crystal_block",
      input_1: "minecraft:light_blue_dye",
      input_2: "minecraft:blue_dye",
      input_3: "minecraft:clay",
      input_4: "minecraft:clay",
      output: "actuallyadditions:empowered_diamatine_crystal_block",
      energy: 150000,
    },
    {
      input: "actuallyadditions:void_crystal_block",
      input_1: "minecraft:black_dye",
      input_2: "minecraft:coal_block",
      input_3: "minecraft:flint",
      input_4: "minecraft:stone",
      output: "actuallyadditions:empowered_void_crystal_block",
      energy: 150000,
    },
    {
      input: "actuallyadditions:emeradic_crystal_block",
      input_1: "minecraft:lime_dye",
      input_2: "minecraft:slime_block",
      input_3: "minecraft:grass_block",
      input_4: "minecraft:short_grass",
      output: "actuallyadditions:empowered_emeradic_crystal_block",
      energy: 150000,
    },
    {
      input: "actuallyadditions:enori_crystal_block",
      input_1: "minecraft:gray_dye",
      input_2: "minecraft:snow_block",
      input_3: "minecraft:stone_button",
      input_4: "minecraft:cobblestone",
      output: "actuallyadditions:empowered_enori_crystal_block",
      energy: 150000,
    },
    // Empowered Canola
    {
      input: "actuallyadditions:crystallized_canola_seed",
      input_1: "actuallyadditions:canola_seeds",
      input_2: "actuallyadditions:canola_seeds",
      input_3: "actuallyadditions:canola_seeds",
      input_4: "actuallyadditions:canola_seeds",
      output: "actuallyadditions:empowered_canola_seed",
      energy: 150000,
    },
    
  ];

  // --- Builder --------------------------------------------------------------

  advanced_empowerer_recipes.forEach((recipe) => {
    addAdvancedEmpowererRecipe(
      recipe.input,
      recipe.input_1,
      recipe.input_2,
      recipe.input_3,
      recipe.input_4,
      recipe.output,
      recipe.energy);
  });
});
