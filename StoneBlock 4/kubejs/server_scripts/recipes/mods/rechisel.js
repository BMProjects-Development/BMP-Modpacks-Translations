ServerEvents.recipes((event) => {
    
    //Fixing The Chisel Conflicting Recipe
    event.shaped(Item.of("rechiseled:chisel", 1), ["  I", " I ", "S  "], {
        I: "#c:ingots/iron",
        S: "#c:rods/wooden",
    }).id("ftb:rechiseled/chisel");

});
