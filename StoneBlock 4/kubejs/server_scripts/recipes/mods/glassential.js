ServerEvents.recipes((event) => {
    
    //Fixing Luminous Glass Conflicting Recipe
    event.shapeless(Item.of("glassential:glass_light", 2), ["#c:glass_blocks", "#c:glass_blocks", "#c:dusts/glowstone"]).id("ftb:glassential/glass_light");

});
