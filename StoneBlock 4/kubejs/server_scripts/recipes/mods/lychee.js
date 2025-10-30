ServerEvents.recipes((event) => {
  event
    .custom({
      type: "lychee:item_inside",
      item_in: "minecraft:gravel",
      block_in: "minecraft:fire",
      max_repeats: 64,
      post: [{ type: "drop_item", id: "enderio:grains_of_infinity" }],
    })
    .id("ftb:lychee/gravel_to_grains_of_infinity_fire");

});
