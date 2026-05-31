/**
 * Adds stonecutting recipes that convert each item into all the others in the list.
 *
 * @param {Internal.RecipesEventJS} event - The recipe event from ServerEvents.recipes.
 * @param {string[]} blocks - Array of item or block IDs.
 * @param {string} baseId - Base recipe ID (e.g., "ftb:transmute/biomass").
 */
function addRecipeMinecraftStonecutter(event, blocks, baseId) {
  blocks.forEach((from, i) => {
    const to = blocks.slice(0, i).concat(blocks.slice(i + 1));
    to.forEach(out => {
      const id = `${baseId}/${from.replace(":", "/")}_to_${out.replace(":", "/")}`;
      checkRecipeID(id);
      event.stonecutting(out, from).id(id);
    });
  });
}

