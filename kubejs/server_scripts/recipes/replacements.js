//priority 5
ServerEvents.recipes((event) => {
  event.replaceInput(
    { type: "minecraft:crafting_shaped" },
    "minecraft:water_bucket",
    "#c:buckets/water"
  );
  event.replaceInput(
    { type: "minecraft:crafting_shapeless" },
    "minecraft:water_bucket",
    "#c:buckets/water"
  );
  event.replaceInput(
    { type: "minecraft:crafting_shaped" },
    "minecraft:lava_bucket",
    "#c:buckets/lava"
  );
  event.replaceInput(
    { type: "minecraft:crafting_shapeless" },
    "minecraft:lava_bucket",
    "#c:buckets/lava"
  );
});
