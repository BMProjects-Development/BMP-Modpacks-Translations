const addBlockTags = [
  {
    tagName: "ftbultimine:excluded_blocks",
    blockIDs: [
      "minecraft:stone",
      "ftbunearthed:core",
      "ftbunearthed:l_corner",
      "ftbunearthed:l_edge",
      "ftbunearthed:m_edge",
      "ftbunearthed:m_face",
      "ftbunearthed:u_corner",
      "ftbunearthed:u_edge",
      "ftbunearthed:u_face",
    ],
  },
  {
    tagName: "mekanism:cardboard_blacklist",
    blockIDs: [
      "powah:reactor_starter",
      "powah:reactor_basic",
      "powah:reactor_hardened",
      "powah:reactor_blazing",
      "powah:reactor_niotic",
      "powah:reactor_spirited",
      "powah:reactor_nitro",
    ],
  },
  {
    tagName: "minecraft:mineable/pickaxe",
    blockIDs: [
      "minecraft:crafting_table",
      "twilightforest:mazestone",
      "twilightforest:mazestone_brick",
      "twilightforest:cracked_mazestone",
      "twilightforest:mossy_mazestone",
      "twilightforest:decorative_mazestone",
      "twilightforest:cut_mazestone",
      "twilightforest:mazestone_mosaic",
      "twilightforest:mazestone_border",
    ],
  },
  { tagName: "minecraft:replaceable_by_trees", blockIDs: ["minecraft:light"] },
  { tagName: "buildinggadgets2:deny", blockIDs: ["enderstorage:ender_tank", "mekanismgenerators:heat_generator"] },
  {
    tagName: "minecraft:crops",
    blockIDs: [
      "chicken_roost:seed_crop_1",
      "chicken_roost:seed_crop_2",
      "chicken_roost:seed_crop_3",
      "chicken_roost:seed_crop_4",
      "chicken_roost:seed_crop_5",
      "chicken_roost:seed_crop_6",
      "chicken_roost:seed_crop_7",
      "chicken_roost:seed_crop_8",
      "chicken_roost:seed_crop_9",
    ],
  },
  {
    tagName: "ftb:printable_multiblock",
    blockIDs: [
      "custommachinery:custom_machine_block",
    ],
  },
  { tagName: "cataclysm:needs_black_steel_tool", blockIDs: [] },
  { tagName: "cataclysm:needs_monstrosity_tool", blockIDs: [] }
];

const relocationDenyBlocks = [
  "draconicevolution:creative_op_capacitor",
  "createaddition:creative_energy",
  "create:creative_crate",
  "create:creative_fluid_tank",
  "create:creative_motor",
  "draconicevolution:infused_obsidian",
  "draconicevolution:dislocator_receptacle",
  "immersiveengineering:capacitor_creative",
  "custommachinery:custom_machine_block",
  "oritech:creative_storage_block",
  "oritech:creative_tank_block",
  "powah:energy_cell_creative",
  "rftoolspower:dimensionalcell_creative",
  "xycraft_machines:item_selector",
  "xycraft_machines:fluid_selector",
  "irregular_implements:spectre_coil_genesis",
  "custommachinery:custom_machine_item",
  "custommachinery:custom_machine_block",
  /custommachinery:custom_machine_item\[custommachinery:machine=.*\]/,
  "ftb:world_engine_wall_plating",
  "ftb:world_engine_vent",
  "ftb:world_engine_fence_plating",
  "ftb:world_engine_slab_plating",
  "ftb:world_engine_plating",
  "ftb:world_engine_circuit",
  "ftb:world_engine_stairs_plating",
  "ftbunearthed:core",
  "ftbunearthed:l_corner",
  "ftbunearthed:l_edge",
  "ftbunearthed:m_edge",
  "ftbunearthed:m_face",
  "ftbunearthed:u_corner",
  "ftbunearthed:u_edge",
  "ftbunearthed:u_face",
  "oritech:item_filter_block",
  "oritech:pulverizer_block",
  "oritech:fragment_forge_block",
  "oritech:assembler_block",
  "oritech:foundry_block",
  "oritech:cooler_block",
  "oritech:centrifuge_block",
  "oritech:atomic_forge_block",
  "oritech:refinery_block",
  "oritech:refinery_module_block",
  "oritech:bio_generator_block",
  "oritech:lava_generator_block",
  "oritech:fuel_generator_block",
  "oritech:basic_generator_block",
  "oritech:steam_engine_block",
  "oritech:big_solar_panel_block",
  "oritech:powered_furnace_block",
  "oritech:laser_arm_block",
  "oritech:deep_drill_block",
  "oritech:drone_port_block",
  "oritech:shrinker_block",
  "oritech:small_storage_block",
  "oritech:large_storage_block",
  "oritech:creative_storage_block",
  "oritech:small_tank_block",
  "oritech:creative_tank_block",
  "oritech:augment_application_block",
  "oritech:simple_augment_station",
  "oritech:advanced_augment_station",
  "oritech:arcane_augment_station",
  "oritech:placer_block",
  "oritech:destroyer_block",
  "oritech:fertilizer_block",
  "oritech:treefeller_block",
  "oritech:pipe_booster_block",
  "oritech:enchantment_catalyst_block",
  "oritech:enchanter_block",
  "oritech:spawner_controller_block",
  "oritech:wither_crop_block",
  "oritech:accelerator_ring",
  "oritech:accelerator_motor",
  "oritech:accelerator_controller",
  "oritech:accelerator_sensor",
  "oritech:black_hole_block",
  "oritech:particle_collector_block",
  "oritech:pump_block",
  "oritech:charger_block",
  "oritech:machine_speed_addon",
  "oritech:machine_efficiency_addon",
  "oritech:machine_ultimate_addon",
  "oritech:quarry_addon",
  "oritech:machine_processing_addon",
  "oritech:machine_fluid_addon",
  "oritech:machine_yield_addon",
  "oritech:crop_filter_addon",
  "oritech:machine_hunter_addon",
  "oritech:machine_capacitor_addon",
  "oritech:machine_acceptor_addon",
  "oritech:machine_inventory_proxy_addon",
  "oritech:steam_boiler_addon",
  "oritech:machine_redstone_addon",
  "oritech:machine_silk_touch_addon",
  "oritech:machine_burst_addon",
  "oritech:reactor_controller",
];

const removeBlockTags = [
  {
    tagName: "minecraft:mineable/axe",
    blockIDs: ["minecraft:crafting_table"],
  },
  {
    tagName: "twilightforest:mazestone",
    blockIDs: ["twilightforest:mazestone"],
  },
  {
    tagName: "twilightforest:mazestone",
    blockIDs: ["twilightforest:mazestone"],
  },
];

const tickSpeedDenyBlocks = [
  "projecte:dm_pedestal",
  "industrialforegoingsouls:soul_surge",
  "twilightforest:time_log_core",
  "@custommachinery"
];

const CataclysmBossImmune = [
  "minecraft:trial_spawner"
]

ServerEvents.tags("block", (event) => {

  CataclysmBossImmune.forEach((block) => {
    event.add("cataclysm:ignis_immune", block)
    event.add("cataclysm:harbinger_immune", block)
    event.add("cataclysm:leviathan_immune", block)
    event.add("cataclysm:remnant_immune", block)
    event.add("cataclysm:maledictus_immune", block)
    event.add("cataclysm:scylla_immune", block)
    event.add("cataclysm:clawdian_immune", block)
  })

  tickSpeedDenyBlocks.forEach((block) => {
    event.add("tickaccelerator:deny", block);
    event.add("c:tick_acceleration_disallowed", block);
    event.add("gag:do_not_accelerate", block);
    event.add("justdirethings:tick_speed_deny", block);
    event.add("industrialforegoingsouls:cant_accelerate", block);
    event.add("projecte:blacklist/time_watch", block);
  });

  relocationDenyBlocks.forEach((block) => {
    event.add("relocation:deny", block);
    event.add("buildinggadgets2:deny", block);
    event.add("justdirethings:eclipsegate_deny", block);
    event.add("justdirethings:paradox_absorb_deny", block);
    event.add("arsnouveau:rewind_blacklist", block);
    event.add("arsnouveau:break_blacklist", block);
    event.add("justdirethings:swapper_deny", block);
    event.add("c:relocation_not_supported", block);
    event.add("justdirethings:eclipsegate_deny", block);
    event.add("twilightforest:common_protections", block);
    event.add("irregularimplements:block_destabilizers_blacklist", block);
    event.add("irregularimplements:block_mover_blacklist", block);
    event.add("irregular_implements:block_replacer_blacklist", block);
    event.add("industrialforegoingsouls:cant_accelerate", block);
    event.add("justdynathings:picker_deny", block);
    event.add("justdynathings:swapper_deny", block);
    event.add("justdynathings:ticker_deny", block);
    event.add("justdynathings:advanced_time_deny", block);
  });

  addBlockTags.forEach((tag) => {
    event.add(tag.tagName, tag.blockIDs);
  });

  removeBlockTags.forEach((tag) => {
    event.remove(tag.tagName, tag.blockIDs);
  });

  event.add("ftb:chicken_unbreakable", [
    "draconicevolution:dislocator_receptacle",
    "draconicevolution:infused_obsidian",
    "antiblocksrechiseled:bright_black",
    "minecraft:deepslate_tiles",
    "glassential:glass_dark_ethereal",
    "minecraft:deepslate_bricks",
    "minecraft:end_stone",
    "sophisticatedbackpacks:backpack",
    "sophisticatedbackpacks:iron_backpack",
    "sophisticatedbackpacks:netherite_backpack",
    "sophisticatedbackpacks:gold_backpack",
    "sophisticatedbackpacks:diamond_backpack",
    "sophisticatedbackpacks:copper_backpack",
  ]);
});

ServerEvents.tags("block_entity_type", (event) => {

  event.add("craftingstation:blacklisted", "@mekanism");

  tickSpeedDenyBlocks.forEach((block) => {
    event.add("projecte:blacklist/time_watch", block);
  });

});
