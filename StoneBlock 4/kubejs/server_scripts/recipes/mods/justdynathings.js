// priority: 976

ServerEvents.recipes((event) => {
  event
    .shaped("justdynathings:stabilizer", ["PEP", "SGS", "PSP"], {
      P: "justdirethings:eclipsealloy_ingot",
      E: "justdirethings:time_crystal_block",
      S: "minecraft:redstone",
      G: "justdirethings:blockswappert1"
    })
    .id("ftb:justdynathings_stabilizer");
})
