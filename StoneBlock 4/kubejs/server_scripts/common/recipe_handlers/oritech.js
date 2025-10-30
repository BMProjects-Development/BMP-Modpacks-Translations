// priority: 100002

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} itemInputTagName - item tag (e.g. "minecraft:coals")
 * @param {Array<[string, number?, number?]>} outputItems
 * - itemID: string
 * - count?: number (default 1)
 * - chance?: number (0.0 - 1.0, optional — currently ignored by oritech)
 * @param {string} id - recipe ID
 */
function addRecipeOritechGrinder(event, itemInputTagName, outputItems, id) {
  checkRecipeID(id)
  const results = outputItems.map((entry) => {
    const itemID = entry[0]
    const count = entry.length > 1 ? entry[1] : 1

    return {
      id: itemID,
      count: count
    }
  })

  event
    .custom({
      type: "oritech:grinder",
      fluidInput: {
        amount: 0,
        fluid: "minecraft:empty"
      },
      fluidOutput: {
        amount: 0,
        fluid: "minecraft:empty"
      },
      ingredients: [
        {
          tag: itemInputTagName
        }
      ],
      results: results,
      time: 140
    })
    .id(id)
}

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} itemInputTagName - item tag (e.g. "c:clumps/tin")
 * @param {Array<[string, number]>} outputItems - [itemID, count]
 * @param {[string, number]} fluidInput - [fluidID, amount]
 * @param {string} id - recipe ID
 */
function addRecipeOritechCentrifugeFluid(event, itemInputTagName, outputItems, fluidInput, id) {
  checkRecipeID(id)
  const results = outputItems.map((entry) => {
    const itemID = entry[0]
    const count = entry.length > 1 ? entry[1] : 1

    return {
      id: itemID,
      count: count
    }
  })

  const fluidInputData = {
    amount: fluidInput[1],
    fluid: fluidInput[0]
  }

  event
    .custom({
      type: "oritech:centrifuge_fluid",
      fluidInput: fluidInputData,
      fluidOutput: {
        amount: 0,
        fluid: "minecraft:empty"
      },
      ingredients: [
        {
          tag: itemInputTagName
        }
      ],
      results: results,
      time: 300
    })
    .id(id)
}

/**
 *
 * @param {RecipesEventJS} event - recipe event
 * @param {string} itemInputTagName - item tag (e.g., "c:clumps/copper")
 * @param {Array<[string, number?]>} outputItems - each is [itemID, count?]
 * @param {string} id - recipe ID
 */
function addRecipeOritechCentrifugeItem(event, itemInputTagName, outputItems, id) {
  checkRecipeID(id)
  const results = outputItems.map((entry) => {
    const itemID = entry[0]
    const count = entry.length > 1 ? entry[1] : 1

    return {
      id: itemID,
      count: count
    }
  })

  event
    .custom({
      type: "oritech:centrifuge",
      ingredients: [{ tag: itemInputTagName }],
      results: results,
      time: 200
    })
    .id(id)
}

/**
 *
 * @param {RecipesEventJS} event - recipe event
 * @param {Array<string>} inputItems - item IDs (e.g., ["mod:item1", "mod:item2"])
 * @param {Array<[string, number?]>} outputItems - each is [itemID, count?]
 * @param {string} id - recipe ID
 */
function addRecipeOritechAtomicForge(event, inputItems, outputItems, id) {
  checkRecipeID(id)
  const ingredients = inputItems.map((item) => {
    return { item: item }
  })

  const results = outputItems.map((entry) => {
    const itemID = entry[0]
    const count = entry.length > 1 ? entry[1] : 1

    return {
      id: itemID,
      count: count
    }
  })

  event
    .custom({
      type: "oritech:atomic_forge",
      fluidInput: {
        amount: 0,
        fluid: "minecraft:empty"
      },
      fluidOutputs: [],
      ingredients: ingredients,
      results: results,
      time: 20
    })
    .id(id)
}

/**
 * Adds an Oritech pulverizer recipe with support for item or tag input.
 *
 * @param {ServerEvents.Recipes} event - recipe event
 * @param {string} itemInputTagName - item ID or tag (e.g., "c:clumps/copper" or "minecraft:copper_ingot")
 * @param {Array<[string, number?]>} outputItems - array of [itemID, count?]
 * @param {string} id - recipe ID
 */
function addRecipeOritechPulverizer(event, itemInputTagName, outputItems, id) {
  checkRecipeID(id)

  const results = outputItems.map(function (entry) {
    const itemID = entry[0]
    const count = entry.length > 1 ? entry[1] : 1

    return {
      id: itemID,
      count: count
    }
  })

  const input = isTag(itemInputTagName) ? { tag: itemInputTagName } : { item: itemInputTagName }

  event
    .custom({
      type: "oritech:pulverizer",
      fluidInput: {
        amount: 0,
        fluid: "minecraft:empty"
      },
      fluidOutputs: [],
      ingredients: [input],
      results: results,
      time: 200
    })
    .id(id)
}

/**
 *
 * @param {RecipesEventJS} event - recipe event
 * @param {string} itemInputTagName - item tag (e.g. "c:raw_materials/lead")
 * @param {Array<[string, number]>} outputItems - array of [itemID, count]
 * @param {[string, number]} fluidOutput - [fluidID, amount]
 * @param {[string, number]} fluidInput - [fluidID, amount]
 * @param {string} id - recipe ID
 */
function addRecipeOritechRefinery(event, itemInputTagName, outputItems, fluidOutput, fluidInput, id) {
  checkRecipeID(id)

  const results = outputItems.map((entry) => {
    const itemID = entry[0]
    const count = entry.length > 1 ? entry[1] : 1

    return {
      id: itemID,
      count: count
    }
  })

  event
    .custom({
      type: "oritech:refinery",
      fluidInput: {
        fluid: fluidInput[0],
        amount: fluidInput[1]
      },
      fluidOutputs: [
        {
          fluid: fluidOutput[0],
          amount: fluidOutput[1]
        }
      ],
      ingredients: [{ tag: itemInputTagName }],
      results: results,
      time: 200
    })
    .id(id)
}

/**
 * Adds an Oritech foundry recipe with support for item or tag ingredients and input counts.
 *
 * @param {ServerEvents.Recipes} event - recipe event
 * @param {Array<[string, number?]>} inputTagsOrItems - array of [tagOrItem, count?] (e.g., [["c:ingots/gold", 2], ["c:dusts/redstone", 1]])
 * @param {Array<[string, number?]>} outputItems - array of [itemID, count?]
 * @param {string} id - recipe ID
 */
function addRecipeOritechFoundry(event, inputTagsOrItems, outputItems, id) {
  checkRecipeID(id)

  const ingredients = inputTagsOrItems.map(([entry, count]) => {
    const ingredient = isTag(entry) ? { tag: entry } : { item: entry }
    if (count !== undefined) ingredient.count = count
    return ingredient
  })

  const results = outputItems.map(([itemID, count]) => ({
    id: itemID,
    count: count ?? 1
  }))

  event
    .custom({
      type: "oritech:foundry",
      fluidInput: { amount: 0, fluid: "minecraft:empty" },
      fluidOutputs: [],
      ingredients: ingredients,
      results: results,
      time: 200
    })
    .id(id)
}
