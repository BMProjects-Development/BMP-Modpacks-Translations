ServerEvents.recipes((event) => {
  event
    .shaped("petrock:kibble", ["P", "S"], {
      S: "minecraft:smooth_stone_slab",
      P: "ftb:stone_pebble"
    })
    .id("ftb:petrock/kibble")
})
