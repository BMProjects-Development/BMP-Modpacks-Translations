/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} itemInputTag - itemTag
 * @param {Array<[string, number?, number?]>} outputItems
 * - itemID
 * - count
 * - weight (0.0 - 1.0)
 * @param {string} id - recipeID
 */
function addRecipeCreateCrushing(event, itemInputTag, outputItems, id) {
  checkRecipeID(id)
  event
    .custom({
      type: "create:crushing",
      ingredients: [
        {
          tag: itemInputTag
        }
      ],
      processingTime: 400,
      results: outputItems.map(([itemID, count, chance]) => {
        let result = { id: itemID }
        if (count !== undefined) result.count = count
        if (chance !== undefined) result.chance = chance
        return result
      })
    })
    .id(id)
}

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} itemInputTag
 * @param {Array<[string, number?, number?]>} outputItems
 * - itemID
 * - count (optional)
 * - chance (0.0 - 1.0, optional)
 * @param {string} id - recipeID
 */
function addRecipeCreateSplashing(event, itemInputTag, outputItems, id) {
  checkRecipeID(id)
  event
    .custom({
      type: "create:splashing",
      ingredients: [
        {
          tag: itemInputTag
        }
      ],
      results: outputItems.filter(Boolean).map(([itemID, count, chance]) => {
        let result = { id: itemID }
        if (count !== undefined) result.count = count
        if (chance !== undefined) result.chance = chance
        return result
      })
    })
    .id(id)
}

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} itemInputTag - tag to use as input (e.g. "forge:plates/lead")
 * @param {Array<[string, number?]>} outputItems
 * - itemID: string
 * - amount?: number (default 1)
 * @param {string} id - recipe ID
 */
function addRecipeCreateCutting(event, itemInputTag, outputItems, id) {
  checkRecipeID(id)
  event
    .custom({
      type: "create:cutting",
      ingredients: [{ tag: itemInputTag }],
      processingTime: 50,
      results: outputItems.filter(Boolean).map(([itemID, amount]) => ({
        id: itemID,
        amount: amount ?? 1
      }))
    })
    .id(id)
}

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} itemInputTag - tag to use as input (e.g. "forge:ingots/iron")
 * @param {string} outputItems
 * - itemID: string
 * - amount?: number (default 1)
 * @param {string} id - recipe ID
 */
function addRecipeCreatePressing(event, itemInputTag, outputItems, id) {
  checkRecipeID(id)
  event
    .custom({
      type: "create:pressing",
      ingredients: [{ tag: itemInputTag }],
      results: outputItems.filter(Boolean).map(([itemID]) => ({
        id: itemID
      }))
    })
    .id(id)
}

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} itemInputTag - tag to use as input (e.g. "c:ingots/gold")
 * @param {Array<[string, number?]>} outputItems - array of [itemID, amount?] (default 1)
 * @param {string} id - recipe ID
 */
function addRecipeCreateRolling(event, itemInputTag, outputItems, id) {
  checkRecipeID(id)
  event
    .custom({
      type: "createaddition:rolling",
      ingredients: [{ tag: itemInputTag }],
      results: outputItems.filter(Boolean).map(([itemID, amount]) => ({
        id: itemID,
        count: amount || 1
      }))
    })
    .id(id)
}
