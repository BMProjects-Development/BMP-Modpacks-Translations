// priority: 101

const hammerRecipes = [
  // Cobblestone -> Gravel
  ["#c:cobblestones", "minecraft:gravel", 1],
  ["ftbstuff:compressed_cobblestone", "ftbstuff:compressed_gravel", 1],
  ["ftbstuff:compressed_cobblestone_2", "ftbstuff:compressed_gravel_2", 1],
  ["ftbstuff:compressed_cobblestone_3", "ftbstuff:compressed_gravel_3", 1],
  // Gravel -> Dirt
  ["#c:gravels", "minecraft:dirt", 1],
  ["ftbstuff:compressed_gravel", "ftbstuff:compressed_dirt", 1],
  ["ftbstuff:compressed_gravel_2", "ftbstuff:compressed_dirt_2", 1],
  ["ftbstuff:compressed_gravel_3", "ftbstuff:compressed_dirt_3", 1],
  // Dirt -> Sand
  ["#minecraft:dirt", "minecraft:sand", 1],
  ["ftbstuff:compressed_dirt", "ftbstuff:compressed_sand", 1],
  ["ftbstuff:compressed_dirt_2", "ftbstuff:compressed_sand_2", 1],
  ["ftbstuff:compressed_dirt_3", "ftbstuff:compressed_sand_3", 1],
  // Sand -> Dust
  ["#c:sandstone/uncolored_blocks", "minecraft:sand", 4],
  ["minecraft:sand", "ftbstuff:dust", 1],
  ["ftbstuff:compressed_sand", "ftbstuff:compressed_dust", 1],
  ["ftbstuff:compressed_sand_2", "ftbstuff:compressed_dust_2", 1],
  ["ftbstuff:compressed_sand_3", "ftbstuff:compressed_dust_3", 1],
  // Red Sand -> Dust
  ["#c:sandstone/red_blocks", "minecraft:red_sand", 4],
  ["minecraft:red_sand", "ftbstuff:dust", 1],
  ["ftbstuff:compressed_red_sand", "ftbstuff:compressed_dust", 1],
  ["ftbstuff:compressed_red_sand_2", "ftbstuff:compressed_dust_2", 1],
  ["ftbstuff:compressed_red_sand_3", "ftbstuff:compressed_dust_3", 1],
  // Stone -> Cobblestone
  ["minecraft:stone", "minecraft:cobblestone", 1],
  ["ftbstuff:compressed_stone", "ftbstuff:compressed_cobblestone", 1],
  ["ftbstuff:compressed_stone_2", "ftbstuff:compressed_cobblestone_2", 1],
  ["ftbstuff:compressed_stone_3", "ftbstuff:compressed_cobblestone_3", 1],
  //Kivi -> Crushed Kivi
  ["xycraft_world:kivi", "ftb:crushed_kivi", 1]
]

ServerEvents.recipes((event) => {
  const ftbstuff = event.recipes.ftbstuff

  hammerRecipes.forEach(([input, output, amount]) => {
    const itemStack = []
    const remainder = amount % 64

    for (let i = 0; i < Math.floor(amount / 64); i++) {
      itemStack.push(`64x ${output}`)
    }

    if (remainder > 0) {
      itemStack.push(`${remainder}x ${output}`)
    }
    ftbstuff.hammer(itemStack, input).id(`ftb:stuff/hammer/${input.split(":")[1]}_${amount}`)
  })
})
