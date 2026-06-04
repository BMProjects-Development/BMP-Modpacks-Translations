const $VillagerProfessions = Java.loadClass(
  "net.minecraft.world.entity.npc.VillagerProfession"
);
ItemEvents.entityInteracted("ftb:clapple", function (event) {
  const { target, item, player, level } = event;
  if (level.isClientSide()) return;
  if (target.type != "minecraft:villager") return;
  releaseAllPois(target);
  let newVillager = level.createEntity("minecraft:villager");

  let villagerData = target.getVillagerData();
  villagerData = villagerData.setLevel(0);
  villagerData = villagerData.setProfession($VillagerProfessions.NONE);
  newVillager.setVillagerData(villagerData);
  newVillager.setPos(target.x, target.y, target.z);


  target.discard();
  newVillager.spawn();
  player.server.runCommandSilent(`playsound ftb:fired player @a ${player.x} ${player.y} ${player.z} 1 1`);

  event.level.spawnParticles(
    "minecraft:happy_villager",
    true,
    target.x,
    target.y + 0.5,
    target.z,
    0.5,
    0.5,
    0.5,
    10,
    0.1
  );

  // consume the item unless creative
  if (!event.player.isCreative()) {
    event.item.count--;
  }
  player.sendSystemMessage(Text.translate("ftb.item.clapple.villager"), true);
});

const $MemoryModuleType = Java.loadClass(
  "net.minecraft.world.entity.ai.memory.MemoryModuleType"
);
const releaseAllPois = (villager) => {
  villager.releasePoi($MemoryModuleType.HOME);
  villager.releasePoi($MemoryModuleType.JOB_SITE);
  villager.releasePoi($MemoryModuleType.POTENTIAL_JOB_SITE);
  villager.releasePoi($MemoryModuleType.MEETING_POINT);
};
