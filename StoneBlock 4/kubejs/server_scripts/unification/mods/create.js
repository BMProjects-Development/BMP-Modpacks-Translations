// priority: 50

global.removeRecipe.push(
  `create:splashing/crushed_raw_iron`,
  "create:splashing/mekanism/crushed_raw_lead",
  "create:splashing/mekanism/crushed_raw_osmium",
  "create:splashing/mekanism/crushed_raw_tin",
  "create:splashing/mekanism/crushed_raw_uranium",
  "create:splashing/immersiveengineering/crushed_raw_aluminum",
  "create:splashing/immersiveengineering/crushed_raw_lead",
  "create:splashing/immersiveengineering/crushed_raw_nickel",
  "create:splashing/immersiveengineering/crushed_raw_silver",
  "create:blasting/zinc_ingot_from_raw_ore",
  "create:smelting/zinc_ingot_from_raw_ore",
  "create:blasting/ingot_aluminum_compat_immersiveengineering",
  "create:blasting/ingot_nickel_compat_immersiveengineering",
  "create:blasting/ingot_uranium_compat_immersiveengineering",
  "create:smelting/ingot_aluminum_compat_immersiveengineering",
  "create:smelting/ingot_nickel_compat_immersiveengineering",
  "create:smelting/ingot_uranium_compat_immersiveengineering",
  "create:cutting/compat/immersiveengineering/wire_aluminum",
  "create:cutting/compat/immersiveengineering/wire_steel",
  "create:cutting/compat/immersiveengineering/wire_lead",
  "create:cutting/compat/immersiveengineering/wire_electrum",
  "create:cutting/compat/immersiveengineering/wire_copper",
  "create:pressing/compat/immersiveengineering/plate_nickel",
  "create:pressing/brass_ingot",
  "create:pressing/compat/immersiveengineering/plate_electrum",
  "create:pressing/compat/immersiveengineering/plate_constantan",
  "create:pressing/iron_ingot",
  "create:pressing/compat/immersiveengineering/plate_aluminum",
  "create:pressing/gold_ingot",
  "create:pressing/compat/immersiveengineering/plate_silver",
  "create:pressing/copper_ingot",
  "create:pressing/compat/immersiveengineering/plate_steel",
  "create:pressing/compat/immersiveengineering/plate_lead",
  "create:pressing/compat/immersiveengineering/plate_uranium",
  "create:crafting/materials/raw_zinc",
  "create:crafting/materials/raw_zinc_block",
  "create:crafting/materials/brass_block_from_compacting",
  "create:crafting/materials/zinc_ingot_from_decompacting",
  "create:crafting/materials/brass_ingot_from_decompacting",
  "create:crafting/materials/zinc_block_from_compacting",
  "create:crafting/materials/brass_nugget_from_decompacting",
  "create:crafting/materials/zinc_nugget_from_decompacting",
  "create:crafting/materials/copper_nugget",
  "create:blasting/ingot_lead_compat_immersiveengineering",
  "create:smelting/ingot_lead_compat_immersiveengineering",
  "create:blasting/ingot_silver_compat_immersiveengineering",
  "create:smelting/ingot_silver_compat_immersiveengineering",
  "create:crafting/materials/brass_ingot_from_compacting",
  "create:crafting/materials/zinc_ingot_from_compacting",
  "create:blasting/zinc_ingot_from_ore",
  "create:blasting/zinc_ingot_from_crushed",
  "create:smelting/zinc_ingot_from_ore",
  "create:smelting/zinc_ingot_from_crushed",
  "create:crushing/diamond_ore",
  "create:crushing/deepslate_diamond_ore",
  "create:crafting/appliances/dough",
  "create:smelting/bread",
  "create:smoking/bread",
  "create:blasting/iron_ingot_from_crushed",
  "create:smelting/iron_ingot_from_crushed",
  "create:blasting/gold_ingot_from_crushed",
  "create:smelting/gold_ingot_from_crushed",
  "create:blasting/copper_ingot_from_crushed",
  "create:smelting/copper_ingot_from_crushed",
  "create:blasting/ingot_osmium_compat_mekanism",
  "create:smelting/ingot_osmium_compat_mekanism",
  "create:blasting/ingot_tin_compat_mekanism",
  "create:smelting/ingot_tin_compat_mekanism",
  "create:blasting/ingot_lead_compat_mekanism",
  "create:smelting/ingot_lead_compat_mekanism",
  "create:blasting/ingot_uranium_compat_mekanism",
  "create:smelting/ingot_uranium_compat_mekanism"
)

global.removeOre.push("create:zinc_ore", "create:deepslate_zinc_ore")

global.removeItem.push(
  "create:raw_zinc_block",
  "create:raw_zinc",
  "create:brass_sheet",
  "create:iron_sheet",
  "create:golden_sheet",
  "create:copper_sheet",
  "create:zinc_block",
  "create:brass_block",
  "create:brass_nugget",
  "create:zinc_nugget",
  "create:copper_nugget",
  "create:brass_ingot",
  "create:zinc_ingot",
  "create:honey_bucket",
  "create:dough"
)

ServerEvents.recipes((event) => {
  // Loop For Resource Ores
  global.resourceOresIngots.forEach((mod) => {
    mod.materials.forEach((material) => {
      const oreTag = `${global.tagPrefix}:ores/${material}`
      const crushedTag = `create:crushed/${material}`
      const ingotTag = `${global.tagPrefix}:ingots/${material}`
      const dust = `ftbmaterials:${material}_dust`
      const ingot = ["iron", "gold", "copper"].includes(material)
        ? `minecraft:${material}_ingot`
        : `ftbmaterials:${material}_ingot`

      const nugget =
        material === "copper"
          ? "ftbmaterials:copper_nugget"
          : ["iron", "gold"].includes(material)
          ? `minecraft:${material}_nugget`
          : `ftbmaterials:${material}_nugget`

      // Stop issue with MI stuff being missing
      if (material !== "antimony" && material !== "iridium") {
        // Crushed -> Nuggets
        addRecipeCreateSplashing(
          event,
          crushedTag,
          [[nugget, 9], getCreateOutput(material)],
          `ftb:create/washing/crushed/${material}`
        )

        // Crushed -> Ingots
        addOreProcessingRecipes(event, `#${crushedTag}`, ingot, material, "create", 200)
      }

      // Ore -> Crushed
      addRecipeCreateCrushing(
        event,
        oreTag,
        [
          [`create:crushed_raw_${material}`, 2],
          [`create:crushed_raw_${material}`, 1, 0.25],
          ["create:experience_nugget", 1, 0.75]
        ],
        `ftb:create/crushing/ores/${material}`
      )

      // Ingot -> Dust
      addRecipeCreateCrushing(event, ingotTag, [[dust]], `ftb:create/crushing/ingots/${material}`)

      const result = getSecondaryOutput(material)
      const output = [[dust, 1]]
      if (result) {
        if (global.enableTinyDust) {
          output.push([`ftbmaterials:${result.material}_tiny_dust`, 3])
        } else {
          output.push([nugget, 3])
        }
      }

      addRecipeCreateSplashing(event, `c:clumps/${material}`, output, `ftb:create/washing/clumps/${material}`)

      addRecipeCreateSplashing(
        event,
        `c:dirty_dusts/${material}`,
        [[dust, 2]],
        `ftb:create/washing/dirty_dust/${material}`
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
      addRecipeCreateCrushing(
        event,
        oreTag,
        [
          [outputId, outputAmount],
          [outputId, Math.max(1, Math.floor(outputAmount / 2)), 0.33]
        ],
        `ftb:create/crusher/ores/${gemType}`
      )
    })
  })

  // Loop For Alloys
  global.enabledAlloys.forEach((material) => {
    const outputType = material.output.id
    const outputAmount = material.output.amount
    const input1Type = material.first.id
    const input1Amount = material.first.amount
    const input2Type = material.second.id
    const input2Amount = material.second.amount

    const ingotTag = `${global.tagPrefix}:ingots/${outputType}`
    const dust = `ftbmaterials:${outputType}_dust`

    // Ingot -> Dust
    addRecipeCreateCrushing(event, ingotTag, [[dust]], `ftb:create/crushing/ingots/${outputType}`)

    // Plates -> Dust
    addRecipeCreateCrushing(
      event,
      `${global.tagPrefix}:plates/${outputType}`,
      [[dust]],
      `ftb:create/crushing/plates/${outputType}`
    )

    const ingredients = []

    for (let i = 0; i < input1Amount; i++) {
      ingredients.push({ tag: `c:ingots/${input1Type}` })
    }

    for (let i = 0; i < input2Amount; i++) {
      ingredients.push({ tag: `c:ingots/${input2Type}` })
    }

    event
      .custom({
        type: "create:mixing",
        heat_requirement: "heated",
        ingredients: ingredients,
        results: [
          {
            count: outputAmount,
            id: `ftbmaterials:${outputType}_ingot`
          }
        ]
      })
      .id(`ftb:create/mixing/plates/${outputType}`)
  })

  global.enabledWires.forEach((entry) => {
    const material = entry[0]
    if (entry[2] === false) {
      return
    }
    const tag = entry[1] ?? `c:plates/${material}`

    addRecipeCreateCutting(event, tag, [[`ftbmaterials:${material}_wire`, 2]], `ftb:create/cutting/wire/${material}`)
  })

  global.enabledPlates.forEach((entry) => {
    const material = entry[0]
    if (entry[2] === false) {
      return
    }
    const tag = entry[1] ?? `c:ingots/${material}`

    addRecipeCreatePressing(event, tag, [[`ftbmaterials:${material}_plate`]], `ftb:create/pressing/plate/${material}`)
  })
})

ServerEvents.tags("item", (event) => {
  global.resourceOresIngots.forEach((mod) => {
    mod.materials.forEach((material) => {
      const itemID = `create:crushed_raw_${material}`
      event.removeAllTagsFrom(itemID)
      event.add("create:crushed", itemID)
      event.add(`create:crushed/${material}`, itemID)
    })
  })
})
