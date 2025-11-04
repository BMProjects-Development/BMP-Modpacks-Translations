const PRE_EVENTS = {
    awakened_core_upgrade: awakened_core_pre,
}


const POST_EVENTS = {
    draconic_upgrade: draconic_core_activate,
    // awakened_core_upgrade: draconic_core_activate,
}



function draconic_core_activate(level) {
    let block = level.getBlock(3, -11, -2);
    console.log("Draconic Core Activate - Block at (3,-11,-2):", block.id);
    if(!block.entity.active.get()) block.entity.toggleActivation();
}
function awakened_core_pre(level) {
    let block = level.getBlock(3, -11, -2);
    if(block.entity.active.get()) block.entity.toggleActivation();

    let offset = 10;
    let item = "draconicevolution:energy_core_stabilizer";
    for(let y = -1; y <= 1; y++){
        for(let i = -1; i <= 1; i++){
            level.getBlock(3 + offset, -11+y, -2 + i).set(item);
            level.getBlock(3 - offset, -11+y, -2 + i).set(item);
            level.getBlock(3 + i, -11+y, -2 + offset).set(item);
            level.getBlock(3 + i, -11+y, -2 - offset).set(item);
        }
    }
    for(let i in level.getBlock(3-offset, -11, -2).entity){
        console.log(i);
    }
    level.getBlock(3+offset, -11, -2).entity.onPlaced();
    level.getBlock(3-offset, -11, -2).entity.onPlaced();
    level.getBlock(3, -11, -2+offset).entity.onPlaced();
    level.getBlock(3, -11, -2-offset).entity.onPlaced();

}
function awakened_core_post(level) {
    let block = level.getBlock(3, -11, -2);

    // set core to tier 8?
    if(!block.entity.active.get()) block.entity.toggleActivation();
}



ItemEvents.rightClicked("minecraft:stick", event => {
    const { player, item, level, blockPos } = event;
    if(!player.isCreative()) return;
    awakened_core_pre(level);
    awakened_core_post(level);
})