const WE_STAGES = {
    source_upgrade: "echo_magician_stage1_task2_check",
    machine_block_upgrade: "echo_quartermaster_stage1_task2_completed",
    shadow_casing_upgrade: "echo_machinist_stage1_task2_check",
    enchanting_upgrade: "echo_enchanter_stage2_task2_check",
    chroniton_upgrade: "echo_wayfinder_stage2_task1_check",
    spirit_upgrade: "echo_infernal_stage3_task1_check",
    ender_power_upgrade: "echo_catalyst_stage3_task1_check", // completed or check?
    tesseract_upgrade: "echo_catalyst_stage3_task2_check",
    enderium_upgrade: "echo_catalyst_stage3_task2_check",
    fortron_upgrade: "echo_light_bender_stage3_task1_completed", // completed or check?
    advanced_machine_upgrade: "echo_catalyst_stage3_task3_check",
    quantum_tunnel_upgrade: "echo_light_bender_stage3_task2_check",
    euphonium_upgrade: "echo_ancient_stage4_task1_check",
    draconic_upgrade: "echo_wyrmwright_stage4_task1_check", // completed or check?
    resonant_void_upgrade: "echo_wyrmwright_stage4_task2_check",
    twilight_upgrade: "echo_twilight_stage4_task1_check",
    awakened_core_upgrade: "echo_chaos_stage5_task1_check",
    dark_void_upgrade: "echo_radiance_stage5_task1_check",
    infinity_upgrade: "echo_infinity_stage5_task1_check"
}

function fixWorldEngine(player, server){
    Object.entries(WE_STAGES).forEach(([upgrade, quest_check]) => {
        if (player.stages.has(quest_check)) return;
        server.runCommandSilent(`execute as ${player.uuid} run worldengine reset ${upgrade}`)
    })
}
PlayerEvents.loggedIn(event => {
    const { player, level, server, } = event;
    
    var baseOpt = $BaseInstanceManager
        .get(server)
        .getBaseForPlayer(player);
    if (!baseOpt.isPresent()) return;

    if (Teams.hasData(player, "world_engine_checker_1")) return;
    server.scheduleInTicks(40, () => {
        fixWorldEngine(player, server);
        Teams.setData(player, "world_engine_checker_1", true);
    })
})
