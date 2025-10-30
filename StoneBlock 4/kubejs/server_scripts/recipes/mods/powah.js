ServerEvents.recipes((event) => {

  event.custom({
      type: "powah:energizing",
      energy: 40000,
      ingredients: [
        {
          item: "ae2:quartz_block"
        }
      ],
      result: {
        count: 4,
        id: "ae2:charged_certus_quartz_crystal"
      }
  }).id("ftb:powah/orb/charged_certus_block");

  event
    .custom({
      type: "powah:energizing",
      energy: 10000,
      ingredients: [
        {
          item: "ae2:certus_quartz_crystal"
        }
      ],
      result: {
        count: 1,
        id: "ae2:charged_certus_quartz_crystal"
      }
  }).id("ftb:powah/orb/charged_certus");

  event.custom({
      type: "powah:energizing",
      energy: 300000,
      ingredients: [
        {
          item: "ftbmaterials:uranium_block"
        }
      ],
      result: {
        count: 1,
        id: "powah:uraninite_block"
      }
  }).id("ftb:powah/orb/uraninite");

  event.custom({
      type: "powah:energizing",
      energy: 180000,
      ingredients: [
        {
          item: "ftbmaterials:nickel_block"
        },
        {
          item: "oritech:fluxite_block"
        }
      ],
      result: {
        count: 1,
        id: "oritech:energite_block"
      }
  }).id("ftb:oritech/compat/powah/energizing/energite_block");

  event.custom({
      type: "powah:energizing",
      energy: 90000,
      ingredients: [
        {
          item: "minecraft:gold_block"
        },
        {
          item: "minecraft:iron_block"
        }
      ],
      result: {
        count: 2,
        id: "powah:energized_steel_block"
      }
  }).id("ftb:powah/energizing/energized_steel_block");

  event.custom({
      type: "powah:energizing",
      energy: 9000000,
      ingredients: [
        {
          item: "minecraft:emerald_block"
        }
      ],
      result: {
        count: 1,
        id: "powah:spirited_crystal_block"
      }
  }).id("ftb:powah/energizing/spirited_crystal_block");

  event.custom({
      type: "powah:energizing",
      energy: 2700000,
      ingredients: [
        {
          item: "minecraft:diamond_block"
        }
      ],
      result: {
        count: 1,
        id: "powah:niotic_crystal_block"
      }
  }).id("ftb:powah/energizing/niotic_crystal_block");

})
