// server_scripts/recipes/mods/chipped.js
ServerEvents.recipes(event => {
    //Tweaking Chipped's Chisel Recipe to not consume the Table.
    event.remove({ id: "chipped:chisel" })
    event.shapeless("chipped:chisel", [
        "#c:ingots/iron",
        "chipped:mason_table"
    ]).replaceIngredient("chipped:mason_table", "chipped:mason_table").id(`ftb:chipped_chisel`);
});
  