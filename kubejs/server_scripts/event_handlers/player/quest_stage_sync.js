FTBQuestsEvents.completed((event) => {
  try {
    let players = event.getNotifiedPlayers();
    if (!players) return;

    let server = null;
    players.forEach((p) => {
      if (p && p.server) server = p.server;
    });
    if (!server) return;

    server.scheduleInTicks(2, () => {
      players.forEach((p) => {
        try {
          syncTeamStagesToPlayer(p);
        } catch (e) {
          console.error("quest_stage_sync failed for " + (p ? p.username : "?") + ": " + e);
        }
      });
    });
  } catch (e) {
    console.error("quest_stage_sync handler failed: " + e);
  }
});
