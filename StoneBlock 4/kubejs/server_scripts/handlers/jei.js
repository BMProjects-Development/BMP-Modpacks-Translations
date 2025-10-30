// priority: 992

// Remove categories (yours unchanged)
RecipeViewerEvents.removeCategories((event) => {
  const removeCategories = [];
  removeCategories.forEach((catid) => event.remove(catid));
});

// Existing single-line item info
const itemInfoPairs = [
  { items: ["ftb:clapple"], langKey: "ftb.tooltip.clapple" },
  {
    items: ['custommachinery:custom_machine_item[custommachinery:machine="ftb:neutron_activator"]'],
    langKey: "ftb.tooltip.machine.neutron_activator",
  },
  { items: ["ae2:meteorite_compass"], langKey: "ftb.tooltip.ae2_compass" },
];

const addToJEI = [
  "create:shadow_steel",
  "create:shadow_steel_casing",
  "supplementaries:ash",
];

RecipeViewerEvents.addEntries("item", (event) => {
  addToJEI.forEach((item) => event.add(item));
});

RecipeViewerEvents.addInformation("item", (event) => {
  itemInfoPairs.forEach((pair) => {
    event.add(pair.items, [Text.translate(pair.langKey)]);
  });
  event.add(/minecraft:.*_bed/, [Text.translate("ftb.tooltip.bed").red()]);
});

RecipeViewerEvents.removeEntries("item", (event) => {
  event.remove(/.*camo_application.*/);
});

// ---------------------------------------------------------------------------
// JEI info pages for Fluid Cows and Feed Items (fixed var names)
// ---------------------------------------------------------------------------

const FEEDABLE_COW_RULES = [
  { item: "minecraft:ender_eye", fluids: ["productivemetalworks:molten_ender"] },
  { item: "chicken_roost:ingot_enderium", fluids: ["productivemetalworks:molten_enderium"] },
  {
    item: "ftb:clapple",
    fluids: [
      "productivemetalworks:molten_copper",
      "productivemetalworks:molten_iron",
      "productivemetalworks:molten_tin",
      "productivemetalworks:molten_zinc",
      "productivemetalworks:molten_lead",
      "productivemetalworks:molten_nickel",
      "productivemetalworks:molten_silver",
      "productivemetalworks:molten_aluminum",
      "productivemetalworks:molten_gold",
      "productivemetalworks:molten_uranium",
      "productivemetalworks:molten_amethyst",
      "productivemetalworks:molten_redstone",
      "productivemetalworks:molten_carbon",
      "productivemetalworks:molten_slime"
    ]
  }
];

// Build lookups
var FLUID_TO_ITEMS = (function () {
  var map = {};
  for (var i = 0; i < FEEDABLE_COW_RULES.length; i++) {
    var rule = FEEDABLE_COW_RULES[i];
    for (var j = 0; j < rule.fluids.length; j++) {
      var f = rule.fluids[j];
      if (!map[f]) map[f] = [];
      if (map[f].indexOf(rule.item) === -1) map[f].push(rule.item);
    }
  }
  return map;
})();

var ITEM_TO_FLUIDS = (function () {
  var map = {};
  for (var i = 0; i < FEEDABLE_COW_RULES.length; i++) {
    var rule = FEEDABLE_COW_RULES[i];
    if (!map[rule.item]) map[rule.item] = [];
    Array.prototype.push.apply(map[rule.item], rule.fluids);
  }
  return map;
})();

function bullet(textComp) {
  return Text.of("• ").gray().append(textComp);
}

// FLUID info pages
RecipeViewerEvents.addInformation("fluid", (event) => {
  for (var fluidId in FLUID_TO_ITEMS) {
    var itemIds = FLUID_TO_ITEMS[fluidId];

    var header = Text.translate("ftb.jei.fluidcow.title").blue();
    var how = Text.translate("ftb.jei.fluidcow.how");
    var madeBy = Text.translate("ftb.jei.fluidcow.made_by");

    var lines = [header, how, madeBy];

    for (var k = 0; k < itemIds.length; k++) {
      var itemId = itemIds[k];
      var itemName = Item.of(itemId).displayName;
      var line = Text.translate("ftb.jei.fluidcow.by_feeding", [itemName]).blue();
      lines.push(bullet(line));
    }

    lines.push(Text.translate("ftb.jei.fluidcow.notes").darkGray());
    event.add(fluidId, lines);
  }
});

// ITEM info pages (feed items)
RecipeViewerEvents.addInformation("item", (event) => {
  for (var itemId in ITEM_TO_FLUIDS) {
    var fluidIds = ITEM_TO_FLUIDS[itemId]; // ⟵ renamed from 'fluids' to avoid redeclaration

    var title = Text.translate("ftb.jei.feeditem.title").gold();
    var desc = Text.translate("ftb.jei.feeditem.desc");
    var makes = Text.translate("ftb.jei.feeditem.makes");

    var lines = [title, desc, makes];

    for (var m = 0; m < fluidIds.length; m++) {
      var fid = fluidIds[m];
      var fluidName;
      try {
        fluidName = Fluid.of(fid).displayName;
      } catch (e) {
        var path = (fid.split(":")[1] || fid).replace(/_/g, " ");
        fluidName = Text.of(path.charAt(0).toUpperCase() + path.slice(1));
      }
      var line = Text.translate("ftb.jei.feeditem.makes_line", [fluidName]).gray();
      lines.push(bullet(line));
    }

    lines.push(Text.translate("ftb.jei.feeditem.notes.consume"));
    if (itemId === "ftb:clapple") {
      lines.push(Text.translate("ftb.jei.feeditem.notes.weighted"));
    }

    event.add(itemId, lines);
  }
});

// (optional) subtype hook
RecipeViewerEvents.registerSubtypes("item", (event) => {
  // event.useComponents('minecraft:stone_sword', 'custom_data')
});
