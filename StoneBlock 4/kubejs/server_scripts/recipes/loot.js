LootJS.lootTables(event => {
  event.getLootTable("minecraft:entities/vex").firstPool().addEntry("irregular_implements:ectoplasm")
  event.getLootTable("irons_spellbooks:entities/additional_evoker_loot").firstPool().addEntry("irregular_implements:spectre_sapling")
})

LootJS.modifiers(event => {

  // All loot types you want to modify
  const lootTypes = [
      LootType.CHEST,
      LootType.ENTITY,
      LootType.EQUIPMENT,
      LootType.FISHING,
      LootType.ARCHAEOLOGY,
      LootType.GIFT,
      LootType.VAULT,
      LootType.SHEARING,
      LootType.PIGLIN_BARTER
  ];

  // Items to remove globally
  const globalLootRemovals = [
      "twilightforest:charm_of_keeping_1",
      "twilightforest:charm_of_keeping_2",
      "twilightforest:charm_of_keeping_3"
  ];

  // Loop each loot type and remove all items in one modifier
  lootTypes.forEach(type => {
      let modifier = event.addTableModifier(type);
      globalLootRemovals.forEach(entry => modifier.removeLoot(entry));
  });

});


LootJS.lootTables((event) => {

  // Pebbles when empty handed
  const pebble = LootEntry.of("ftb:stone_pebble").setCount([1, 3]).matchMainHand("minecraft:air")

  // Nothing when holding non-mining tools
  const stone = LootEntry.of("minecraft:stone").when(c =>
    c.matchTool(ItemPredicate.hasEnchantment("minecraft:silk_touch"))
  )

  const cobble = LootEntry.of("minecraft:cobblestone").when(c =>
    c.survivesExplosion()
  )

  const loot = LootEntry.alternative(
    pebble,
    stone,
    cobble
  )

  event.getBlockTable("minecraft:stone")
    .clear()
    .firstPool()
    .addEntry(loot)
  event.getBlockTable("minecraft:stone").print()
})

LootJS.lootTables((event) => {
  global.SB4$CREATIVE_BLOCKS.forEach(block => {
    try {
      let loot_table = event.getBlockTable(block)
        .clear()
        .createPool()
        .addEntry(LootEntry.of(block).when((conditions) => {
          conditions.add(LootCondition.hasAnyStage("creative_unlock"))
        }))
    } catch (_) {

    }
  });

})

NativeEvents.onEvent("net.neoforged.neoforge.event.entity.player.PlayerEvent$HarvestCheck", (event) => {
  
  let blockstate = event.getTargetBlock()
  if (blockstate == null) return

  let isCreativeItem = global.SB4$CREATIVE_BLOCKS.includes(blockstate.id)
  if (!isCreativeItem) return

  let player = event.getEntity()
  let hasStage = player.getStages().has("creative_unlock")

  if (hasStage) {
    event.setCanHarvest(true)
  } else {
    event.setCanHarvest(false)
  }
})

NativeEvents.onEvent("net.neoforged.neoforge.event.entity.player.PlayerEvent$BreakSpeed", (event) => {

  let isCreativeItem = global.SB4$CREATIVE_BLOCKS.includes(event.getState().id)
  if (!isCreativeItem) return

  let player = event.getEntity()
  let hasStage = player.getStages().has("creative_unlock")

  if (hasStage) {
    event.setNewSpeed(event.getOriginalSpeed())
  } else {
    event.setNewSpeed(-1.0)
  }
})

NativeEvents.onEvent("net.neoforged.neoforge.event.entity.player.PlayerEvent$HarvestCheck", (event) => {

  let isStone = event.getTargetBlock() == "minecraft:stone"
  if (!isStone) return

  let player = event.getEntity()
  let isEmptyHand = player.getMainHandItem().isEmpty()

  if (isEmptyHand) {
    event.setCanHarvest(true)
  }
})