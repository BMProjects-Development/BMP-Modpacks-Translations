// priority: 100002
/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} inputBlock - blockTag
 * @param {string} oreID - itemID
 * @param {number} weight - ore Weight
 * @param {string} id - recipeID
 */
function addRecipeActuallyAdditionsMiningLens(
	event,
	inputBlock,
	oreID,
	weight,
	id
) {
	checkRecipeID(id);
	event
		.custom({
			type: "actuallyadditions:mining_lens",
			ingredient: {
				item: inputBlock
			},
			result: {
				count: 1,
				id: oreID
			},
			weight: weight
		})
		.id(id);
}

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} itemTag - itemID or tag
 * @param {Array<[string, number?, number?]>} outputItems
 * - itemID
 * - count
 * - weight (0.0 - 1.0)
 * @param {string} id - recipeID
 */
function addRecipeActuallyAdditionsCrushing(event, itemTag, outputItems, id) {
	checkRecipeID(id);

	const ingredient = isTag(itemTag) ? { tag: itemTag } : { item: itemTag };

	const results = outputItems.map(([itemID, count, chance]) => {
		let result = { result: { id: itemID } };
		if (count !== undefined) result.result.count = count;
		if (chance !== undefined) result.chance = chance;
		return result;
	});

	event
		.custom({
			type: "actuallyadditions:crushing",
			ingredient: ingredient,
			result: results
		})
		.id(id);
}
