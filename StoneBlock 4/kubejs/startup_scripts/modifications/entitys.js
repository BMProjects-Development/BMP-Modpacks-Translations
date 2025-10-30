EntityJSEvents.modifyEntity((event) => {
  event.modify("minecraft:snowball", (modifyBuilder) => {
    modifyBuilder.playerTouch((entity) => {
      const player = entity.player
      if (player) {
        if (hasTag(player.tags, "in_yeti"))
          if (!player.isBlocking())
            player.runCommandSilent(
              "execute at @e[type=minecraft:marker,tag=tf_yeti_tp,limit=1,sort=nearest,distance=..128] run tp @s[gamemode=survival] ~ ~ ~ -90 0"
            )
      }
    })
  })
  event.modify("twilightforest:helmet_crab", (modifyBuilder) => {
    modifyBuilder.isPushable(false);
  });
})

function hasTag(tags, requiredTag) {
  for (const tag of tags) {
    if (tag === requiredTag) return true
  }
  return false
}

// Cancel vanilla knockback so only the slide applies
NativeEvents.onEvent("net.neoforged.neoforge.event.entity.living.LivingKnockBackEvent", (e) => {
  const ent = e.getEntity()
  if (String(ent.getType()) === "twilightforest:helmet_crab") e.setCanceled(true)
})

// Prevent acquiring or keeping a target if docile
// NativeEvents.onEvent('net.neoforged.neoforge.event.entity.living.LivingChangeTargetEvent', e => {
//   const ent = e.getEntity();
//   if (String(ent.getType()) !== 'twilightforest:helmet_crab') return;
//   if (!isDocile(ent)) return;
//   e.setNewTarget(null);
//   try { ent.setTarget(null); } catch (_) {}
// });
