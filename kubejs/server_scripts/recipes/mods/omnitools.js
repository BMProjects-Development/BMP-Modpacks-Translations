ServerEvents.recipes((event) => {

    //Omniwrench
    event.shaped(Item.of("omnitools:omni_wrench"),
        ["FCF", "EDM", " R "], {
        C: "create:wrench",
        E: "enderio:yeta_wrench",
        M: "mekanism:configurator",
        R: "rftoolsbase:smartwrench",
        F: "#c:gems/fluix",
        D: "#c:gears/diamond"
    }).id("omnitools:crafting/omni_wrench");

    //Omnivajra
    event.shaped(Item.of("omnitools:omni_vajra"),
        ["SE ", "EDE", " EN"], {
        S: "actuallyadditions:ender_star",
        D: "mekanism:atomic_disassembler[mekanism:energy={energy_containers:[L;1000000L]}]",
        E: "#c:ingots/enderium",
        N: "#c:ingots/netherite",
    }).id("omnitools:crafting/omni_vajra");

});
  