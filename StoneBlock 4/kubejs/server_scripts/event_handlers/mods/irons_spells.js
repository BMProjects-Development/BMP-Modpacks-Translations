let SB4$VAULT_BLACKLIST_IRONSPELLS = [
  "irons_spellbooks:evasion"
]

NativeEvents.onEvent("io.redspace.ironsspellbooks.api.events.SpellPreCastEvent", (event)=>{
  if (SB4$VAULT_BLACKLIST_IRONSPELLS.includes(event.getSpellId()) && isEntityInVault(event.getEntity())) {
    event.setCanceled(true)
  }
})

NativeEvents.onEvent("net.neoforged.neoforge.event.entity.living.MobEffectEvent$Applicable", (event)=>{

  let player = event.getEntity()
  if (!(player.isPlayer())) return

  let level = player.getLevel()
  if (level.isClientSide()) return

  let effect = event.getEffectInstance().getEffect().getKey().location().toString()
  if (!(SB4$VAULT_BLACKLIST_IRONSPELLS.includes(effect))) return
  
  if (!(isEntityInVault(event.getEntity()))) return
  event.setResult("DO_NOT_APPLY")
})