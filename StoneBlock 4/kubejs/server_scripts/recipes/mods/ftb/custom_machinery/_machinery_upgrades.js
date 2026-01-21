CustomMachineryEvents.upgrades(event => {

  event.create(Item.of("ae2:speed_card"))
    .machine("ftb:circuit_fabricator")
    .modifier(CMRecipeModifierBuilder.expInput('custommachinery:energy', 3))
    .modifier(CMRecipeModifierBuilder.expInput('custommachinery:speed', 0.4).min(1))
    .tooltip(Text.translate("ftb.tooltip.circuit_fabricator.overclock_upgrade"))

  event.create(Item.of("draconicevolution:wyvern_core"), 16)
    .machine("ftb:world_engine")
    .modifier(CMRecipeModifierBuilder.addInput("custommachinery:speed", 0))
    .component(CMComponentModifierBuilder.add("custommachinery:energy", "", 50000).target("capacity"))
    .tooltip(Text.translate("ftb.tooltip.world_engine.wyvern_energy_upgrade"))

  event.create(Item.of("draconicevolution:awakened_core"), 16)
    .machine("ftb:world_engine")
    .modifier(CMRecipeModifierBuilder.addInput("custommachinery:speed", 0))
    .component(CMComponentModifierBuilder.add("custommachinery:energy", "", 187500).target("capacity"))
    .tooltip(Text.translate("ftb.tooltip.world_engine.awakened_energy_upgrade"))

  event.create(Item.of("draconicevolution:chaotic_core"), 16)
    .machine("ftb:world_engine")
    .modifier(CMRecipeModifierBuilder.addInput("custommachinery:speed", 0))
    .component(CMComponentModifierBuilder.add("custommachinery:energy", "", 500000).target("capacity"))
    .tooltip(Text.translate("ftb.tooltip.world_engine.chaotic_energy_upgrade"))

event.create(Item.of("mekanism:upgrade_speed"), 64)
      .machine("ftb:advanced_empowerer")
      .modifier(CMRecipeModifierBuilder.expInput('custommachinery:energy', 1.03))
      .modifier(CMRecipeModifierBuilder.expInput('custommachinery:speed', 0.94).min(1))
      .tooltip(Text.translate("ftb.tooltip.advanced_empowerer.speed_upgrade"))
})