ServerEvents.recipes((event) => {
  event
    .shaped("mekanism_lasers:ore_generator", ["IGI", "FLF", "IEI"], {
      F: "#c:ingots/fortron_infused",
      G: "#c:glass_blocks",
      L: "mekanism_lasers:elite_laser",
      E: "mekanism_lasers:energy_transformer",
      I: "#c:ingots/iron",
    })
    .id("ftb:crafting/ore_generator");

  event
    .custom({
      type: "mekanism:crushing",
      input: { count: 1, tag: "c:dusts/charcoal" },
      output: { count: 2, id: "minecraft:black_dye" },
    })
    .id("ftb:mekanism_crushing/black_dye");
  event
    .custom({
      type: "mekanism:crushing",
      input: { count: 1, tag: "c:dusts/coal" },
      output: { count: 2, id: "minecraft:black_dye" },
    })
    .id("ftb:mekanism_crushing/black_dye2");

  //Antimatter Chicken
  event.custom({
    "type":"mekanism:nucleosynthesizing",
    "chemical_input": {
      "amount": 10000,
      "chemical":"mekanism:antimatter"
    },
    "duration": 10000,
    "item_input": {
      "count": 1,
      "item": "chicken_roost:c_neutron"
    },
    "output": {
      "count": 1,
      "id": "chicken_roost:c_antimatter"
    },
    "per_tick_usage":false
  }).id("ftb:mekanism/nucleosynthesizing");

});
