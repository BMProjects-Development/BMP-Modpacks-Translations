const plateEntries = [
  { metal: "bronze", plate: "ftbmaterials:bronze_plate" },
  { metal: "constantan", plate: "ftbmaterials:constantan_plate" },
  { metal: "electrum", plate: "ftbmaterials:electrum_plate" },
  { metal: "invar", plate: "ftbmaterials:invar_plate" },
  { metal: "lead", plate: "ftbmaterials:lead_plate" },
  { metal: "nickel", plate: "ftbmaterials:nickel_plate" },
  { metal: "steel", plate: "ftbmaterials:steel_plate" },
  { metal: "zinc", plate: "ftbmaterials:zinc_plate" },
  { metal: "brass", plate: "ftbmaterials:brass_plate" },
];

ServerEvents.recipes((event) => {
  event
    .shaped("mekanism:portable_qio_dashboard", ["III", "ILI", "IEI"], {
      L: "mekanism:qio_dashboard",
      E: "mekanism:teleportation_core",
      I: "#c:ingots/fortron_infused",
    })
    .id("ftb:crafting/portable_qio_dashboard");

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
  event
    .custom({
      type: "mekanism:nucleosynthesizing",
      chemical_input: {
        amount: 10000,
        chemical: "mekanism:antimatter",
      },
      duration: 10000,
      item_input: {
        count: 1,
        item: "chicken_roost:c_neutron",
      },
      output: {
        count: 1,
        id: "chicken_roost:c_antimatter",
      },
      per_tick_usage: false,
    })
    .id("ftb:mekanism/nucleosynthesizing");

  plateEntries.forEach((e) => {
    event
      .custom({
        type: "mekanism:compressing",
        chemical_input: { amount: 1, chemical: "mekanism:hydrogen" },
        item_input: { count: 1, tag: `c:ingots/${e.metal}` },
        output: { count: 1, id: e.plate },
        per_tick_usage: true,
      })
      .id(`ftb:mekanism/compressing/plates/${e.metal}`);
  });
});
