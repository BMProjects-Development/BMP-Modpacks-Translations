ServerEvents.recipes((event) => {

    //Making the Tesseract Recipe Similar to TE 4, but without a Core.
    
    //1: Frame Recipe
    event.shaped("ftb:tesseract", ["EGE", "GDG", "EGE"], {
        E: "#c:ingots/enderium",
        G: "#c:glass_blocks/fused_quartz",
        D: "#c:gems/diamond"
    }).id("ftb:shaped/tesseract_frame");

    //2: Tesseract Itself
    addRecipeProductiveMetalworksBlockCastingRecipe(
      event,
      "ftb:tesseract",
      true,
      "c:molten_ender",
      900,
      "tesseract:tesseract",
      "ftb:productivemetalworks/casting/tesseract"
    );

    //3: Also Adding to the FTB Chiller
    event.custom({
      type: "ftbstuff:supercooler",
      energy: {
        fe_per_tick: 300,
        ticks_to_process: 160
      },
      fluid: {
        amount: 900,
        fluid: "productivemetalworks:molten_ender"
      },
      inputs: [
        {
          item: "ftb:tesseract"
        }
      ],
      result: {
        count: 1,
        id: "tesseract:tesseract"
      }
    }).id("ftb:ftbstuff/supercooler/tesseract");

});
  