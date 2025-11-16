ServerEvents.recipes((event) => {
  event
    .shaped(
      Item.of("draconicevolution:dislocator"),
      ["DBD", "BEB", "DBD"],
      {
        D: "draconicevolution:draconium_dust",
        B: "minecraft:blaze_powder",
        E: "chicken_roost:ingot_enderium",
      }
    )
    .id("ftb:shaped/dislocator");
});
