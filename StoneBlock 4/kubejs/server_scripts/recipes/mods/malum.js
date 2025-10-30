ServerEvents.recipes((event) => {
  event
    .custom({
      type: "malum:favor_of_the_void",
      ingredient: {
        item: "minecraft:glow_berries",
      },
      output: {
        count: 1,
        id: "minecraft:glowstone_dust",
      },
    })
    .id("ftb:malum/glowstone_favor");
});
