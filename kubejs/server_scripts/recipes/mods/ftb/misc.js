const hammerTypes = [
  ["#c:cobblestones", "stone"],
  ["#c:ingots/iron", "iron"],
  ["#c:ingots/gold", "gold"],
  ["#c:gems/diamond", "diamond"],
  ["#c:ingots/netherite", "netherite"],
];

ServerEvents.recipes((event) => {
  //Stonecutter Transmute Recipes
  const stonecutting = event.stonecutting;
  var transmute = function (arrayOfBlocks) {
    var cpt = 0;
    while (cpt < arrayOfBlocks.length) {
      var otherBlocks = arrayOfBlocks.slice(0, cpt).concat(arrayOfBlocks.slice(cpt + 1));
      stonecutting(arrayOfBlocks[cpt], otherBlocks);
      cpt++;
    }
  };

  event.shapeless("ftb:blaze_lamp", ["9x minecraft:blaze_rod"]).id("ftb:crafting/blaze_lamp");

  event
    .shapeless("ftb:player_upgrade", ["apotheosis:iron_upgrade_smithing_template", "minecraft:player_head"])
    .id("ftb:crafting/player_upgrade");

  event
    .shaped(Item.of("chisel_chipped_integration:metal_cobalt_thermal", 32), ["SLS", "SAS", "SLS"], {
      S: "minecraft:stone",
      L: "minecraft:lapis_lazuli",
      A: "minecraft:amethyst_shard",
    })
    .id("ftb:chisel/cobalt_thermal");

  event
    .shaped(Item.of("minecraft:cobblestone"), ["CC", "CC"], {
      C: "ftb:stone_pebble",
    })
    .id("ftb:ftb/crafting/stone_pebble");

  event
    .shaped(Item.of("minecraft:andesite"), ["CC", "CC"], {
      C: "ftb:andesite_pebble",
    })
    .id("ftb:ftb/crafting/andesite_pebble");

  event
    .shaped(Item.of("minecraft:diorite"), ["CC", "CC"], {
      C: "ftb:diorite_pebble",
    })
    .id("ftb:ftb/crafting/diorite_pebble");

  hammerTypes.forEach((type) => {
    event
      .shaped(`ftbstuff:${type[1]}_hammer`, ["RSR", " S ", " S "], {
        R: type[0],
        S: ["ftbstuff:stone_rod", "minecraft:stick"],
      })
      .id(`ftb:ftbstuff/crafting/${type[1]}_hammer`);
  });

  event
    .shaped("ftb:mighty_chicken_egg", ["DPD", "PMP", "DPD"], {
      D: "#c:gems/dimensional_shard",
      P: "#c:ender_pearls",
      M: "projecte:dark_matter",
    })
    .id("ftb:crafting/mighty_chicken_egg");

  event
    .shaped("mecrh:music_disc_chicken_of_chaos", ["DPD", "PMP", "DPD"], {
      D: "#c:gems/dimensional_shard",
      P: "#c:ender_pearls",
      M: "#c:music_discs",
    })
    .id("ftb:crafting/mighty_chicken_disc");

  event
    .shaped("ftbunearthed:crude_brush", ["  S", " P ", "I  "], {
      S: "farmersdelight:straw",
      P: "#ftb:pebble",
      I: "minecraft:stick",
    })
    .id("ftb:unearthed/crafting/crude_brush");

  event
    .shaped("ftbunearthed:core", ["TTT", "T T", "SSS"], {
      T: "minecraft:tinted_glass",
      S: "minecraft:polished_deepslate_slab",
    })
    .id("ftb:unearthed/crafting/unearther");

  //Magmalith =========================
  addRecipeProductiveMetalworksBlockCastingRecipe(
    event,
    "ftbstuff:compressed_basalt_2",
    "minecraft:lava",
    1000,
    "ftb:magmalith",
    "ftb:productivemetalworks/casting/magmalith"
  );

  event.custom({
    type: "ftbstuff:supercooler",
    energy: {
      fe_per_tick: 250,
      ticks_to_process: 100,
    },
    fluid: {
      amount: 1000,
      fluid: "minecraft:lava",
    },
    inputs: [
      {
        item: "ftbstuff:compressed_basalt_2",
      },
    ],
    result: {
      count: 1,
      id: "ftb:magmalith",
    },
  });

  // ==================================

  event
    .shaped("ftb:clapple", ["CCC", "CAC", "CCC"], {
      C: "minecraft:clay_ball",
      A: "minecraft:apple",
    })
    .id("ftb:ftb/crafting/clapple");

  //reinforced brush
  event
    .custom({
      type: "minecraft:smithing_transform",
      template: { item: "apotheosis:iron_upgrade_smithing_template" },
      base: { item: "minecraft:brush" },
      addition: { item: "minecraft:diamond" },
      // ItemStack schema: id (+ optional count/components)
      result: { id: "ftbunearthed:reinforced_brush", count: 1 },
    })
    .id("ftb:smithing/reinforced_brush");

  //Fortron Block Recipe
  event
    .shaped(Item.of("ftb:fortron_infused_block"), ["FFF", "FFF", "FFF"], {
      F: "ftb:fortron_infused_ingot",
    })
    .id("ftb:ftb/crafting/fortron_block");
  event
    .shapeless(Item.of("ftb:fortron_infused_ingot", 9), ["ftb:fortron_infused_block"])
    .id("ftb:ftb/decompressing/fortron_block");

  //Enderium Block Recipe
  event
    .shaped(Item.of("ftb:enderium_block"), ["FFF", "FFF", "FFF"], {
      F: "chicken_roost:ingot_enderium",
    })
    .id("ftb:ftb/crafting/enderium_block");
  event
    .shapeless(Item.of("chicken_roost:ingot_enderium", 9), ["ftb:enderium_block"])
    .id("ftb:ftb/decompressing/enderium_block");

  event
    .shaped(Item.of("ftbstuff:stone_rod", 2), ["C", "C"], {
      C: "#c:cobblestones",
    })
    .id("ftb:crafting/stone_rod");

  event
    .shaped(Item.of("ftbstuff:wooden_basin"), ["W W", "W W", "WWW"], {
      W: "#minecraft:logs",
    })
    .id("ftb:crafting/wooden_basin");

  event.campfireCooking("ftb:dry_leaves", "#minecraft:leaves", 0.1, 600).id("ftb:campfire/dry_leaves");

  //Adding Alloying Recipes for and with Ported Custom Alloys from NC ===================

  //Tin Silver Alloy =====
  event
    .custom({
      type: "productivemetalworks:fluid_alloying",
      fluids: [
        {
          amount: 3,
          tag: "c:molten_tin",
        },
        {
          amount: 1,
          tag: "c:molten_silver",
        },
      ],
      result: {
        amount: 4,
        id: "ftb:molten_tin_silver_alloy",
      },
      speed: 10,
    })
    .id("ftb:productivemetalworks/fluid_alloying/tin_silver_alloy");

  event
    .custom({
      type: "productivemetalworks:fluid_alloying",
      fluids: [
        {
          amount: 20,
          tag: "c:molten_glowstone",
        },
        {
          amount: 90,
          fluid: "ftb:molten_tin_silver_alloy",
        },
      ],
      result: {
        amount: 90,
        id: "productivemetalworks:molten_lumium",
      },
      speed: 10,
    })
    .id("ftb:productivemetalworks/fluid_alloying/lumium_from_alloy");

  event
    .shapeless(Item.of("minecraft:lapis_lazuli", 4), ["supplementaries:lapis_bricks"])
    .id("ftb:supplementaries/lapis_uncraft");
  // ==============================================================================================

  event.stonecutting("twilightforest:aurora_block", `minecraft:stone`).id(`ftb:twilightforest/stonecutting/aurora`);

  //Adding Recipes for the Decorative Portal Blocks ====
  event
    .shaped(Item.of("ftb:decorative_test_cube", 4), ["IGI", "GPG", "IGI"], {
      I: "#c:plates/iron",
      G: "#c:glass_blocks",
      P: "ftb:portal_gun",
    })
    .replaceIngredient("ftb:portal_gun", "ftb:portal_gun")
    .id("ftb:shaped/decorative_test_cube");

  const transmuteable_portal_decorative_blocks = [
    "ftb:decorative_companion_cube",
    "ftb:decorative_blue_core",
    "ftb:decorative_purple_core",
    "ftb:decorative_red_core",
    "ftb:decorative_orange_core",
  ];

  transmuteable_portal_decorative_blocks.forEach((block) => {
    transmute(["ftb:decorative_test_cube", block]);
  });
  // ==============================================================================================

  const colors = [
    "white",
    "light_gray",
    "gray",
    "black",
    "brown",
    "red",
    "orange",
    "yellow",
    "lime",
    "green",
    "cyan",
    "light_blue",
    "blue",
    "purple",
    "magenta",
    "pink",
  ];

  for (let color of colors) {
    // Adding Concrete Powder recipes
    event
      .shaped(Item.of(`minecraft:${color}_concrete`, 8), ["PPP", "PWP", "PPP"], {
        P: `minecraft:${color}_concrete_powder`,
        W: "#c:buckets/water",
      })
      .id(`ftb:${color}_concrete_from_powder`);

    //Adding Glazed Terracotta recipes
    var input = `minecraft:${color}_terracotta`;
    var output = `minecraft:${color}_glazed_terracotta`;

    event.smelting(output, input).id(`minecraft:${color}_glazed_terracotta_smelting`);

    event.blasting(output, input).id(`minecraft:${color}_glazed_terracotta_blasting`);
  }

  //Adding Compacting Drawer Recipes for FTB's Pebbles.
  addFunctionalStorageCompactingRecipe(
    event,
    ["ftb:stone_pebble", 4],
    "minecraft:cobblestone",
    `ftb:functional_storage/compacting/pebbles/stone`
  );
  addFunctionalStorageCompactingRecipe(
    event,
    ["ftb:andesite_pebble", 4],
    "minecraft:andesite",
    `ftb:functional_storage/compacting/pebbles/andesite`
  );
  addFunctionalStorageCompactingRecipe(
    event,
    ["ftb:diorite_pebble", 4],
    "minecraft:diorite",
    `ftb:functional_storage/compacting/pebbles/diorite`
  );

  //Adding Bauble Hearts Wither Bones
  event.stonecutting("bhc:wither_bone", "minecraft:wither_skeleton_skull").id("ftb:wither_bones");

  // Multiblock Printer
  event
    .shaped("ftb:multiblock_printer", ["RGQ", "GCG", "QGR"], {
      R: "#c:dusts/redstone",
      Q: "#c:gems/quartz",
      G: "#c:glass_panes",
      C: "#c:ingots/copper",
    })
    .id("ftb:crafting/multiblock_printer");
  
  event
    .shaped("ftb:multiblock_validator", [
      " GR", 
      "GCG", 
      "RG "
    ], {
      R: "#c:dusts/redstone",
      G: "#c:glass_panes",
      C: "minecraft:spyglass",
    })
    .id("ftb:crafting/multiblock_validator");
});
