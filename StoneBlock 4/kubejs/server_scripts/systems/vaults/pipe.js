///@ts-check
BlockEvents.rightClicked("create:fluid_pipe", event => {
    if(event.item == null) return;
    if(event.item.id != "minecraft:diamond") return;
    if(event.level.getBlock(event.block.pos.offset(0, -1, 0)).id.toString() != "minecraft:diamond_block") return;
    // @ts-ignore
    event.block.setBlockState(event.block.blockState.rotate(event.level, event.block.pos, "clockwise_90"), 3)
})