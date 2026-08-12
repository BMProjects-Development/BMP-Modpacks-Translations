// Stages to KEEP after a reset. Leave empty for a full wipe.
const STAGE_WHITELIST = ["echo_guidance_interact", "parkour_vault"];

// Wipe every stage on the player except those in STAGE_WHITELIST.
// Uses the direct API (not the `kjs stages clear` command) so it is robust
// against FTBEchoes' sync_stage_tags re-syncing during command dispatch.
function wipePlayerStages(player) {
  let currentStages = player.stages.getAll().toArray();
  for (let i = 0; i < currentStages.length; i++) {
    let stage = currentStages[i];
    if (STAGE_WHITELIST.indexOf(stage) === -1) {
      player.stages.remove(stage);
    }
  }
  for (let j = 0; j < STAGE_WHITELIST.length; j++) {
    let keep = STAGE_WHITELIST[j];
    if (keep && keep.length > 0 && !player.stages.has(keep)) {
      player.stages.add(keep);
    }
  }
}

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
  // Clear all player stages (direct API; survives FTBEchoes sync_stage_tags races)
  wipePlayerStages(player);
  // Reset Quest progress
  server.runCommandSilent(
    `execute run ftbquests change_progress ${name} reset-all`
  );

  // Reset Unearthed
  server.runCommandSilent(`execute run ftbunearthed setlevel ${name} 1`);

  // FTBEchoes progression reset
  server.runCommandSilent(
    `execute run ftbechoes progress reset-all player ${name}`
  );

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

  // Re-wipe stages after the FTBEchoes/FTBQuests resets settle, in case
  // sync_stage_tags or a quest reward re-applied a stage in the interim.
  server.scheduleInTicks(60, () => {
    wipePlayerStages(player);
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
    // Sync team stages to the joining player's player stages
    let teamStages = Teams.getTeamStages(player);
    if (teamStages) {
      teamStages.forEach((stage) => {
        server.runCommandSilent(`kjs stages add ${player.username} ${stage}`);
      });
    }
    // Also copy owner's player stages (catches any player-only stages)
    let team = Teams.getTeam(player);
    let owner = team && team.isPartyTeam() ? team.getOwner() : null;
    let ownerPlayer = owner ? server.getPlayer(owner) : null;
    if (ownerPlayer) {
      ownerPlayer.stages.getAll().forEach((stage) => {
        server.runCommandSilent(`kjs stages add ${player.username} ${stage}`);
      });
    }
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
