// priority: 50

global.removeRecipe.push(
  "createaddition:compat/immersiveengineering/rolling/aluminum_ingot",
  "createaddition:rolling/copper_ingot",
  "createaddition:rolling/electrum_plate",
  "createaddition:compat/immersiveengineering/rolling/steel_plate",
  "createaddition:rolling/iron_plate",
  "createaddition:rolling/gold_plate",
  "createaddition:rolling/electrum_ingot",
  "createaddition:compat/immersiveengineering/rolling/steel_ingot",
  "createaddition:compat/immersiveengineering/rolling/lead_plate",
  "createaddition:rolling/iron_ingot",
  "createaddition:rolling/gold_ingot",
  "createaddition:compat/immersiveengineering/rolling/aluminum_plate",
  "createaddition:rolling/brass_rod",
  "createaddition:rolling/copper_plate",
  "createaddition:crafting/electrum_ingot_from_nugget",
  "createaddition:crafting/electrum_ingot_from_electrum_block"
)

ServerEvents.recipes((event) => {
  global.enabledRods.forEach((rod) => {
    const material = rod[0]
    if (rod[2] === false) {
      return
    }
    const tag = rod[1] ?? `c:ingots/${material}`

    addRecipeCreateRolling(event, tag, [[`ftbmaterials:${material}_rod`, 2]], `ftb:create/rolling/rods/${material}`)
  })

  global.enabledPlates.forEach((plate) => {
    const material = plate[0]
    if (plate[2] === false) {
      return
    }
    const tag = plate[1] ?? `c:plates/${material}`

    addRecipeCreateRolling(event, tag, [[`ftbmaterials:${material}_wire`, 2]], `ftb:create/rolling/wire/${material}`)
  })
})
