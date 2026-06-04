const $IMagicSummon = Java.loadClass("io.redspace.ironsspellbooks.entity.mobs.IMagicSummon")

let SB4$VAULT_BLACKLIST_IRONSPELLS = [
  "irons_spellbooks:evasion"
]

NativeEvents.onEvent("net.neoforged.neoforge.event.entity.living.LivingChangeTargetEvent", (event) => {
  const entity = event.getEntity()
  if (!(entity instanceof $IMagicSummon)) return

  const newTarget = event.getNewAboutToBeSetTarget()
  if (newTarget === null) return

  const summoner = entity.getSummoner()
  if (summoner === null) return

  if (newTarget == summoner) {
    event.setNewAboutToBeSetTarget(null)
  }
})

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