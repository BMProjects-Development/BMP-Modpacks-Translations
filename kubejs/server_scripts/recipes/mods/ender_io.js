ServerEvents.recipes((event) => {
  event
    .shaped(
      Item.of("enderio:void_vial"),
      [" S ", "QVQ", "GQG"],
      {
        S: "#c:ingots/soularium",
        Q: "#c:glass_blocks/fused_quartz",
        V: "minecraft:experience_bottle",
        G: "enderio:grains_of_infinity"
      }
    )
    .id("ftb:shaped/void_vial");
});
