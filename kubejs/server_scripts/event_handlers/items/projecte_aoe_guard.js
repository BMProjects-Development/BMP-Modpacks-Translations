'use strict';

const $BlockPos = Java.loadClass('net.minecraft.core.BlockPos');

const SB4$PROJECTE_AOE_BREAKERS = [
  "projecte:rm_morning_star",
  "projecte:rm_hammer",
  "projecte:rm_pick",
  "projecte:rm_axe",
  "projecte:rm_shovel",
  "projecte:dm_hammer",
  "projecte:dm_pick",
  "projecte:dm_axe",
  "projecte:dm_shovel",
];

const SB4$PROJECTE_AOE_RADIUS = 5;

BlockEvents.rightClicked((event) => {
  const { player, block, item, level } = event;
  if (!player) return;
  if (level.isClientSide()) return;
  if (isPlayerInCreativeSpectator(player)) return;
  if (SB4$PROJECTE_AOE_BREAKERS.indexOf(String(item.id)) === -1) return;

  const pos = block.pos;
  const R = SB4$PROJECTE_AOE_RADIUS;
  const sm = level.structureManager();

  const samples = [];
  for (let dx = -R; dx <= R; dx += R) {
    for (let dy = -R; dy <= R; dy += R) {
      for (let dz = -R; dz <= R; dz += R) {
        samples.push($BlockPos.containing(pos.x + dx, pos.y + dy, pos.z + dz));
      }
    }
  }

  for (const vault of SB4$VAULTS) {
    for (const sample of samples) {
      try {
        if (sm.getStructureAt(sample, vault).isValid()) {
          event.cancel();
          player.tell(Text.translate("ftb.projecte.aoe_denied").red());
          return;
        }
      } catch (e) {}
    }
  }
});
