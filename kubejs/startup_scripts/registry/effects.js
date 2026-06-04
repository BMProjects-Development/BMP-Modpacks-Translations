StartupEvents.registry(`mob_effect`, event => {
    event.create(`ftb:vault_light`).color(`white`)
    event.create("ftb:cow_transmute").effectTick((entity, amp) => {
      if (entity.getType() != "minecraft:cow") return;
      let dm = entity.getDeltaMovement();
      entity.setDeltaMovement(new Vec3d(
        dm.x() + (Math.random() - 0.5) * 0.25,
        dm.y(),
        dm.z() + (Math.random() - 0.5) * 0.25
      ))
      entity.level.spawnParticles(
        "minecraft:dragon_breath",
        true,
        entity.getX(),
        entity.getY() + 1,
        entity.getZ(),
        0.3,
        0.3,
        0.3,
        3,
        0.05
      );
    })
})