const matterValues = [
  {
    itemID: "justdirethings:ferricore_ingot",
    metallic: 18,
  },
  {
    itemID: "justdirethings:blazegold_ingot",
    metallic: 18,
    precious: 18,
  },
  {
    itemID: "justdirethings:celestigem",
    precious: 72,
  },
  {
    itemID: "justdirethings:eclipsealloy_ingot",
    metallic: 72,
    precious: 216,
    nether: 144,
  },
  {
    itemID: "replication:raw_replica",
    metallic: 8,
    precious: 8,
    quantum: 8,
    ender: 4,
    earth: 2,
  },
  {
    itemID: "replication:replicator",
    organic: 2,
    metallic: 64,
    precious: 65,
    quantum: 48,
    ender: 24,
    earth: 4,
  },
  {
    itemID: [
      "ftbmaterials:quartz_dust",
      "ae2:certus_quartz_crystal",
      "ae2:certus_quartz_dust",
      "ae2:charged_certus_quartz_crystal",
      "ae2:printed_calculation_processor",
    ],
    precious: 4,
    nether: 2,
  },
  {
    itemID: "ae2:sky_dust",
    earth: 4,
    organic: 4,
  },
  {
    itemID: ["ae2:fluix_crystal", "ae2:fluix_dust"],
    precious: 5,
    nether: 2,
    earth: 1,
  },
  {
    itemID: "ae2:printed_silicon",
    precious: 4,
    nether: 2,
  },
  {
    itemID: "ae2:printed_logic_processor",
    precious: 9,
    metallic: 9,
  },
  {
    itemID: "ae2:printed_engineering_processor",
    precious: 36,
  },
  {
    itemID: "ae2:engineering_processor",
    organic: 42,
    earth: 2,
    nether: 2,
  },
  {
    itemID: "ae2:calculation_processor",
    organic: 10,
    nether: 4,
    earth: 2,
  },
  {
    itemID: "ae2:logic_processor",
    organic: 15,
    metallic: 9,
    earth: 2,
    nether: 2,
  },
  {
    itemID: "ae2:ender_dust",
    organic: 4,
    ender: 2,
    quantum: 1,
  },
  {
    itemID: "appflux:redstone_crystal",
    precious: 23,
    metallic: 9,
    earth: 19,
    nether: 4,
  },
  {
    itemID: "appflux:charged_redstone",
    precious: 23,
    metallic: 9,
    earth: 19,
    nether: 4,
  },
  {
    itemID: "appflux:insulating_resin",
    precious: 1,
    metallic: 9,
    earth: 6,
    nether: 2,
    organic: 3,
    living: 3,
  },
  {
    itemID: "appflux:printed_energy_processor",
    precious: 23,
    metallic: 9,
    earth: 19,
    nether: 4,
  },
  {
    itemID: "appflux:energy_processor",
    precious: 27,
    metallic: 9,
    earth: 21,
    nether: 6,
  },
  {
    itemID: [
      "ftbmaterials:aluminum_ingot",
      "ftbmaterials:lead_ingot",
      "ftbmaterials:nickel_ingot",
      "ftbmaterials:osmium_ingot",
      "ftbmaterials:zinc_ingot",
      "ftbmaterials:silver_ingot",
      "ftbmaterials:tin_ingot",
    ],
    metallic: 9,
  },
  {
    itemID: [
      "ftbmaterials:invar_ingot",
      "ftbmaterials:steel_ingot",
      "ftbmaterials:bronze_ingot",
      "ftbmaterials:constantan_ingot",
      "ftbmaterials:brass_ingot",
      "ftbmaterials:electrum_ingot",
    ],
    metallic: 18,
    precious: 4,
  },
  {
    itemID: "projecte:dark_matter",
    precious: 2048,
    metallic: 4096,
    nether: 4096,
    earth: 4096,
    ender: 4096,
    quantum: 2048,
    living: 4096,
  },
  {
    itemID: "projecte:condenser_mk2",
    precious: 64,
    metallic: 128,
    ender: 64,
    quantum: 32,
    living: 16,
  },
  {
    itemID: "projecte:red_matter",
    precious: 8192,
    metallic: 16384,
    nether: 16384,
    earth: 16384,
    ender: 16384,
    quantum: 8192,
    living: 16384,
  },
  {
    itemID: "draconicevolution:dragon_heart",
    precious: 32768,
    metallic: 32768,
    nether: 32768,
    earth: 32768,
    ender: 32768,
    quantum: 32768,
    living: 32768,
  },
  {
    itemID: "projecte:collector_mk1",
    precious: 16,
    metallic: 32,
    ender: 128,
    quantum: 32,
    living: 8,
  },
  {
    itemID: "projecte:collector_mk2",
    precious: 32,
    metallic: 64,
    ender: 256,
    quantum: 64,
    living: 16,
  },
  {
    itemID: "projecte:collector_mk3",
    precious: 64,
    metallic: 128,
    ender: 512,
    quantum: 64,
    living: 32,
  },
  {
    itemID: "projecte:life_stone",
    precious: 512,
    ender: 128,
    quantum: 32,
    living: 256,
  },
  {
    itemID: "projecte:relay_mk3",
    precious: 64,
    metallic: 128,
    ender: 512,
    quantum: 64,
    living: 32,
  },
  {
    itemID: "oritech:adamant_ingot",
    precious: 36,
    metallic: 9,
  },
  {
    itemID: "sophisticatedstorage:basic_to_copper_tier_upgrade",
    precious: 48,
    metallic: 48,
  },
  {
    itemID: "sophisticatedstorage:basic_to_iron_tier_upgrade",
    precious: 48,
    metallic: 96,
    earth: 12,
  },
  {
    itemID: "sophisticatedstorage:basic_to_iron_tier_upgrade",
    precious: 48,
    metallic: 128,
    earth: 24,
    nether: 12,
  },
  {
    itemID: "sophisticatedstorage:basic_to_diamond_tier_upgrade",
    precious: 48,
    metallic: 128,
    earth: 24,
    nether: 12,
    quantum: 6,
  },
  {
    itemID: "sophisticatedstorage:basic_to_netherite_tier_upgrade",
    precious: 64,
    metallic: 128,
    earth: 24,
    nether: 48,
    quantum: 24,
    ender: 32,
  },
  {
    itemID: "sophisticatedstorage:stack_upgrade_tier_1_plus",
    metallic: 68,
    earth: 74,
    organic: 74,
    precious: 32,
  },
  {
    itemID: "sophisticatedstorage:stack_upgrade_tier_2",
    metallic: 212,
    earth: 74,
    organic: 74,
    precious: 32,
  },
  {
    itemID: "sophisticatedstorage:stack_upgrade_tier_3",
    precious: 176,
    metallic: 434,
    earth: 106,
    organic: 74,
  },
  
];

ServerEvents.recipes((event) => {
  matterValues.forEach((matter) => {
    const matterTypes = [];

    if (matter.organic)
      matterTypes.push({ type: "replication:organic", amount: matter.organic });
    if (matter.nether)
      matterTypes.push({ type: "replication:nether", amount: matter.nether });
    if (matter.metallic)
      matterTypes.push({
        type: "replication:metallic",
        amount: matter.metallic,
      });
    if (matter.earth)
      matterTypes.push({ type: "replication:earth", amount: matter.earth });
    if (matter.ender)
      matterTypes.push({ type: "replication:ender", amount: matter.ender });
    if (matter.precious)
      matterTypes.push({
        type: "replication:precious",
        amount: matter.precious,
      });
    if (matter.quantum)
      matterTypes.push({ type: "replication:quantum", amount: matter.quantum });
    if (matter.living)
      matterTypes.push({ type: "replication:living", amount: matter.living });

    const itemIDs = Array.isArray(matter.itemID)
      ? matter.itemID
      : [matter.itemID];

    // Loop through each item ID
    itemIDs.forEach((itemID) => {
      if (matterTypes.length > 0) {
        event.custom({
          type: "replication:matter_value",
          input: {
            item: itemID,
          },
          matter: matterTypes,
        });
      }
    });
  });
});
