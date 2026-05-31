ServerEvents.commandRegistry((event) => {
  const { commands: Commands } = event;

  event.register(
    Commands.literal("cry").executes((context) => {
      const player = context.getSource().getPlayerOrException();

      // Show the subtitle using the lang key, and trigger it with a blank title
      player.server.runCommandSilent(
        `execute as ${player.uuid} run title @s times 10 60 10`
      );
      player.server.runCommandSilent(
        `execute as ${player.uuid} run title @s subtitle {"translate":"ftb.title.cry"}`
      );
      player.server.runCommandSilent(
        `execute as ${player.uuid} run title @s title {"text":" "}`
      );

      // Particle tears
      for (let i = 0; i < 16; i++) {
        player.level.server.scheduleInTicks(i * 5, () => {
          player.server.runCommandSilent(
            `execute at ${player.uuid} anchored eyes run particle minecraft:falling_water ^0.1 ^1.3 ^0.3 0.1 0 0.1 0 2`
          );
          player.server.runCommandSilent(
            `execute at ${player.uuid} anchored eyes run particle minecraft:falling_water ^-0.1 ^1.3 ^0.3 0.1 0 0.1 0 2`
          );
        });
      }

      return 1;
    })
  );
});
