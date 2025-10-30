ServerEvents.recipes((event) => {
  //Smithing Upgrade Recipes
  const smithing_template_recipes = [
    {
      template: "ftb:dark_matter_smithing_template",
      addition: "projecte:dark_matter",
      input: "minecraft:netherite_helmet",
      output: "projecte:dm_helmet",
    },
    {
      template: "ftb:dark_matter_smithing_template",
      addition: "projecte:dark_matter",
      input: "minecraft:netherite_chestplate",
      output: "projecte:dm_chestplate",
    },
    {
      template: "ftb:dark_matter_smithing_template",
      addition: "projecte:dark_matter",
      input: "minecraft:netherite_leggings",
      output: "projecte:dm_leggings",
    },
    {
      template: "ftb:dark_matter_smithing_template",
      addition: "projecte:dark_matter",
      input: "minecraft:netherite_boots",
      output: "projecte:dm_boots",
    },
    {
      template: "ftb:dark_matter_smithing_template",
      addition: "projecte:dark_matter",
      input: "minecraft:netherite_sword",
      output: "projecte:dm_sword",
    },
    {
      template: "ftb:dark_matter_smithing_template",
      addition: "projecte:dark_matter",
      input: "minecraft:netherite_pickaxe",
      output: "projecte:dm_pick",
    },
    {
      template: "ftb:dark_matter_smithing_template",
      addition: "projecte:dark_matter",
      input: "minecraft:netherite_axe",
      output: "projecte:dm_axe",
    },
    {
      template: "ftb:dark_matter_smithing_template",
      addition: "projecte:dark_matter",
      input: "minecraft:netherite_shovel",
      output: "projecte:dm_shovel",
    },
    {
      template: "ftb:dark_matter_smithing_template",
      addition: "projecte:dark_matter",
      input: "minecraft:netherite_hoe",
      output: "projecte:dm_hoe",
    },
    {
      template: "ftb:dark_matter_smithing_template",
      addition: "projecte:dark_matter",
      input: "ftbstuff:netherite_hammer",
      output: "projecte:dm_hammer",
    },

    {
      template: "ftb:red_matter_smithing_template",
      addition: "projecte:red_matter",
      input: "projecte:dm_helmet",
      output: "projecte:rm_helmet",
    },
    {
      template: "ftb:red_matter_smithing_template",
      addition: "projecte:red_matter",
      input: "projecte:dm_chestplate",
      output: "projecte:rm_chestplate",
    },
    {
      template: "ftb:red_matter_smithing_template",
      addition: "projecte:red_matter",
      input: "projecte:dm_leggings",
      output: "projecte:rm_leggings",
    },
    {
      template: "ftb:red_matter_smithing_template",
      addition: "projecte:red_matter",
      input: "projecte:dm_boots",
      output: "projecte:rm_boots",
    },
    {
      template: "ftb:red_matter_smithing_template",
      addition: "projecte:red_matter",
      input: "projecte:dm_sword",
      output: "projecte:rm_sword",
    },
    {
      template: "ftb:red_matter_smithing_template",
      addition: "projecte:red_matter",
      input: "projecte:dm_pick",
      output: "projecte:rm_pick",
    },
    {
      template: "ftb:red_matter_smithing_template",
      addition: "projecte:red_matter",
      input: "projecte:dm_axe",
      output: "projecte:rm_axe",
    },
    {
      template: "ftb:red_matter_smithing_template",
      addition: "projecte:red_matter",
      input: "projecte:dm_shovel",
      output: "projecte:rm_shovel",
    },
    {
      template: "ftb:red_matter_smithing_template",
      addition: "projecte:red_matter",
      input: "projecte:dm_hoe",
      output: "projecte:rm_hoe",
    },
    {
      template: "ftb:red_matter_smithing_template",
      addition: "projecte:red_matter",
      input: "projecte:dm_hammer",
      output: "projecte:rm_hammer",
    },
  ];

  smithing_template_recipes.forEach((recipe) => {
    event
      .custom({
        type: "minecraft:smithing_transform",
        addition: {
          item: recipe.addition,
        },
        base: {
          item: recipe.input,
        },
        result: {
          count: 1,
          id: recipe.output,
        },
        template: {
          item: recipe.template,
        },
      })
      .id(
        `ftb:smithing_transform/projecte/${recipe.input.split(":")[1]}/${
          recipe.output.split(":")[1]
        }`
      );
  });

  //New Philosopher's Stone Recipe (Uses a Material done in the World Engine)
  event
    .shaped(Item.of("projecte:philosophers_stone", 1), ["SIS", "IDI", "SIS"], {
      D: "#c:storage_blocks/diamond",
      I: "ftb:infernal_dust",
      S: "cognition:cognitive_flux",
    })
    .id("ftb:shaped/projecte/philosophers_stone");

  //New Destruction Catalyst Recipe (Uses a Material done in the World Engine)
  event
    .shaped(
      Item.of("projecte:destruction_catalyst", 1),
      ["NIN", "M M", "NIN"],
      {
        M: "projecte:mobius_fuel",
        N: "projecte:nova_catalyst",
        I: "#c:ingots/fortron_infused",
      }
    )
    .id("ftb:shaped/projecte/destruction_catalyst");

  //Harvest Goddess Band
  event
    .shaped(
      Item.of("projecte:harvest_goddess_band", 1),
      ["ESF", "DBD", "FSE"],
      {
        S: "#irregular_implements:nature_core_saplings",
        F: "#irregular_implements:nature_core_flowers",
        B: "projecte:iron_band",
        D: "projecte:dark_matter",
        E: "ars_nouveau:earth_essence",
      }
    )
    .id("ftb:shaped/projecte/harvest_goddess_band");

  //Black Hole Band
  event
    .shaped(Item.of("projecte:black_hole_band", 1), ["CEC", "DBD", "CEC"], {
      B: "projecte:iron_band",
      D: "projecte:dark_matter",
      E: "powah:ender_core",
      C: "oritech:enderic_compound",
    })
    .id("ftb:shaped/projecte/black_hole_band");

  //Ignition Ring
  event
    .shaped(Item.of("projecte:ignition_ring", 1), ["QFQ", "DBD", "QFQ"], {
      B: "projecte:iron_band",
      D: "projecte:dark_matter",
      F: "projecte:mobius_fuel",
      Q: "ars_nouveau:fire_essence",
    })
    .id("ftb:shaped/projecte/ignition_ring");

  //Zero Ring
  event.shaped(Item.of("projecte:zero_ring", 1), 
    [
      "SWS", 
      "DBD", 
      "SWS"
    ],
    {
      B: "projecte:iron_band",
      D: "projecte:dark_matter",
      W: "minecraft:wind_charge",
      S: "minecraft:powder_snow_bucket",
    }
  ).id("ftb:shaped/projecte/zero_ring");

  //Gale's Ring
  event.shaped(Item.of("projecte:swiftwolf_rending_gale", 1), 
    [
      "COS", 
      "DBD", 
      "SOS"
    ],
    {
      B: "projecte:iron_band",
      D: "projecte:dark_matter",
      C: "immersiveengineering:coil_mv",
      O: "minecraft:lightning_rod",
      S: "irons_spellbooks:lightning_bottle",
    }
  ).id("ftb:shaped/projecte/swiftwolf_rending_gale");

  //Archangel's Smite
  event.shaped(Item.of("projecte:archangel_smite", 1), 
    [
      "COS", 
      "DBD", 
      "SOS"
    ],
    {
      B: "projecte:iron_band",
      D: "projecte:dark_matter",
      C: "#c:skulls",
      O: "#c:tools/crossbow",
      S: "#minecraft:arrows",
    }
  ).id("ftb:shaped/projecte/archangel_smite");

  //Evertide Amulet
  event.shaped(Item.of("projecte:evertide_amulet", 1), 
    [
      "EEE",
      "DAD",
      "EEE"
    ],
    {
      A: "ftb:iron_amulet",
      D: "projecte:dark_matter",
      E: "ars_nouveau:water_essence",
    }
  ).id("ftb:shaped/projecte/evertide_amulet");

  //Volcanite Amulet
  event.shaped(Item.of("projecte:volcanite_amulet", 1), 
    [
      "EEE",
      "DAD",
      "EEE"
    ],
    {
      A: "ftb:iron_amulet",
      D: "projecte:dark_matter",
      E: "ars_nouveau:fire_essence",
    }
  ).id("ftb:shaped/projecte/volcanite_amulet");

  //Gem of Eternal Density
  event.shaped(Item.of("projecte:gem_of_eternal_density", 1), 
    [
      "POP",
      "DAD",
      "POP"
    ],
    {
      A: "ftb:iron_amulet",
      D: "projecte:dark_matter",
      O: "enderio:reinforced_obsidian_block",
      P: "#ftb:pistons",
    }
  ).id("ftb:shaped/projecte/gem_of_eternal_density");

  //Mercurial Eye
  event.shaped(Item.of("projecte:mercurial_eye", 1), 
    [
      "OBO",
      "BRB",
      "BIB"
    ],
    {
      B: "#chipped:bricks",
      R: "projecte:red_matter",
      O: "#chipped:obsidian",
      I: "ftb:infernal_dust",
    }
  ).id("ftb:shaped/projecte/mercurial_eye");

  //Body Stone
  event.custom({
    type: "farmersdelight:cooking",
    experience: 1.0,
    container: {
      "count": 1,
      "id": "ftb:blank_slate"
    },
    ingredients: [
      {
        "item": "farmersdelight:cooked_bacon"
      },
      {
        "item": "farmersdelight:cooked_bacon"
      },
      {
        "item": "projecte:red_matter"
      },
      {
        "item": "farmersdelight:cooked_bacon"
      },
      {
        "item": "farmersdelight:cooked_bacon"
      },
      {
        "item": "farmersdelight:hamburger"
      }
    ],
    result: {
      "count": 1,
      "id": "projecte:body_stone"
    }
  }).id("ftb:farmersdelight/cooking/projecte/body_stone");

  //Soul Stone
  event.shaped(Item.of("projecte:soul_stone", 1), 
    [
      "HMH",
      "RBR",
      "HMH"
    ],
    {
      B: "ftb:blank_slate",
      R: "projecte:red_matter",
      M: "minecraft:glistering_melon_slice",
      H: "#c:hearts",
    }
  ).id("ftb:shaped/projecte/soul_stone");

  //Mind Stone
  event.shaped(Item.of("projecte:mind_stone", 1), 
    [
      "ESE",
      "RBR",
      "ESE"
    ],
    {
      B: "ftb:blank_slate",
      R: "projecte:red_matter",
      S: "#c:bookshelves",
      E: "create:experience_nugget",
    }
  ).id("ftb:shaped/projecte/mind_stone");

});
