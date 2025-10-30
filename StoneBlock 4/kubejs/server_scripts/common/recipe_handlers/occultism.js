// priority: 100002

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} ingredientTag - itemTag
 * @param {string} oreID - output itemID
 * @param {number} weight - weight (0.0 - 1.0)
 * @param {string} id - recipeID
 */
function addRecipeOccultismMiner(event, ingredientTag, oreID, weight, id) {
	checkRecipeID(id);
	event
		.custom({
			type: "occultism:miner",
			ingredient: {
				tag: ingredientTag
			},
			result: {
				type: "occultism:weighted_item",
				stack: {
					count: 1,
					id: oreID
				},
				weight: weight
			}
		})
		.id(id);
}

/**
 * Adds an Occultism crushing recipe that outputs a single item.
 *
 * @param {ServerEvents.Recipes} event - recipe event
 * @param {string} inputTag - the input tag (e.g., "c:clumps/aluminum")
 * @param {string | [string, number]} outputItem - item ID/Tag or [item ID/Tag, count]
 * @param {string} id - the recipe ID
 */
function addRecipeOccultismCrushing(event, inputTag, outputItem, id) {
	checkRecipeID(id);

	const [outputId, count] = Array.isArray(outputItem)
		? [outputItem[0], outputItem[1] ?? 1]
		: [outputItem, 1];

	// Tag detection
	const isTag =
		outputId.startsWith("#") || outputId.startsWith(`${global.tagPrefix}:`);
	const tagName = outputId.startsWith("#") ? outputId.slice(1) : outputId;

	let result;

	if (isTag) {
		// Check if the tag has any items
		if (Ingredient.of(`#${tagName}`).stacks.empty) {
			console.warn(`[Occultism Crushing] Skipped missing tag: ${tagName}`);
			return;
		}

		result = {
			type: "occultism:tag",
			tag: tagName,
			count: count
		};
	} else {
		// Check if the output is a valid item
		if (Item.of(outputId).isEmpty()) {
			console.warn(`[Occultism Crushing] Skipped invalid item: ${outputId}`);
			return;
		}

		result = {
			type: "occultism:item",
			item: outputId,
			count: count
		};
	}

	event
		.custom({
			type: "occultism:crushing",
			ingredient: {
				tag: inputTag
			},
			result: result
		})
		.id(id);
}
