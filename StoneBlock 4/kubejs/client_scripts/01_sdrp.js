// priority: 1000

sdrp.dimension_change((event) => {

    const { player } = event;
      console.log(`[SDRP] Detected dimension change`);
    if (!event.player) {
      console.log(`[SDRP] player was invalid`);
      return;
    }
    if (!player.level) {
        console.log(`[SDRP] player.level was invalid`);
      return;
    }

    let level = player.level;
      let dimName = level.dimension.toString().substring(level.dimension.toString().indexOf(":") + 1);

        console.log(`[SDRP] Player ${player.name} entered ${dimName}`)
        event.updateSDRPState(`sdrp.${dimName}.in`, `sdrp.${dimName}`, `${dimName}`);

});
