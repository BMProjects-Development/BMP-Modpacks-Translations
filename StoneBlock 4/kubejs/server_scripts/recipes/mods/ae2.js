ServerEvents.recipes((event) => {
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

});
