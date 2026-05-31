// priority: 100002

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} inputItemTag - item tag (e.g., "c:crushed_ores/copper")
 * @param {string | [string, number]} fluidResult - fluid ID or [fluid ID, amount] defaults to 90
 * @param {string} id - recipe ID
 */
function addRecipeProductiveMetalworksItemMeltingRecipe(
	event,
	inputItemTag,
	fluidResult,
	id
) {
	checkRecipeID(id);
	let fluidID;
	let fluidAmount;

	if (typeof fluidResult === "string") {
		fluidID = fluidResult;
		fluidAmount = 90;
	} else {
		fluidID = fluidResult[0];
		fluidAmount = fluidResult[1];
	}

	event
		.custom({
			type: "productivemetalworks:item_melting",
			ingredient: {
				tag: inputItemTag
			},
			minimum_temperature: 1000,
			maximum_temperature: 0,
			result: [
				{
					id: fluidID,
					amount: fluidAmount
				}
			]
		})
		.id(id);
}

// priority: 100002

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} castItem - item ID for the cast (e.g., "productivemetalworks:gear_cast")
 * @param {boolean} consumeCast - whether to consume the cast
 * @param {string} fluidTag - fluid tag (e.g., "c:molten_aluminum")
 * @param {number} fluidAmount - amount of fluid in mB
 * @param {string | [string, number]} resultItem - item ID or [item ID, count] for the output
 * @param {string} id - recipe ID
 */
function addRecipeProductiveMetalworksBlockCastingRecipe(
	event,
	castItem,
	consumeCast,
	fluidTag,
	fluidAmount,
	resultItem,
	id
) {
	checkRecipeID(id);

	let resultID;
	let resultCount;

	if (typeof resultItem === "string") {
		resultID = resultItem;
		resultCount = 1;
	} else {
		resultID = resultItem[0];
		resultCount = resultItem[1];
	}

	event
		.custom({
			type: "productivemetalworks:block_casting",
			cast: {
				item: castItem
			},
			consume_cast: consumeCast,
			fluid: {
				tag: fluidTag,
				amount: fluidAmount
			},
			result: {
				id: resultID,
				count: resultCount
			}
		})
		.id(id);
}
