const chickenSettings = {
    activationBlock: "draconicevolution:dislocator_receptacle",
    activationItem: "ftb:mighty_chicken_egg",
    distanceNearby: 20,
    spawnOffset: { x: -3.5, y: 3, z: -3.5 },
    bossEntity: "mecrh:ender_chicken",
    structure: "ftb:vaults/chicken_jockey"
}

BlockEvents.rightClicked(chickenSettings.activationBlock, (event) => {
    const { block, player, level, hand } = event;
    const { activationItem, distanceNearby,spawnOffset: { x, y, z }, bossEntity, structure } = chickenSettings;

    if(hand != 'MAIN_HAND') return;
    // const isThere = new Ku.Level(level).isStructureAtLocation(player, structure);
    const isThere = isEntityInStructure(player, structure);
    if (!isThere) return;

    let nearbyChickens = level.getEntities().filter(e => e.type == bossEntity && e.distanceTo(player) < distanceNearby);
    if (nearbyChickens.length > 0) return;
    
    let item = player.getMainHandItem()
    if (item.id != activationItem) return;

    let boss = level.createEntity(bossEntity);
    boss.x = block.x + x;
    boss.y = block.y + y;
    boss.z = block.z + z;
    boss.spawn();
    if (!player.isCreative()) {
        item.count -= 1
    }
})