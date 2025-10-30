ServerEvents.recipes((event) => {
  event
    .custom({
      type: "ftbstuff:wooden_basin",
      block_consume_chance: 0.25,
      chance: 0.5,
      fluid: {
        amount: 250,
        id: "minecraft:water"
      },
      input: "#minecraft:leaves"
    })
    .id("ftb:ftbstuff/basin/water")
})
