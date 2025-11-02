ServerEvents.loaded((event) => {
  Registry.of("minecraft:worldgen/biome").registry().addAlias("sb4:stone", "minecraft:the_void")
  Registry.of("minecraft:worldgen/biome").registry().addAlias("sb4:deepslate", "minecraft:the_void")
  Registry.of("minecraft:block").registry().addAlias("avaritialiteextended:celestium_ore", "minecraft:stone")
  
  if (event.server.persistentData.getBoolean("gameruleSet")) {
    return
  }

  console.log("Setting Gamerule: commandBlockOutput = false")
  console.log("Setting Gamerule: doInsomnia = false")
  event.server.runCommandSilent("gamerule commandBlockOutput false")
  event.server.runCommandSilent("gamerule doInsomnia false")
  event.server.persistentData.putBoolean("gameruleSet", true)
})