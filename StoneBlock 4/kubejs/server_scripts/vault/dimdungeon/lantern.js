let $DataComponents = Java.loadClass('net.minecraft.core.component.DataComponents')
let $CustomData = Java.loadClass('net.minecraft.world.item.component.CustomData')
let $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')
let $EnchantmentHelper = Java.loadClass('net.minecraft.world.item.enchantment.EnchantmentHelper')

const LanternSettings = {
  checkForStructure: false,
  dimension: "dimdungeons:dungeon_dimension",
  structure: "god_knows",
  item: "ftb:soulcage",
  checkForTag: true,
  tag: "soulcage",
  soulsPerKill: 1,
  summoningBlock: "cataclysm:cursed_tombstone",
  boss: "cataclysm:maledictus"
}

const SoulCageHandler = {
  TICK_INTERVAL: 20,
  LIGHT_DURATION: 2400,
  BLINDNESS_DURATION: 80,

  // Check if item is a soul cage
  isSoulCage: function(item) {
    return item && item.id === "ftb:soulcage";
  },

  // Initialize soul data if missing
  initializeSouls: function(item) {
    if (!item.getComponents().has($DataComponents.CUSTOM_DATA)) {
      const souls = new $CompoundTag();
      souls.putInt('ftb:souls', 0);
      $CustomData.set($DataComponents.CUSTOM_DATA, item, souls);
      const maxDamage = item.item.getMaxDamage(item);
      item.item.setDamage(item, maxDamage);
    }
  },

  // Get current soul count
  getSoulCount: function(item) {
    if (!this.isSoulCage(item)) return 0;
    this.initializeSouls(item);
    const customData = item.getComponents().get($DataComponents.CUSTOM_DATA);
    return customData.copyTag().getInt('ftb:souls');
  },

  // Get max soul capacity
  getMaxSouls: function(item) {
    return item.item.getMaxDamage(item);
  },

  // Check if item has souls
  hasSouls: function(item) {
    return this.getSoulCount(item) > 0;
  },

  // Check if item is at max capacity
  isFull: function(item) {
    return this.getSoulCount(item) >= this.getMaxSouls(item);
  },

  // Set soul count and update damage
  setSoulCount: function(item, newSouls) {
    const souls = new $CompoundTag();
    souls.putInt('ftb:souls', newSouls);
    $CustomData.set($DataComponents.CUSTOM_DATA, item, souls);

    const maxSouls = this.getMaxSouls(item);
    item.item.setDamage(item, maxSouls - newSouls);
  },

  // Consume one soul
  consumeSoul: function(item) {
    const currentSouls = this.getSoulCount(item);
    if (currentSouls <= 0) return null;

    const newSouls = currentSouls - 1;
    this.setSoulCount(item, newSouls);

    return {
      newSouls: newSouls,
      maxSouls: this.getMaxSouls(item)
    };
  },

  // Add souls (for entity death)
  addSouls: function(item, amount) {
    const currentSouls = this.getSoulCount(item);
    const maxSouls = this.getMaxSouls(item);
    const newSouls = Math.min(currentSouls + amount, maxSouls);

    if (currentSouls >= maxSouls) {
      return null; // Already full
    }

    this.setSoulCount(item, newSouls);

    return {
      newSouls: newSouls,
      maxSouls: maxSouls,
      added: newSouls - currentSouls
    };
  },

  // Find soul cage in inventory
  findInInventory: function(player) {
    return player.getInventory().getAllItems().find(function(item) {
      return item.id === "ftb:soulcage" || item.id === LanternSettings.item;
    });
  }
};


EntityEvents.spawned("cataclysm:maledictus", (event) => {
    const {entity, level, server} = event
    if(!entity.isLiving()) return
    if(level.dimension != "dimdungeons:dungeon_dimension") return
    let spawnPos = entity.blockPosition()
    let aabb = AABB.of(spawnPos.x-15, spawnPos.y-3, spawnPos.z-15, spawnPos.x+15, spawnPos.y+15, spawnPos.z+15)

    customTick(entity, 20, () => {
        if(!aabb.intersects(entity.getBoundingBox())) {
            entity.teleportTo(spawnPos.x + 0.5, spawnPos.y, spawnPos.z + 0.5);
        }
    })
});

EntityEvents.death(function(event) {
  const server = event.server;
  const entity = event.entity;
  const source = event.source;
  const level = event.level;

  // Validate source is a player
  const actualSource = source.getActual();
  if (!actualSource || !actualSource.isPlayer()) return;

  // Check structure requirement
  if (LanternSettings.checkForStructure) {
    const kuLevel = new Ku.Level(level);
    if (!kuLevel.isStructureAtLocation(entity.pos, LanternSettings.structure)) return;
  }

  // Check entity tag requirement
  if (LanternSettings.checkForTag && (!entity.tags || !entity.tags.contains(LanternSettings.tag))) return;

  // Find soul cage in player's inventory
  const player = actualSource;
  const soulCage = SoulCageHandler.findInInventory(player);

  if (!soulCage || !SoulCageHandler.isSoulCage(soulCage)) return;

  // Calculate souls to add (including enchantment bonus)
  let mainHandItem = player.getMainHandItem();
  const additionalSouls = $EnchantmentHelper.getTagEnchantmentLevel('draconicevolution:reaper', mainHandItem);
  const soulsToAdd = LanternSettings.soulsPerKill + additionalSouls;

  // Add souls to the cage
  const result = SoulCageHandler.addSouls(soulCage, soulsToAdd);

  if (result) {
    if(SoulCageHandler.getSoulCount(soulCage) == result.maxSouls && player.getEffect("ftb:vault_light").getDuration() < 20*120) {
      player.potionEffects.add("ftb:vault_light", 20*60*5, 0, true, false);
      server.runCommandSilent(
        `title ${player.username} title ${JSON.stringify({
        translate: "ftb.lantern.cage.filled",
        bold: false,
        italic: false,
        color: "red",
        })}`
      );
      server.runCommandSilent(
        `title ${player.username} subtitle ${JSON.stringify({
        translate: "ftb.lantern.find_boss",
        bold: false,
        italic: false,
        color: "red",
        })}`

  );

    }
    player.sendSystemMessage(
      Text.translate("ftb.lantern.soul_absorbed", [result.newSouls.toFixed(0), result.maxSouls]).green(),
      true
    );
  } else {
    player.sendSystemMessage(
      Text.translate("ftb.lantern.full").yellow(),
      true
    );
  }
});

BlockEvents.rightClicked(LanternSettings.summoningBlock, (event) => {
  const { block, player, level, hand } = event;
  const kuLevel = new Ku.Level(level);
  const isThere = kuLevel.isStructureAtLocation(player, LanternSettings.structure);
  if (!isThere && LanternSettings.checkForStructure) event.cancel();

  let mainHand = player.getMainHandItem()
  let offHand = player.getOffHandItem()
  let item = mainHand.id == LanternSettings.item ? mainHand : offHand.id == LanternSettings.item ? offHand : null;
  console.log(item);
  if (item.id != LanternSettings.item) event.cancel();
  if (!item.getComponents().has($DataComponents.CUSTOM_DATA)) event.cancel();

  let currentSouls = SoulCageHandler.getSoulCount(item);
  if (currentSouls < SoulCageHandler.getMaxSouls(item)) event.cancel();
  SoulCageHandler.setSoulCount(item, 5);
    console.log("Right Clicked Cursed Tombstone with Mob Lantern");

  let Boss = level.createEntity(LanternSettings.boss);
  Boss.setPos(block.x + 0.5, block.y + 1, block.z + 0.5);
  level.addFreshEntity(Boss);

  player.sendSystemMessage(Text.translate("ftb.lantern.summon_boss").red(), true);

  event.cancel(); // Canceling original event to start timer
})


PlayerEvents.tick(event => {
  const { player, server } = event;

  if (server.tickCount % SoulCageHandler.TICK_INTERVAL !== 0) return;

  if(player.getLevel().getDimension() != "dimdungeons:dungeon_dimension") return;

  if (player.hasEffect("ftb:vault_light")) return;

  const offhandItem = player.getOffHandItem();

  if (SoulCageHandler.hasSouls(offhandItem)) {
    const { newSouls, maxSouls } = SoulCageHandler.consumeSoul(offhandItem);

    player.removeEffect("minecraft:blindness");
    player.potionEffects.add("ftb:vault_light", SoulCageHandler.LIGHT_DURATION, 0, true, false);
    player.sendSystemMessage(
      Text.translate("ftb.lantern.light_granted", [newSouls.toFixed(0), maxSouls]).green(),
      true
    );
  } else {
    player.potionEffects.add("minecraft:blindness", SoulCageHandler.BLINDNESS_DURATION, 0, true, false);
  }
});


EntityEvents.spawned(event => {
  const {entity, level} = event;
  if (!entity.isLiving() || entity.isPlayer()) return

  if (level.dimension == LanternSettings.dimension) {
      entity.tags.add(LanternSettings.tag)
  }
})


EntityEvents.spawned(event => {
    const {entity, level, server} = event
    if(!entity.isLiving()) return
    if(level.dimension != "dimdungeons:dungeon_dimension") return

    const radius = 64
    const healthScale = 0.1
    const attributes = [
        //[attribute, scale]
        ['generic.attack_damage', 0.1],
        ['generic.attack_knockback', 0.1],
        ['generic.armor', 1],
        ['generic.armor_toughness', 1],
        ['generic.movement_speed', 0.01]]

    modifyEntity(event, radius, healthScale, attributes)
})

function modifyEntity(event, radius, healthScale, attributes){
    const {entity, level} = event
    const {x,y,z} = entity

    // Get Entities in an Area
    let aabb = AABB.of(x-radius, y-radius, z-radius, x+radius, y+radius, z+radius)
    let entities = level.getEntitiesWithin(aabb)
    let totalPlayers = 0
    entities.forEach(entity =>{
        if(entity.isPlayer()){
            totalPlayers++
        }
    })
    let baseHealth = entity.getMaxHealth()
    entity.setMaxHealth(baseHealth+(baseHealth*totalPlayers*healthScale))
    entity.setHealth(baseHealth+(baseHealth*totalPlayers*healthScale))

    attributes.forEach(attributeArr => {
        let attribute = attributeArr[0]
        let baseValue = entity.getAttributeBaseValue(attribute)
        let value = baseValue+(attributeArr[1]*totalPlayers)
        entity.setAttributeBaseValue(attribute, value)
    })
}


NativeEvents.onEvent("net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent", event => {
  const { entity:player} = event;
  try{
    if(event.getTo() != "dimdungeons:dungeon_dimension") return


    let pData = player.level.persistentData;
    if(!pData["dimdungeon_boss_arena_spawn"]){
        pData["dimdungeon_boss_arena_spawn"] = {}
    }


    let key = `${player.x.toFixed(0)}-${player.y.toFixed(0)}-${player.z.toFixed(0)}`;
    let kuLevel = new Ku.Level(player.level);

    if(!pData["dimdungeon_boss_arena_spawn"][key]){
      kuLevel.spawnStructure("ftb:vaults/dimdungeons/boss", player.block.pos.offset(-22, 25, -27));
      pData["dimdungeon_boss_arena_spawn"][key] = true;
    }


  }catch(e){
    console.log(`Error logging player travel to Dimensional Dungeon: ${e}`);
  }
})