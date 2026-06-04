// Syncs team stages to player stages on login.
// Defense-in-depth: ensures player stages mirror team stages so that any code
// path checking only player stages (e.g. FTBEchoes sync_stage_tags, or KubeJS
// scripts that only check player.stages.has()) will still work correctly.
PlayerEvents.loggedIn((event) => {
  const { player, server } = event;

  server.scheduleInTicks(30, () => {
    try {
      syncTeamStagesToPlayer(player);
    } catch (e) {
      console.error("Stage sync failed for " + player.username + ": " + e);
    }
  });
});
