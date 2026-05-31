// Stages to KEEP after a reset. Leave empty for a full wipe.
const STAGE_WHITELIST = ["echo_guidance_interact", "parkour_vault"];

FTBTeamsEvents.playerLeftParty((event) => {
  const server = event.server;
  const player = event.player;
  if (!server || !player) return;

  const name = player.username;

  // Set spawnpoint back to lobby spawn
  let {
    x: x,
    y: y,
    z: z,
  } = $BaseInstanceManager.get(player.getServer()).getLobbySpawnPos();
  server.runCommandSilent(
    `execute in minecraft:overworld run spawnpoint ${player.getUsername()} ${x} ${y} ${z} 180`
  );

  // Reset Coins
  server.runCommandSilent(`coins set ${name} 0`);
  // Clear all stages
  server.runCommandSilent(`execute run kjs stages clear ${name}`);
  server.runCommandSilent(
    `execute run ftbquests change_progress ${name} reset-all`
  );

  // Reset Unearthed
  server.runCommandSilent(`execute run ftbunearthed setlevel ${name} 1`);

  // FTBEchoes progression reset
  server.runCommandSilent(
    `execute run ftbechoes progress reset-all player ${name}`
  );

  // Re-add whitelisted stages
  let stageId;
  for (let i = 0; i < STAGE_WHITELIST.length; i++) {
    stageId = STAGE_WHITELIST[i];
    if (stageId && stageId.length > 0) {
      server.runCommandSilent(`execute run kjs stages add ${name} ${stageId}`);
    }
  }

  // Run this again to reset the player's (non team stage)
  server.scheduleInTicks(40, () => {
    server.runCommandSilent(
      `execute run ftbechoes progress reset-all player ${name}`
    );
  });

  server.scheduleInTicks(40, () => {
    server.runCommandSilent(
      `execute run ftbquests change_progress ${name} reset-all`
    );
  });
});

FTBTeamsEvents.playerJoinedParty((event) => {
  let { player: player, server: server, currentTeam: team } = event;
  server.scheduleInTicks(10, () => {
    let base = $BaseInstanceManager
      .get(player.getServer())
      .getBaseForTeamId(team.getId());
    base = base.get();
    let { x: x, y: y, z: z } = base.spawnPos();
    WorldEngineStateMachine.init(Teams.getTeamsDimensionByPlayer(player));
    server.runCommandSilent(
      `execute in ${base
        .dimension()
        .location()} run spawnpoint ${player.getUsername()} ${x} ${y} ${z}`
    );
    let owner = Teams.getTeam(player).getOwner();
    server
      .getPlayer(owner)
      .stages.getAll()
      .forEach((stage) => {
        server.runCommandSilent(`kjs stages add ${player.username} ${stage}`);
      });
  });
});

let $FTBTeamsCommands = Java.loadClass(
  "dev.ftb.mods.ftbteams.data.FTBTeamsCommands"
);
let $TeamRank = Java.loadClass("dev.ftb.mods.ftbteams.api.TeamRank");
ServerEvents.commandRegistry((event) => {
  let { commands: Commands } = event;
  let original = event.dispatcher
    .findNode(["ftbteams", "party", "leave"])
    .getCommand();
  let root = Commands.literal("ftbteams").then(
    Commands.literal("party").then(
      Commands.literal("leave")
        .requires((src) => $FTBTeamsCommands.hasParty(src, $TeamRank.MEMBER))
        .executes((ctx) => {
          let data = ctx.getSource().getPlayer().getPersistentData();
          if (!data.contains("ftb_teams_leave_warning")) {
            data.put("ftb_teams_leave_warning", Utils.getSystemTime());
            ctx
              .getSource()
              .getPlayer()
              .tell(
                Text.translate("ftb.teams.bases.party.leave_warning").red()
              );
          } else if (
            data.getDouble("ftb_teams_leave_warning") >=
            Utils.getSystemTime() - 10000
          ) {
            original.run(ctx);
          } else {
            data.put("ftb_teams_leave_warning", Utils.getSystemTime());
            ctx
              .getSource()
              .getPlayer()
              .tell(
                Text.translate("ftb.teams.bases.party.leave_warning").red()
              );
          }
          return 1;
        })
    )
  );
  event.register(root);
});
