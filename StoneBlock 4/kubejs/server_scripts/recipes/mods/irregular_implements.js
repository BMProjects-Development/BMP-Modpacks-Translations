ServerEvents.recipes((event) => {
  event
    .shaped("irregular_implements:lapis_lamp", ["L L", " A ", "L L"], {
      L: "#c:gems/lapis",
      A: "minecraft:redstone_lamp"
    })
    .id("ftb:irregular_implements/lapis_lamp");
});
