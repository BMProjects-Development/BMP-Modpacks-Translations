
ServerEvents.recipes((event) => {

 /**
   * Adds an Advanced AE reaction recipe with per-recipe energy and fluid amounts.
   * @param {Object} r
   * @param {string} r.idPath - Suffix for the recipe id.
   * @param {string} r.inputFluid - Fluid ID for the input (e.g. "minecraft:water").
   * @param {number} r.inputAmount - Millibuckets of input fluid.
   * @param {string} r.inputItem - Item ID for the catalyst/item input.
   * @param {string} r.outputFluid - Fluid ID for the output.
   * @param {number} r.outputAmount - Millibuckets of output fluid.
   * @param {number} r.energy - FE consumed by the reaction.
   */
  function addReaction(r) {
    event.custom({
      type: "advanced_ae:reaction",
      input_energy: r.energy,
      input_fluid: {
        amount: r.inputAmount,
        ingredient: { fluid: r.inputFluid }
      },
      input_items: [
        { ingredient: { item: r.inputItem } }
      ],
      output: {
        "#": r.outputAmount,
        "#t": "ae2:f",
        id: r.outputFluid
      }
    }).id(`ftb:jdt/fluidconversion/${r.idPath}`);
  }

  event
    .custom({
      type: "ae2:entropy",
      input: {
        block: {
          id: "minecraft:stone",
        },
      },
      mode: "heat",
      output: {
        fluid: {
          id: "minecraft:lava",
        },
      },
    })
    .id("ftb:ae2/lava");

  event
    .custom({
      type: "extendedae:circuit_cutter",
      input: {
        ingredient: {
          item: "mekanism:hdpe_sheet",
        },
      },
      output: {
        count: 32,
        id: "industrialforegoing:plastic",
      },
    })
    .id("ftb:ae2/slicer/plastic");

// ---------------------------------------------------------------------------
  // Configure per-recipe values here
  // ---------------------------------------------------------------------------
  const reactions = [
    // 1000mb water + polymorphic_catalyst -> 1000mb polymorphic_fluid_source
    {
      idPath: "water_to_polymorphic",
      inputFluid: "minecraft:water",
      inputAmount: 1000,
      inputItem: "justdirethings:polymorphic_catalyst",
      outputFluid: "justdirethings:polymorphic_fluid_source",
      outputAmount: 1000,
      energy: 20000
    },

    // 1000mb polymorphic_fluid_source + time_crystal -> 1000mb time_fluid_source
    {
      idPath: "polymorphic_to_time",
      inputFluid: "justdirethings:polymorphic_fluid_source",
      inputAmount: 1000,
      inputItem: "justdirethings:time_crystal",
      outputFluid: "justdirethings:time_fluid_source",
      outputAmount: 1000,
      energy: 100000
    },

    // 1000mb polymorphic_fluid_source + portal_fluid_catalyst -> 1000mb unstable_portal_fluid_source
    {
      idPath: "polymorphic_to_unstable_portal",
      inputFluid: "justdirethings:polymorphic_fluid_source",
      inputAmount: 1000,
      inputItem: "justdirethings:portal_fluid_catalyst",
      outputFluid: "justdirethings:unstable_portal_fluid_source",
      outputAmount: 1000,
      energy: 50000
    },

    // coal_t2 + 1000mb polymorphic_fluid_source -> 1000mb unrefined_t2_fluid_source
    {
      idPath: "t2_unrefined",
      inputFluid: "justdirethings:polymorphic_fluid_source",
      inputAmount: 1000,
      inputItem: "justdirethings:coal_t2",
      outputFluid: "justdirethings:unrefined_t2_fluid_source",
      outputAmount: 1000,
      energy: 25000
    },

    // coal_t3 + 1000mb refined_t2_fluid_source -> 1000mb unrefined_t3_fluid_source
    {
      idPath: "t3_unrefined",
      inputFluid: "justdirethings:refined_t2_fluid_source",
      inputAmount: 1000,
      inputItem: "justdirethings:coal_t3",
      outputFluid: "justdirethings:unrefined_t3_fluid_source",
      outputAmount: 1000,
      energy: 30000
    },

    // coal_t4 + 1000mb refined_t3_fluid_source -> 1000mb unrefined_t4_fluid_source
    {
      idPath: "t4_unrefined",
      inputFluid: "justdirethings:refined_t3_fluid_source",
      inputAmount: 1000,
      inputItem: "justdirethings:coal_t4",
      outputFluid: "justdirethings:unrefined_t4_fluid_source",
      outputAmount: 1000,
      energy: 35000
    }
  ];

  // Register all reactions
  reactions.forEach(addReaction);

});
