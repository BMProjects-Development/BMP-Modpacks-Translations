// priority: 800

const SB4$WOLF_KEYS = {
  "pale": {
    weight: 1,
    variant: "pale"
  },
  "spotted": {
    weight: 1,
    variant: "spotted"
  },
  "snowy": {
    weight: 1,
    variant: "snowy"
  },
  "black": {
    weight: 1,
    variant: "black"
  },
  "ashen": {
    weight: 1,
    variant: "ashen"
  },
  "rusty": {
    weight: 1,
    variant: "rusty"
  },
  "woods": {
    weight: 1,
    variant: "woods"
  },
  "fido": {
    weight: 1,
    name: Text.of("fido").toNBT()
  },
  "odie": {
    weight: 1,
    name: Text.of("odie").toNBT()
  },
  "Amora": {
    weight: 1,
    name: Text.of("Amora").toNBT()
  },
  "Cristal": {
    weight: 1,
    name: Text.of("Cristal").toNBT()
  },
  "Aski": {
    weight: 1,
    name: Text.of("Aski").toNBT()
  },
  "Jack Jack": {
    weight: 1,
    name: Text.of("Jack Jack").toNBT()
  },
  "Kovu": {
    weight: 1,
    name: Text.of("Kovu").toNBT()
  },
  "Manic Von Drugenstein III": {
    weight: 1,
    name: Text.of("Manic Von Drugenstein III").toNBT()
  },
  "Warwick": {
    weight: 1,
    name: Text.of("Warwick").toNBT()
  },
  "Kaiju": {
    weight: 1,
    name: Text.of("Kaiju").toNBT()
  },
  "Rudolpho": {
    weight: 1,
    name: Text.of("Rudolpho").toNBT()
  },
  "Jello": {
    weight: 1,
    name: Text.of("Jello").toNBT()
  },
  "clifford": {
    weight: 1,
    variant: "rusty",
    name: Text.of("Clifford").toNBT(),
    attributes: [
      {
        id: "minecraft:generic.scale",
        op: "add_value",
        value: 1.5,
      }
    ]
  },
  "snoop": {
    weight: 1,
    name: Text.of("Snoop").toNBT(),
    attributes: [
      {
        id: "minecraft:generic.movement_speed",
        op: "add_value",
        value: 1.0,
      }
    ]
  },
  "ethereal": {
    weight: 1,
    name: Text.of("Ethereal Dog").toNBT(),
    effects: [
      {
        id: "minecraft:glowing",
        duration: -1,
        amplifier: 0
      },
      {
        id: "minecraft:invisibility",
        duration: -1,
        amplifier: 0
      }
    ],
    attributes: [
      {
        id: "minecraft:generic.scale",
        op: "add_value",
        value: 1.0,
      },
      {
        id: "minecraft:generic.gravity",
        op: "add_multiplied_base",
        value: -1.0,
      }
    ]
  },
  "not_cat": {
    weight: 1,
    name: Text.of("Ms. Cat").toNBT()
  },
  "not_harmed": {
    weight: 1,
    name: Text.of("37 Wolves").toNBT()
  },
}

const SB4$CAT_KEYS = {
  "tabby": {
    weight: 1,
    variant: "tabby"
  },
  "black": {
    weight: 1,
    variant: "black"
  },
  "red": {
    weight: 1,
    variant: "red"
  },
  "siamese": {
    weight: 1,
    variant: "siamese"
  },
  "calico": {
    weight: 1,
    variant: "calico"
  },
  "persian": {
    weight: 1,
    variant: "persian"
  },
  "white": {
    weight: 1,
    variant: "white"
  },
  "jellie": {
    weight: 1,
    variant: "jellie",
    name: Text.of("jellie").toNBT()
  },
  "all_black": {
    weight: 1,
    variant: "all_black"
  },
  "Sparkle": {
    weight: 1,
    variant: "siamese",
    name: `{text:"Sparkle",color:"yellow"}`,
    effects: [
      {
        id: "minecraft:glowing",
        duration: -1,
        amplifier: 0
      }
    ]
  },
  "Dobby": {
    weight: 1,
    name: Text.of("Dobby").toNBT()
  },
  "Nori": {
    weight: 1,
    name: Text.of("Nori").toNBT()
  },
  "Fenni": {
    weight: 1,
    name: Text.of("Fenni").toNBT()
  },
  "Buuz135": {
    weight: 1,
    name: `{text:"Buuz135",color:"ftb:rainbow"}`
  },
  "Pyewacket": {
    weight: 1,
    name: Text.of("Pyewacket").toNBT()
  },
  "maow tsu tung": {
    weight: 1,
    name: Text.of("Maow").toNBT()
  },
  "Pretinho": {
    weight: 1,
    name: Text.of("Pretinho").toNBT()
  },
  "Morgana": {
    weight: 1,
    name: Text.of("Morgana").toNBT()
  },
  "Shelby": {
    weight: 1,
    name: Text.of("Shelby").toNBT()
  },
  "Cleo": {
    weight: 1,
    name: Text.of("Cleo").toNBT()
  },
  "Nyxane": {
    weight: 1,
    name: `{text:"Nyxane",color:"#BED7FF"}`
  },
  "floating": {
    weight: 1,
    variant: "white",
    name: Text.of("Zero Meavity").toNBT(),
    attributes: [
      {
        id: "minecraft:generic.gravity",
        op: "add_multiplied_base",
        value: -1.0,
      }
    ]
  },
  "levi": {
    weight: 1,
    variant: "all_black",
    name: Text.of("Mr. Levi").toNBT(),
    attributes: [
      {
        id: "minecraft:generic.gravity",
        op: "add_multiplied_base",
        value: -2.0,
      }
    ]
  },
  "tom": {
    weight: 1,
    variant: "siamese",
    name: Text.of("Tom").toNBT(),
    attributes: [
      {
        id: "minecraft:generic.max_health",
        op: "add_multiplied_base",
        value: 99.0,
      }
    ]
  },
  "mini_me": {
    weight: 1,
    name: Text.of("Minini").toNBT(),
    attributes: [
      {
        id: "minecraft:generic.scale",
        op: "add_value",
        value: -0.5,
      }
    ]
  },
  "ethereal": {
    weight: 1,
    name: Text.of("Ethereal Cat").toNBT(),
    effects: [
      {
        id: "minecraft:glowing",
        duration: -1,
        amplifier: 0
      },
      {
        id: "minecraft:invisibility",
        duration: -1,
        amplifier: 0
      }
    ],
    attributes: [
      {
        id: "minecraft:generic.scale",
        op: "add_value",
        value: 1.0,
      },
      {
        id: "minecraft:generic.gravity",
        op: "add_multiplied_base",
        value: -1.0,
      }
    ]
  },
  "not_dog": {
    weight: 1,
    name: Text.of("Mr. Wolf").toNBT(),
  },
  "not_harmed": {
    weight: 1,
    name: Text.of("173 Cats").toNBT()
  },
}

const SB4$CAT_VARIANTS = [
  "tabby",
  "black",
  "red",
  "siamese",
  "calico",
  "persian",
  "white",
  "jellie",
  "all_black",
]

const SB4$WOLF_VARIANTS = [
  "pale",
  "spotted",
  "snowy",
  "black",
  "ashen",
  "rusty",
  "woods",
]

let SB4$CAT_ENTRIES = {}
let SB4$CAT_TOTAL_WEIGHT = 0

let SB4$WOLF_ENTRIES = {}
let SB4$WOLF_TOTAL_WEIGHT = 0

function getAnimalEntry(entries, index) {
  for (const key in entries) {
    if (index < entries[key].weight) {
      return key
    }
  }
}

/**
 * Represents a template event. Object name should be added to the ftbEvents object in the main script.
 * @property {string} name - The name of the event. Used for identification.
 * @property {string} displayName - The display name of the event. Used for display purposes.
 * @property {string} description - The description of the event. Not used at the moment
 * @property {number} chance - The chance of the event occurring. 0.0 - 1.0
 * @property {string|null} stage - The stage of the event. Stage needed before this Event can happen
 * @property {string|null} disableStage - The stage needed to be able to disable this event
 * 
 * @property {number} size - The size of the event area / mob needed spawning area.
 * @property {number} minDistance - The minimum distance for the event.
 * @property {number} maxDistance - The maximum distance for the event.
 * @property {string[]} checkBlocks - The blocks to check for the event. (Example minecraft:chest for the Mimic Event)
 * @property {boolean} requireBlockBelow - Indicates if a block below is required for the event.
 * 
 * @property {Function} execute - The function to execute when the event occurs.
 */

const SB4$PET_TOGGLE_ID = "ftb:pet_event_mode"
const SB4$PET_TOGGLE_CAT = "CAT"
const SB4$PET_TOGGLE_WOLF = "WOLF"
const SB4$PET_TOGGLE_ALL = "ALL"
let PET_RANDOM = Utils.getRandom().fork()

const event_gift_of_pets = {
  name: "ftb:gift_of_pets",
  displayName: "Gift of Cats & Dogs!",
  description: "Its Raining Cats and Dogs!",
  chance: 0.1,
  stage: null,
  disableStage: null,

  size: 0,
  minDistance: 1,
  maxDistance: 24,

  checkBlocks: ["minecraft:air"],
  requireBlockBelow: false,



  /**
   * Executes the event.
   * In here you can do almost everything you want.
   * 
   * @param {Event} event - The event object. limited use when triggering the event with the force command
   * @param {Player} player - The player object.
   * @param {Location} location - The location object.
   */
  execute(event, player, location) {
    let data = player.getPersistentData()
    let server = player.getLevel().getServer()
    let toggle = SB4$PET_TOGGLE_ALL
    if (data.contains(SB4$PET_TOGGLE_ID)) {
      toggle = data.get(SB4$PET_TOGGLE_ID)
    } else {
      data.putString(SB4$PET_TOGGLE_ID, toggle)
    }
    let cat_list = []
    let wolf_list = []

    cat_list = player.getLevel().getEntities()
      .filterDistance(player.blockPosition(), 5)
      .filterType("minecraft:cat")
      .oneFilter(entity => entity.isOwnedBy(player))
    wolf_list = player.getLevel().getEntities()
      .filterDistance(player.blockPosition(), 5)
      .filterType("minecraft:wolf")
      .oneFilter(entity => entity.isOwnedBy(player))
    let selected

    switch (toggle) {
      case SB4$PET_TOGGLE_WOLF:
        selected = "minecraft:wolf"
        break
      case SB4$PET_TOGGLE_CAT:
        selected = "minecraft:cat"
        break
      case SB4$PET_TOGGLE_ALL:
      default:
        selected = PET_RANDOM.nextBoolean() ? "minecraft:cat" : "minecraft:wolf"
        break
    }
    if (selected == "minecraft:cat") {
      if (cat_list.isEmpty()) {
        SB4$SPAWN_CAT(player)
      } else {
        SB4$SPAWN_CAT_LOOT(server, cat_list.getFirst(), player)
      }
    } else if (selected == "minecraft:wolf") {
      if (wolf_list.isEmpty()) {
        SB4$SPAWN_WOLF(player)
      } else {
        SB4$SPAWN_CAT_LOOT(server, wolf_list.getFirst(), player)
      }
    }
  }
}

function SB4$SPAWN_CAT_LOOT(server, cat, player) {
  let loottable = server.reloadableRegistries().getLootTable("minecraft:gameplay/cat_morning_gift")
  let lootparams = new $LootParams$Builder(cat.getLevel())
    .withParameter($LootContextParams.ORIGIN, cat.position())
    .withParameter($LootContextParams.THIS_ENTITY, cat)
    .create($LootContextParamSets.GIFT)
  loottable.getRandomItems(lootparams).forEach(item => {
    cat["spawnAtLocation(net.minecraft.world.item.ItemStack)"](item)
  });
  player.tell(Text.translate("ftb.event.gift_of_pets.loot",cat.getDisplayName()))
  cat.addEffect(MobEffectUtil.of("minecraft:glowing", 200, 0, true, false))
}

function SB4$SPAWN_CAT(player) {
  if (SB4$CAT_TOTAL_WEIGHT == 0) {
    for (const key in SB4$CAT_KEYS) {
      SB4$CAT_ENTRIES[key] = SB4$CAT_KEYS[key]
      SB4$CAT_TOTAL_WEIGHT += SB4$CAT_ENTRIES[key].weight
      SB4$CAT_ENTRIES[key].weight = SB4$CAT_TOTAL_WEIGHT;
    }
  }

  let index = PET_RANDOM.nextIntBetweenInclusive(0, SB4$CAT_TOTAL_WEIGHT - 1);
  let selection = getAnimalEntry(SB4$CAT_ENTRIES, index)

  let { weight, name, variant, effects, attributes } = SB4$CAT_KEYS[selection]
  player.level.spawnEntity("minecraft:cat", (entity) => {
    entity["moveTo(double,double,double)"](player.x, player.y, player.z)
    entity.tame(player)
    entity.setOrderedToSit(true)
    if (name) {
      let nbt = entity.getNbt()
      nbt.putString("CustomName", name)
      entity.setNbt(nbt)
    }
    if (variant) {
      entity.setVariant(variant)
    } else {
      let cat_variant = PET_RANDOM.nextIntBetweenInclusive(0, SB4$CAT_VARIANTS.length - 1)
      entity.setVariant(SB4$CAT_VARIANTS[cat_variant])
    }

    if (effects) {
      effects.forEach(effect => {
        entity.addEffect(MobEffectUtil.of(effect.id, effect.duration, effect.amplifier, true, false))
      })
    } else {
      entity.addEffect(MobEffectUtil.of("minecraft:glowing", 200, 0, true, false))
    }

    if (attributes) {
      attributes.forEach(attribute => {
        entity.modifyAttribute(attribute.id, "ftb:pet_event", attribute.value, attribute.op)
      })
    }
    entity.setPersistenceRequired()
    entity.setHealth(entity.getMaxHealth())
    if (entity.getCustomName() != null) {
      player.tell(Text.translate("ftb.event.gift_of_pets.spawned_cat.0", entity.getCustomName()))
    } else {
      player.tell(Text.translate("ftb.event.gift_of_pets.spawned_cat.1"))
    }
    
  })
}

function SB4$SPAWN_WOLF(player) {
  if (SB4$WOLF_TOTAL_WEIGHT == 0) {
    for (const key in SB4$WOLF_KEYS) {
      SB4$WOLF_ENTRIES[key] = SB4$WOLF_KEYS[key]
      SB4$WOLF_TOTAL_WEIGHT += SB4$WOLF_ENTRIES[key].weight
      SB4$WOLF_ENTRIES[key].weight = SB4$WOLF_TOTAL_WEIGHT;
    }
  }

  let index = PET_RANDOM.nextIntBetweenInclusive(0, SB4$WOLF_TOTAL_WEIGHT - 1);
  let selection = getAnimalEntry(SB4$WOLF_ENTRIES, index)

  let { weight, name, variant, effects, attributes } = SB4$WOLF_KEYS[selection]
  player.level.spawnEntity("minecraft:wolf", (entity) => {
    entity["moveTo(double,double,double)"](player.x, player.y, player.z)
    entity.tame(player)
    entity.setOrderedToSit(true)
    if (name) {
      let nbt = entity.getNbt()
      nbt.putString("CustomName", name)
      entity.setNbt(nbt)
    }

    if (variant) {
      entity.setVariant(variant)
    } else {
      let wolf_variant = PET_RANDOM.nextIntBetweenInclusive(0, SB4$WOLF_VARIANTS.length - 1)
      entity.setVariant(SB4$WOLF_VARIANTS[wolf_variant])
    }

    if (effects) {
      effects.forEach(effect => {
        entity.addEffect(MobEffectUtil.of(effect.id, effect.duration, effect.amplifier, true, false))
      })
    } else {
      entity.addEffect(MobEffectUtil.of("minecraft:glowing", 200, 0, true, false))
    }
    if (attributes) {
      attributes.forEach(attribute => {
        entity.modifyAttribute(attribute.id, "ftb:pet_event", attribute.value, attribute.op)
      })
    }
    entity.setPersistenceRequired()
    entity.setHealth(entity.getMaxHealth())
    if (entity.getCustomName() != null) {
      player.tell(Text.translate("ftb.event.gift_of_pets.spawned_wolf.0", entity.getCustomName()))
    } else {
      player.tell(Text.translate("ftb.event.gift_of_pets.spawned_wolf.1"))
    }
  })
}

ServerEvents.commandRegistry((event) => {
  let { commands: Commands } = event
  let root = Commands.literal("petEventMode")
  root.then(Commands.literal(`${SB4$PET_TOGGLE_ALL}`).executes((ctx) => {
    let player = ctx.getSource().getPlayerOrException()
    let data = player.getPersistentData()
    data.putString(SB4$PET_TOGGLE_ID, SB4$PET_TOGGLE_ALL)
    player.tell(Text.translate("ftb.event.gift_of_pets.petmode", SB4$PET_TOGGLE_ALL))
    return 1
  }))
    root.then(Commands.literal(`${SB4$PET_TOGGLE_WOLF}`).executes((ctx) => {
    let player = ctx.getSource().getPlayerOrException()
    let data = player.getPersistentData()
    data.putString(SB4$PET_TOGGLE_ID, SB4$PET_TOGGLE_WOLF)
    player.tell(Text.translate("ftb.event.gift_of_pets.petmode", SB4$PET_TOGGLE_WOLF))
    return 1
  }))
    root.then(Commands.literal(`${SB4$PET_TOGGLE_CAT}`).executes((ctx) => {
    let player = ctx.getSource().getPlayerOrException()
    let data = player.getPersistentData()
    data.putString(SB4$PET_TOGGLE_ID, SB4$PET_TOGGLE_CAT)
    player.tell(Text.translate("ftb.event.gift_of_pets.petmode", SB4$PET_TOGGLE_CAT))
    return 1
  }))
  event.register(root)
})