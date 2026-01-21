// priority: 800
const SB4$STICKY_RANDOM = Utils.getRandom().fork()

const SB4$STICKY_KEYS = {
  "nyxane_non_stick": {
    type: "attributes",
    min: 0,
    max: 1,
    amount: 1,
    deviation: 0,
    operation: "add_value",
    attribute: "neoforge:creative_flight",
    weight: 5
  },
  "plastic_bag": {
    type: "attributes",
    min: 0.01,
    max: 2.5,
    amount: 0,
    deviation: 2.5,
    operation: "add_multiplied_base",
    attribute: "minecraft:generic.armor",
    weight: 5
  },
  "all_bark_no_bite": {
    type: "attributes",
    min: 0.5,
    max: 20,
    amount: 1,
    deviation: 20,
    operation: "add_value",
    attribute: "minecraft:generic.armor",
    weight: 5
  },
  "sticky": {
    type: "attributes",
    min: -0.001,
    max: -0.1,
    amount: 0,
    deviation: 0.1,
    operation: "add_value",
    attribute: "minecraft:generic.movement_speed",
    weight: 5
  },
  "gravity": {
    type: "attributes",
    min: -1,
    max: 1,
    amount: -1,
    deviation: 2.,
    operation: "add_multiplied_base",
    attribute: "minecraft:generic.gravity",
    weight: 5
  },
  "knockback_resist": {
    type: "attributes",
    min: 0.01,
    max: 0.3,
    amount: 0.15,
    deviation: 0.15,
    operation: "add_multiplied_base",
    attribute: "minecraft:generic.knockback_resistance",
    weight: 5
  },
  "swim_speed": {
    type: "attributes",
    min: 0.01,
    max: 0.5,
    amount: 0.25,
    deviation: 0.25,
    operation: "add_multiplied_base",
    attribute: "neoforge:swim_speed",
    weight: 5
  },
  "mo_exp": {
    type: "attributes",
    min: 0.01,
    max: 1,
    amount: 0.0,
    deviation: 1,
    operation: "add_multiplied_base",
    attribute: "apothic_attributes:experience_gained",
    weight: 5
  },
  "entity_reach": {
    type: "attributes",
    min: 0.01,
    max: 3,
    amount: 0,
    deviation: 3,
    operation: "add_value",
    attribute: "minecraft:player.entity_interaction_range",
    weight: 5
  },
  "no_luck": {
    type: "attributes",
    min: 0.0001,
    max: 0.0001,
    amount: 0.0001,
    deviation: 0,
    operation: "add_multiplied_base",
    attribute: "minecraft:generic.luck",
    weight: 5
  },
  "no_magic": {
    type: "attributes",
    min: 0.0001,
    max: 0.0001,
    amount: 0.0001,
    deviation: 0,
    operation: "add_value",
    attribute: "irons_spellbooks:holy_spell_power",
    weight: 5
  },
  "attack": {
    type: "attributes",
    min: 0.01,
    max: 20,
    amount: 0,
    deviation: 20,
    operation: "add_value",
    attribute: "minecraft:generic.attack_damage",
    weight: 5
  },
  "armor_tough": {
    type: "attributes",
    min: 0.01,
    max: 5,
    amount: 0,
    deviation: 5,
    operation: "add_value",
    attribute: "minecraft:generic.armor_toughness",
    weight: 5
  },
  "knockback_stick": {
    type: "attributes",
    min: 0.01,
    max: 0.3,
    amount: 0,
    deviation: 0.3,
    operation: "add_multiplied_base",
    attribute: "minecraft:generic.attack_knockback",
    weight: 5
  },
  "flatulence": {
    type: "attributes",
    min: 1,
    max: 1,
    amount: 1,
    deviation: 0,
    operation: "add_value",
    attribute: "artifacts:generic.flatulence",
    weight: 5
  },
  "life_steal": {
    type: "attributes",
    min: 0,
    max: 0.2,
    amount: 0.1,
    deviation: 0.1,
    operation: "add_value",
    attribute: "apothic_attributes:life_steal",
    weight: 5
  },
  "block_reach": {
    type: "attributes",
    min: 0.01,
    max: 3,
    amount: 0,
    deviation: 3,
    operation: "add_value",
    attribute: "minecraft:player.block_interaction_range",
    weight: 5
  },
  "scale_big": {
    type: "attributes",
    min: 0.1,
    max: 1.0,
    amount: 0.3,
    deviation: 1,
    operation: "add_value",
    attribute: "minecraft:generic.scale",
    weight: 5
  },
  "scale_small": {
    type: "attributes",
    min: -1.0,
    max: -0.1,
    amount: -0.3,
    deviation: 1,
    operation: "add_value",
    attribute: "minecraft:generic.scale",
    weight: 5
  },
  "elytra_fly": {
    type: "attributes",
    min: 0.0,
    max: 1.0,
    amount: 1,
    deviation: 0,
    operation: "add_value",
    attribute: "apothic_attributes:elytra_flight",
    weight: 5
  },
  "absorption": {
    type: "attributes",
    min: 1.0,
    max: 20.0,
    amount: 10,
    deviation: 10,
    operation: "add_value",
    attribute: "minecraft:generic.max_absorption",
    weight: 5
  },
  "health": {
    type: "attributes",
    min: 1.0,
    max: 20.0,
    amount: 1,
    deviation: 19,
    operation: "add_value",
    attribute: "minecraft:generic.max_health",
    weight: 5
  }
}

function getItem(entries, index) {
  for (const key in entries) {
    if (index < entries[key].weight) {
      return key
    }
  }
}
let entries = {}
let total_weight = 0
const event_stick = {
  name: "ftb:stick",
  description: "Gives the player a stick with a funny name",
  displayName: "Stick Event",
  chance: 0.2,
  execute(event, player, location) {
    player.tell(Text.translate("ftb.event.stick.text"));

    let sticky_result = Item.of("minecraft:stick")
    let keys = Object.keys(SB4$STICKY_KEYS)

    if (total_weight == 0) {
      for (const key in SB4$STICKY_KEYS) {
        entries[key] = SB4$STICKY_KEYS[key]
        total_weight += entries[key].weight
        entries[key].weight = total_weight;
      }
    }

    let index = SB4$STICKY_RANDOM.nextIntBetweenInclusive(0, total_weight);

    let selection = getItem(entries, index)
    let type = SB4$STICKY_KEYS[selection].type
    sticky_result.setItemName(Text.translate(`ftb.event_system.stick.${selection}`))

    if (SB4$STICKY_KEYS[selection].type == "attributes") {
      let { min, max, amount, deviation, operation, attribute } = SB4$STICKY_KEYS[selection]
      let value = SB4$STICKY_RANDOM.triangle(amount, deviation)

      value = Math.min(value, max)
      value = Math.max(value, min)

      let comp = `[curios:attribute_modifiers={show_in_tooltip:true,modifiers:[{id:"ftb:event_item",amount:${value}d,operation:${operation},type:"${attribute}",slot:stick}]}]`
      sticky_result.applyComponentsAndValidate(comp)
    }

    player.give(sticky_result);
  },
};
