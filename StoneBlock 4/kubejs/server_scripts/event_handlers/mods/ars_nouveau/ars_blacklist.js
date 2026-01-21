const blacklistedStructures = [
  "ftb:vaults/burning_disco",
  "ftb:vaults/chicken_jockey",
  "ftb:vaults/create_vault",
  "ftb:vaults/drowned_abyss",
  "ftb:vaults/echoing_dread",
  "ftb:vaults/mffs",
  "ftb:vaults/portal",
  "ftb:vaults/twilight_forest/hydra",
  "ftb:vaults/twilight_forest/lich",
  "ftb:vaults/twilight_forest/snow_queen",
  "ftb:vaults/twilight_forest/knight",
  "ftb:vaults/twilight_forest/yeti",
]
const blacklistedSpells = [
  "Break",
  "Place",
  "Rotate",
  "Freeze",
  "Evaporate",
  "Ignite",
  "Smelt",
  "Interact"
]

NativeEvents.onEvent("com.hollingsworth.arsnouveau.api.event.SpellResolveEvent$Pre", (event) => {
  let { world, rayTraceResult, shooter, spell } = event

  let isInBlacklistedBiome = false
  let isInBlacklistedStructure = false
  let hasBlacklistedSpell = false

  let castPosition
  switch (rayTraceResult.getType()) {
    case "block":
      castPosition = rayTraceResult.getBlockPos()
      break;
    case "entity":
      castPosition = rayTraceResult.getEntity().blockPosition()
      break;
    default:
      castPosition = shooter.blockPosition()
      break;
  }

  isInBlacklistedBiome = world.getBiome(castPosition).is("minecraft:void")
  
  SB4$VAULTS.forEach(structure => {
    try {
      if (world.structureManager().getStructureAt(castPosition, structure).isValid()) {
        isInBlacklistedStructure = true
      }
    } catch (e) {
      console.log(`\nError Checking Vault Structure: ${structure}\n${e}`);
    }
  });

  hasBlacklistedSpell = spell.recipe().filter(part => blacklistedSpells.includes(part.getName())).length > 0

  let player = shooter && shooter.isPlayer && shooter.isPlayer() ? shooter : null

  if (isInBlacklistedBiome && hasBlacklistedSpell) {
    if (player) 
      player.tell(Text.translate("ftb.ars.blacklist.denied").red())
    event.setCanceled(true)
  }

  if (isInBlacklistedStructure && hasBlacklistedSpell) {
    if (player) 
      player.tell(Text.translate("ftb.ars.blacklist.denied").red())
    event.setCanceled(true)
  }
})

