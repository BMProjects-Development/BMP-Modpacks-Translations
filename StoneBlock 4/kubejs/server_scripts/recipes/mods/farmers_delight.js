ServerEvents.recipes((event) => {
  event
    .custom({
      type: "farmersdelight:cutting",
      ingredients: [
        {
          tag: "minecraft:coals",
        },
      ],
      result: [
        {
          item: {
            count: 2,
            id: "minecraft:black_dye",
          },
        },
      ],
      tool: {
        tag: "ftbstuff:hammers",
      },
    })
    .id("ftb:cutting/black_dye");
});
