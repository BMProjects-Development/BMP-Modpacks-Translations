'use strict';

const SB4$DATA_LOSSY_BREAKERS = ["avaritia:infinity_pickaxe"];

BlockEvents.broken(global.SB4$CREATIVE_BLOCKS, (event) => {
  let player = event.getPlayer();
  if (isPlayerInCreativeSpectator(player)) return;
  if (SB4$DATA_LOSSY_BREAKERS.indexOf(player.getMainHandItem().id) === -1) return;

  event.cancel();
  player.tell(Text.translate("ftb.creative_block.aoe_break_denied").red());
});
