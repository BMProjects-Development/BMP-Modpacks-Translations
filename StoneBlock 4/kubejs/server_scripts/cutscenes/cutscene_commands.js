
ServerEvents.commandRegistry((event) => {
  
  const { commands: Commands, arguments: Arguments, builtinSuggestions: Suggestions } = event;
  const EventSettingsArgs = {
    'timer': Arguments.INTEGER,
    'timerDelay': Arguments.INTEGER,
    'debug': Arguments.BOOLEAN,
    'maxAttempts': Arguments.INTEGER,
    'timeCooldown': Arguments.INTEGER,
  }
  let cutscene = Commands.literal('cutscene');
  Object.entries(cutsceneMap).forEach(([name, func]) => {
    cutscene = cutscene.then(
      Commands.literal(name)
        .executes((ctx) => {
          let player = ctx.getSource().getPlayerOrException();
          func['function'](player);
          return 1;
        })
    );
    });
    event.register(cutscene);
});

const cutsceneMap = {
    'intro': {
        'function': cutscene_intro,
        'stage_trigger': 'echo_guidance_meet',
        'stage_set': 'echo_guidance_intro_cutscene'
    }
}


function cutscene_intro(player) {
    if(player.level.dimension != "minecraft:overworld") {
        player.sendSystemMessage(Text.literal("Cutscene can only be played in Overworld").red(), true);
        return;
    }
    var cutscene = new Cutscene();
    cutscene
        .setDurationSeconds(20)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT");

    cutscene.getPath()
        .addPoint(-63.44, -16.88, 30.12, -179.4, 48.75, 0)
        .addPoint(-63.45, -15.84, 33.28, 179.7, 5.55, 0)
        .addPoint(-63.43, -15.84, 22.62, 179.85, -26.1, 0)
        .addPoint(-64.14, -10.6, 13.28, 105, -16.2, 0)
        .addPoint(-69.99, -8.41, 10.17, 100.8, -17.25, 0)

        .executeAtSecond(7, player => {
            player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](player.level, -14.5, 1, 0, -90, -40);
            player.hurtMarked = true;
        }, cutscene)
        
        .addPoint(-80.49, -4.67, 8.57, 12.75, -10.95, 0)
        .addPoint(-82.46, -3.92, 16.49, -103.2, -16.2, 0)
        .addPoint(-78.21, -1.76, 16.88, -124.2, -16.35, 0)
        .addPoint(-68.5, 2.72, 10.67, -126, -3.45, 0)
        .addPoint(-58.33, 2.72, 0, -90, -7.5, 0)
        .addPoint(-14.4, 2.4, 0, -90, -40, 0);

    cutscene.play(player);
}

const WorldengineCutscene = (player, cutscene) => {
    let baseDim = Teams.getTeamsDimensionByPlayer(player);
    if(!baseDim) {
        player.sendSystemMessage(Text.literal("You must be in a Team Base to run this cutscene").red(), true);
        return;
    }
    if(player.level.dimension != baseDim.dimension) {
        player.sendSystemMessage(Text.literal("Cutscene can only be played in your Team Base dimension").red(), true);
        return;
    }

    if (player.level.isClientSide) {
        player.sendData('close_screen', {});      
    }
    let kuLevel = new Ku.Level(player.level);
    let players = kuLevel.findEntitiesWithinRadius("minecraft:player", player.block.pos, 50)
    cutscene.playForPlayers(players);

}

function cutscene_advanced_machine_upgrade(player) {
    var cutscene = new Cutscene();
    cutscene
        .setDurationSeconds(15)
        .setCurve("CATMULLROM")
        .setEasing("LINEAR");
    
    cutscene.getPath()
        .addSpiral(3.5, -25, -1.5, 8.4, 8.4, 0, 1, 360)

    WorldengineCutscene(player, cutscene);
}
function cutscene_dark_void_upgrade(player) {
    var cutscene = new Cutscene();
    cutscene
        .setDurationSeconds(15)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT");

    cutscene.getPath()
        .addSpiral(3.5, -23, -1.5, 3, 3, 0, 1, 360)

    WorldengineCutscene(player, cutscene);
}

function cutscene_chroniton_upgrade(player) {
    var cutscene = new Cutscene();
    
    cutscene
        .setDurationSeconds(15)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT");
    cutscene.getPath()
        .addSpin(3.5, -24, -1.5, 0, 360, 0, 360);
    WorldengineCutscene(player, cutscene);
}

function cutscene_enchanting_upgrade(player) {
    var cutscene = new Cutscene();
    cutscene
        .setDurationSeconds(15)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT")
        .setTimeEasing("EASE_IN");

    cutscene.getPath()
        .addPoint(3.5, -18.82, 5.5, -180, -18.15, 0)
        .addPoint(2.38, -12.58, -7.86, -7.95, 49.65, 0)
        .addPoint(2.14, -21.57, -9.64, -24.75, 47.55, 0)
        .addPoint(3.58, -24.19, -9.74, 0.45, 10.35, 0)
        .addPoint(3.58, -24.19, -9.74, 0.45, 10.35, 0)
        .addPoint(3.58, -24.19, -9.74, 0.45, 10.35, 0);
        
    WorldengineCutscene(player, cutscene);
}

function cutscene_enderium_upgrade(player) {
    var spin = new Cutscene();
    spin
        .setDurationSeconds(10)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT");

    spin.getPath()
        .addSpin(3.5, -21, -1.5, 0, 360, 0, 360);

    var cutscene = new Cutscene();
    cutscene
        .setDurationSeconds(5)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT")
        .setNext(spin);
    cutscene.getPath()
        .addPoint(3.5, -18.82, 5.5, 180, -16.2, 0)
        .addPoint(3.5, -13.29, -0.46, 180, 76.35, 0)
        .addPoint(3.5, -21, -1.5, 0, 0, 0)


    WorldengineCutscene(player, cutscene);

}

function cutscene_awakened_core_upgrade(player) {
    var cutscene = new Cutscene();
    cutscene
        .setDurationSeconds(15)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT");
    
    cutscene.getPath()
        .addSpiral(3.5, -10, -1.5, 15, 15, 0, 1, 360);

        WorldengineCutscene(player, cutscene);
}

function cutscene_quantum_tunnel_upgrade(player) {
    var cutscene = new Cutscene();
    cutscene
        .setDurationSeconds(15)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT");
    cutscene.getPath()
    .addPoint(3.5, -18.82, 5.5, -180, 0, 0)
    .addPoint(3.5, -18.82, 9, -180, 0, 0)

    .addPoint(3.5, -28.82, 9, -180, 0, 0)
    .addPoint(3.5, -24.82, 7, -180, 0, 0)
    .addPoint(3.5, -24.82, 7, -180, 0, 0)
    
    
    WorldengineCutscene(player, cutscene);
}

function cutscene_euphonium_upgrade(player) {
    var spin = new Cutscene();
    spin
        .setDurationSeconds(10)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT");

    spin.getPath()
        .addSpin(3.5, -26, -1.5, 0, 360, 31, 360);

    var cutscene = new Cutscene();
    cutscene
        .setDurationSeconds(5)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT")
        .setNext(spin);
    cutscene.getPath()
        .addPoint(3.5, -18.82, 5.5, 180, -16.2, 0)
        .addPoint(3.5, -13.29, -0.46, 180, 76.35, 0)
        .addPoint(3.5, -26, -1.5, 0, 31, 0)


    WorldengineCutscene(player, cutscene);   
}

function cutscene_infinity_upgrade(player) {
    var orbit = new Cutscene();
    orbit
        .setDurationSeconds(15)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT");

    orbit.getPath()
        .addSpiral(3.5, -26, -1.5, 3, 3, 0, 1, 360)


    var cutscene = new Cutscene();
    cutscene
        .setDurationSeconds(5)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT")
        .setNext(orbit);
    cutscene.getPath()
        .addPoint(3.5, -18.82, 5.5, 180, -16.2, 0)
        .addPoint(3.5, -15, -0, 180, 76.35, 0)
        .addPoint(3.5, -26, -4.5, 0, 0, 0)

    WorldengineCutscene(player, cutscene);
}

function cutscene_fortron_upgrade(player) {
    var cutscene = new Cutscene();
    cutscene
        .setDurationSeconds(15)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT")
    cutscene.getPath()
        .addPoint(3.5, -18.82, 5.5, 180, -16.2, 0)
        .addPoint(3.5, -15, -0, 180, 76.35, 0)
        .addPoint(3.5, -21.5, -2.5, 0, 0, 0)


    WorldengineCutscene(player, cutscene);
}

function cutscene_spirit_upgrade(player) {
    var orbit = new Cutscene();
    orbit
        .setDurationSeconds(13)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT");

    orbit.getPath()
        .addSpiral(3.5, -17, -1.5, 7, 7, 0, 1, 360)


    var cutscene = new Cutscene();
    cutscene
        .setDurationSeconds(2)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT")
        .setNext(orbit);
    cutscene.getPath()
        .addPoint(3.5, -18.82, 5.5, 180, -16.2, 0)
        .addPoint(3.5, -17, 5.5, 180, 0, 0)
        
        

    WorldengineCutscene(player, cutscene);
}

function cutscene_twilight_forest_upgrade(player) {
    var orbit = new Cutscene();
    orbit
        .setDurationSeconds(13)
        .setCurve("CATMULLROM")
        .setEasing("EASE_IN_OUT");

    orbit.getPath()
        .addSpiral(3.5, -21, -1.5, 7, 7, 0, 1, 360)
        

    WorldengineCutscene(player, orbit);
}


PlayerEvents.tick(event => {
    const { player, server, level } = event;
    if (server.tickCount % 20 !== 0) return;

    Object.entries(cutsceneMap).forEach(([name, func]) => {
        let stageTrigger = func['stage_trigger'];
        let stageSet = func['stage_set'];
        if (player.stages.has(stageTrigger) && !player.stages.has(stageSet)) {
            if (level.isClientSide) {
                let currentScreen = Client.getCurrentScreen();
                if (currentScreen != null) return;
            }
            player.stages.add(stageSet);
            func['function'](player);
        }
    });
})

PlayerEvents.loggedIn(event => {
    const { player } = event;
    let teamDim = Teams.getTeamsDimensionByPlayer(player);
    if(!teamDim) return;
    player.stages.add("echo_guidance_intro_cutscene");
});