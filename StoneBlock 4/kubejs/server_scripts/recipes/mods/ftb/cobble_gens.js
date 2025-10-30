ServerEvents.recipes((event) => {
  // Tier 1 shaped recipe
  event.shaped("ftbstuff:stone_cobblestone_generator", ["RRR", "WGL", "RRR"], {
    W: "minecraft:water_bucket",
    L: "minecraft:lava_bucket",
    G: "minecraft:glass",
    R: "ftbstuff:compressed_stone"
  })

  const cobbleGenerators = [
    {
      inputBlock: "ftbstuff:stone_cobblestone_generator",
      fluidType: "iron",
      fluidAmount: 810,
      outputBlock: "ftbstuff:iron_cobblestone_generator",
      recipeID: "ftb:stuff/generators/cobble/tier_2"
    },
    {
      inputBlock: "ftbstuff:iron_cobblestone_generator",
      fluidType: "gold",
      fluidAmount: 810,
      outputBlock: "ftbstuff:gold_cobblestone_generator",
      recipeID: "ftb:stuff/generators/cobble/tier_3"
    },
    {
      inputBlock: "ftbstuff:gold_cobblestone_generator",
      fluidType: "diamond",
      fluidAmount: 900,
      outputBlock: "ftbstuff:diamond_cobblestone_generator",
      recipeID: "ftb:stuff/generators/cobble/tier_4"
    },
    {
      inputBlock: "ftbstuff:diamond_cobblestone_generator",
      fluidType: "netherite",
      fluidAmount: 810,
      outputBlock: "ftbstuff:netherite_cobblestone_generator",
      recipeID: "ftb:stuff/generators/cobble/tier_5"
    }
  ]

  cobbleGenerators.forEach((tier) => {
    addRecipeProductiveMetalworksBlockCastingRecipe(
      event,
      tier.inputBlock,
      true,
      `c:molten_${tier.fluidType}`,
      tier.fluidAmount,
      tier.outputBlock,
      tier.recipeID
    )

    event.custom({
      type: "ftbstuff:supercooler",
      energy: {
        fe_per_tick: 250,
        ticks_to_process: 100
      },
      fluid: {
        amount: tier.fluidAmount,
        fluid: `productivemetalworks:molten_${tier.fluidType}`
      },
      inputs: [{ item: tier.inputBlock }],
      result: {
        count: 1,
        id: tier.outputBlock
      }
    })
  })
})
