// ---- Item→fluid rules ----
// Any entry can use exactly one of:
// - fluid: "ns:id"
// - fluids: ["ns:id", ...]  unweighted random
// - weighted: [{id:"ns:id", weight:n}, ...]
global.SB4$CREATIVE_BLOCKS = [
  'ae2:creative_energy_cell',
  'rftoolsutility:creative_screen',
  'cabletiers:creative_importer',
  'create:creative_motor',
  'ars_nouveau:creative_source_jar',
  // 'mekanism:creative_energy_cube',
  'refinedstorage:creative_controller',
  'refinedstorage_mekanism_integration:creative_chemical_storage_block',
  'create:creative_crate',
  'justdynathings:creative_goo',
  'draconicevolution:creative_op_capacitor',
  'cabletiers:creative_disk_interface',
  'mekanism_lasers:creative_laser',
  'powah:energy_cell_creative',
  'create:creative_fluid_tank',
  'create_connected:creative_fluid_vessel',
  'oritech:creative_storage_block',
  'cabletiers:creative_autocrafter',
  'refinedstorage:creative_fluid_storage_block',
  'enderio:creative_power',
  'refinedstorage:creative_portable_grid',
  'mekanism:creative_bin',
  'replication:creative_matter_tank',
  'mekanism_lasers:creative_toggleable_laser',
  'rftoolspower:dimensionalcell_creative',
  'cabletiers:creative_exporter',
  'xycraft_machines:fluid_selector',
  'refinedstorage:creative_storage_block',
  'oritech:creative_tank_block',
  'cabletiers:creative_destructor',
  'createaddition:creative_energy',
  'xycraft_machines:item_selector',
  'cabletiers:creative_interface',
  'immersiveengineering:capacitor_creative'
];

global.COW_TRANSMUTE_RULES = [
  { item: "minecraft:water_bucket", fluid: "minecraft:water" },
  { item: "minecraft:blaze_rod", fluid: "minecraft:lava" },
  { item: "minecraft:ender_eye", fluid: "productivemetalworks:molten_ender" },
  { item: "appflux:insulating_resin", fluid: "industrialforegoing:latex" },
  {
    item: "ftb:clapple",
    weighted: [
      // common base metals
      { id: "productivemetalworks:molten_copper", weight: 20 },
      { id: "productivemetalworks:molten_iron", weight: 18 },
      { id: "productivemetalworks:molten_tin", weight: 14 },
      { id: "productivemetalworks:molten_zinc", weight: 14 },
      { id: "productivemetalworks:molten_lead", weight: 12 },
      { id: "productivemetalworks:molten_carbon", weight: 12 },

      // mid-tier
      { id: "productivemetalworks:molten_nickel", weight: 10 },
      { id: "productivemetalworks:molten_silver", weight: 8 },
      { id: "productivemetalworks:molten_aluminum", weight: 8 },
      { id: "productivemetalworks:molten_slime", weight: 9 },

      // rarer
      { id: "productivemetalworks:molten_gold", weight: 4 },
      { id: "productivemetalworks:molten_uranium", weight: 3 },
      { id: "productivemetalworks:molten_amethyst", weight: 2 },
      { id: "productivemetalworks:molten_redstone", weight: 6 },
      { id: "productivemetalworks:molten_osmium", weight: 6 },
    ],
  },
];

if (!global.noteStateMap) {
  global.noteStateMap = {};
}
