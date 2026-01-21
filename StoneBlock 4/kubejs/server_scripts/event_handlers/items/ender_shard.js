// KubeJS 7, MC 1.21.x
// server_scripts/handlers/endershard.js

(function () {
  'use strict';

  // Brigadier / MC argument types
  var $EntityArgument = Java.loadClass("net.minecraft.commands.arguments.EntityArgument");
  var $IntegerArgumentType = Java.loadClass("com.mojang.brigadier.arguments.IntegerArgumentType");
  var $StringArgumentType  = Java.loadClass("com.mojang.brigadier.arguments.StringArgumentType");

  // Safe method-or-property accessor (Rhino wrapper friendly)
  function callOrGet(obj, name) {
    var v = obj[name];
    return (typeof v === "function") ? v.call(obj) : v;
  }

  // Get the Base dimension ID (namespace:path) for a specific player
  function getBaseDimIdForPlayer(server, targetPlayer) {
    var $BaseInstanceManager = Java.loadClass("dev.ftb.mods.ftbteambases.data.bases.BaseInstanceManager");

    var mgr = $BaseInstanceManager.get(server);
    if (!mgr) return null;

    var baseOpt = mgr.getBaseForPlayer(targetPlayer);
    if (!baseOpt || !baseOpt.isPresent()) return null;

    var base = baseOpt.get();
    var dimKey = callOrGet(base, "dimension");       // ResourceKey<Level>
    if (!dimKey) return null;

    var dimLoc = callOrGet(dimKey, "location");      // ResourceLocation
    if (!dimLoc) return null;

    var ns =
      (typeof dimLoc.getNamespace === "function") ? dimLoc.getNamespace() :
      (typeof dimLoc.namespace === "function") ? dimLoc.namespace() : dimLoc.namespace;
    var path =
      (typeof dimLoc.getPath === "function") ? dimLoc.getPath() :
      (typeof dimLoc.path === "function") ? dimLoc.path() : dimLoc.path;

    if (ns == null || path == null) return null;
    return ns + ":" + path;
  }

  function giveEnderShard(server, target, dimId, x, y, z, customNameOrNull) {
    // Components list for item spec
    var components = [];

    // position component
    components.push(
      'simpleteleporters:position={dimension:"' + dimId + '",pos:[I;' + x + ',' + y + ',' + z + ']}'
    );

    // optional custom name component (JSON inside single quotes)
    if (customNameOrNull && String(customNameOrNull).length > 0) {
      var nameJson = JSON.stringify({ text: String(customNameOrNull), italic: false }).replace(/'/g, "\\'");
      components.push("minecraft:custom_name='" + nameJson + "'");
    }

    var itemSpec = 'simpleteleporters:ender_shard[' + components.join(",") + ']';
    server.runCommand('give ' + target.username + ' ' + itemSpec);
  }

  ServerEvents.commandRegistry(function (event) {
    var root = event.commands.literal("endershard").requires(function (src) {
      return src.hasPermission(2); // OP only
    });

    // /endershard <player> <x> <y> <z>
    // /endershard <player> <x> <y> <z> <customName...>
    root.then(
      event.commands
        .argument("player", $EntityArgument.player())
        .then(
          event.commands
            .argument("x", $IntegerArgumentType.integer(-30000000, 30000000))
            .then(
              event.commands
                .argument("y", $IntegerArgumentType.integer(-4096, 4096))
                .then(
                  event.commands
                    .argument("z", $IntegerArgumentType.integer(-30000000, 30000000))
                    // variant WITH custom name (must come first so Brigadier prefers the longer match)
                    .then(
                      event.commands
                        .argument("name", $StringArgumentType.greedyString())
                        .executes(function (ctx) {
                          var src = ctx.source;
                          var server = src.server;
                          var target = $EntityArgument.getPlayer(ctx, "player");

                          var x = $IntegerArgumentType.getInteger(ctx, "x");
                          var y = $IntegerArgumentType.getInteger(ctx, "y");
                          var z = $IntegerArgumentType.getInteger(ctx, "z");
                          var customName = $StringArgumentType.getString(ctx, "name");

                          var dimId = getBaseDimIdForPlayer(server, target);
                          if (!dimId) {
                            if (src.sendFailure) src.sendFailure(Text.red("[EnderShard] Could not resolve base dimension for player."));
                            else if (src.player) src.player.tell("[EnderShard] Could not resolve base dimension for player.");
                            return 0;
                          }

                          giveEnderShard(server, target, dimId, x, y, z, customName);

                          if (src.sendSuccess) {
                            src.sendSuccess(
                              Text.green("Gave Ender Shard to " + target.username +
                                         " → " + dimId + " @ " + x + ", " + y + ", " + z +
                                         " named \"" + customName + "\""),
                              true
                            );
                          }
                          return 1;
                        })
                    )
                    // variant WITHOUT custom name
                    .executes(function (ctx) {
                      var src = ctx.source;
                      var server = src.server;
                      var target = $EntityArgument.getPlayer(ctx, "player");

                      var x = $IntegerArgumentType.getInteger(ctx, "x");
                      var y = $IntegerArgumentType.getInteger(ctx, "y");
                      var z = $IntegerArgumentType.getInteger(ctx, "z");

                      var dimId = getBaseDimIdForPlayer(server, target);
                      if (!dimId) {
                        if (src.sendFailure) src.sendFailure(Text.red("[EnderShard] Could not resolve base dimension for player."));
                        else if (src.player) src.player.tell("[EnderShard] Could not resolve base dimension for player.");
                        return 0;
                      }

                      giveEnderShard(server, target, dimId, x, y, z, null);

                      if (src.sendSuccess) {
                        src.sendSuccess(
                          Text.green("Gave Ender Shard materialized and reconfigured to for user " + target.username +
                                     " →  @ " + x + ", " + y + ", " + z),
                          true
                        );
                      }
                      return 1;
                    })
                )
            )
        )
    );

    event.register(root);
  });
})();
