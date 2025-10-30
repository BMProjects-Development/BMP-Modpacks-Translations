// priority: 999999

// Tag Prefix
global.tagPrefix = "c"

// Registry Prefix =
global.registryPrefix = "ftb"

// Settings
global.enableClusters = true
global.enableChunks = true
global.enableNetherOres = false
global.enableEndOres = false
// Disabling Tiny Dusts replaces output with Nuggets
global.enableTinyDust = false
global.enableSmallDust = false

// === FLUIDS ===
global.fluids = global.fluids || []
global.fluidMod = "tinkers"
global.fluidAmounts = [
  // Tag, Output Amount, Secondary Output, Secondary Output Fluid Amount
  ["gears", 180, false],
  ["ingots", 90, false],
  ["nuggets", 10, false],
  ["ores", 240, true, 20],
  ["plates", 90, false],
  ["raw_materials", 120, true, 10],
  ["storage_blocks", 810, false],
  ["raw_blocks", 1080, true, 90]
]

// == Multi Ore Output ===
/**
 * Defines two secondary byproducts for ores used in custom processing.
 *
 * Format:
 *   [primaryOre, [secondaryOre, chanceDecimal, amount], [createOutput, chanceDecimal, amount]]
 *
 * - `primaryOre`: The main ore being processed.
 * - `secondaryOre`: A byproduct with a drop `chance` and optional `amount`.
 * - `createOutput`: A byproduct used in Create crushing/washing with `chance` and optional `amount`.
 */
global.secondaryOutputs = [
  ["aluminum", ["iron", 0.15, 1], ["minecraft:flint", 0.25, 1]],
  ["copper", ["gold", 0.1, 1], ["minecraft:clay_ball", 0.5, 1]],
  ["gold", ["silver", 0.12, 1], ["minecraft:quartz", 0.5, 1]],
  ["iron", ["nickel", 0.1, 1], ["minecraft:redstone", 0.75, 1]],
  ["lead", ["silver", 0.15, 1], ["minecraft:coal", 0.25, 1]],
  ["nickel", ["iron", 0.1, 1], ["minecraft:flint", 0.25, 1]],
  ["osmium", ["tin", 0.15, 1], ["minecraft:lapis_lazuli", 0.25, 1]],
  ["platinum", ["gold", 0.12, 1], ["minecraft:quartz", 0.25, 1]],
  ["silver", ["nickel", 0.12, 1], ["minecraft:glowstone_dust", 0.25, 1]],
  ["tin", ["lead", 0.1, 1], ["minecraft:clay_ball", 0.25, 1]],
  ["uranium", ["lead", 0.2, 1], ["minecraft:gunpowder", 0.25, 1]],
  ["zinc", ["iron", 0.12, 1], ["minecraft:gunpowder", 0.25, 1]]
]

// List of cluster types
global.clusterTypes = [
  "platinum",
  "lapis_lazuli",
  "emerald",
  "redstone",
  "zinc",
  "uranium",
  "diamond",
  "gold",
  "iron",
  "lead",
  "nickel",
  "osmium",
  "quartz",
  "silver",
  "tin",
  "copper",
  "aluminum"
]
/**
 * Add ores to generate for mods like Actually Additions, Occultism, and Botania.
 *
 * Each ore entry defines:
 * - `weight`: A numeric value representing how frequently the ore should generate.
 * - `dimensions` (optional): List of allowed dimensions for generation. Defaults to `["Overworld", "Nether", "End"]` if not specified.
 * - `dimensions_override` (optional): Forces the ore to generate in the listed dimensions, even if those dimensions are globally disabled.
 * - `blockVariants`: Maps different generation contexts or forms to block IDs.
 *     Common keys include:
 *     - `stone`: Standard overworld variant (e.g., "minecraft:coal_ore")
 *     - `deepslate`: Deep layer overworld variant (e.g., "minecraft:deepslate_iron_ore")
 *     - `nether`: Variant specific to the Nether (e.g., "minecraft:nether_quartz_ore")
 *     - `end`: Variant specific to the End (if applicable)
 *     - `storage`: The storage block version (e.g., "minecraft:iron_block")
 *
 * @type {Object.<string, {
 *   weight: number,
 *   dimensions?: string[],
 *   dimensions_override?: string[],
 *   blockVariants: {
 *     stone?: string,
 *     deepslate?: string,
 *     nether?: string,
 *     end?: string,
 *     storage?: string,
 *     [variant: string]: string
 *   }
 * }>}
 */
global.oreGenOres = {}
/**
 * A list of resource ore/ingot mappings used for processing or recipe generation.
 *
 * Each entry defines:
 * - `modID`: The namespace or mod ID that owns the material (e.g., "minecraft", "ftbmaterials").
 * - `modPrefixOverride` (optional): Overrides the default mod prefix used for output item IDs.
 * - `materials`: A list of material names associated with the mod (e.g., ["iron", "gold", "copper"]).
 *
 * @type {Array<{
 *   modID: string,
 *   modPrefixOverride?: string,
 *   materials: string[]
 * }>}
 */
global.resourceOresIngots = []
/**
 * List of gem resources used for processing or recipes.
 *
 * Each entry includes:
 * - `modID`: The namespace or mod ID owning the materials (e.g., "minecraft").
 * - `materials`: An array of material tuples, where each tuple contains:
 *    0: material name (string)
 *    1: amount (number) — quantity used or produced
 *    2: item ID override (string, optional) — defaults to `${modID}:${materialName}` if omitted
 *    3: disableCrushing (boolean, optional) — if true, crushing the item into dust is disabled; defaults to **true**
 *
 * Example:
 * ["coal", 2, "minecraft:coal", false]
 *
 * @type {Array<{
 *   modID: string,
 *   materials: Array<
 *     [string, number, (string|undefined)?, (boolean|undefined)?]
 *   >
 * }>}
 */
global.resourcesOresGem = []
/**
 * TODO: Add Better Support For This
 */

global.resourcesOresGemDust = [
  ["c:gems/diamond", "ftbmaterials:diamond_dust", 1],
  ["c:gems/fluorite", "ftbmaterials:fluorite_dust", 1],
  ["c:gems/emerald", "ftbmaterials:emerald_dust", 1],
  ["c:gems/niter", "ftbmaterials:niter_dust", 1],
  ["c:gems/ruby", "ftbmaterials:ruby_dust", 1],
  ["c:gems/sapphire", "ftbmaterials:sapphire_dust", 1],
  ["c:gems/coal_coke", "ftbmaterials:coal_coke_dust", 1],
  ["c:gems/sulfur", "ftbmaterials:sulfur_dust", 1]
]
global.enabledAlloys = [
  {
    first: {
      id: "iron",
      amount: 2
    },
    second: {
      id: "nickel",
      amount: 1
    },
    output: {
      id: "invar",
      amount: 3
    }
  }
]
/**
 * List of enabled gear materials.
 *
 * Each entry is an array with one or two elements:
 * - `[type]` — material type as a string (e.g., "gold")
 * - `[type, tagOverride]` — optional tag override string
 *
 * If `tagOverride` is omitted, it defaults to `c:ingots/{type}`.
 *
 * @type {Array<[string, (string|undefined)]>}
 */
global.enabledGears = []

/**
 * List of enabled rod materials.
 *
 * Each entry is an array with one or two elements:
 * - `[type]` — material type as a string (e.g., "gold")
 * - `[type, tagOverride]` — optional tag override string
 *
 * If `tagOverride` is omitted, it defaults to `c:ingots/{type}`.
 *
 * @type {Array<[string, (string|undefined)]>}
 */
global.enabledRods = []

/**
 * List of enabled plate materials.
 *
 * Each entry is an array with one or two elements:
 * - `[type]` — material type as a string (e.g., "gold")
 * - `[type, tagOverride]` — optional tag override string
 *
 * If `tagOverride` is omitted, it defaults to `c:ingots/{type}`.
 *
 * @type {Array<[string, (string|undefined)]>}
 */
global.enabledPlates = [["invar"]]

/**
 * List of enabled wire materials.
 *
 * Each entry is an array with one or two elements:
 * - `[type]` — material type as a string (e.g., "gold")
 * - `[type, tagOverride]` — optional tag override string
 *
 * If `tagOverride` is omitted, it defaults to `c:ingots/{type}`.
 *
 * @type {Array<[string, (string|undefined)]>}
 */
global.enabledWires = []
/**
 * List of slurry materials to register with Mekanism chemical registry.
 *
 * Each entry is an array containing:
 * - `ore` (string): The ore name identifier (e.g., "zinc").
 * - `dirtyColor` (number): Hex color tint for the dirty slurry variant.
 * - `cleanColor` (number): Hex color tint for the clean slurry variant.
 *
 * Example:
 * ["zinc", 0xd8d8c8, 0xcfd1c0]
 *
 * These are used to create custom dirty and clean slurry chemical types,
 * tinted appropriately and linked to the ore type.
 *
 * @type {Array<[string, number, number]>}
 */
global.addSlurry = []

/**
 * List of ores that are actively used.
 *
 * Any ores not listed here may be hidden from JEI or excluded from recipes.
 *
 * @type {string[]}
 */
global.usedOres = []

/**
 * List of materials that are actively used.
 *
 * Helps control which materials appear in recipes, tags, or JEI.
 *
 * @type {string[]}
 */
global.usedMaterials = []

/**
 * List of recipe IDs to remove from the game.
 *
 * Each entry is a full recipe ID string (e.g., "modid:recipe_name").
 *
 * @type {string[]}
 */
global.removeRecipe = [
  "ftb:farmersdelight/crushing/diamond_dust",
  "ftb:farmersdelight/crushing/emerald_dust",
  "ftb:farmersdelight/crushing/fluorite_dust",
  "ftb:farmersdelight/crushing/lapis_lazuli_dust",
  "ftb:farmersdelight/crushing/quartz_dust",
  "ftb:farmersdelight/crushing/redstone_dust",
  "ftb:ftbmaterials/blasting/diamond",
  "ftb:ftbmaterials/blasting/emerald",
  "ftb:ftbmaterials/blasting/fluorite",
  "ftb:ftbmaterials/blasting/lapis_lazuli",
  "ftb:ftbmaterials/blasting/quartz",
  "ftb:ftbmaterials/blasting/redstone",
  "ftb:ftbmaterials/smelting/diamond",
  "ftb:ftbmaterials/smelting/emerald",
  "ftb:ftbmaterials/smelting/fluorite",
  "ftb:ftbmaterials/smelting/lapis_lazuli",
  "ftb:ftbmaterials/smelting/quartz",
  "ftb:ftbmaterials/smelting/redstone",
  `ftb:functional_storage/compacting/chunks/diamond`,
  `ftb:functional_storage/compacting/chunks/emerald`,
  `ftb:functional_storage/compacting/chunks/fluorite`,
  `ftb:functional_storage/compacting/chunks/lapis_lazuli`,
  `ftb:functional_storage/compacting/chunks/quartz`,
  `ftb:functional_storage/compacting/chunks/redstone`
]

/**
 * List of item or block IDs to fully remove from visibility and functionality.
 *
 * Each item will:
 * - Be removed from all tags (item)
 * - Be hidden from JEI
 *
 * @type {string[]}
 */
global.removeItem = [
  "ftbmaterials:diamond_cluster",
  "ftbmaterials:lapis_lazuli_cluster",
  "ftbmaterials:emerald_cluster",
  "ftbmaterials:fluorite_cluster",
  "ftbmaterials:redstone_cluster",
  "ftbmaterials:quartz_cluster",
  "ftbmaterials:diamond_chunk",
  "ftbmaterials:quartz_chunk",
  "ftbmaterials:redstone_chunk",
  "ftbmaterials:fluorite_chunk",
  "ftbmaterials:emerald_chunk",
  "ftbmaterials:lapis_lazuli_chunk"
]

/**
 * List of JEI recipe categories to hide from the interface.
 *
 * Each entry is a category ID (e.g., "minecraft:crafting", "mekanism:enriching").
 *
 * @type {string[]}
 */
global.removeRecipeCategories = []

/**
 * List of item tag removal rules.
 *
 * Each entry is a tuple of:
 * - `tag` (string): The item tag to remove the item from (e.g., "c:ingots/steel")
 * - `item` (string): The item ID to be removed from the tag (e.g., "oritech:biosteel_ingot")
 *
 * @type {Array<[string, string]>}
 */
global.removeItemTag = []

/**
 * List of ore block IDs to remove entirely from the game.
 *
 * Each block will:
 * - Be removed from all item and block tags
 * - Be hidden from JEI
 *
 * Typically used to fully disable duplicate or unused ore blocks from mods.
 *
 * @type {string[]}
 */
global.removeOre = []

global.geoOres = []

/**
 * List of tag prefixes used to identify if a given input string is a tag.
 *
 * For example: ["c"]
 *
 * @type {string[]}
 */
global.tags = [global.tagPrefix]

// Mods

// Minecraft
if (Platform.isLoaded("minecraft")) {
  global.resourceOresIngots.push({
    modID: "minecraft",
    modPrefixOverride: "minecraft",
    materials: ["iron", "gold", "copper"]
  })
  global.resourcesOresGem.push({
    modID: "minecraft",
    materials: [
      ["coal", 2, "minecraft:coal", false],
      ["redstone", 10, "minecraft:redstone", false],
      ["lapis_lazuli", 8, "minecraft:lapis_lazuli"],
      ["diamond", 2],
      ["emerald", 2],
      ["quartz", 2]
    ]
  })

  // Special Ore Type. Need getting added here
  global.usedOres.push({
    modID: "minecraft",
    material: "ancient_debris"
  })

  global.removeOre.push("minecraft:nether_gold_ore")

  // Add Ores To Ore Gens
  Object.assign(global.oreGenOres, {
    ancient_debris: {
      weight: 20,
      dimensions: ["nether"],
      dimensions_override: ["nether"],
      blockVariants: {
        nether: "minecraft:ancient_debris",
        storage: "minecraft:ancient_debris"
      }
    },
    coal: {
      weight: 5000,
      blockVariants: {
        stone: "minecraft:coal_ore",
        deepslate: "minecraft:deepslate_coal_ore",
        storage: "minecraft:coal_block"
      }
    },
    copper: {
      weight: 2000,
      blockVariants: {
        stone: "minecraft:copper_ore",
        deepslate: "minecraft:deepslate_copper_ore",
        storage: "minecraft:raw_copper_block"
      }
    },
    diamond: {
      weight: 150,
      blockVariants: {
        stone: "minecraft:diamond_ore",
        deepslate: "minecraft:deepslate_diamond_ore",
        storage: "minecraft:diamond_block"
      }
    },
    emerald: {
      weight: 130,
      blockVariants: {
        stone: "minecraft:emerald_ore",
        deepslate: "minecraft:deepslate_emerald_ore",
        storage: "minecraft:emerald_block"
      }
    },
    gold: {
      weight: 500,
      blockVariants: {
        stone: "minecraft:gold_ore",
        deepslate: "minecraft:deepslate_gold_ore",
        nether: "minecraft:nether_gold_ore",
        storage: "minecraft:raw_gold_block"
      }
    },
    iron: {
      weight: 3000,
      blockVariants: {
        stone: "minecraft:iron_ore",
        deepslate: "minecraft:deepslate_iron_ore",
        storage: "minecraft:raw_iron_block"
      }
    },
    lapis: {
      weight: 250,
      blockVariants: {
        stone: "minecraft:lapis_ore",
        deepslate: "minecraft:deepslate_lapis_ore",
        storage: "minecraft:lapis_block"
      }
    },
    quartz: {
      weight: 3000,
      dimensions: ["nether"],
      dimensions_override: ["nether"],
      blockVariants: {
        nether: "minecraft:nether_quartz_ore",
        storage: "minecraft:quartz_block"
      }
    },
    redstone: {
      weight: 700,
      blockVariants: {
        stone: "minecraft:redstone_ore",
        deepslate: "minecraft:deepslate_redstone_ore",
        storage: "minecraft:redstone_block"
      }
    }
  })

  global.removeRecipe.push("minecraft:copper_ingot_from_waxed_copper_block")
}

// Thermal
if (Platform.isLoaded("thermal")) {
  global.resourceOresIngots.push({
    modID: "thermal",
    materials: ["silver", "nickel", "tin", "lead"]
  })

  global.resourcesOresGem.push({
    modID: "thermal",
    materials: [
      ["ruby", 2],
      ["sapphire", 2],
      ["apatite", 2],
      ["niter", 2],
      ["sulfur", 2],
      ["cinnabar", 2]
    ]
  })
  // Fix This LAter
  //global.enabledAlloys.push("invar", "constantan", "electrum", "bronze", "lumium")

  global.enabledGears.push(
    ["tin"],
    ["iron"],
    ["invar"],
    ["gold"],
    ["electrum"],
    ["diamond", "c:gems/diamond"],
    ["copper"],
    ["constantan"],
    ["bronze"],
    ["lead"],
    ["lumium"],
    ["nickel"],
    ["silver"]
  )
  global.enabledPlates.push(["lumium"], ["silver"], ["lead"], ["invar"], ["electrum"], ["constantan"], ["bronze"])
}

// Immersive Engineering
if (Platform.isLoaded("immersiveengineering")) {
  global.resourceOresIngots.push({
    modID: "immersiveengineering",
    materials: ["aluminum", "nickel"]
  })

  global.enabledWires.push(["lead"])

  global.addSlurry.push(["aluminum", 0xc3ccd4, 0xd7e3ec], ["nickel", 0xb6b8a4, 0xc4c6b3])

  global.usedMaterials.push("bauxite", "niter", "coal_coke")

  global.usedMaterials.push("steel")
  global.enabledAlloys.push({
    first: {
      id: "copper",
      amount: 1
    },
    second: {
      id: "nickel",
      amount: 1
    },
    output: {
      id: "constantan",
      amount: 2
    }
  })
  global.enabledPlates.push(["aluminum"], ["nickel"], ["steel"], ["electrum"], ["bronze"], ["constantan"], ["lead"])
  global.enabledWires.push(["aluminum"], ["copper"], ["electrum"], ["steel"])
  global.enabledRods.push(["iron"], ["steel"], ["aluminum"], ["netherite"])

  Object.assign(global.oreGenOres, {
    nickel: { weight: 2000 },
    silver: { weight: 1000 },
    sulfur: {
      weight: 1000,
      blockVariants: { storage: "ftbmaterials:sulfur_block" }
    },
    aluminum: { weight: 1400 }
  })
}

// Create
if (Platform.isLoaded("create")) {
  global.resourceOresIngots.push({
    modID: "create",
    materials: ["zinc"]
  })

  global.addSlurry.push(["zinc", 0xd8d8c8, 0xcfd1c0])
  global.enabledAlloys.push({
    first: {
      id: "copper",
      amount: 1
    },
    second: {
      id: "zinc",
      amount: 1
    },
    output: {
      id: "brass",
      amount: 2
    }
  })
  global.enabledPlates.push(
    ["copper"],
    ["gold"],
    ["iron"],
    ["obsidian", "c:obsidians/normal", false],
    ["brass"],
    ["zinc"]
  )

  Object.assign(global.oreGenOres, { zinc: { weight: 1000 } })
}

// Create Addition
if (Platform.isLoaded("createaddition")) {
  global.enabledAlloys.push({
    first: {
      id: "gold",
      amount: 1
    },
    second: {
      id: "silver",
      amount: 1
    },
    output: {
      id: "electrum",
      amount: 2
    }
  })
  global.enabledWires.push(["iron"], ["gold"] /*["copper"], ["electrum"]*/)
  global.enabledRods.push(["gold"], /*["electrum"], ["copper"],*/ ["lumium"])

  global.removeItem.push("createaddition:electrum_ingot")
}

if (Platform.isLoaded("chicken_roost")) {
  global.removeItem.push(
    "chicken_roost:ingot_zinc",
    "chicken_roost:ingot_electrum",
    "chicken_roost:ingot_silver",
    "chicken_roost:ingot_zinc",
    "chicken_roost:ingot_bronze",
    "chicken_roost:ingot_lead",
    "chicken_roost:ingot_steel",
    "chicken_roost:ingot_tin",
    "chicken_roost:ingot_uranium",
    "chicken_roost:ingot_aluminum",
    "chicken_roost:ingot_chrome",
    "chicken_roost:ingot_invar",
    "chicken_roost:ingot_platinum",
    "chicken_roost:ingot_adamantium",
    "chicken_roost:ingot_lumium",
    "chicken_roost:ingot_signalum",
    "chicken_roost:ingot_iridium",
    "chicken_roost:ingot_nickel",
    "chicken_roost:ingot_tungstensteel"
  )
}

// Embers
if (Platform.isLoaded("embers")) {
  if (global.fluidMod !== "embers") {
    global.fluids.push(
      "embers:molten_aluminum_bucket",
      "embers:molten_brass_bucket",
      "embers:molten_bronze_bucket",
      "embers:molten_constantan_bucket",
      "embers:molten_copper_bucket",
      "embers:molten_electrum_bucket",
      "embers:molten_gold_bucket",
      "embers:molten_invar_bucket",
      "embers:molten_iron_bucket",
      "embers:molten_lead_bucket",
      "embers:molten_nickel_bucket",
      "embers:molten_platinum_bucket",
      "embers:molten_silver_bucket",
      "embers:molten_tin_bucket",
      "embers:molten_uranium_bucket",
      "embers:molten_zinc_bucket",
      "embers:steam_bucket"
    )
  }
}

// Thermal Extra
if (Platform.isLoaded("thermal_extra")) {
  if (global.fluidMod !== "thermal_extra") {
    global.fluids.push(
      "thermal_extra:raw_aluminum_bucket",
      "thermal_extra:raw_copper_bucket",
      "thermal_extra:raw_gold_bucket",
      "thermal_extra:raw_iron_bucket",
      "thermal_extra:raw_lead_bucket",
      "thermal_extra:raw_nickel_bucket",
      "thermal_extra:raw_osmium_bucket",
      "thermal_extra:raw_silver_bucket",
      "thermal_extra:raw_tin_bucket",
      "thermal_extra:raw_uranium_bucket",
      "thermal_extra:raw_zinc_bucket"
    )
  }
}

// Mekanism
if (Platform.isLoaded("mekanism")) {
  global.resourceOresIngots.push({
    modID: "mekanism",
    materials: ["osmium", "tin", "lead", "uranium"]
  })

  global.resourcesOresGem.push({
    modID: "mekanism",
    materials: [
      ["sulfur", 2, "ftbmaterials:sulfur_dust", false],
      ["fluorite", 2, "ftbmaterials:fluorite_gem", false],
      ["salt", 2, "ftbmaterials:salt_dust", false]
    ]
  })

  global.usedMaterials.push("refined_glowstone", "refined_obsidian")
  global.enabledAlloys.push({
    first: {
      id: "copper",
      amount: 3
    },
    second: {
      id: "tin",
      amount: 1
    },
    output: {
      id: "bronze",
      amount: 4
    }
  })

  Object.assign(global.oreGenOres, {
    uranium: { weight: 100 },
    lead: { weight: 1700 },
    tin: { weight: 2000 },
    osmium: { weight: 2000 },
    salt: {
      weight: 1000,
      blockVariants: {
        storage: "ftbmaterials:salt_block"
      }
    },
    fluorite: {
      weight: 500,
      blockVariants: { storage: "ftbmaterials:fluorite_block" }
    }
  })
}

// Oritech
if (Platform.isLoaded("oritech")) {
  global.resourceOresIngots.push({
    modID: "oritech",
    materials: ["platinum"]
  })

  global.addSlurry.push(["platinum", 0xa9adb5, 0xb8beca])
}

// Occultism
if (Platform.isLoaded("occultism")) {
  global.resourceOresIngots.push({
    modID: "occultism",
    materials: ["silver"]
  })

  global.addSlurry.push(["silver", 0xbfc4c9, 0xccdae4])
}

// Modern Industrialization
if (Platform.isLoaded("modern_industrialization")) {
  global.enabledRods.push(["copper"], ["iron"], ["bronze"], ["gold"], ["invar"], ["tin"], ["titanium"], ["uranium"])

  global.enabledPlates.push(
    ["bronze"],
    ["diamond", "c:gems/diamond"],
    ["electrum"],
    ["invar"],
    ["lead"],
    ["platinum"],
    ["silver"],
    ["tin"],
    ["titanium"],
    ["tungsten"],
    ["chromium"],
    ["stainless_steel"],
    ["emerald", "c:gems/emerald"],
    ["silicon", "c:ingots/silicon"]
  )

  global.addSlurry.push(["antimony", 0x9ea1a7, 0x7e838a], ["iridium", 0xb5c6cf, 0x8ea2ab])

  global.resourceOresIngots.push({
    modID: "modern_industrialization",
    materials: ["antimony", "iridium"]
  })

  global.resourcesOresGem.push({
    modID: "modern_industrialization",
    materials: [
      ["monazite", 2, "ftbmaterials:monazite_dust", false],
      ["tungsten", 2, "ftbmaterials:tungsten_ingot"],
      ["titanium", 2, "ftbmaterials:titanium_raw_ore", false],
      ["bauxite", 2, "ftbmaterials:bauxite_dust", false]
    ]
  })

  global.enabledWires.push(["tin"], ["silver"], ["platinum"])

  global.usedMaterials.push("titanium", "stainless_steel", "chromium", "plutonium", "iridium")
  // Fix Later
  // global.enabledAlloys.push("invar", "electrum", "bronze")
  global.enabledGears.push(
    ["titanium"],
    ["invar"],
    ["tin"],
    ["stainless_steel"],
    ["steel"],
    ["copper"],
    ["bronze"],
    ["gold"],
    ["iron"]
  )

  Object.assign(global.oreGenOres, {
    antimony: { weight: 1700 },
    monazite: {
      weight: 1700,
      blockVariants: {
        storage: "ftbmaterials:monazite_stone_ore"
      }
    },
    platinum: { weight: 75 },
    titanium: { weight: 150 }
  })
}

// Industrial Foregoing
if (Platform.isLoaded("industrialforegoing")) {
  global.fluids.push("industrialforegoing:raw_ore_meat_bucket")
  global.removeItem.push(
    "industrialforegoing:washing_factory",
    "industrialforegoing:fermentation_station",
    "industrialforegoing:fluid_sieving_machine"
  )
  global.removeRecipeCategories.push(
    "industrialforegoing:fermenter",
    "industrialforegoing:ore_washer",
    "industrialforegoing:ore_sieve"
  )
  global.removeRecipe.push(
    "industrialforegoing:fluid_sieving_machine",
    "industrialforegoing:fermentation_station",
    "industrialforegoing:washing_factory"
  )

  global.enabledGears.push(["gold"], ["diamond", "c:gems/diamond"])
}

// Actually Additions
if (Platform.isLoaded("actuallyadditions")) {
  global.resourcesOresGem.push({
    modID: "actuallyadditions",
    materials: [["black_quartz", 2, "actuallyadditions:black_quartz", false]]
  })

  global.removeItem.push("actuallyadditions:tiny_coal", "actuallyadditions:tiny_charcoal")

  global.removeRecipe.push("actuallyadditions:charcoal_to_tiny", "actuallyadditions:tiny_to_charcoal")
}

// Irons Jewelry
if (Platform.isLoaded("irons_jewelry")) {
  global.resourcesOresGem.push({
    modID: "irons_jewelry",
    materials: [
      ["sapphire", 2, "ftbmaterials:sapphire_gem"],
      ["ruby", 2, "ftbmaterials:ruby_gem"]
    ]
  })
  global.removeItem.push("irons_jewelry:sapphire", "irons_jewelry:ruby")

  Object.assign(global.oreGenOres, {
    ruby: {
      weight: 250,
      blockVariants: { storage: "ftbmaterials:ruby_block" }
    },
    sapphire: {
      weight: 250,
      blockVariants: { storage: "ftbmaterials:sapphire_block" }
    }
  })
}

if (Platform.isLoaded("xycraft_world")) {
  global.resourcesOresGem.push({
    modID: "xycraft_world",
    materials: [
      ["xychorium_blue", 2, "xycraft_world:xychorium_gem_blue", false],
      ["xychorium_green", 2, "xycraft_world:xychorium_gem_green", false],
      ["xychorium_red", 2, "xycraft_world:xychorium_gem_red", false],
      ["xychorium_dark", 2, "xycraft_world:xychorium_gem_dark", false],
      ["xychorium_light", 2, "xycraft_world:xychorium_gem_light", false]
    ]
  })

  Object.assign(global.oreGenOres, {
    xychorium_blue: {
      weight: 250,
      dimensions: ["overworld"],
      blockVariants: {
        stone: "xycraft_world:xychorium_ore_stone_blue",
        deepslate: "xycraft_world:xychorium_ore_deepslate_blue",
        storage: "xycraft_world:xychorium_storage_blue"
      }
    },
    xychorium_dark: {
      weight: 250,
      dimensions: ["overworld"],
      blockVariants: {
        stone: "xycraft_world:xychorium_ore_stone_red",
        deepslate: "xycraft_world:xychorium_ore_deepslate_red",
        storage: "xycraft_world:xychorium_storage_dark"
      }
    },
    xychorium_green: {
      weight: 250,
      dimensions: ["overworld"],
      blockVariants: {
        stone: "xycraft_world:xychorium_ore_stone_red",
        deepslate: "xycraft_world:xychorium_ore_deepslate_red",
        storage: "xycraft_world:xychorium_storage_green"
      }
    },
    xychorium_red: {
      weight: 250,
      dimensions: ["overworld"],
      blockVariants: {
        stone: "xycraft_world:xychorium_ore_stone_red",
        deepslate: "xycraft_world:xychorium_ore_deepslate_red",
        storage: "xycraft_world:xychorium_storage_red"
      }
    },
    xychorium_light: {
      weight: 250,
      dimensions: ["overworld"],
      blockVariants: {
        stone: "xycraft_world:xychorium_ore_stone_light",
        deepslate: "xycraft_world:xychorium_ore_deepslate_light",
        storage: "xycraft_world:xychorium_storage_light"
      }
    }
  })
}

// Refined Storage
if (Platform.isLoaded("refinedstorage")) {
  global.usedMaterials.push("silicon")
  global.removeItem.push("refinedstorage:silicon")
}

// AE2
if (Platform.isLoaded("ae2")) {
  global.removeItem.push("ae2:silicon")
}

// Productive Trees
if (Platform.isLoaded("productivetrees")) {
  global.removeRecipe.push("productivetrees:cured_rubber")
  global.removeItem.push("productivetrees:cured_rubber", "productivetrees:rubber")
}

// More Red
if (Platform.isLoaded("morered")) {
  global.removeItem.push("morered:red_alloy_ingot")
}

// MFFS
if (Platform.isLoaded("mffs")) {
  global.removeItem.push("mffs:steel_ingot", "mffs:steel_compound")
  global.removeRecipe.push("mffs:steel_compound", "mffs:steel_ingot")
}

if (Platform.isLoaded("silentgear")) {
  global.removeRecipe.push("silentgear:iron_rod")
  global.removeItem.push("silentgear:iron_rod")
}

if (Platform.isLoaded("mekanism_weaponry")) {
  global.removeRecipe.push("mekanism_weaponry:steel_rod")
  global.removeItem.push("mekanism_weaponry:steel_rod")
}

if (Platform.isLoaded("justdirethings")) {
  global.removeItem.push("justdirethings:charcoal")
  global.removeRecipe.push("justdirethings:charcoal_9x9", "justdirethings:charcoal_block_9x9")
}

if (Platform.isLoaded("pneumaticcraft")) {
  global.removeItem.push("pneumaticcraft:copper_nugget")
  global.removeRecipe.push("pneumaticcraft:copper_ingot_from_nugget")
}

if (Platform.isLoaded("appflux")) {
  global.removeItem.push("appflux:emerald_dust", "appflux:diamond_dust")
  global.removeRecipe.push("appflux:inscriber/crush_emerald", "appflux:inscriber/crush_diamond")
}

if (Platform.isLoaded("rftoolsbase")) {
  global.removeOre.push(
    "rftoolsbase:dimensionalshard_overworld",
    "rftoolsbase:dimensionalshard_nether",
    "rftoolsbase:dimensionalshard_end"
  )

  global.removeItem.push("rftoolsbase:dimensionalshard")

  global.resourcesOresGem.push({
    modID: "rftoolsbase",
    materials: [["dimensional_shard", 5, "ftbmaterials:dimensional_shard_gem"]]
  })
}

if (Platform.isLoaded("malum")) {
  global.removeItem.push("malum:coal_fragment", "malum:charcoal_fragment")

  global.removeRecipe.push(
    "malum:coal_from_fragment",
    "malum:charcoal_from_fragment",
    "malum:charcoal_fragment",
    "malum:coal_fragment"
  )

  Object.assign(global.oreGenOres, {
    soulstone: {
      weight: 130,
      dimensions: ["overworld"],
      blockVariants: {
        stone: "malum:soulstone_ore",
        deepslate: "malum:deepslate_soulstone_ore",
        storage: "malum:block_of_raw_soulstone"
      }
    }
  })
}

if (Platform.isLoaded("utilitarian")) {
  global.removeItem.push("utilitarian:tiny_coal", "utilitarian:tiny_charcoal")
  global.removeRecipe.push(
    "utilitarian:tiny_fuel/tiny_coal",
    "utilitarian:tiny_fuel/coal",
    "utilitarian:tiny_fuel/tiny_charcoal",
    "utilitarian:tiny_fuel/charcoal"
  )
}

if (Platform.isLoaded("geore")) {
  global.geoOres.push(
    ["topaz", "irons_jewelry:topaz", 1],
    ["uraninite", "powah:uraninite", 6],
    ["black_quartz", "actuallyadditions:black_quartz", 4],
    ["monazite", "ftbmaterials:monazite_dust", 1],
    ["tungsten", "ftbmaterials:tungsten_ingot", 1],
    ["sapphire", "ftbmaterials:sapphire_gem", 1],
    ["ruby", "ftbmaterials:ruby_gem", 1]
  )
}

if (Platform.isLoaded("mysticalagriculture")) {
  Object.assign(global.oreGenOres, {
    inferium_ore: {
      weight: 500,
      dimensions: ["overworld", "nether", "end"],
      blockVariants: {
        stone: "mysticalagriculture:inferium_ore",
        deepslate: "mysticalagriculture:deepslate_inferium_ore",
        nether: "mysticalagradditions:nether_inferium_ore",
        end: "mysticalagradditions:end_inferium_ore",
        storage: "mysticalagriculture:inferium_block"
      }
    },
    prosperity_ore: {
      weight: 250,
      dimensions: ["overworld", "nether", "end"],
      blockVariants: {
        stone: "mysticalagriculture:prosperity_ore",
        deepslate: "mysticalagriculture:deepslate_prosperity_ore",
        nether: "mysticalagradditions:nether_prosperity_ore",
        end: "mysticalagradditions:end_prosperity_ore",
        storage: "mysticalagriculture:prosperity_block"
      }
    }
  })
}

if (Platform.isLoaded("cognition")) {
  global.removeRecipe.push("cognition:book_from_any_leather")
}

if (Platform.isLoaded("mynethersdelight")) {
  global.removeRecipe.push(
    "mynethersdelight:crafting/scaffolding_alt",
    "mynethersdelight:crafting/stick_alt",
    // Yes this is the right spot. Only removes it if the mod is found. It Adds a better recipe
    "farmersdelight:basket"
  )
}

if (Platform.isLoaded("farmersdelight")) {
  global.removeRecipe.push("farmersdelight:scaffolding_from_canvas", "farmersdelight:cake_from_milk_bottle")
}

if (Platform.isLoaded("sophisticatedstorage")) {
  global.removeRecipe.push(
    "sophisticatedstorage:spruce_barrel",
    "sophisticatedstorage:oak_chest",
    "sophisticatedstorage:spruce_limited_barrel_1",
    "sophisticatedstorage:spruce_limited_barrel_2",
    "sophisticatedstorage:spruce_limited_barrel_3",
    "sophisticatedstorage:spruce_limited_barrel_4"
  )
}

// Setup Data For Usage

// Ingot materials (already flat)
global.resourceOresIngots.forEach(function (resource) {
  global.usedMaterials.push.apply(global.usedMaterials, resource.materials)
})

// Gem materials (use only the first element of each entry)
global.resourcesOresGem.forEach(function (resource) {
  resource.materials.forEach(function (mat) {
    global.usedMaterials.push(mat[0])
  })
})

if (global.resourceOresIngots) {
  global.resourceOresIngots.forEach((resource) => {
    resource.materials.forEach((material) => {
      global.usedOres.push({
        modID: resource.modID,
        material: material
      })
    })
  })
}

if (global.resourcesOresGem) {
  global.resourcesOresGem.forEach((resource) => {
    resource.materials.forEach((material) => {
      global.usedOres.push({
        modID: resource.modID,
        material: material[0]
      })
    })
  })
}

// All Material Types
const types = [
  "aluminum",
  "apatite",
  "antimony",
  "bauxite",
  "brass",
  "bronze",
  "chromium",
  "cinnabar",
  "coal_coke",
  "constantan",
  "dimensional_shard",
  "refined_obsidian",
  "electrum",
  "fluorite",
  "graphite",
  "invar",
  "iridium",
  "lapis_lazuli",
  "lead",
  "lumium",
  "monazite",
  "nickel",
  "niter",
  "osmium",
  "platinum",
  "plutonium",
  "quartz",
  "redstone",
  "refined_glowstone",
  "resonating_ore",
  "ruby",
  "salt",
  "sapphire",
  "stainless_steel",
  "silicon",
  "silver",
  "steel",
  "sulfur",
  "tin",
  "titanium",
  "tungsten",
  "uranium",
  "zinc"
]

global.enabledAlloys.forEach((alloy) => {
  global.usedMaterials.push(alloy.output.id)
})

global.hide = types.filter((ore) => !global.usedMaterials.includes(ore))

if (!Platform.isLoaded("mekanism")) {
  global.hide.push("dirty_dust", "clump", "crystal", "shard")
}

if (!global.enableClusters) {
  global.hide.push("cluster")
}

if (!global.enableChunks) {
  global.hide.push("chunk")
}

if (!global.enableNetherOres) {
  global.hide.push("nether_ore")
}

if (!global.enableEndOres) {
  global.hide.push("end_ore")
}

if (!global.enableTinyDust) {
  global.hide.push("tiny_dust")
}

if (!global.enableTinyDust) {
  global.hide.push("small_dust")
}
