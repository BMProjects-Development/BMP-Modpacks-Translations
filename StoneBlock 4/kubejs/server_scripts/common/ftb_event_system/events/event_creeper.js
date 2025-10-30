// priority: 800

const event_creeper = {
  name: "ftb:creeper",
  displayName: "Creeper",
  description: "",
  chance: 0.1,
  stage: null,
  disableStage: null,

  size: -1,
  minDistance: 1,
  maxDistance: 24,

  checkBlocks: ["minecraft:air"],
  requireBlockBelow: false,

  execute(event, player, location, name) {
    let level = player.getLevel();

    if (Utils.getRandom().fork().nextFloat() <= 0.1) {
      let creeper = level.createEntity("minecraft:creeper");
      creeper.getPersistentData().put("isCreeperEvent", {})
      creeper.setPos(player.x, player.y + 3, player.z);
      if(name) {
        creeper.setCustomName(name);
        creeper.setCustomNameVisible(true);
      }
      creeper.spawn()
      creeper.getAttribute("minecraft:generic.scale").setBaseValue(2.5);
    
      let nbt = creeper.nbt
      nbt.ExplosionRadius = 0; //disable explosion
      creeper.nbt = nbt;
      creeper.ignite()
      level["playSound(net.minecraft.world.entity.player.Player,net.minecraft.core.BlockPos,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)"](
        null,
        creeper.getBlock().getPos(),
        "actuallyadditions:duh_duh_duh_duuuh",
        "voice",
        0.5,
        1
      )
    } else {
      for (let { x, z } of creeperPositions) {
        let creeper = level.createEntity("minecraft:creeper");
        creeper.getPersistentData().put("isCreeperEvent", {})
        creeper.setPos(player.x + x, player.y, player.z + z);
        creeper.spawn()
        let nbt = creeper.nbt
        nbt.ExplosionRadius = 0; //disable explosion
        creeper.nbt = nbt;
        creeper.ignite()
      }
    }


    player.persistentData.timer = 11000; //lower their event timer instead of a full reset

  }
}

const creeperPositions = [
  // { x: -1.5, z: -1.5 },
  { x: -2, z: 0 },
  // { x: -1.5, z: 1.5 },
  { x: 0, z: -2 },
  { x: 0, z: 2 },
  // { x: 1.5, z: -1.5 },
  // { x: 1.5, z: 1.5 },
  { x: 2, z: 0 },
]

LevelEvents.beforeExplosion((event) => {
  let entity = event.getExploder()
  if (entity == null) return
  if (entity.getType() != "minecraft:creeper") return
  if (!(entity.getPersistentData().contains("isCreeperEvent"))) return

  entity["spawnAtLocation(net.minecraft.world.item.ItemStack)"](Item.of("minecraft:gunpowder", Utils.getRandom().fork().nextIntBetweenInclusive(1, 3)))
  entity.discard()
  event.cancel()
})