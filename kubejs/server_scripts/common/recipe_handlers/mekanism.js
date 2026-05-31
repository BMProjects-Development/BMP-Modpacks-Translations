// priority: 100000

/**
 * Create basic injecting recipe
 * @param {RecipesEventJS} event
 * @param {[string, number]} itemInput - [itemTag, count]
 * @param {[string, number]} chemicalInput - [chemicalID, amount]
 * @param {[string, number]} outputItem - [itemID, count]
 * @param {string} id
 */
function addRecipeMekanismInjecting(
	event,
	itemInput,
	chemicalInput,
	outputItem,
	id
) {
	checkRecipeID(id);
	event
		.custom({
			type: "mekanism:injecting",
			item_input: { tag: itemInput[0], count: itemInput[1] },
			chemical_input: { chemical: chemicalInput[0], amount: chemicalInput[1] },
			output: { id: outputItem[0], count: outputItem[1] },
			per_tick_usage: true
		})
		.id(id);
}

/**
 * Create basic purifying recipe
 * @param {RecipesEventJS} event
 * @param {[string, number]} itemInput - [itemTag, count]
 * @param {[string, number]} chemicalInput - [chemicalID, amount]
 * @param {[string, number]} outputItem - [itemID, count]
 * @param {string} id
 */
function addRecipeMekanismPurifying(
	event,
	itemInput,
	chemicalInput,
	outputItem,
	id
) {
	checkRecipeID(id);
	event
		.custom({
			type: "mekanism:purifying",
			item_input: { tag: itemInput[0], amount: itemInput[1] },
			chemical_input: { chemical: chemicalInput[0], amount: chemicalInput[1] },
			output: { id: outputItem[0], count: outputItem[1] },
			per_tick_usage: true
		})
		.id(id);
}

/**
 * Create basic crushing recipe
 * @param {RecipesEventJS} event
 * @param {string} inputItemTag - tag of the input item
 * @param {[string, number]} outputItem - [itemID, count]
 * @param {string} id
 */
function addRecipeMekanismCrushing(event, inputItemTag, outputItem, id) {
	checkRecipeID(id);
	event
		.custom({
			type: "mekanism:crushing",
			input: { tag: inputItemTag, count: 1 },
			output: { id: outputItem[0], count: outputItem[1] }
		})
		.id(id);
}

/**
 * Create basic enriching recipe
 * For KubeJS reasons it needs to say like this
 * @param {any} event KubeJS recipe event
 * @param {string} inputItemTagName
 * @param {amount} inputAmount
 * @param {string} outputItemAmount
 * @param {amount} outputAmount
 * @param {string} id
 */
function addRecipeMekanismEnriching(
	event,
	inputItemTagName,
	inputAmount,
	outputItemAmount,
	outputAmount,
	id
) {
	checkRecipeID(id);
	event
		.custom({
			type: "mekanism:enriching",
			input: {
				count: inputAmount,
				tag: inputItemTagName
			},
			output: {
				count: outputAmount,
				id: outputItemAmount
			}
		})
		.id(id);
}

/**
 * Create basic combining recipe
 * @param {RecipesEventJS} event
 * @param {[string, number]} mainInput - [itemTag, count]
 * @param {[string, number]} extraInput - [itemTag, count]
 * @param {[string, number]} outputItem - [itemID, count]
 * @param {string} id
 */
function addRecipeMekanismCombining(
	event,
	mainInput,
	extraInput,
	outputItem,
	id
) {
	checkRecipeID(id);
	event
		.custom({
			type: "mekanism:combining",
			main_input: { tag: mainInput[0], count: mainInput[1] },
			extra_input: { tag: extraInput[0], count: extraInput[1] },
			output: { id: outputItem[0], count: outputItem[1] }
		})
		.id(id);
}

/**
 * Create basic crystallizing recipe
 * @param {RecipesEventJS} event
 * @param {[string, number]} inputChemical - [chemicalID, amount]
 * @param {[string, number]} outputItem - [itemID, count]
 * @param {string} id
 */
function addRecipeMekanismCrystallizing(event, inputChemical, outputItem, id) {
	checkRecipeID(id);
	event
		.custom({
			type: "mekanism:crystallizing",
			input: { chemical: inputChemical[0], amount: inputChemical[1] },
			output: { id: outputItem[0], count: outputItem[1] }
		})
		.id(id);
}

/**
 * Create basic washing recipe
 * @param {RecipesEventJS} event
 * @param {[string, number]} fluidInput - [fluidTag, amount]
 * @param {[string, number]} chemicalInput - [chemicalID, amount]
 * @param {[string, number]} outputChemical - [chemicalID, amount]
 * @param {string} id
 */
function addRecipeMekanismWashing(
	event,
	fluidInput,
	chemicalInput,
	outputChemical,
	id
) {
	checkRecipeID(id);
	event
		.custom({
			type: "mekanism:washing",
			fluid_input: { tag: fluidInput[0], amount: fluidInput[1] },
			chemical_input: { chemical: chemicalInput[0], amount: chemicalInput[1] },
			output: { id: outputChemical[0], amount: outputChemical[1] }
		})
		.id(id);
}

/**
 * Create basic dissolution recipe
 * @param {RecipesEventJS} event
 * @param {[string, number]} itemInput - [itemTag, count]
 * @param {[string, number]} chemicalInput - [chemicalID, amount]
 * @param {[string, number]} outputChemical - [chemicalID, amount]
 * @param {string} id
 */
function addRecipeMekanismDissolution(
	event,
	itemInput,
	chemicalInput,
	outputChemical,
	id
) {
	checkRecipeID(id);
	event
		.custom({
			type: "mekanism:dissolution",
			item_input: { tag: itemInput[0], count: itemInput[1] },
			chemical_input: { chemical: chemicalInput[0], amount: chemicalInput[1] },
			output: { id: outputChemical[0], amount: outputChemical[1] },
			per_tick_usage: true
		})
		.id(id);
}

/**
 * Create basic smelting recipe
 * @param {RecipesEventJS} event
 * @param {string} inputItemTag - item input tag
 * @param {[string, number]} outputItem - [itemID, count]
 * @param {string} id
 */
function addRecipeMekanismSmelting(event, inputItemTag, outputItem, id) {
	checkRecipeID(id);
	event
		.custom({
			type: "mekanism:smelting",
			input: { tag: inputItemTag, count: 1 },
			output: { id: outputItem[0], count: outputItem[1] }
		})
		.id(id);
}

/**
 * Create a Mekanism painting recipe.
 * @param {RecipesEventJS} event
 * @param {string} input - item ID or tag (prefix with '#' for tag)
 * @param {string} output - output item ID
 * @param {number} color_amount - chemical amount required
 * @param {string} color - color name (e.g. "red", "blue")
 * @param {string} modID - mod ID for namespacing
 */
function addRecipeMekanismPainting(
	event,
	input,
	output,
	color_amount,
	color,
	modID
) {
	var isTag = input.charAt(0) === "#";
	var cleanInput = isTag ? input.substring(1) : input;
	var inputName = cleanInput.split(":")[1];
	var id = `ftb:mekanism/painting/${modID}/${inputName}/${color}`;
	checkRecipeID(id);
	var itemInput = isTag
		? { tag: cleanInput, count: 1 }
		: { item: cleanInput, count: 1 };

	event
		.custom({
			type: "mekanism:painting",
			chemical_input: {
				amount: color_amount,
				chemical: "mekanism:" + color
			},
			item_input: itemInput,
			output: { count: 1, id: output },
			per_tick_usage: false
		})
		.id(id);
}
