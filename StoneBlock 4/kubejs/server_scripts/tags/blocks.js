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
      "ftbunearthed:u_face"
    ]
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
      "twilightforest:mazestone_border"
    ]
  }
]

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
  "custommachinery:custom_machine_item"
]
const removeBlockTags = [
  {
    tagName: "minecraft:mineable/axe",
    blockIDs: ["minecraft:crafting_table"]
  },
  {
    tagName: "twilightforest:mazestone",
    blockIDs: ["twilightforest:mazestone"]
  },
  {
    tagName: "twilightforest:mazestone",
    blockIDs: ["twilightforest:mazestone"]
  }
]

const tickSpeedDenyBlocks = [
  "projecte:dm_pedestal",
  "industrialforegoingsouls:soul_surge",
  "twilightforest:time_log_core"
]

ServerEvents.tags("block", (event) => {
  tickSpeedDenyBlocks.forEach((block) => {
    event.add("tickaccelerator:deny", block)
    event.add("justdirethings:tick_speed_deny", block)
  })

  tickSpeedDenyBlocks.forEach((block) => {
    event.add("tickaccelerator:deny", block)
    event.add("gag:do_not_accelerate", block)
    event.add("justdirethings:tick_speed_deny", block)
  })

  relocationDenyBlocks.forEach((block) => {
    event.add("relocation:deny", block)
    event.add("justdirethings:eclipsegate_deny", block)
    event.add("justdirethings:paradox_absorb_deny", block)
    event.add("arsnouveau:rewind_blacklist", block)
    event.add("arsnouveau:break_blacklist", block)
    event.add("justdirethings:swapper_deny", block)
    event.add("c:relocation_not_supported", block)
    event.add("justdirethings:eclipsegate_deny", block)
    event.add("twilightforest:common_protections", block)
    event.add("irregularimplements:block_destabilizers_blacklist", block)
    event.add("irregularimplements:block_mover_blacklist", block)
    event.add("industrialforegoingsouls:cant_accelerate", block)
  })
  addBlockTags.forEach((tag) => {
    event.add(tag.tagName, tag.blockIDs)
  })
  removeBlockTags.forEach((tag) => {
    event.remove(tag.tagName, tag.blockIDs)
  })
  event.add("ftb:chicken_unbreakable", [
    "draconicevolution:dislocator_receptacle",
    "draconicevolution:infused_obsidian",
    "antiblocksrechiseled:bright_black"
  ])
})

ServerEvents.tags("block_entity_type", (event) => {
  event.add("craftingstation:blacklisted", "@mekanism")
})
