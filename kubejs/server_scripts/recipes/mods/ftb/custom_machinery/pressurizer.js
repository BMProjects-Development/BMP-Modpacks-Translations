ServerEvents.recipes((event) => {
  event.recipes.custommachinery
    .custom_machine("ftb:steam_pressurizer", 1) // process time: 1 tick
    .requireFluid("10000x oritech:still_steam") // fluid input
    .requireTempCelsius("(110,)")     
    .produceChemicalPerTick("100000x mekanism:steam"); // chemical output
console.log("Added Steam Pressurizer recipe: 10000mb still_steam -> 100000 chemical mekanism:steam in 1 tick @256 FE/t");

  event.recipes.custommachinery
    .custom_machine("ftb:steam_pressurizer", 5) // process time: 5 ticks
    .requireFluid("100x sauce:source_fluid") // fluid input
    .requireTempCelsius("(110,)")     
    .produceChemicalPerTick("100x starbunclemania:source_gas"); // chemical output

console.log("Added Steam Pressurizer recipe: 100mb sauce:source_fluid -> 100 chemical starbunclemania:source_gas in 5 ticks @256 FE/t");

});
