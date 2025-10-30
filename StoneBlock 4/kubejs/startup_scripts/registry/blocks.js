let $BlockRenderType = Java.loadClass(
  "dev.latvian.mods.kubejs.block.BlockRenderType"
);

let addBlocks = [
  {
    id: "ftb:companion_cube",
    unbreakable: true,
    textures: {
      default: "ftb:block/vaults/portal/companion_cube",
    },
  },
  {
    id: "ftb:test_cube",
    unbreakable: true,
    textures: {
      default: "ftb:block/vaults/portal/test_cube",
    },
  },
  {
    id: "ftb:blue_core",
    unbreakable: true,
    textures: {
      default: "ftb:block/vaults/portal/blue_core",
    },
  },  
  {
    id: "ftb:purple_core",
    unbreakable: true,
    textures: {
      default: "ftb:block/vaults/portal/purple_core",
    },
  },  
  {
    id: "ftb:red_core",
    unbreakable: true,
    textures: {
      default: "ftb:block/vaults/portal/red_core",
    },
  },  
  {
    id: "ftb:orange_core",
    unbreakable: true,
    textures: {
      default: "ftb:block/vaults/portal/orange_core",
    },
  },        
  {
    id: "ftb:fortron_infused_block",
    textures: {
      default: "ftb:block/engine/fortron_infused_block",
    },
  },
  {
    id: "ftb:world_engine_plating",
    textures: {
      default: "ftb:block/engine/world_engine_plating",
    },
  },
  {
    id: "ftb:world_engine_circuit",
    unbreakable: true,
    textures: {
      default: "ftb:block/engine/world_engine_circuit",
    },
  },
  {
    id: "ftb:spirit_block",
    unbreakable: true,
    textures: {
      default: "ftb:block/engine/spirit_block",
    },
  },
  {
    id: "ftb:world_engine_vent",
    unbreakable: true,
    textures: {
      default: "ftb:block/engine/world_engine_vent",
    },
  },
  {
    id: "ftb:chroniton_glass",
    textures: {
      default: "ftb:block/engine/chroniton_glass",
    },
    render: "translucent",
  },
  {
    id: "ftb:euphonium",
    textures: {
      default: "ftb:block/engine/euphonium",
    },
  },
  {
    id: "ftb:resonant_void",
    textures: {
      default: "ftb:block/engine/resonant_void",
    },
  },
  {
    id: "ftb:world_engine_machine_block",
    textures: {
      default: "ftb:block/engine/world_engine_machine_block",
    },
  },
  {
    id: "ftb:world_engine_advanced_machine_block",
    textures: {
      default: "ftb:block/engine/world_engine_advanced_machine_block",
    },
  },
  {
    id: "ftb:enderium_block",
    textures: {
      default: "ftb:block/engine/enderium_block",
    },
  },
  {
    id: "ftb:dry_leaves",
    textures: {
      default: "ftb:block/dry_leaves",
    },
    sound: "AZALEA_LEAVES",
    hardness: 0.2,
    noOcclusion: true,
    opaque: false,
    tags: {
      block: [
        "minecraft:mineable/hoe",
        "minecraft:sword_efficient",
        "minecraft:leaves",
      ],
    },
  },
  {
    id: "ftb:tesseract",
    displayName: "Tesseract Frame",
    textures: {
      default: "ftb:block/tesseract",
    },
    sound: "LODESTONE",
    hardness: 5.0,
    resistance: 1200.0,
    noOcclusion: true,
    opaque: false,
    tags: {
      block: ["mineable/pickaxe"],
    },
  },
  {
    id: "ftb:crushed_kivi",
    tags: {
      block: ["mineable/pickaxe"],
    },
    textures: {
      default: "ftb:block/crushed_kivi",
    },
    hardness: 5,
    requiresTool: true,
  },
];

const doorBlocks = 9;

// Adds Lich Vault Door Blocks
for (let i = 1; i <= doorBlocks; i++) {
  addBlocks.push({
    id: `ftb:lich_door_${i}`,
    textures: {
      default: `ftb:block/vaults/lich/door_${i}`,
    },
    tags: {
      both: ["c:hidden_from_recipe_viewers"],
    },
    unbreakable: true,
  });
}

StartupEvents.registry("block", (event) => {
  addBlocks.forEach((block) => {
    let newBlock = event.create(block.id);
    // Hardness
    newBlock.hardness(block.hardness !== undefined ? block.hardness : 1);
    // Textures
    newBlock.texture("north", block.textures.default);
    newBlock.texture("east", block.textures.default);
    newBlock.texture("west", block.textures.default);
    newBlock.texture("south", block.textures.default);
    newBlock.texture("up", block.textures.default);
    newBlock.texture("down", block.textures.default);
    newBlock.texture("particle", block.textures.default);
    // Render
    newBlock.renderType(block.render !== undefined ? block.render : "SOLID");
    // Unbreakable
    if (block.unbreakable) {
      newBlock.unbreakable();
    }
    // Display Name
    if (block.displayName) {
      newBlock.displayName(block.displayName);
    }
    // Require Tools
    newBlock.requiresTool(
      block.requiresTool !== undefined ? block.requiresTool : false
    );
    // Sound
    newBlock.soundType(block.sound !== undefined ? block.sound : "WOOD");
    // Tags (object form or array)
    if (block.tags) {
      if (block.tags.both)
        block.tags.both.forEach((tag) => newBlock.tagBoth(tag));
      if (block.tags.item)
        block.tags.item.forEach((tag) => newBlock.tagItem(tag));
      if (block.tags.block)
        block.tags.block.forEach((tag) => newBlock.tagBlock(tag));
    }

    // Non-occluding / non-opaque flags
    if (block.noOcclusion && newBlock.noOcclusion) newBlock.noOcclusion();
    if (block.opaque === false && newBlock.opaque) newBlock.opaque(false);
    if (block.opaque === false && newBlock.suffocates)
      newBlock.suffocates(false);
    if (block.opaque === false && newBlock.blocksVision)
      newBlock.blocksVision(false);
    if (newBlock.id == "ftb:dry_leaves") newBlock.defaultTranslucent();
  });

  // Slab
  event
    .create("ftb:world_engine_slab_plating", "slab")
    .displayName("World Engine Plating Slab")
    .hardness(3.0)
    .unbreakable()
    .resistance(3600000.0)
    .requiresTool(true);

  // Fence
  event
    .create("ftb:world_engine_fence_plating", "fence")
    .displayName("World Engine Plating Fence")
    .tagBlock("minecraft:fences")
    .tagItem("minecraft:fences")
    .unbreakable()
    .resistance(3600000.0)
    .hardness(3.0)
    .requiresTool(true);

  // World Engine plating wall
  event
    .create("ftb:world_engine_wall_plating", "wall")
    .displayName("World Engine Plating Wall")
    .tagBlock("minecraft:walls")
    .tagItem("minecraft:walls")
    .unbreakable()
    .resistance(3600000.0)
    .hardness(3.0)
    .requiresTool(true);

  // World Engine plating stairs: custom side, shared top/bottom
  event
    .create("ftb:world_engine_stairs_plating", "stairs")
    .displayName("World Engine Plating Stairs")
    .texture("top", "ftb:block/engine/world_engine_plating")
    .texture("bottom", "ftb:block/engine/world_engine_plating")
    .texture("side", "ftb:block/engine/world_engine_slab_plating")
    .texture("particle", "ftb:block/engine/world_engine_plating")
    .unbreakable()
    .resistance(3600000.0)
    .requiresTool(true)
    .tagBlock("minecraft:stairs")
    .tagItem("minecraft:stairs");
});
