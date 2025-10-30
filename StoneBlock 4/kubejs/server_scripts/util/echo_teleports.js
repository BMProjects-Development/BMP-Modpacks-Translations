ServerEvents.commandRegistry((event) => {
  const { commands: Commands } = event;

  const ECHOS = [
    { key: "guidance",      displayKey: "ftb.echo.archive.guidance",      coords: [-64,-19, 31], stage: "echo_guidance_interact"},
    { key: "magician",      displayKey: "ftb.echo.archive.magician",      coords: [-59,-15,-28] },
    { key: "quartermaster", displayKey: "ftb.echo.archive.quartermaster", coords: [-18,-15,-21] },
    { key: "machinist",     displayKey: "ftb.echo.archive.machinist",     coords: [-35,-20,  2] },
    { key: "fabricator",    displayKey: "ftb.echo.archive.fabricator",    coords: [ 54,-16,  9] },
    { key: "enchanter",     displayKey: "ftb.echo.archive.enchanter",     coords: [ 32,-14, 35] },
    { key: "wayfinder",     displayKey: "ftb.echo.archive.wayfinder",     coords: [ 70,-15,-17] },
    { key: "infernal",      displayKey: "ftb.echo.archive.infernal",      coords: [ 18,-19,-25] },
    { key: "catalyst",      displayKey: "ftb.echo.archive.catalyst",      coords: [ -6,-21,-50] },
    { key: "light_bender",  displayKey: "ftb.echo.archive.light_bender",  coords: [-29,-15,-76] },
    { key: "wyrmwright",    displayKey: "ftb.echo.archive.wyrmwright",    coords: [-20,-17, 58] },
    { key: "twilight",      displayKey: "ftb.echo.archive.twilight_ancient", coords: [-10,-20, 23], stage: "echo_twilight_ancients_unlock" },
    { key: "ancient",       displayKey: "ftb.echo.archive.twilight_ancient", coords: [ -6,-20, 23], stage: "echo_twilight_ancients_unlock" }
  ];

  for (var i = 0; i < ECHOS.length; i++) if (!ECHOS[i].stage) ECHOS[i].stage = "echo_" + ECHOS[i].key + "_meet";

  const MSG_ONLY_PLAYER   = "ftb.echo.msg.only_player";
  const MSG_OUT_OF_RANGE  = "ftb.echo.msg.out_of_range";
  const MSG_UNMET         = "ftb.echo.msg.unmet";
  const MSG_ROUTED_PREFIX = "ftb.echo.msg.routed_prefix";
  const MSG_ROUTED_SUFFIX = "ftb.echo.msg.routed_suffix";
  const MSG_USAGE         = "ftb.echo.msg.usage";
  const MSG_AVAILABLE     = "ftb.echo.msg.available_prefix";

  // Everyone can use /echo
  let root = Commands.literal("echo").requires((cs) => cs.hasPermission(0));

  for (var i = 0; i < ECHOS.length; i++) {
    (function(entry) {
      root = root.then(
        Commands.literal(entry.key).executes((context) => {
          var source = context.getSource();
          var player;
          try {
            player = source.getPlayerOrException();
          } catch (e) {
            source.sendSuccess(Text.translate(MSG_ONLY_PLAYER), false);
            return 0;
          }

          // Overworld only
          if (String(player.level.dimension) !== "minecraft:overworld") {
            player.sendSystemMessage(Text.translate(MSG_OUT_OF_RANGE));
            return 1;
          }

          // Stage gate
          if (!player.stages.has(entry.stage)) {
            player.sendSystemMessage(Text.translate(MSG_UNMET));
            return 1;
          }

          // Server-executed TP (no cheats/OP needed)
          var x = entry.coords[0] + 0.5;
          var y = entry.coords[1];
          var z = entry.coords[2] + 0.5;
          var name = player.getName().getString();
          player.level.server.runCommandSilent(`tp ${name} ${x} ${y} ${z} ${player.yaw} ${player.pitch}`);

          // Routed message
          player.sendSystemMessage(
            Text.translate(MSG_ROUTED_PREFIX)
              .append(Text.translate(entry.displayKey))
              .append(Text.translate(MSG_ROUTED_SUFFIX))
          );

          return 1;
        })
      );
    })(ECHOS[i]);
  }

  // Bare /echo -> usage + list
  root = root.executes((context) => {
    var source = context.getSource();
    var list = [];
    for (var i = 0; i < ECHOS.length; i++) list.push(ECHOS[i].key);
    source.sendSuccess(Text.translate(MSG_USAGE), false);
    source.sendSuccess(Text.translate(MSG_AVAILABLE).append(Text.of(list.join(", "))), false);
    return 1;
  });

  event.register(root);
});
