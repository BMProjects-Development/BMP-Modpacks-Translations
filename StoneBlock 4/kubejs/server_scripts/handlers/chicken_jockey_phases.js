// server_scripts/handlers/chicken_chicken_pop_cmd.js

const $EnderChickenEvent = Java.loadClass("dev.ftb.mods.mecrh.event.EnderChickenEvent");

const PHASE_NOTIFY_RADIUS = 96;
const PHASE_NOTIFY_RADIUS_SQ = PHASE_NOTIFY_RADIUS * PHASE_NOTIFY_RADIUS;
const PHASE_LANG_BASE = "ftb.boss.ender_chicken.phase.";
const PLACEMENT = "BOTTOM_CENTER";
const DURATION = 3;

NativeEvents.onEvent("dev.ftb.mods.mecrh.event.EnderChickenEvent", (event) => {
  if (!event) return;

  const entity = event.entity;
  if (!entity) return;

  const level = entity.level;
  if (!level || !level.players) return;

  // Avoid optional chaining: Rhino doesn't support it.
  let phase = null;
  if (event && typeof event.getPhase === "function") {
    phase = event.getPhase();
  } else if (event && "phase" in event) {
    phase = event.phase;
  }
  if (!phase) return;

  const phaseId = (typeof phase.getId === "function") ? String(phase.getId()) : String(phase);
  const key = PHASE_LANG_BASE + phaseId;

  // Compare dimensions using string form to dodge ResourceKey identity quirks.
  const chickenDim = String(level.dimension);

  for (const p of level.players) {
    if (!p || !p.level) continue;
    if (String(p.level.dimension) !== chickenDim) continue;

    const dx = p.x - entity.x;
    const dy = p.y - entity.y;
    const dz = p.z - entity.z;
    if ((dx * dx + dy * dy + dz * dz) > PHASE_NOTIFY_RADIUS_SQ) continue;

    // Pop overlay via command; translate key, bold, gold
    level.server.runCommandSilent(
      `execute as ${p.username} run pop create @s ${PLACEMENT} ${DURATION} ` +
      `{"translate":"${key}","bold":true,"color":"gold"}`
    );
  }
});
