// priority: 800
const lootTable = {
  bee_1: [
    { entry: "minecraft:diamond", weight: 3 },
    { entry: "minecraft:emerald", weight: 3 },
    { entry: "mekanism:energy_tablet[mekanism:energy={energy_containers:[L;1000000L]}]", weight: 2 },
    { entry: "minecraft:quartz", weight: 6 },
    { entry: "ironchest:crystal_chest", weight: 3 },
    { entry: "metalbarrels:crystal_barrel", weight: 3},
    { entry: "minecraft:copper_ingot", weight: 8 },
    { entry: "minecraft:coal", weight: 8 },
    { entry: "minecraft:lapis_lazuli", weight: 8 },
    { entry: "minecraft:iron_ingot", weight: 10 },
    { entry: "minecraft:leather", weight: 12 },
    { entry: "minecraft:feather", weight: 8 },
    { entry: "minecraft:honeycomb", weight: 8 },
    { entry: "minecraft:gold_ingot", weight: 4 },
    { entry: "ironchest:dirt_chest", weight: 3 },
    { entry: "ironchest:iron_chest", weight: 3 },
    { entry: "functionalstorage:oak_1", weight: 3 },
    { entry: "chancecubes:chance_cube", weight: 6 },
    { entry: "irregular_implements:ectoplasm", weight: 1 },
    { entry: "minecraft:egg", weight: 25 },
  ],

  bee_2: [
    { entry: "minecraft:diamond", weight: 4 },
    { entry: "powah:battery_blazing[powah:energy_stored=40000000L]", weight: 1 },
    { entry: "minecraft:quartz_block", weight: 7 },
    { entry: "pipez:improved_upgrade", weight: 4 },
    { entry: "laserio:card_fluid", weight: 5 },
    { entry: "laserio:card_item", weight: 5 },
    { entry: "laserio:card_energy", weight: 5 },
    { entry: "minecraft:redstone_block", weight: 5 },
    { entry: "chancecubes:chance_cube", weight: 7 },
    { entry: "ftbmaterials:aluminum_ingot", weight: 9 },
    { entry: "ftbmaterials:steel_ingot", weight: 7 },
    { entry: "irregular_implements:spectre_illuminator", weight: 4 },
    { entry: "ftbmaterials:brass_ingot", weight: 5 },
    { entry: "ftbmaterials:electrum_ingot", weight: 3 },
    { entry: "actuallyadditions:black_quartz", weight: 3 },
    { entry: "ironchest:iron_chest", weight: 3 },
    { entry: "metalbarrels:iron_barrel", weight: 3},
    { entry: "functionalstorage:oak_1", weight: 3 },
    { entry: "ftbmaterials:osmium_ingot", weight: 2 },
    { entry: "irregular_implements:ectoplasm", weight: 3 },
    { entry: "minecraft:egg", weight: 18 },
  ],

  bee_3: [
    { entry: "chancecubes:chance_cube", weight: 8 },
    { entry: "minecraft:diamond_block", weight: 2 },
    { entry: "minecraft:emerald_block", weight: 2 },
    { entry: "minecraft:netherite_ingot", weight: 2 },
    { entry: "irregular_implements:spectre_illuminator", weight: 4 },
    { entry: "ftbmaterials:refined_glowstone_ingot", weight: 4 },
    { entry: "ftbmaterials:refined_obsidian_ingot", weight: 4 },
    { entry: "ftbmaterials:platinum_ingot", weight: 4 },
    { entry: "ftbmaterials:uranium_ingot", weight: 4 },
    { entry: "minecraft:mace", weight: 2 },
    { entry: "powah:battery_nitro[powah:energy_stored=2000000000L]", weight: 1 },
    { entry: "projecte:dark_matter", weight: 4 },
    { entry: "ae2:fluix_pearl", weight: 2 },
    { entry: "ftbmaterials:steel_ingot", weight: 8 },
    { entry: "ftbmaterials:electrum_ingot", weight: 4 },
    { entry: "actuallyadditions:black_quartz", weight: 4 },
    { entry: "ftbmaterials:osmium_ingot", weight: 2 },
    { entry: "irregular_implements:ectoplasm", weight: 6 },
    { entry: "pipez:advanced_upgrade", weight: 8 },
    { entry: "minecraft:egg", weight: 20 },
  ],
};


LootJS.lootTables((event) => {

    Object.entries(lootTable).forEach(([tableName, entries]) => {
        event.create(`ftb:loot_${tableName}`).createPool(pool => {
            entries.forEach(entry => {
                let loot = LootEntry.of(entry.entry).withWeight(entry.weight)
                pool.addEntry(loot);
            });
        });
    });
});
