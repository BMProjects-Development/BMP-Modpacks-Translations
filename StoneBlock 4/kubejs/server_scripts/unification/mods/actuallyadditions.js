// priority: 50

global.removeRecipe.push(
  "actuallyadditions:coal_to_tiny",
  "actuallyadditions:tiny_to_coal",
  "actuallyadditions:tagged_sticky_piston",
  "actuallyadditions:tagged_slime_block"
)

global.removeItem.push(
  "actuallyadditions:rice",
  "actuallyadditions:rice_seeds",
  "actuallyadditions:flax_seeds"
)

global.removeRecipe.push("actuallyadditions:crushing/black_quartz_ore")

ServerEvents.recipes((event) => {
  // Loop For Resource Ores
  global.resourceOresIngots.forEach((mod) => {
    mod.materials.forEach((material) => {
      const oreTag = `${global.tagPrefix}:ores/${material}`
      const ingotTag = `${global.tagPrefix}:ingots/${material}`
      const dust = `ftbmaterials:${material}_dust`

      // Ore -> Crushed
      addRecipeActuallyAdditionsCrushing(
        event,
        oreTag,
        [
          [getRawOreId(material), 2],
          [getRawOreId(material), 1, 0.25]
        ],
        `ftb:actually_additions/crushing/ores/${material}`
      )

      // Ingot -> Dust
      addRecipeActuallyAdditionsCrushing(
        event,
        ingotTag,
        [[dust]],
        `ftb:actually_additions/crushing/ingots/${material}`
      )
    })
  })

  // Loop For Gem Ores
  global.resourcesOresGem.forEach((mod) => {
    mod.materials.forEach((material) => {
      const gemType = material[0]
      const oreTag = `${global.tagPrefix}:ores/${gemType}`
      const outputId = material[2] ?? `${mod.modID}:${gemType}`
      const outputAmount = material[1] ?? 1

      // Ore -> Gem
      addRecipeActuallyAdditionsCrushing(
        event,
        oreTag,
        [
          [outputId, outputAmount],
          [outputId, Math.max(1, Math.floor(outputAmount / 2)), 0.33]
        ],
        `ftb:actually_additions/crushing/ores/${gemType}`
      )
    })
  })

  // Loop For Alloys
  global.enabledAlloys.forEach((material) => {
    const outputType = material.output.id
    const outputTag = `${global.tagPrefix}:ingots/${outputType}`
    const dust = `ftbmaterials:${outputType}_dust`

    // Ingot -> Dust
    addRecipeActuallyAdditionsCrushing(
      event,
      outputTag,
      [[dust]],
      `ftb:actually_additions/crushing/ingots/${outputType}`
    )
  })

  global.enabledPlates.forEach((entry) => {
    const material = entry[0]
    if (entry[2] === false) {
      return
    }
    const tag = entry[1] ?? `c:plates/${material}`

    addRecipeActuallyAdditionsCrushing(
      event,
      tag,
      [[`ftbmaterials:${material}_dust`]],
      `ftb:actually_additions/crushing/plates/${material}`
    )
  })

  //Manually Added Recipes ======================================================================

  //Salt Crushing
  addRecipeActuallyAdditionsCrushing(
    event,
    "c:gems/salt",
    [
      ["ftbmaterials:salt_dust", 2],
      ["ftbmaterials:salt_dust", 1, 0.25]
    ],
    `ftb:actually_additions/crushing/gems/salt`
  )
})
