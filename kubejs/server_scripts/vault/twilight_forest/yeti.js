// priority: 50

EntityJSEvents.addGoals("minecraft:snow_golem", (event) => {
  let Player = Java.loadClass("net.minecraft.world.entity.player.Player")
  event.nearestAttackableTarget(1, Player, 5, true, false, (entity) => {
    if (checkTag(entity.tags, "in_yeti")) {
      return true
    }
    return false
  })
})
