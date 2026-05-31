// priority: 100000
/**
 * @param {RecipesEventJS} event
 * @param {string} itemInputTag
 * @param {Array<[string, number?, number?]>} outputItems
 * - itemID
 * - count (optional)
 * - chance (0.0 - 1.0, optional)
 * @param {string} id
 * @param {boolean} bonus
 */
function addRecipeEnderIOSagMilling(event, itemInputTag, outputItems, id, bonus) {
  checkRecipeID(id)
  const outputs = outputItems.map(function ([itemID, count, chance]) {
    var result = {
      chance: chance !== undefined ? chance : 1.0,
      item: {
        id: itemID
      }
    }
    if (count !== undefined) {
      result.item.count = count
    }
    return result
  })

  const recipe = {
    type: "enderio:sag_milling",
    energy: 2400,
    input: { tag: itemInputTag },
    outputs: outputs
  }

  if (bonus === false) {
    recipe.bonus = "none"
  }

  event.custom(recipe).id(id)
}

/**
 * Adds an EnderIO alloy smelting recipe with multiple item or tag inputs.
 *
 * @param {RecipesEventJS} event - recipe event
 * @param {Array<string | [string, number]>} inputs - array of input tags/items or [tag/item, count]
 * @param {string | [string, number]} outputItem - output item ID or [ID, count]
 * @param {string} id - recipe ID
 */
function addRecipeEnderIOAlloySmelting(event, inputs, outputItem, id) {
  checkRecipeID(id)

  const inputObjects = inputs.map((entry) => {
    if (Array.isArray(entry)) {
      const [tagOrItem, count] = entry
      return tagOrItem.startsWith("#") || (tagOrItem.includes(":") && tagOrItem.includes("/"))
        ? { tag: tagOrItem, count: count }
        : { item: tagOrItem, count: count }
    } else {
      return entry.startsWith("#") || (entry.includes(":") && entry.includes("/"))
        ? { tag: entry, count: 1 }
        : { item: entry, count: 1 }
    }
  })

  const outputID = Array.isArray(outputItem) ? outputItem[0] : outputItem
  const outputCount = Array.isArray(outputItem) ? outputItem[1] : 1
  // console.log(outputCount)

  event
    .custom({
      type: "enderio:alloy_smelting",
      energy: 3200,
      experience: 0.3,
      is_smelting: false,
      inputs: inputObjects,
      output: {
        id: outputID,
        count: outputCount
      }
    })
    .id(id)
}
