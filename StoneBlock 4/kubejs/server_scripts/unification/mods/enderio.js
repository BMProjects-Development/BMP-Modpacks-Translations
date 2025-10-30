// priority: 50

global.removeRecipe.push(
  "enderio:iron_gear",
  "enderio:item.minecraft.copper_ingot_from_blasting",
  "enderio:item.minecraft.copper_ingot_from_smelting",
  "enderio:item.minecraft.gold_ingot_from_blasting",
  "enderio:item.minecraft.gold_ingot_from_smelting",
  "enderio:item.minecraft.iron_ingot_from_blasting",
  "enderio:item.minecraft.iron_ingot_from_smelting",
  "enderio:sag_milling/lapis_ore",
  "enderio:sag_milling/copper_ore",
  "enderio:sag_milling/gold_ore",
  "enderio:sag_milling/iron_ore",
  "enderio:sag_milling/copper",
  "enderio:sag_milling/iron",
  "enderio:sag_milling/copper",
  "enderio:sag_milling/raw_iron",
  "enderio:sag_milling/raw_copper",
  "enderio:sag_milling/raw_gold",
  "enderio:sag_milling/gold",
  "enderio:wood_gear_corner",
  "enderio:stick"
)

global.removeItem.push(
  "enderio:silicon",
  "enderio:iron_gear",
  "enderio:flour",
  "enderio:powdered_coal",
  "enderio:powdered_iron",
  "enderio:powdered_gold",
  "enderio:powdered_copper",
  "enderio:powdered_tin",
  "enderio:powdered_ender_pearl",
  "enderio:powdered_obsidian",
  "enderio:powdered_cobalt",
  "enderio:powdered_lapis_lazuli",
  "enderio:powdered_quartz"
)

ServerEvents.recipes((event) => {
  // Add SAG milling recipes for FTB materials
  global.resourceOresIngots.forEach((mod) => {
    mod.materials.forEach((material) => {
      const rawMaterialTag = `${global.tagPrefix}:raw_materials/${material}`
      const oreTag = `${global.tagPrefix}:ores/${material}`
      const ingotTag = `${global.tagPrefix}:ingots/${material}`
      const dust = `ftbmaterials:${material}_dust`

      // Raw Ores -> Dust
      addRecipeEnderIOSagMilling(
        event,
        rawMaterialTag,
        [
          [`ftbmaterials:${material}_dust`, 1],
          [`ftbmaterials:${material}_dust`, 1, 0.33]
        ],
        `ftb:enderio/sag_mill/raw_materials/${material}`,
        true
      )

      // Ores -> Raw Ores
      addRecipeEnderIOSagMilling(
        event,
        oreTag,
        [
          [getRawOreId(material), 2],
          [getRawOreId(material), 1, 0.25]
        ],
        `ftb:enderio/sag_mill/ores/${material}`,
        true
      )

      // Ingots -> Dusts
      addRecipeEnderIOSagMilling(event, ingotTag, [[dust, 1]], `ftb:enderio/sag_mill/ingots/${material}`, false)
    })
  })

  // Loop For Gem Ores
  global.resourcesOresGem.forEach((mod) => {
    mod.materials.forEach((material) => {
      const gemType = material[0]
      let oreTag = `${global.tagPrefix}:ores/${gemType}`
      if (oreTag === "c:ores/lapis_lazuli") {
        oreTag = "c:ores/lapis"
      }
      const outputId = material[2] ?? `${mod.modID}:${gemType}`
      const outputAmount = material[1] ?? 1

      // Ore -> Gem
      addRecipeEnderIOSagMilling(
        event,
        oreTag,
        [
          [outputId, outputAmount],
          [outputId, Math.max(1, Math.floor(outputAmount / 2)), 0.33]
        ],
        `ftb:enderio/sagmill/ores/${gemType}`
      )
    })
  })

  global.resourcesOresGemDust.forEach((material) => {
    // Ore -> Gem
    const oreTag = material[0]
    addRecipeEnderIOSagMilling(
      event,
      oreTag,
      [[material[1], material[2]]],
      `ftb:enderio/sagmill/resources/${oreTag.split(":")[1]}`
    )
  })

  global.enabledAlloys.forEach((material) => {
    const outputType = material.output.id
    const outputAmount = material.output.amount
    const input1Type = material.first.id
    const input1Amount = material.first.amount
    const input2Type = material.second.id
    const input2Amount = material.second.amount

    const outputTag = `${global.tagPrefix}:ingots/${outputType}`
    const dust = `ftbmaterials:${outputType}_dust`

    // Ingot -> Dusts
    addRecipeEnderIOSagMilling(event, outputTag, [[dust, 1]], `ftb:enderio/sag_mill/ingots/${outputType}`, false)
    event
      .custom({
        type: "enderio:alloy_smelting",
        energy: 3200,
        experience: 0.3,
        is_smelting: false,
        inputs: [
          {
            tag: `c:ingots/${input1Type}`,
            count: input1Amount
          },
          {
            tag: `c:ingots/${input2Type}`,
            count: input2Amount
          }
        ],
        output: {
          id: `ftbmaterials:${outputType}_ingot`,
          count: outputAmount
        }
      })
      .id(`ftb:enderio/alloy_smelting/${outputType}`)
  })

  //Salt Crushing
  addRecipeEnderIOSagMilling(
    event,
    "c:gems/salt",
    [
      ["ftbmaterials:salt_dust", 2],
      ["ftbmaterials:salt_dust", Math.max(1, Math.floor(2 / 2)), 0.33]
    ],
    `ftb:enderio/sagmill/gems/salt`
  )
})
