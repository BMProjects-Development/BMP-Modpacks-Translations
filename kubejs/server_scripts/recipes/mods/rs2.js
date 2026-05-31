ServerEvents.recipes((event) => {
  event
    .custom({
      type: "ae2:transform",
      ingredients: [
        {
          item: "ae2:certus_quartz_crystal",
        },
        {
          item: "minecraft:redstone",
        },
        {
          item: "minecraft:iron_ingot",
        },
      ],
      result: {
        count: 2,
        id: "refinedstorage:quartz_enriched_iron",
      },
    })
    .id("ftb:quartz_enriched_iron");

  event
    .custom({
      type: "create:mixing",
      ingredients: [
        {
          tag: "c:ingots/iron",
        },
        {
          item: "minecraft:redstone",
        },
        {
          item: "ae2:certus_quartz_crystal",
        },
        {
          type: "neoforge:single",
          amount: 250,
          fluid: "minecraft:water",
        },
      ],
      results: [
        {
          count: 2,
          id: "refinedstorage:quartz_enriched_iron",
        },
      ],
    })
    .id("ftb:quartz_enriched_iron_create");
    event.shapeless("refinedstorage:machine_casing", ["3x refinedstorage:quartz_enriched_iron", "mekanism:steel_casing"]).id("ftb:rs_machine_casing");
    event.shapeless("4x refinedstorage:quartz_enriched_copper", ["2x minecraft:copper_ingot", "ae2:certus_quartz_crystal", "minecraft:redstone"]).id("ftb:quartz_enriched_copper");
    event.shapeless("4x refinedstorage:processor_binding", ["2x minecraft:slime_ball", "minecraft:clay_ball", ["minecraft:redstone"]]).id("ftb:processor_binding");
});
