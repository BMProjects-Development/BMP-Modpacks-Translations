// priority: -10

ServerEvents.recipes((event) => {
  event
    .shaped(Item.of("industrialforegoing:mycelial_culinary", 1), ["BBB", "BCB", "RMR"], {
      B: "#c:crops",
      C: "minecraft:cooked_beef",
      M: "#industrialforegoing:machine_frame/simple",
      R: "minecraft:redstone"
    })
    .id("ftb:industrialforegoing/crafting/mycelial/culinary")

  event
    .shaped(Item.of("industrialforegoing:mycelial_meatallurgic", 1), ["BBB", "BCB", "RMR"], {
      B: "#c:ingots",
      C: "industrialforegoing:meat_bucket",
      M: "#industrialforegoing:machine_frame/supreme",
      R: "minecraft:redstone"
    })
    .id("ftb:industrialforegoing/crafting/mycelial/meatallurgic")
  
    event.custom({
      "type": "industrialforegoing:laser_drill_fluid",
      "catalyst": {
        "item": "industrialforegoing:black_laser_lens"
      },
      "entity_data": {
        "data": {},
        "display": "",
        "entity": {
          "type": "mecrh:ender_chicken"
        }
      },
      "output": {
        "amount": 1,
        "fluid": "ftb:molten_chaos"
      },
      "rarity": [
        {
          "biome_filter": {
            "blacklist": [],
            "whitelist": []
          },
          "depth_max": 256,
          "depth_min": -64,
          "dimension_filter": {
            "blacklist": [],
            "whitelist": []
          },
          "weight": 8
        }
      ]
    }).id('ftb:industrialforegoing/laser_drill/fluid/chaos_ender_chicken')
})
