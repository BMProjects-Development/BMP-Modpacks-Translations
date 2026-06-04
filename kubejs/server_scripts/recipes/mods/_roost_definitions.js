/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} foodTag - food input tag
 * @param {string} leftChickenItem - left chicken item
 * @param {string} rightChickenItem - right chicken item
 * @param {string} id - recipeID
 */
function addRecipeChickenBreeding(event, foodTag, leftChickenItem, rightChickenItem, outputItem, id) {
  checkRecipeID(id)
  event
    .custom({
      type: "chicken_roost:basic_breeding",
      food: { tag: foodTag },
      "left-chicken": { item: leftChickenItem },
      "right-chicken": { item: rightChickenItem },
      time: 20,
      output: { item: outputItem }
    })
    .id(id)
}

/**
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string} foodTag - food input tag
 * @param {string} chickenItem - chicken item
 * @param {string} outputItem - output item
 * @param {number} time - time in ticks
 * @param {string} id - recipeID
 */
function addRecipeChickenRoostOutput(event, foodTag, chickenItem, outputItem, time, id) {
  checkRecipeID(id)
  event
    .custom({
      type: "chicken_roost:roost_output",
      food: { tag: foodTag },
      chicken: { item: chickenItem },
      time: time,
      output: { item: outputItem }
    })
    .id(id)
}
