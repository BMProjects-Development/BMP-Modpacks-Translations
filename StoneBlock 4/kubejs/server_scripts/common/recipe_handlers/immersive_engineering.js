// priority: 100000

/**
 * @param {RecipesEventJS} event
 * @param {string} itemInputTag
 * @param {Array} outputItems - Array of [itemID, count?, chance?]
 * @param {string} id
 */
function addRecipeImmersiveEngineeringArcFurnace(event, itemInputTag, outputItems, id) {
  checkRecipeID(id)
  var results = []
  var secondaries = []

  outputItems.forEach(function (entry) {
    if (!entry || !entry[0]) return

    if (entry.length < 3 || entry[2] === undefined) {
      var result = {
        basePredicate: { item: entry[0] }
      }
      if (entry[1] !== undefined) result.count = entry[1]
      results.push(result)
    }

    if (entry.length > 2 && entry[2] !== undefined) {
      secondaries.push({
        chance: entry[2],
        output: { item: entry[0] }
      })
    }
  })

  event
    .custom({
      type: "immersiveengineering:arc_furnace",
      input: { tag: itemInputTag },
      additives: [],
      results: results,
      secondaries: secondaries,
      energy: 51200,
      time: 100
    })
    .id(id)
}

/**
 * @param {RecipesEventJS} event
 * @param {string} itemInputTag
 * @param {Array} outputItems - Array of [itemID, count?, chance?]
 * @param {string} id
 */
function addRecipeImmersiveEngineeringCrusher(event, itemInputTag, outputItems, id) {
  checkRecipeID(id)
  var result = {}
  var secondaries = []

  outputItems.forEach(function (entry, index) {
    if (!entry || !entry[0]) return

    if (index === 0 || entry.length < 3 || entry[2] === undefined) {
      result.id = entry[0]
      if (entry[1] !== undefined) result.count = entry[1]
    }

    if (entry.length > 2 && entry[2] !== undefined) {
      secondaries.push({
        chance: entry[2],
        output: { item: entry[0] }
      })
    }
  })

  event
    .custom({
      type: "immersiveengineering:crusher",
      input: { tag: itemInputTag },
      result: result,
      secondaries: secondaries,
      energy: 3200
    })
    .id(id)
}

function addRecipeIEMetalPressWire(event, itemInputTag, output, mold, id) {
  checkRecipeID(id)

  const [itemID, count] = output

  let input
  if (Array.isArray(itemInputTag)) {
    input = {
      basePredicate: {
        tag: itemInputTag[0]
      },
      count: itemInputTag[1] ?? 1
    }
  } else {
    input = {
      tag: itemInputTag
    }
  }

  event
    .custom({
      type: "immersiveengineering:metal_press",
      energy: 2400,
      input: input,
      mold: mold,
      result: {
        item: itemID,
        count: count ?? 1
      }
    })
    .id(id)
}

/**
 * @param {RecipesEventJS} event
 * @param {Array} input0 - [tag, amount]
 * @param {Array} input1 - [tag, amount]
 * @param {Array} outputItems - Array of [tag, count]
 * @param {string} id
 */
function addRecipeImmersiveEngineeringAlloy(event, input0, input1, outputItems, id) {
  checkRecipeID(id)

  event
    .custom({
      type: "immersiveengineering:alloy",
      input0: { tag: input0[0], count: input0[1] ?? 1 },
      input1: { tag: input1[0], count: input1[1] ?? 1 },
      result: {
        id: outputItems[0],
        count: outputItems[1] ?? 1
      }
    })
    .id(id)
}
