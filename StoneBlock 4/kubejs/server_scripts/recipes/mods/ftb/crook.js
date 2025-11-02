const crookRecipes = [
  {
    input: "minecraft:oak_leaves",
    max: 1,
    outputs: [
      ["minecraft:oak_sapling", 1, 0.35],
      ["minecraft:apple", 1, 0.2]
    ]
  },
  {
    input: "minecraft:spruce_leaves",
    max: 1,
    outputs: [["minecraft:spruce_sapling", 1, 0.35]]
  },
  {
    input: "minecraft:birch_leaves",
    max: 1,
    outputs: [["minecraft:birch_sapling", 1, 0.35]]
  },
  {
    input: "minecraft:jungle_leaves",
    max: 1,
    outputs: [["minecraft:jungle_sapling", 1, 0.35]]
  },
  {
    input: "minecraft:acacia_leaves",
    max: 1,
    outputs: [["minecraft:acacia_sapling", 1, 0.35]]
  },
  {
    input: "minecraft:dark_oak_leaves",
    max: 1,
    outputs: [
      ["minecraft:dark_oak_sapling", 1, 0.35],
      ["minecraft:apple", 1, 0.2]
    ]
  },
  {
    input: "minecraft:cherry_leaves",
    max: 1,
    outputs: [["minecraft:cherry_sapling", 1, 0.35]]
  },
  {
    input: "minecraft:dirt",
    max: 2,
    outputs: [
      ["minecraft:cherry_sapling", 1, 0.5],
      ["minecraft:dark_oak_sapling", 1, 0.5],
      ["minecraft:acacia_sapling", 1, 0.5],
      ["minecraft:jungle_sapling", 1, 0.5],
      ["minecraft:birch_sapling", 1, 0.5],
      ["minecraft:spruce_sapling", 1, 0.5],
      ["minecraft:oak_sapling", 1, 0.5]
    ]
  },
  {
    input: "ftb:dry_leaves",
    max: 2,
    outputs: [["farmersdelight:straw", 2, 1]]
  },
  {
    input: "minecraft:sand",
    max: 4,
    outputs: [
      ["minecraft:sugar_cane", 1, 0.5],
      ["minecraft:cactus", 1, 0.5],
      ["minecraft:sweet_berries", 1, 0.5],
      ["minecraft:kelp", 1, 0.5],
      ["minecraft:cocoa_beans", 1, 0.15],
      ["occultism:datura_seeds", 1, 0.15],
      ["minecraft:bamboo", 1, 0.25],
      ["actuallyadditions:canola_seeds", 1, 0.15],
      ["supplementaries:flax_seeds", 1, 0.20],
      ["farmersdelight:wild_cabbages", 1, 0.20],
      ["farmersdelight:wild_onions", 1, 0.20],
      ["farmersdelight:wild_rice", 1, 0.20],
      ["farmersdelight:wild_tomatoes", 1, 0.20]
    ]
  }
]

ServerEvents.recipes((event) => {
  crookRecipes.forEach((recipe) => {
    event
      .custom({
        type: "ftbstuff:crook",
        input: { item: recipe.input },
        max: recipe.max,
        replace_drops: recipe.replace ?? true,
        results: recipe.outputs.map(([id, amount, chance]) => ({
          chance: chance,
          item: { count: amount, id: id }
        }))
      })
      .id(`ftb:ftbstuff/crook/${recipe.input.split(":")[1]}`)
  })
})
