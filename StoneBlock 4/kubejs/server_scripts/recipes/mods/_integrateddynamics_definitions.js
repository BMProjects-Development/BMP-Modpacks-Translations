/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} itemInputTagName - itemTag
 * @param {Array<[string, number?, number?]>} outputItems
 * - itemID: string
 * - count?: number (default 1)
 * - chance?: number (0.0 - 1.0, optional)
 * @param {string} id - recipeID
 */
function addRecipeIntegratedDynamicsMechanicalSqueezer(
	event,
	itemInputTagName,
	outputItems,
	id
) {
	checkRecipeID(id);
	const outputs = outputItems.map(function (entry) {
		var itemID = entry[0];
		var count = entry.length > 1 ? entry[1] : 1;
		var chance = entry.length > 2 ? entry[2] : undefined;

		var output = { item: { id: itemID } };
		if (count !== 1) output.item.count = count;
		if (chance !== undefined) output.chance = chance;

		return output;
	});

	event
		.custom({
			type: "integrateddynamics:mechanical_squeezer",
			input_item: {
				tag: itemInputTagName
			},
			output_items: outputs,
			duration: 40
		})
		.id(id);
}

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} itemInputTagName - itemTag (e.g. 'c:ores/coal')
 * @param {Array<[string, number?, number?]>} outputItems
 * - itemID: string (e.g. 'minecraft:coal')
 * - count?: number (default 1)
 * - chance?: number (0.0 - 1.0, optional)
 * @param {string} id - recipeID
 */
function addRecipeIntegratedDynamicsSqueezer(
	event,
	itemInputTagName,
	outputItems,
	id
) {
	checkRecipeID(id);
	const outputs = outputItems.map(function (entry) {
		var itemID = entry[0];
		var count = entry.length > 1 ? entry[1] : 1;
		var chance = entry.length > 2 ? entry[2] : undefined;

		var output = { item: { id: itemID } };
		if (count !== 1) output.item.count = count;
		if (chance !== undefined) output.chance = chance;

		return output;
	});

	event
		.custom({
			type: "integrateddynamics:squeezer",
			input_item: {
				tag: itemInputTagName
			},
			output_items: outputs
		})
		.id(id);
}
