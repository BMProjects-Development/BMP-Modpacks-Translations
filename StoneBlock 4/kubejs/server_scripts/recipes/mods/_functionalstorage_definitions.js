// priority: 100000

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string | [string, number]} higherInput - compacted form (e.g., 'minecraft:packed_ice' or ['minecraft:packed_ice', 1])
 * @param {string | [string, number]} lowerInput - decomposed form (e.g., 'minecraft:ice' or ['minecraft:ice', 9])
 * @param {string} id - recipeID
 */
function addFunctionalStorageCompactingRecipe(
	event,
	lowerInput,
	higherInput,
	id
) {
	checkRecipeID(id);
	let [higherID, higherCount] = Array.isArray(higherInput)
		? [higherInput[0], higherInput[1] ?? 1]
		: [higherInput, 1];

	let [lowerID, lowerCount] = Array.isArray(lowerInput)
		? [lowerInput[0], lowerInput[1] ?? 9]
		: [lowerInput, 9];

	event
		.custom({
			type: "functionalstorage:custom_compacting",
			higher_input: {
				id: higherID,
				count: higherCount
			},
			lower_input: {
				id: lowerID,
				count: lowerCount
			}
		})
		.id(id);
}
