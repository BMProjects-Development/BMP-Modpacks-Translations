ServerEvents.recipes((event) => {
  event
    .shaped("psi:cad_assembler", ["OCO", "FIF", "OOO"], {
      O: "#c:plates/obsidian",
      F: "#c:ingots/fortron_infused",
      I: "xycraft_world:immortal_stone_dark",
      C: "appflux:energy_processor",
    })
    .id("ftb:crafting/psi/cad_assembler");

    
  event
    .shaped("psi:programmer", ["OCO", "FIF", "OOO"], {
      O: "#c:plates/obsidian",
      F: "#c:ingots/fortron_infused",
      I: "computercraft:disk",
      C: "appflux:energy_processor",
    })
    .id("ftb:crafting/psi/programmer");

});
