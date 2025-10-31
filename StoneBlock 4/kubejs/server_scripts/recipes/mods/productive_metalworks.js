ServerEvents.recipes((event) => {
  event
    .custom({
      type: "productivemetalworks:item_melting",
      ingredient: {
        item: "oritech:carbon_fibre_strands",
      },
      maximum_temperature: 0,
      minimum_temperature: 1000,
      result: [
        {
          amount: 100,
          id: "productivemetalworks:molten_carbon",
        },
      ],
    })
    .id("ftb:productivemetalworks/melting/carbon_fibre_strands");

  //Enderium Casting Recipes ====================================================================

  //Ingot
  event
    .custom({
      type: "productivemetalworks:item_casting",
      cast: {
        item: "productivemetalworks:ingot_cast",
      },
      consume_cast: false,
      fluid: {
        amount: 90,
        tag: "c:molten_enderium",
      },
      result: {
        count: 1,
        id: "chicken_roost:ingot_enderium",
      },
    })
    .id("ftb:productivemetalworks/item_casting/enderium_ingot");

  event
    .custom({
      type: "productivemetalworks:block_casting",
      cast: [],
      consume_cast: false,
      fluid: {
        amount: 810,
        tag: "c:molten_enderium",
      },
      result: {
        count: 1,
        id: "ftb:enderium_block",
      },
    })
    .id("ftb:productivemetalworks/block_casting/enderium_block");

  // ============================================================================================
  event
    .custom({
      type: "productivemetalworks:item_casting",
      cast: {
        item: "productivemetalworks:nugget_cast",
      },
      consume_cast: false,
      fluid: {
        amount: 100,
        fluid: "ftb:molten_chaos",
      },
      result: {
        count: 1,
        id: "draconicevolution:small_chaos_frag",
      },
    })
    .id("ftb:productivemetalworks/nugget_casting/small_chaos_fragment");

  event
    .custom({
      type: "productivemetalworks:item_casting",
      cast: {
        item: "productivemetalworks:gem_cast",
      },
      consume_cast: false,
      fluid: {
        amount: 100,
        fluid: "productivemetalworks:molten_carbon",
      },
      result: {
        count: 1,
        id: "minecraft:coal",
      },
    })
    .id("ftb:productivemetalworks/gem_casting/coal");

  event
    .custom({
      type: "productivemetalworks:item_casting",
      cast: {
        item: "productivemetalworks:gem_cast",
      },
      consume_cast: false,
      fluid: {
        amount: 100,
        fluid: "productivemetalworks:molten_redstone",
      },
      result: {
        count: 1,
        id: "minecraft:redstone",
      },
    })
    .id("ftb:productivemetalworks/gem_casting/redstone");
});
