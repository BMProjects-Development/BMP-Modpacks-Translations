ServerEvents.recipes((event) => {
  event.custom({
    type: "occultism:spirit_fire",
    ingredient: {
      tag: "c:crops/nether_wart",
    },
    result: {
      count: 1,
      id: "irregular_implements:glowing_mushroom",
    },
  }).id("ftboccultism:spirit_fire/nether_wart_to_glowing_mushroom");
});
