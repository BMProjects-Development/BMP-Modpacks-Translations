// priority: 10

let netherOres = []
let endOres = []

if (global.enableNetherOres === false) {
  netherOres = Ingredient.of(/^ftbmaterials:/).itemIds.filter((id) => id.includes("nether_ore"))
}

if (global.enableEndOres === false) {
  endOres = Ingredient.of(/^ftbmaterials:/).itemIds.filter((id) => id.includes("end_ore"))
}

ServerEvents.tags("item", (event) => {
  global.usedMaterials.forEach((t) => {
    const itemID = "ftbmaterials:" + t.toLowerCase() + "_cluster"
    event.add(`c:raw_materials`, itemID)
    event.add(`c:raw_materials/${t.toLowerCase()}`, itemID)
  })

  global.resourceOresIngots.forEach((mod) => {
    mod.materials.forEach((material) => {
      const modID = mod.modPrefixOverride ? mod.modPrefixOverride : "ftbmaterials"

      event.add(`${global.tagPrefix}:raw_blocks/${material}`, [
        `${modID}:raw_${material}_block`,
        `${modID}:${material}_raw_block`
      ])
    })
  })

  event.add("c:hidden_from_recipe_viewers", global.fluids)

  global.usedOres.forEach((ore) => {
    event.add("ftb:ores/stone", `ftbmaterials:${ore.material}_stone_ore`)
  })

  event.removeAllTagsFrom(global.removeItem)
  event.add("c:hidden_from_recipe_viewers", global.removeItem)
  event.removeAllTagsFrom(global.removeOre)
  event.add("c:hidden_from_recipe_viewers", global.removeOre)

  // Fix FTB Materials Tags
  event.removeAllTagsFrom("ftbmaterials:silicon_gem")
  event.add("c:silicon", "ftbmaterials:silicon_gem")
  event.add("c:rods", "ftbstuff:stone_rod")
  event.add("c:rods/stone", "ftbstuff:stone_rod")
  event.add("c:dusts/wood", "ftbmaterials:saw_dust")
  event.add("c:storage_blocks/coke", "ftbmaterials:coal_coke_block")
  event.add("c:coal_coke", "ftbmaterials:coal_coke_gem")
  event.add("c:dusts/coal_coke", "ftbmaterials:coal_coke_dust")
  event.add("c:dusts/lapis", "ftbmaterials:lapis_lazuli_dust")
  event.add("actuallyadditions:tiny_coals", ["ftbmaterials:charcoal_tiny", "ftbmaterials:coal_tiny"])
  event.remove("minecraft:coals", "geore:coal_shard")

  event.add("c:ores/lapis_lazuli", [
    "minecraft:lapis_ore",
    "minecraft:deepslate_lapis_ore",
    "ftbmaterials:lapis_lazuli_end_ore",
    "ftbmaterials:lapis_lazuli_nether_ore"
  ])

  //Adding FTB Materials Coke Dust to MI's Coke Dust Tag.
  event.add("c:dusts/coke", "ftbmaterials:coal_coke_dust")

  //Adding Farmer's Delight Wheat Dough to other Dough Tags.
  event.add("cookingforblockheads:ingredients", "farmersdelight:wheat_dough")
  event.add("c:doughs/wheat", "farmersdelight:wheat_dough")

  event.add("modern_industrialization:block_template", "modern_industrialization:packer_block_template")

  event.add("c:dusts/saltpeter", "ftbmaterials:niter_dust")
  event.add("c:bamboo", "minecraft:bamboo")

  event.add("rftoolsbase:shards", "ftbmaterials:dimensional_shard_gem")

  global.removeItemTag.forEach((tag) => {
    event.remove(tag[0], tag[1])
  })

  event.removeAllTagsFrom(netherOres)
  event.removeAllTagsFrom(endOres)
})

ServerEvents.tags("fluid", (event) => {
  const fluidIds = global.fluids.map((id) => (id.endsWith("_bucket") ? id.slice(0, -7) : id))

  event.removeAllTagsFrom(fluidIds)

  event.add("c:hidden_from_recipe_viewers", fluidIds)
})

ServerEvents.tags("block", (event) => {
  event.removeAllTagsFrom(global.removeOre)
  event.add("minecraft:needs_stone_tool")

  event.removeAllTagsFrom(netherOres)
  event.removeAllTagsFrom(endOres)
})
