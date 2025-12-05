ServerEvents.recipes((event) => {
  event
    .custom({
      type: "malum:void_favor",
      input: {
        item: "minecraft:glow_berries",
      },
      result: {
        count: 1,
        id: "minecraft:glowstone_dust"
      }
    })
    .id("ftb:malum/glowstone_favor")

  //Adding an Extra way to get Cthonic Gold
  event
    .custom({
      type: "occultism:spirit_fire",
      ingredient: {
        item: "minecraft:nether_gold_ore"
      },
      result: {
        count: 1,
        id: "malum:cthonic_gold_fragment"
      }
    }).id("ftb:occultism/spirit_fire/nether_gold_to_cthonic_gold")

  event.custom({
    type: "malum:void_favor",
    input: {
      item: "minecraft:nether_gold_ore"
    },
    result: {
      count: 1,
      id: "malum:cthonic_gold_ore"
    }
  }).id("ftb:malum/void_favor/nether_gold_to_cthonic_gold");
})