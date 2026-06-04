// priority: 50000



function $WeightedEntryJS(data, weight) {
  this.data = data;

  if (!weight instanceof Number) {
    throw new Error("");
  }

  if (!Number.isInteger(weight)) {
    throw new Error("");
  }

  if (weight < 0) {
    throw new Error("");
  }
  
  this.weight = weight;
}

$WeightedEntryJS.prototype.getWeight = function() {
  return this.weight;
}

$WeightedEntryJS.prototype.getData = function() {
  return this.data;
}

$WeightedEntryJS.fromJsonArray = function (json) {
  let list = []
  for (let item of json) {
    let entries = Object.entries(item)
    if (entries.length != 2) {
      throw new Error("");
    }
    let weight = entries.find((value)=>value[0] == "weight")[1]
    let data = entries.find((value)=>value[0] != "weight")[1]
    list.push(new $WeightedEntryJS(data, weight))
  }
  return list;
}

function $WeightedRandomJS() {

}


$WeightedRandomJS.getRandomItem = function(random, entries) {
  return this.getRandomEntry(random, entries, this.getTotalWeight(entries)).data
}

$WeightedRandomJS.getRandomEntry = function(random, entries, totalWeight) {
  if (totalWeight < 0) {
    throw new Error("");
  } else if (totalWeight == 0) {
    return null;
  } else {
    let i = random.nextInt(totalWeight);
    return this.getWeightedItem(entries, i);
  }
}

$WeightedRandomJS.getWeightedItem = function(entries, index) {
  let weightedIndex = new Number(index);

  for (let entry of entries) {
    weightedIndex -= entry.getWeight();
    if (weightedIndex < 0) {
      return entry;
    }
  }

  return null;
}

$WeightedRandomJS.getTotalWeight = function(entries) {
  let weight = 0;

  for (let entry of entries) {
    if (!entry instanceof $WeightedEntryJS) {
      throw new Error("");
    }
    weight += entry.getWeight()
  }
  return weight;
}