// priority: 987

// Removes Items That Should Not Be A Thing
global.removeRecipe.push(
  "ftbmaterials:silicon_raw_block",
  "ftbmaterials:silicon_raw_ore_from_silicon_raw_block",
  "ftbmaterials:tungsten_ingot_from_blasting_tungsten_raw_ore",
  "ftbmaterials:tungsten_ingot_from_smelting_tungsten_raw_ore",
  "ftbmaterials:silicon_ingot_from_blasting_silicon_raw_ore",
  "ftbmaterials:brass_ingot_from_blasting_brass_raw_ore",
  "ftbmaterials:brass_ingot_from_smelting_brass_raw_ore",
  "ftbmaterials:silicon_ingot_from_smelting_silicon_raw_ore",
  "ftbmaterials:chromium_ingot_from_blasting_chromium_raw_ore",
  "ftbmaterials:chromium_ingot_from_smelting_chromium_raw_ore",
  "ftbmaterials:titanium_ingot_from_blasting_titanium_raw_ore",
  "ftbmaterials:titanium_ingot_from_smelting_titanium_raw_ore"
)

global.removeOre.push(
  "ftbmaterials:niter_stone_ore",
  "ftbmaterials:niter_deepslate_ore",
  "ftbmaterials:resonating_ore_stone_ore",
  "ftbmaterials:resonating_ore_deepslate_ore"
)

// Remove Items That Should Not Be A Thing
global.removeItem.push(
  "ftbmaterials:brass_clump",
  "ftbmaterials:brass_clump",
  "ftbmaterials:brass_crystal",
  "ftbmaterials:brass_dirty_dust",
  "ftbmaterials:brass_raw_block",
  "ftbmaterials:brass_raw_ore",
  "ftbmaterials:brass_shard",
  "ftbmaterials:chromium_clump",
  "ftbmaterials:chromium_crystal",
  "ftbmaterials:chromium_dirty_dust",
  "ftbmaterials:chromium_gear",
  "ftbmaterials:chromium_raw_block",
  "ftbmaterials:chromium_raw_ore",
  "ftbmaterials:chromium_shard",
  "ftbmaterials:diamond_clump",
  "ftbmaterials:diamond_clump",
  "ftbmaterials:diamond_crystal",
  "ftbmaterials:diamond_dirty_dust",
  "ftbmaterials:diamond_shard",
  "ftbmaterials:plutonium_clump",
  "ftbmaterials:plutonium_crystal",
  "ftbmaterials:plutonium_dirty_dust",
  "ftbmaterials:plutonium_shard",
  "ftbmaterials:quartz_deepslate_ore",
  "ftbmaterials:quartz_dirty_dust",
  "ftbmaterials:quartz_nugget",
  "ftbmaterials:quartz_shard",
  "ftbmaterials:quartz_stone_ore",
  "ftbmaterials:silicon_clump",
  "ftbmaterials:silicon_crystal",
  "ftbmaterials:silicon_dirty_dust",
  "ftbmaterials:silicon_raw_block",
  "ftbmaterials:silicon_raw_ore",
  "ftbmaterials:silicon_shard",
  "ftbmaterials:sulfur_clump",
  "ftbmaterials:sulfur_crystal",
  "ftbmaterials:sulfur_dirty_dust",
  "ftbmaterials:sulfur_shard",
  "ftbmaterials:sulfur_shard",
  "ftbmaterials:titanium_clump",
  "ftbmaterials:titanium_crystal",
  "ftbmaterials:titanium_dirty_dust",
  "ftbmaterials:titanium_dirty_dust",
  "ftbmaterials:titanium_shard",
  "ftbmaterials:tungsten_clump",
  "ftbmaterials:tungsten_crystal",
  "ftbmaterials:tungsten_dirty_dust",
  "ftbmaterials:tungsten_shard",
  "ftbmaterials:ruby_tiny",
  "ftbmaterials:electrum_gem"
)

const dusts = [
  ["ftbmaterials:bronze_dust", "ftbmaterials:bronze_ingot"],
  ["ftbmaterials:diamond_dust", "minecraft:diamond"],
  ["ftbmaterials:electrum_dust", "ftbmaterials:electrum_ingot"],
  ["ftbmaterials:invar_dust", "ftbmaterials:invar_ingot"],
  ["ftbmaterials:quartz_dust", "minecraft:quartz"],
  ["ftbmaterials:steel_dust", "ftbmaterials:steel_ingot"],
  ["ftbmaterials:sulfur_dust", "ftbmaterials:sulfur_gem"],
  ["ftbmaterials:fluorite_dust", "ftbmaterials:fluorite_gem"],
  ["ftbmaterials:emerald_dust", "minecraft:emerald"],
  ["ftbmaterials:lapis_lazuli_dust", "minecraft:lapis_lazuli"],
  ["ftbmaterials:ruby_dust", "ftbmaterials:ruby_gem"],
  ["ftbmaterials:sapphire_dust", "ftbmaterials:sapphire_gem"],
  ["ftbmaterials:coal_coke_dust", "ftbmaterials:coal_coke_gem"],
  ["ftbmaterials:brass_dust", "ftbmaterials:brass_ingot"],
  ["ftbmaterials:constantan_dust", "ftbmaterials:constantan_ingot"]
]

ServerEvents.recipes((event) => {
  global.resourceOresIngots.forEach((mod) => {
    mod.materials.forEach((material) => {
      const dustTag = `${global.tagPrefix}:dusts/${material}`
      const blockTag = `${global.tagPrefix}:storage_blocks/raw_${material}`
      const ingot = ["iron", "gold", "copper"].includes(material)
        ? `minecraft:${material}_ingot`
        : `ftbmaterials:${material}_ingot`

      const block = ["iron", "gold", "copper"].includes(material)
        ? `minecraft:${material}_block`
        : `ftbmaterials:${material}_block`

      addOreProcessingRecipes(event, `#${dustTag}`, ingot, material, "ftbmaterials", 200)

      addOreProcessingRecipes(event, `#${blockTag}`, block, `${material}_block`, "ftbmaterials", 1800)
    })
  })

  global.resourcesOresGem.forEach((entry) => {
    const modID = entry.modID
    entry.materials.forEach((type) => {
      if (global.clusterTypes.includes(type[0])) {
        const itemID = type[2] ?? `${modID}:${type[0]}`
        if (Ingredient.of(itemID) !== undefined) {
          const fullAmount = type[1] ?? 1
          const halfAmount = Math.max(1, Math.floor(fullAmount / 2))
          addOreProcessingRecipes(
            event,
            `#c:raw_materials/${type[0]}`,
            `${halfAmount}x ${itemID}`,
            itemID.split(":")[1],
            "ftbmaterials",
            200
          )
        }
      }
    })
  })

  const compressPairs = [
    // [input, output, count]
    ["ftbmaterials:coal_coke_gem", "ftbmaterials:coal_coke_block", 9],
    ["ftbmaterials:charcoal_tiny", "minecraft:charcoal", 8],
    ["ftbmaterials:coal_tiny", "minecraft:coal", 8],
    ["ftbmaterials:netherite_nugget", "minecraft:netherite_ingot", 9],
    ["ftbmaterials:fluorite_gem", "ftbmaterials:fluorite_block", 9],
    ["ftbmaterials:copper_nugget", "minecraft:copper_ingot", 9],
    ["minecraft:charcoal", "ftbmaterials:charcoal_block", 9],
    ["ftbmaterials:ruby_gem", "ftbmaterials:ruby_block", 9],
    ["ftbmaterials:monazite_dust", "ftbmaterials:monazite_block", 9],
    ["ftbmaterials:sapphire_gem", "ftbmaterials:sapphire_block", 9],
    ["ftbmaterials:sulfur_gem", "ftbmaterials:sulfur_block", 9]
  ]

  compressPairs.forEach(([small, large, count]) => {
    const base = small.split(":")[1]

    // Compress: shaped if 9, shapeless if 8
    if (count === 9) {
      // 9 small -> 1 large
      event.shaped(large, ["CCC", "CCC", "CCC"], { C: small }).id(`ftb:compress/${base}`)
    } else {
      // 8 small -> 1 large (shapeless)
      event.shapeless(large, Array(count).fill(small)).id(`ftb:compress/${base}`)
    }

    // Decompress: 1 large -> X small (shapeless)
    event.shapeless(Item.of(small, count), [large]).id(`ftb:decompress/${base}`)
  })

  global.enabledPlates.forEach(([material, tag, enabled]) => {
    if (enabled === false) return

    const materialTag = tag ?? `c:plates/${material}`
    const wireID = `ftbmaterials:${material}_wire`

    event.stonecutting(wireID, `#${materialTag}`).id(`ftb:minecraft/stonecutting/wire/${material}`)

    event
      .custom({
        type: "minecraft:crafting_shapeless",
        ingredients: [
          {
            tag: `c:ingots/${material}`
          },
          {
            tag: `c:ingots/${material}`
          },
          {
            tag: `c:ingots/${material}`
          },
          {
            item: "immersiveengineering:hammer"
          }
        ],
        result: {
          count: 1,
          id: `ftbmaterials:${material}_plate`
        }
      })
      .id(`ftb:crafting/plates/${material}`)
  })

  dusts.forEach((dust) => {
    addOreProcessingRecipes(event, dust[0], dust[1], dust[0].split(":")[1], "ftbmaterials", 200)
  })
})
