// priority: 9750

const removeItemTag = []

function getFluidType(material) {
  if (global.fluidMod == "tinkers") {
    return `tconstruct:molten_${material}`
  }
}

function removeFluid(event, modID, material) {
  event.remove({
    id: `create:empty_${modID}_${material}_bucket_of_${modID}_${material}`
  })
  event.remove({
    id: `create:fill_minecraft_bucket_with_${modID}_${material}`
  })
  event.remove({ id: `thermal:bottler_${material}_bucket` })
}

// Function to get the secondary output of material, only if it's in usedIngots
const conversionMap = {}
for (const [primary, secondary, secondary2] of global.secondaryOutputs) {
  conversionMap[primary] = {
    secondary: {
      material: secondary[0],
      chance: secondary[1],
      amount: secondary[2] || 1
    },
    secondary2: {
      material: secondary2[0],
      chance: secondary2[1],
      amount: secondary2[2] || 1
    }
  }
}

function getSecondaryOutput(material) {
  const entry = conversionMap[material]
  if (entry) {
    return entry.secondary
  }
  return {
    material: material,
    chance: 0.33,
    amount: 1
  }
}

function getCreateOutput(material) {
  const entry = conversionMap[material]
  if (entry) {
    return [entry.secondary2.material, entry.secondary2.amount, entry.secondary2.chance]
  }
  return null
}

function getOreName(material, oreType) {
  const vanillaOres = ["iron", "gold", "copper", "coal", "redstone", "lapis", "diamond", "emerald", "quartz"]

  if (vanillaOres.includes(material)) {
    if (oreType === "stone") {
      return `minecraft:${material}_ore`
    }
    if (oreType === "deepslate") {
      return `minecraft:deepslate_${material}_ore`
    }

    if (material === "quartz" && oreType === "nether") {
      return "minecraft:nether_quartz_ore"
    }
  }

  return `ftbmaterials:${material}_${oreType}_ore`
}

let isFirstRun = true

function recipeError(mod, recipeType, data, reason) {
  if (isFirstRun) {
    console.error("Make sure to reload startup Scripts!!!")
    isFirstRun = false
  }

  console.error(`Error Adding Recipe: (${mod}, ${recipeType}), ${data} -> ${reason}`)
}

/**
 * Adds both blasting and smelting recipes for a given ore-to-ingot conversion.
 *
 * @param {RecipesEventJS} event
 * @param {string} input - The input item ID (e.g., raw ore)
 * @param {string|[string, number]} output - The output item ID or [item ID, count]
 * @param {string} material - The material name used in the recipe ID (e.g., "platinum")
 * @param {string} modID - The mod ID used to namespace the recipe ID (e.g., "ftbmaterials")
 * @param {string} cookingTime - smelting cooking time
 */
function addOreProcessingRecipes(event, input, output, material, modID, cookingTime) {
  checkRecipeID(`ftb:${modID}/blasting/${material}`)
  checkRecipeID(`ftb:${modID}/smelting/${material}`)

  let outputItem = typeof output === "string" ? Item.of(output) : Item.of(output[0], output[1] ?? 1)
  if (["diamond", "lapis_lazuli", "emerald", "fluorite", "redstone", "quartz"].includes(material)) {
    return
  }
  event
    .blasting(outputItem, input)
    .cookingTime(cookingTime / 2)
    .xp(cookingTime / 2000)
    .id(`ftb:${modID}/blasting/${material}`)

  event
    .smelting(outputItem, input)
    .cookingTime(cookingTime)
    .xp(cookingTime / 2000)
    .id(`ftb:${modID}/smelting/${material}`)
}

function getRawOreId(material) {
  const vanillaMaterials = ["iron", "gold", "copper"]
  if (vanillaMaterials.includes(material)) {
    return `minecraft:raw_${material}`
  }
  return `ftbmaterials:${material}_raw_ore`
}

function checkRecipeID(id) {
  if (removeItemTag.includes(id)) {
    console.warn(`[Duplicate Recipe ID] ${id}`)
  } else {
    removeItemTag.push(id)
  }
}

/**
 * Checks if a string is a tag by matching against known tag prefixes.
 *
 * @param {string} input - The string to check (e.g., "c:ingots/iron")
 * @returns {boolean} True if it matches a tag prefix
 */
function isTag(input) {
  return global.tags.some((prefix) => input.startsWith(`${prefix}:`))
}
