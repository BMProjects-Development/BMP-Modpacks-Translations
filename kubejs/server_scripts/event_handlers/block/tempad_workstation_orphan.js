'use strict';

const $Direction = Java.loadClass("net.minecraft.core.Direction");
const $BlockStateProperties = Java.loadClass("net.minecraft.world.level.block.state.properties.BlockStateProperties");

function getParentPos(state, pos) {
  const facing = state.getValue($BlockStateProperties.HORIZONTAL_FACING);
  const dir = $Direction.fromYRot(facing.toYRot() + 90.0);
  return pos.relative(dir);
}

BlockEvents.broken("tempad:workstation_child", (event) => {
  const level = event.level;
  if (level.isClientSide()) return;

  const pos = event.block.pos;
  const state = event.block.blockState;

  const parentState = level.getBlockState(getParentPos(state, pos));
  if (parentState.is("tempad:workstation")) return;

  event.cancel();
  level.setBlock(pos, "minecraft:air", 3);
});
