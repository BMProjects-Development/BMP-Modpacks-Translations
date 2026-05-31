// priority: 100000000

/**
 * List of recipe IDs to remove from the game.
 *
 * Each entry is a full recipe ID string (e.g., "modid:recipe_name").
 *
 * @type {string[]}
 */
const removeRecipe = [
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
const removeItem = [
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
 * List of Fluids to fully remove from visibility and functionality.
 *
 * Each fluid will:
 * - Be removed from all tags (fluid)
 * - Be hidden from JEI
 * - And its Fluid Bucket will also be hidden from JEI
 *
 * @type {string[]}
 */
const remFluid = []

/**
 * List of JEI recipe categories to hide from the interface.
 *
 * Each entry is a category ID (e.g., "minecraft:crafting", "mekanism:enriching").
 *
 * @type {string[]}
 */
const removeRecipeCategories = []

/**
 * List of item tag removal rules.
 *
 * Each entry is a tuple of:
 * - `tag` (string): The item tag to remove the item from (e.g., "c:ingots/steel")
 * - `item` (string): The item ID to be removed from the tag (e.g., "oritech:biosteel_ingot")
 *
 * @type {Array<[string, string]>}
 */
const removeItemTag = []

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
const removeOre = []

removeRecipe.push("minecraft:copper_ingot_from_waxed_copper_block")
removeItem.push("createaddition:electrum_ingot", "createaddition:electrum_sheet")
removeRecipe.push("createaddition:pressing/electrum_ingot", "createaddition:mixing/electrum")
removeItem.push(
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
removeItem.push(
  "industrialforegoing:washing_factory",
  "industrialforegoing:fermentation_station",
  "industrialforegoing:fluid_sieving_machine"
)
removeRecipeCategories.push(
  "industrialforegoing:fermenter",
  "industrialforegoing:ore_washer",
  "industrialforegoing:ore_sieve"
)
removeRecipe.push(
  "industrialforegoing:fluid_sieving_machine",
  "industrialforegoing:fermentation_station",
  "industrialforegoing:washing_factory"
)
removeItem.push("actuallyadditions:tiny_coal", "actuallyadditions:tiny_charcoal")

removeRecipe.push("actuallyadditions:charcoal_to_tiny", "actuallyadditions:tiny_to_charcoal")
removeItem.push("irons_jewelry:sapphire", "irons_jewelry:ruby")
removeItem.push("refinedstorage:silicon")
removeItem.push("ae2:silicon")

// Productive Trees
if (Platform.isLoaded("productivetrees")) {
  removeRecipe.push("productivetrees:cured_rubber")
  removeItem.push("productivetrees:cured_rubber", "productivetrees:rubber")
}

// More Red
if (Platform.isLoaded("morered")) {
  removeItem.push("morered:red_alloy_ingot")
}

// MFFS
if (Platform.isLoaded("mffs")) {
  removeItem.push("mffs:steel_ingot", "mffs:steel_compound")
  removeRecipe.push("mffs:steel_compound", "mffs:steel_ingot")
}

if (Platform.isLoaded("silentgear")) {
  removeRecipe.push("silentgear:iron_rod")
  removeItem.push("silentgear:iron_rod")
}

if (Platform.isLoaded("mekanism_weaponry")) {
  removeRecipe.push("mekanism_weaponry:steel_rod")
  removeItem.push("mekanism_weaponry:steel_rod")
}

if (Platform.isLoaded("justdirethings")) {
  removeItem.push("justdirethings:charcoal")
  removeRecipe.push("justdirethings:charcoal_9x9", "justdirethings:charcoal_block_9x9")
}

if (Platform.isLoaded("pneumaticcraft")) {
  removeItem.push("pneumaticcraft:copper_nugget")
  removeRecipe.push("pneumaticcraft:copper_ingot_from_nugget")
}

if (Platform.isLoaded("appflux")) {
  removeItem.push("appflux:emerald_dust", "appflux:diamond_dust")
  removeRecipe.push("appflux:inscriber/crush_emerald", "appflux:inscriber/crush_diamond")
}

removeOre.push(
  "rftoolsbase:dimensionalshard_overworld",
  "rftoolsbase:dimensionalshard_nether",
  "rftoolsbase:dimensionalshard_end"
)

removeItem.push("rftoolsbase:dimensionalshard")

removeItem.push("malum:coal_fragment", "malum:charcoal_fragment")

removeRecipe.push(
  "malum:coal_from_fragment",
  "malum:charcoal_from_fragment",
  "malum:charcoal_fragment",
  "malum:coal_fragment"
)

if (Platform.isLoaded("utilitarian")) {
  removeItem.push("utilitarian:tiny_coal", "utilitarian:tiny_charcoal")
  removeRecipe.push(
    "utilitarian:tiny_fuel/tiny_coal",
    "utilitarian:tiny_fuel/coal",
    "utilitarian:tiny_fuel/tiny_charcoal",
    "utilitarian:tiny_fuel/charcoal"
  )
}

if (Platform.isLoaded("mynethersdelight")) {
  removeRecipe.push(
    "mynethersdelight:crafting/scaffolding_alt",
    "mynethersdelight:crafting/stick_alt",
    // Yes this is the right spot. Only removes it if the mod is found. It Adds a better recipe
    "farmersdelight:basket"
  )
}

if (Platform.isLoaded("farmersdelight")) {
  removeRecipe.push("farmersdelight:scaffolding_from_canvas", "farmersdelight:cake_from_milk_bottle")
}

if (Platform.isLoaded("sophisticatedstorage")) {
  removeRecipe.push(
    "sophisticatedstorage:spruce_barrel",
    "sophisticatedstorage:oak_chest",
    "sophisticatedstorage:spruce_limited_barrel_1",
    "sophisticatedstorage:spruce_limited_barrel_2",
    "sophisticatedstorage:spruce_limited_barrel_3",
    "sophisticatedstorage:spruce_limited_barrel_4"
  )
}

if (Platform.isLoaded("cognition")) {
  removeRecipe.push("cognition:book_from_any_leather")
}
