ServerEvents.commandRegistry((event) => {
  let { 
    commands: Commands, 
    arguments: Arguments,
    builtinSuggestions: Suggestions
  } = event

  let homeSuggestions = (src) => {
    return FTBEssentials$FTBEPlayerData.getOrCreate(src.getSource().getPlayerOrException())
      .map(data => data.homeManager().getNames())
      .orElseGet(() => new Set())
  }
  
  let sethome = (player, name) => {
    return FTBEssentials$FTBEPlayerData.getOrCreate(player).map((data) => {
      try {
        if (player.blockPosition().getY() < FTBEssentials$FTBEConfig.HOME_MIN_Y.get()) {
          player.displayClientMessage(Text.translate("ftbessentials.home.y_too_low", FTBEssentials$FTBEConfig.HOME_MIN_Y.get()), false)
          return 0
        }
        data.homeManager().addDestination(name, new FTBEssentials$TeleportPos(player), player)
        player.displayClientMessage(Text.translate("ftbessentials.home.set"), false)
        return 1
      } catch(_) {
        player.displayClientMessage(Text.translate("ftbessentials.home.too_many"), false)
        return 0
      }
    }).orElseGet(() => 0)
  }

  let delhome = (player, name) => {
    return FTBEssentials$FTBEPlayerData.getOrCreate(player).map((data) => {
      if (data.homeManager().deleteDestination(name.toLowerCase())) {
        player.displayClientMessage(Text.translate("ftbessentials.home.deleted"), false);
        return 1
      } else {
        player.displayClientMessage(Text.translate("ftbessentials.home.not_found"), false);
        return 0;
      }
    }).orElseGet(() => 0)
  }

  let listhomes = (src, profile) => {
    return FTBEssentials$FTBEPlayerData.getOrCreate(src.getServer(), profile.getId()).map((data) => {
      if (data.homeManager().getNames().isEmpty()) {
        src.sendSuccess(Text.translate("ftbessentials.none"), false)
      } else {
        src.sendSuccess(Text.translate("ftbessentials.home.for_player", profile.getName()).gold(), false)
        src.sendSuccess(Text.of("---").gold(), false)

        let origin = new FTBEssentials$TeleportPos(src.getLevel().getDimension(), src.getPosition())
        data.homeManager().destinations().forEach((entry) => {
          let text = Text.translate(
            "ftbessentials.home.show_home",
            Text.of(entry.name()).aqua(), 
            entry.destination().distanceString(origin)
          )

          if (src.hasPermission(Commands.LEVEL_GAMEMASTERS)) {
            text
              .clickRunCommand("/tp @s ".concat(entry.destination().posAsString()))
              .hover(Text.translate("ftbessentials.click_to_teleport"))
          }

          src.sendSuccess(text, false)
        })
      }

      return 1;
    }).orElseGet(() => 0)
  }

  let root_set_home = Commands.literal("sethome")
  let root_del_home = Commands.literal("delhome")
  let root_list_homes = Commands.literal("listhomes")

  root_set_home = root_set_home
    .executes((src) => sethome(src.getSource().getPlayerOrException(), "home"))
    .then(Commands.argument("name", Arguments.GREEDY_STRING.create(event))
      .executes((src) => sethome(src.getSource().getPlayerOrException(), Arguments.STRING.getResult(src, "name")))
    )
    

  root_del_home = root_del_home
    .executes((src) => delhome(src.getSource().getPlayerOrException(), "home"))
    .then(Commands.argument("name", Arguments.GREEDY_STRING.create(event))
      .suggests((src, builder) => Suggestions["suggest(java.lang.Iterable,com.mojang.brigadier.suggestion.SuggestionsBuilder)"](homeSuggestions(src), builder))
      .executes((src) => delhome(src.getSource().getPlayerOrException(), Arguments.STRING.getResult(src, "name")))
    )
  
  root_list_homes = root_list_homes
    .executes((src) => listhomes(src.getSource(), src.getSource().getPlayerOrException().getProfile()))
    .then(Commands.argument("player", Arguments.GAME_PROFILE.create(event))
      .requires((src) => src.getServer().isSingleplayer() || src.hasPermission(Commands.LEVEL_GAMEMASTERS))
      .executes((src) => listhomes(src.getSource(), Arguments.GAME_PROFILE.getResult(src, "player").iterator().next()))
    )
    
  
  event.register(root_set_home)
  event.register(root_del_home)
  event.register(root_list_homes)
})

