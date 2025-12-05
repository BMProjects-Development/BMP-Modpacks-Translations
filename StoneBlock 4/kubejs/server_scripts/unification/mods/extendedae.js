// priority: 50

ServerEvents.recipes((event) => {

    //Adding more Crushing Recipes to Endo Crystal.
    addRecipeActuallyAdditionsCrushing(event,
        "c:gems/entro",
        [["extendedae:entro_dust", 1]],
        `ftb:actually_additions/crushing/gems/entro`
    );
    addRecipeEnderIOSagMilling(event,
        "c:gems/entro",
        [["extendedae:entro_dust", 1]],
        `ftb:enderio/sag_mill/gems/entro`,
        false /* enableBonus */
    );
    addRecipeImmersiveEngineeringCrusher(event,
        "c:gems/entro",
        [["extendedae:entro_dust", 1]],
        `ftb:immersive/crusher/gems/entro`
    );
    addRecipeOritechPulverizer(event,
        "c:gems/entro",
        [["extendedae:entro_dust", 1]],
        `ftb:oritech/pulverizer/gems/entro`
    );

})