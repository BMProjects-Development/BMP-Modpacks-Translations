ServerEvents.recipes((event) => {
  event
    .shaped(Item.of("minecraft:crafting_table"), ["CC", "CC"], {
      C: "#c:cobblestones/normal",
    })
    .id("ftb:minecraft/crafting_table");


    
  event.custom({
    type: "minecraft:campfire_cooking",
    category: "food",
    cookingtime: 200,
    experience: 0.35,
    ingredient: {
      item: "minecraft:rotten_flesh",
    },
    result: {
      count: 1,
      id: "minecraft:leather",
    },
  }).id("ftb:minecraft/cooked_leather");

  //Flint from Gravel
  event.shapeless(Item.of("minecraft:flint", 1), 
    ["#c:gravels", "#c:gravels", "#c:gravels"]).id("ftb:minecraft/shapeless/flint_from_gravel");

  event.shapeless(Item.of("minecraft:writable_book", 1), ["#c:books", "#c:feathers", "#c:dyes/black"]).id("ftb:minecraft/shapeless/writable_book");

});
