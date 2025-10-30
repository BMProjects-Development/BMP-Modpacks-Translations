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
    "Interact"
]

NativeEvents.onEvent("com.hollingsworth.arsnouveau.api.event.SpellCastEvent", event => {
    try {
        let {entity, spell} = event

        if (!entity.isPlayer()) return
        if (entity.isCreative()) return
        let spellRecipe = spell.recipe();
        let hasBlacklistedSpell = spellRecipe.filter(part => blacklistedSpells.includes(part.getName())).length > 0
        if (!hasBlacklistedSpell) return

        if(!isInVault(entity)) return
        
        entity.sendSystemMessage(Text.translate("ftb.ars.blacklist.denied").red(), true);
        event.setCanceled(true)
            
    } catch (err) {
        console.error(`error in SpellCastEvent: ${err}`)
    }
})

