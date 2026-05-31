ServerEvents.recipes((event) => {
  event
    .shaped(Item.of("sfm:cable", 8), ["DDD", "PMP", "DDD"], {
      D: "minecraft:deepslate",
      P: "#c:plastics",
      M: "replication:matter_network_pipe",
    })
    .id("ftb:sfm/cable_deepslate_plastic_mnp");
});
