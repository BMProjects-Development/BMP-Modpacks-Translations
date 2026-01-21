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

  //Readding Dough Recipe - water bucket is kept
  event.shapeless(Item.of("farmersdelight:wheat_dough", 1),
    ["#c:crops/wheat", "#c:buckets/water"])
    .keepIngredient("#c:buckets/water")
    .id("ftb:farmers_delight/shapeless/wheat_dough_from_water");


});
