if (Platform.isLoaded("simplyswords")) {
    ServerEvents.recipes((event) => {

        //Fixing Simply Swords Recipe Conflicts.
        const simply_iron_recipes = ["simplyswords:iron_spear", "simplyswords:iron_sai", "simplyswords:iron_rapier"];
        simply_iron_recipes.forEach(recipe => {
            event.replaceInput({ id: recipe }, "minecraft:iron_ingot", "ftbmaterials:iron_plate");
        });
        event.replaceInput({ id: "simplyswords:diamond_spear" }, "minecraft:diamond", "ftbmaterials:diamond_plate");

    });
};

  