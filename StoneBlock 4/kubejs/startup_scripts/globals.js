// ---- Item→fluid rules ----
// Any entry can use exactly one of:
// - fluid: "ns:id"
// - fluids: ["ns:id", ...]  unweighted random
// - weighted: [{id:"ns:id", weight:n}, ...]
global.COW_TRANSMUTE_RULES = [
  { item: "minecraft:ender_eye", fluid: "productivemetalworks:molten_ender" },
  { item: "minecraft:blaze_rod", fluid: "minecraft:lava" },
  { item: "appflux:insulating_resin", fluid: "industrialforegoing:latex" },
  {
    item: "chicken_roost:ingot_enderium",
    fluid: "productivemetalworks:molten_enderium",
  },

  {
    item: "ftb:clapple",
    weighted: [
      // common base metals
      { id: "productivemetalworks:molten_copper", weight: 20 },
      { id: "productivemetalworks:molten_iron", weight: 18 },
      { id: "productivemetalworks:molten_tin", weight: 14 },
      { id: "productivemetalworks:molten_zinc", weight: 14 },
      { id: "productivemetalworks:molten_lead", weight: 12 },

      // mid-tier
      { id: "productivemetalworks:molten_nickel", weight: 10 },
      { id: "productivemetalworks:molten_silver", weight: 8 },
      { id: "productivemetalworks:molten_aluminum", weight: 8 },
      { id: "productivemetalworks:molten_slime", weight: 9 },

      // rarer
      { id: "productivemetalworks:molten_gold", weight: 4 },
      { id: "productivemetalworks:molten_uranium", weight: 3 },
      { id: "productivemetalworks:molten_amethyst", weight: 2 },
      { id: "productivemetalworks:molten_redstone", weight: 6 },
      { id: "productivemetalworks:molten_carbon", weight: 6 },
    ],
  },
];

if (!global.noteStateMap) {
    global.noteStateMap = {};
  }
