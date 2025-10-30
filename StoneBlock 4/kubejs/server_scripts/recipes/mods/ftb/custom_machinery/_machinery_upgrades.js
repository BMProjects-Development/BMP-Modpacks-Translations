CustomMachineryEvents.upgrades(event => {

    //Adds a Upgrade to the Circuit Fabricator that 2x Energy Costs but 2.5x Reduces the Ticks needed.
    // the minimum amount of ticks that it will reduce to is also set to 20.
    event.create(Item.of("ae2:speed_card"))
        .machine("ftb:circuit_fabricator")
        .modifier(CMRecipeModifierBuilder.expInput('custommachinery:energy', 3))
        .modifier(CMRecipeModifierBuilder.expInput('custommachinery:speed', 0.4).min(1))
    .tooltip(Text.translate("ftb.tooltip.circuit_fabricator.overclock_upgrade"));
})