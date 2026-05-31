ServerEvents.recipes((event) => {

    //Fixing Wired Modem Conflict with Futura Block from Chisel.
    event.replaceInput({ id: "computercraft:wired_modem" }, "minecraft:redstone", "minecraft:comparator");
    
});
