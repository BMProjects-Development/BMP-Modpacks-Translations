function entitiesByModPrefixes(prefixes) {
  var BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");
  var ids = [];
  var it = BuiltInRegistries.ENTITY_TYPE.keySet().iterator();
  while (it.hasNext()) {
    var rl = it.next();
    var ns = rl.getNamespace();
    for (var i = 0; i < prefixes.length; i++) {
      var p = prefixes[i];
      if (ns != null && ns.startsWith(p)) {
        ids.push(rl.toString());
        break;
      }
    }
  }
  return ids;
}

const addEntityTags = [
  {
    tagName: "c:roost/mobs",
    entityIDs: ["chicken_roost:c_blue", "chicken_roost:c_dust"],
  },
  {
    tagName: "industrialforegoing:mob_imprisonment_tool_blacklist",
    entityIDs: ["mekanism:robit"],
  },
  {
    tagName: "industrialforegoing:mob_duplicator_blacklist",
    entityIDs: ["#c:roost/chicken", "moofluids:fluid_cow"],
  },
  {
    tagName: "industrialforegoing:mob_crusher_blacklist",
    entityIDs: ["mecrh:ender_chicken"],
  },
  {
    tagName: "apothic_spawners:blacklisted_from_spawners",
    entityIDs: ["#c:roost/chicken", "moofluids:fluid_cow"],
  },
  {
    tagName: "shrink:no_shrink",
    entityIDs: ["moofluids:fluid_cow"],
  },
  {
    tagName: "mob_grinding_utils:no_swab",
    entityIDs: ["artifacts:mimic"],
  },
];

const removeEntityTags = [
  // Example:
  // { tagName: "c:roost/mobs", entityIDs: ["minecraft:chicken"] }
];

const chunksEntityInteractWhitelist = ["ftbechoes:echo"];

const stopTeleportingEntities = [
  "mecrh:ender_chicken",
  "minecraft:ender_dragon",
  "minecraft:warden",
  "minecraft:wither",
  "irons_spellbooks:fire_boss",
  "minecraft:text_display",
  "cataclysm:ignis",
  "twilightforest:lich",
];

const blacklistModPrefixes = ["cataclysm"];

const FARMING_BLACKLIST_TAGS = [
  "ars_nouveau:drygmy_blacklist",
  "ars_nouveau:jar_blacklist",
  "ars_nouveau:rewind_blacklist",
  "c:capturing_not_supported",
  "industrialforegoing:mob_imprisonment_tool_blacklist",
  "industrialforegoing:mob_duplicator_blacklist",
  "justdirethings:creature_catcher_deny",
  "justdirethings:polymorphic_target_deny",
  "justdirethings:paradox_deny",
  "justdirethings:no_ai_deny",
  "apothic_spawners:blacklisted_from_spawners",
];

const FARMING_BLACKLIST_ENTRIES = [
  "#c:bosses",
  "artifacts:mimic",
];

ServerEvents.tags("entity_type", (event) => {
  chunksEntityInteractWhitelist.forEach((id) => {
    event.add("ftbchunks:entity_interact_whitelist", id);
  });

  // Adds
  for (var i = 0; i < addEntityTags.length; i++) {
    var tag = addEntityTags[i];
    event.add(tag.tagName, tag.entityIDs);
  }

  // Removes
  for (var j = 0; j < removeEntityTags.length; j++) {
    var rtag = removeEntityTags[j];
    event.remove(rtag.tagName, rtag.entityIDs);
  }

  // Explicit blacklist
  for (var k = 0; k < stopTeleportingEntities.length; k++) {
    var e = stopTeleportingEntities[k];
    event.add("tempad:teleporting_not_supported", e);
    for (var ki = 0; ki < FARMING_BLACKLIST_TAGS.length; ki++) {
      event.add(FARMING_BLACKLIST_TAGS[ki], e);
    }
  }

  // Bulk blacklist by mod id
  var bulk = entitiesByModPrefixes(blacklistModPrefixes);

  for (var m = 0; m < bulk.length; m++) {
    var id = bulk[m];
    event.add("tempad:teleporting_not_supported", id);
    for (var mi = 0; mi < FARMING_BLACKLIST_TAGS.length; mi++) {
      event.add(FARMING_BLACKLIST_TAGS[mi], id);
    }
  }

  for (var n = 0; n < FARMING_BLACKLIST_TAGS.length; n++) {
    for (var ni = 0; ni < FARMING_BLACKLIST_ENTRIES.length; ni++) {
      event.add(FARMING_BLACKLIST_TAGS[n], FARMING_BLACKLIST_ENTRIES[ni]);
    }
  }
});
