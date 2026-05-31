let SB4$VAULT_BLACKLIST_IRONSPELLS = [
  "irons_spellbooks:evasion"
]

NativeEvents.onEvent("io.redspace.ironsspellbooks.api.events.SpellPreCastEvent", (event)=>{
  if (SB4$VAULT_BLACKLIST_IRONSPELLS.includes(event.getSpellId()) && isEntityInVault(event.getEntity())) {
    event.cancel()
  }
})
