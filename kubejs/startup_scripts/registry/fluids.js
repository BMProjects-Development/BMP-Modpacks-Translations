// const $KubeFluidType = Java.loadClass("dev.latvian.mods.kubejs.fluid.FluidTypeBuilder")
StartupEvents.registry("fluid", (event) => {

    // event.create("ftb:molten_lead_platinum_alloy")
    //     .tint(0x45B5BA)
    //     .stillTexture("ftb:fluid/thick_fluid_still")      
    //     .flowingTexture("ftb:fluid/thick_fluid_flow")

    event.create("ftb:molten_shibuichi")
        .tint(0xFFEBEB)
        .stillTexture("ftb:fluid/thick_fluid_still")      
        .flowingTexture("ftb:fluid/thick_fluid_flow")

    event.create("ftb:molten_tin_silver_alloy")
        .tint(0xEBFFFD)
        .stillTexture("ftb:fluid/thick_fluid_still")      
        .flowingTexture("ftb:fluid/thick_fluid_flow")

    event.create("ftb:molten_chaos")
        .tint(0x0A0012)
        .stillTexture("ftb:fluid/thick_fluid_still")      
        .flowingTexture("ftb:fluid/thick_fluid_flow")

});
  