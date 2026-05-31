BlockEvents.modification((event) => {
  event.modify(global.SB4$CREATIVE_BLOCKS, (block) => {
    block.setExplosionResistance(3600000.8)
  })
  event.modify("twilightforest:mazestone", (block) => {
    block.destroySpeed = 7
  })
})
