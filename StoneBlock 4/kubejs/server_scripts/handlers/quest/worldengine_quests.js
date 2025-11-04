FTBQuestsEvents.customReward(event =>{
    const {reward, level, player, server} = event
    const {tags} = reward
    if (!tags) return;
    tags.forEach(tag =>{
        if (Object.keys(STRUCTURES).includes(tag)) {
            return placeStructure(event, tag);
        }
        if (tag == "reset_world_engine_machine") {
            server.runCommandSilent(`execute in ${TeamDim.id} run setblock 3 -20 3 custommachinery:custom_machine_block["custommachinery:machine":"ftb:world_engine"]`)
        }
    })
})



function placeStructure(event, upgradeName) {
    let {player, server} = event
        let TeamDim = Teams.getTeamsDimensionByPlayer(player)

    var baseOpt = $BaseInstanceManager
        .get(server)
        .getBaseForPlayer(player);
    if (!baseOpt.isPresent()) {
        player.sendSystemMessage(Text.translate(WE_LANG.NEED_BASE));
        refundWorldEngineQuest(player, upgradeName);
        return 0;
    }

    var base = baseOpt.get();
    var baseDim = base.dimension();
    var struct = STRUCTURES[upgradeName];
    if (!struct) {
    player.sendSystemMessage(
        Text.translate(WE_LANG.UNKNOWN, upgradeName)
    );
    refundWorldEngineQuest(player, upgradeName);
    return 0;
    }

    let base_level = player
    .getServer()
    ["getLevel(net.minecraft.resources.ResourceKey)"](baseDim);

    if (
    WorldEngineStateMachine.getState(base_level) ==
    WORLDENGINE_STATES.ACTIVE
    ) {
    player.sendSystemMessage(
        Text.translate(WE_LANG.IN_PROGRESS, upgradeName)
    );
    refundWorldEngineQuest(player, upgradeName);
    return 0;
    }
    player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](base_level, 3.5, -20, 5.5, 180, 0)
    if (PRE_EVENTS && PRE_EVENTS[upgradeName]) {
        PRE_EVENTS[upgradeName](base_level);
    }
    if(STRUCTURES_CUTSCENES[upgradeName]){
    player.level.server.scheduleInTicks(20, () => {
        console.log("Starting cutscene for structure:", upgradeName);
        STRUCTURES_CUTSCENES[upgradeName](player);
    })
    }


    wePlaceOne(upgradeName, struct, TeamDim, function () {
        player.sendSystemMessage(Text.translate.apply(Text, arguments));
    });
    return true;
}