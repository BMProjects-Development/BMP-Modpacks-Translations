ServerEvents.recipes((event) => {
  event
    .shaped("rftoolspower:dimensionalcell", ["RPR", "PCP", "RPR"], {
      R: "appflux:charged_redstone",
      P: "ftbmaterials:electrum_plate",
      C: "rftoolspower:dimensionalcell_simple",
    })
    .id("ftb:crafting/dimensionalcell_upgrade");

  event
    .shaped("rftoolsutility:environmental_controller", ["ISI", "FMF", "III"], {
      I: "#c:plates/iron",
      S: "rftoolsbase:information_screen",
      F: "#c:ingots/fortron_infused",
      M: "rftoolsbase:machine_frame",
    })
    .id("ftb:crafting/environmental_controller_upgrade");

  event
    .shaped("rftoolspower:coalgenerator", ["SFS", "GRG", "SMS"], {
      S: "#c:stones",
      F: "minecraft:furnace",
      G: "#c:gears/iron",
      R: "#c:storage_blocks/redstone",
      M: "rftoolsbase:machine_base",
    })
    .id("ftb:crafting/rftrools_coalgenerator");
});
