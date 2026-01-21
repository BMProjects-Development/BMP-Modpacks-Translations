// server_scripts/recipes/mods/chisel_modern.js
ServerEvents.recipes((event) => {
  var colors = [
    "white",
    "light_gray",
    "gray",
    "black",
    "brown",
    "red",
    "orange",
    "yellow",
    "lime",
    "green",
    "cyan",
    "light_blue",
    "blue",
    "purple",
    "magenta",
    "pink",
  ];

  for (let color of colors) {
    var stained = `minecraft:${color}_stained_glass`;

    event
      .shaped(
        Item.of(`chisel:glassdyed_${color}/bubble`, 8),
        ["GGG", "GGG", "GGD"],
        {
          G: `minecraft:${color}_stained_glass`,
          D: `#c:dyes/${color}`,
        })
        .id(`ftb:chisel_modern/${color}_bubble_glass`);
  }

  event
    .shaped(
      Item.of("chisel:voidstonerunic/black", 16),
      ["OEO", "OOO", "OEO"],
      {
        O: "#c:obsidians",
        E: "minecraft:ender_eye"
      })
      .id("ftb:chisel_modern/voidstonerunic");

  event
    .shaped(
      Item.of("chisel:marblepillar/pillar", 4),
      ["BS", "SB"],
      {
        S: "minecraft:polished_diorite",
        B: "minecraft:bone_meal"
      })
      .id("ftb:chisel_modern/marble_pillar");
  
  event
    .shaped(
      Item.of("chisel:sandstone_scribbles/scribbles_0", 4),
      ["SS", "SS"],
      {
        S: "minecraft:cut_sandstone"
      })
      .id("ftb:chisel_modern/sandstone_scribbles");
      
  event
    .shaped(
      Item.of("chisel:sandstonered_scribbles/scribbles_0", 4),
      ["SS", "SS"],
      {
        S: "minecraft:cut_red_sandstone"
      })
      .id("ftb:chisel_modern/red_sandstone_scribbles");

});
