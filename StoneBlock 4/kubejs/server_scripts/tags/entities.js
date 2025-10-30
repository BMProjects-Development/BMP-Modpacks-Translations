function entitiesByModPrefixes(prefixes) {
  var BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
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
    entityIDs: ["chicken_roost:c_blue", "chicken_roost:c_dust"]
  },
  {
    tagName: "industrialforegoing:mob_imprisonment_tool_blacklist",
    entityIDs: ["mekanism:robit"]
  }
];

const removeEntityTags = [
  // Example:
  // { tagName: "c:roost/mobs", entityIDs: ["minecraft:chicken"] }
];

const stopTeleportingEntities = [
  "mecrh:ender_chicken",
  "minecraft:ender_dragon",
  "minecraft:warden",
  "minecraft:wither",
  "irons_spellbooks:fire_boss"
];

const blacklistModPrefixes = ["cataclysm"];

ServerEvents.tags("entity_type", (event) => {
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
    event.add("justdirethings:no_ai_deny", e);
    event.add("justdirethings:creature_catcher_deny", e);
    event.add("justdirethings:polymorphic_target_deny", e);
    event.add("justdirethings:paradox_deny", e);
    event.add("arsnouveau:drygmy_blacklist", e);
    event.add("arsnouveau:jar_blacklist", e);
    event.add("c:capturing_not_supported", e);
    event.add("arsnouveau:rewind_blacklist", e);
    event.add("industrialforegoing:mob_imprisonment_tool_blacklist", e);
    event.add("industrialforegoing:mob_duplicator_blacklist", e);
  }

  // Bulk blacklist by mod id
  var bulk = entitiesByModPrefixes(blacklistModPrefixes);

  for (var m = 0; m < bulk.length; m++) {
    var id = bulk[m];
    event.add("tempad:teleporting_not_supported", id);
    event.add("justdirethings:no_ai_deny", id);
    event.add("justdirethings:creature_catcher_deny", id);
    event.add("justdirethings:polymorphic_target_deny", id);
    event.add("justdirethings:paradox_deny", id);
  }

});
