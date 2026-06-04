// Self-heals the Echo Guidance progression chain for players whose
// foundational team stages never landed.
//
// Context: the Guidance echo progression is gated on two team stages
// that are granted early:
//   - echo_guidance_interact  (from thebackrooms play_time quest 78610F56E29472F7)
//   - echo_guidance_meet      (from the echo stage 0 completion reward)
//
// If either is missing, the team base portal refuses transit
// (teambase_portal_access.js) and the echo shows the "ftb.echo.bugged"
// message (t0_echo_guidance.json stage 0 required_stage).
//
// Migrated saves (ftbechoes:stages_migrated) and worlds predating the
// team-stage refactors (commits c10c62a52 / fa2a3338d / e197adaa3) can
// end up in a state where later quests granted their stage rewards but
// the foundational stages were never set. This heal runs at login and
// restores them when it detects the player has already progressed past
// the crude brush quest (echo_guidance_stage1_task1_completed) — which
// is only possible if the foundational stages should have been set.
PlayerEvents.loggedIn((event) => {
  const { player, server } = event;

  // Run after stage_sync.js (30 ticks) so team->player sync happens first.
  server.scheduleInTicks(40, () => {
    try {
      if (!Teams.getTeam(player)) return;

      const hasProgressed = (stage) =>
        player.stages.has(stage) || Teams.hasStage(player, stage);

      const restore = (stages) => {
        const missing = stages.filter((stage) => !Teams.hasStage(player, stage));
        if (missing.length === 0) return;

        Teams.addTeamStage(player, missing);
        missing.forEach((stage) => {
          if (!player.stages.has(stage)) player.stages.add(stage);
          console.warn(
            `[echo_progression_heal] Restored missing team stage '${stage}' for ${player.username}`
          );
        });
      };

      if (hasProgressed("echo_guidance_stage1_task1_completed")) {
        restore(["echo_guidance_interact", "echo_guidance_meet"]);
      }

      ["quartermaster", "magician", "machinist"].forEach((echo) => {
        if (hasProgressed(`echo_${echo}_stage1_task1_completed`)) {
          restore([`echo_${echo}_meet`]);
        }
      });
    } catch (e) {
      console.error(
        "echo_progression_heal failed for " + player.username + ": " + e
      );
    }
  });
});
