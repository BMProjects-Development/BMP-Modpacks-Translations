ServerEvents.loaded((event) => {
  if (event.server.persistentData.getBoolean("gameruleSet")) {
    return
  }

  console.log("Setting Gamerule: commandBlockOutput = false")
  console.log("Setting Gamerule: doInsomnia = false")
  event.server.runCommandSilent("gamerule commandBlockOutput false")
  event.server.runCommandSilent("gamerule doInsomnia false")
  event.server.persistentData.putBoolean("gameruleSet", true)
})
