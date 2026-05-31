// priority: 100002

/**
 * Adds a Draconic Evolution Fusion Crafting recipe
 *
 * @param {RecipesEventJS} event - recipeEvent
 * @param {string|object} catalyst - item or tag for the catalyst
 * @param {Array<(string|[string|object, boolean?])>} ingredients - each ingredient can be:
 *   - "itemID" or "#tag" (defaults to consume: true)
 *   - [ "itemID" or "#tag", consume? ]
 *   - object (already formatted)
 * @param {string|[string, number]} result - output item or [item, count]
 * @param {string} techLevel - draconic evolution tech level (basic/wyvern/draconic/chaotic)
 * @param {number} totalEnergy - energy cost
 * @param {string} id - recipeID
 */
function addRecipeDraconicFusion(event, catalyst, ingredients, result, techLevel, totalEnergy, id) {
  checkRecipeID(id)

  // handle result
  var resultData = Array.isArray(result) ? { id: result[0], count: result[1] || 1 } : { id: result, count: 1 }

  // handle catalyst
  var catalystObj = typeof catalyst === "string" ? (isTag(catalyst) ? { tag: catalyst } : { item: catalyst }) : catalyst

  // handle ingredients
  var ingObjs = ingredients.map(function (ing) {
    var ingredient
    var consume = true

    if (Array.isArray(ing)) {
      var ingVal = ing[0]
      consume = ing[1] !== undefined ? ing[1] : true
      ingredient = typeof ingVal === "string" ? (isTag(ingVal) ? { tag: ingVal } : { item: ingVal }) : ingVal
    } else if (typeof ing === "string") {
      ingredient = isTag(ing) ? { tag: ing } : { item: ing }
    } else {
      ingredient = ing
    }

    return { consume: consume, ingredient: ingredient }
  })

  event
    .custom({
      type: "draconicevolution:fusion_crafting",
      catalyst: catalystObj,
      ingredients: ingObjs,
      result: resultData,
      techLevel: techLevel,
      totalEnergy: totalEnergy
    })
    .id(id)
}
