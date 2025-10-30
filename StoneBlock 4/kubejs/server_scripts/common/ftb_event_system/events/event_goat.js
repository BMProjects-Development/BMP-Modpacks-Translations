// priority: 800

const Goat = Java.loadClass("net.minecraft.world.entity.animal.goat.Goat");
const GoatAI = Java.loadClass("net.minecraft.world.entity.animal.goat.GoatAi");

const event_goat = {
  name: "ftb:goat",
  displayName: "Goat",
  description: "Toggles the Goat Event. Spawns a random Quantum Goat near you",
  chance: 0.25,
  size: -1,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: true,
  itemDespawnTime: 400,
  stage: null,
  disableStage: null,
  markKey: "ftb_event_goat",

  // Weighted loot pool
  // Weights: 1 very rare, 2 rare, 3–5 uncommon, 6–12 common
  lootTable: {
    goatloot: [
      // Common and uncommon
      { id: "minecraft:iron_ingot", weight: 12 },
      { id: "minecraft:copper_ingot", weight: 12 },
      { id: "minecraft:obsidian", weight: 8 },
      { id: "fluxnetworks:flux_dust", weight: 8 },
      { id: "ftbmaterials:dimensional_shard_gem", weight: 6 },
      { id: "ars_nouveau:greater_experience_gem", weight: 5 },
      { id: "irons_spellbooks:lightning_bottle", weight: 5 },
      { id: "cognition:cognitive_flux", weight: 5 },
      { id: "minecraft:gold_ingot", weight: 5 },
      { id: "minecraft:ender_pearl", weight: 4 },
      { id: "ars_nouveau:wilden_horn", weight: 4 },
      { id: "mekanism:teleportation_core", weight: 2 },
      { id: "ftb:clapple", weight: 2 },

      // Goat horns with instrument components (rare)
      { make: function(){ return Item.of("minecraft:goat_horn").withComponent("minecraft:instrument","minecraft:seek_goat_horn"); },   weight: 2 },
      { make: function(){ return Item.of("minecraft:goat_horn").withComponent("minecraft:instrument","minecraft:admire_goat_horn"); }, weight: 2 },
      { make: function(){ return Item.of("minecraft:goat_horn").withComponent("minecraft:instrument","minecraft:feel_goat_horn"); },   weight: 2 },
      { make: function(){ return Item.of("minecraft:goat_horn").withComponent("minecraft:instrument","minecraft:sing_goat_horn"); },   weight: 2 },
      { make: function(){ return Item.of("minecraft:goat_horn").withComponent("minecraft:instrument","minecraft:call_goat_horn"); },   weight: 2 },
      { make: function(){ return Item.of("minecraft:goat_horn").withComponent("minecraft:instrument","minecraft:dream_goat_horn"); },  weight: 2 },
      { make: function(){ return Item.of("minecraft:goat_horn").withComponent("minecraft:instrument","minecraft:ponder_goat_horn"); }, weight: 2 },
      { make: function(){ return Item.of("minecraft:goat_horn").withComponent("minecraft:instrument","minecraft:yearn_goat_horn"); },  weight: 2 },

      // Very rare
      { id: "artifacts:everlasting_beef", weight: 1 },

      { make: function(){
          return Item.of("reliquified_ars_nouveau:quantum_bubble")
            .withComponent("relics:data", {
              abilities: { abilities: { stasis: {
                extender: { cooldown: 0, cooldownCap: 0, ticking: false },
                lock: { breaks: 5 }, points: 0,
                research: { links: {}, researched: false },
                stats: {
                  cooldown: { initialValue: 29.16113 },
                  duration: { initialValue: 6.84532 },
                  levitation: { initialValue: 3.02351 }
                }
              }}},
              leveling: { experience: 0, level: 0, luck: 0, points: 0 }
            });
        }, weight: 1 },

      { id: "ars_elemental:spell_horn", weight: 1 },

      { make: function(){
          return Item.of("simplyswords:bramblethorn")
            .withComponent("minecraft:enchantments", {
              levels: {
                "draconicevolution:reaper": 5,
                "minecraft:mending": 1,
                "minecraft:sharpness": 10
              }
            })
            .withComponent("simplyswords:gem_power", {
              has_nether_power: false,
              has_runic_power: false,
              nether_power: "simplyswords:empty_power",
              runic_power: "simplyswords:empty_power"
            });
        }, weight: 1 },

      { make: function(){
          return Item.of("reliquified_ars_nouveau:horn_of_the_wild_hunter")
            .withComponent("relics:data", {
              abilities: { abilities: { summoner: {
                extender: { cooldown: 0, cooldownCap: 0, ticking: false },
                lock: { breaks: 5 }, points: 0,
                research: { links: {}, researched: false },
                stats: { damage: { initialValue: 3.33686 } }
              }}},
              leveling: { experience: 0, level: 0, luck: 0, points: 0 }
            });
        }, weight: 1 }
    ]
  },

  // Helpers
  _makeStackFromEntry(entry) {
    if (entry && entry.make) return entry.make();
    if (entry && entry.id) return Item.of(entry.id);
    return Item.of("minecraft:stone");
  },

  _pickWeighted(entries) {
    var total = 0;
    for (var i = 0; i < entries.length; i++) {
      var w = entries[i].weight || 0;
      if (w > 0) total += w;
    }
    if (total <= 0) return null;
    var r = Math.random() * total;
    for (var j = 0; j < entries.length; j++) {
      var wj = entries[j].weight || 0;
      if (wj <= 0) continue;
      if (r < wj) return entries[j];
      r -= wj;
    }
    return entries[entries.length - 1];
  },

  spawnRewardItem(level, x, y, z, reason) {
    var chosen = this._pickWeighted(this.lootTable.goatloot);
    if (!chosen) {
      console.log("[GoatEvent] No loot chosen");
      return;
    }
    var stack = this._makeStackFromEntry(chosen);

    var itemEntity = level.createEntity("item");
    // Use setItem for best compatibility
    itemEntity.setItem(stack);
    itemEntity.setPosition(x, y, z);
    itemEntity.age = 6000 - this.itemDespawnTime;
    itemEntity.glowing = true;
    itemEntity.spawn();

    // Debug
    try {
      var id = stack.id ?? (stack.getId && stack.getId()) ?? "<unknown>";
      console.log("[GoatEvent] Dropped " + id + " via " + (reason || "unknown"));
    } catch (e) {
      console.log("[GoatEvent] Dropped item (debug id failed) via " + (reason || "unknown"));
    }
  },

  execute(event, player, location, name) {
    const level = player.getLevel();
    let entity = level.createEntity("minecraft:goat");

    // Warn player
    player.sendSystemMessage(Text.translate("ftb.event_system.spawn.warning").red(), true);

    // Delay spawn to build anticipation
    level.server.scheduleInTicks(140, () => {
      let goat = Goat(entity);
      goat.x = player.x;
      goat.y = player.y;
      goat.z = player.z;

      goat.setCustomName(name ? name : Text.translate("ftb.event_system.names.quantum_goat"));
      goat.setCustomNameVisible(true);
      goat.setScreamingGoat(true);
      goat.potionEffects.add("minecraft:invisibility", 10, 1, true, false);

      // Mark as event goat
      goat.persistentData.putBoolean(this.markKey, true);

      goat.spawn();

      let goatAi = new GoatAI();
      goatAi.updateActivity(goat);
      for (let i = 0; i < 80; i++) goat.aiStep();

      // Scheduled reward if still alive, then despawn
      level.server.scheduleInTicks(120, () => {
        if (!goat || !goat.isAlive()) {
          console.log("[GoatEvent] Scheduled tick: goat not alive, no scheduled drop");
          return;
        }
        event_goat.spawnRewardItem(level, goat.x, goat.y, goat.z, "scheduled");
        goat.discard();
      });
    });
  }
};

// Early-death bonus for event goats, avoids double drop with the scheduled task
EntityEvents.death((event) => {
  const ent = event.entity;
  if (!ent) return;
  if (ent.type !== "minecraft:goat") return;
  if (!ent.persistentData || !ent.persistentData.getBoolean(event_goat.markKey)) return;

  event_goat.spawnRewardItem(ent.level, ent.x, ent.y, ent.z, "death");
  ent.persistentData.putBoolean(event_goat.markKey, false);
  console.log("[GoatEvent] Death-triggered drop spawned");
});
