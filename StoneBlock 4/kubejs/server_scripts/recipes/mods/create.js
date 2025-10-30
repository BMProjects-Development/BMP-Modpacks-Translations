ServerEvents.recipes((event) => {
  event
    .custom({
      type: "create:item_application",
      ingredients: [
        {
          item: "create:railway_casing",
        },
        {
          item: "create:shadow_steel",
        },
      ],
      results: [
        {
          id: "create:shadow_steel_casing",
        },
      ],
    })
    .id("ftb:create/shadow_casing");

  event
    .custom({
      type: "productivemetalworks:block_casting",
      cast: {
        item: "ftbmaterials:copper_cluster"
      },
      consume_cast: true,
      fluid: {
        fluid: "create_dragons_plus:green_dye",
        amount: 200
      },
      result: {
        id: "create:veridium",
        count: 1
      }
    })
    .id("ftb:productivemetalworks/casting/veridium");

  event
    .custom({
      type: "productivemetalworks:block_casting",
      cast: {
        item: "ftbmaterials:nickel_cluster"
      },
      consume_cast: true,
      fluid: {
        fluid: "create_dragons_plus:cyan_dye",
        amount: 200
      },
      result: {
        id: "create:asurine",
        count: 1
      }
    })
    .id("ftb:productivemetalworks/casting/asurine");

  event
    .custom({
      type: "productivemetalworks:block_casting",
      cast: {
        item: "minecraft:smooth_stone"
      },
      consume_cast: true,
      fluid: {
        fluid: "create_dragons_plus:white_dye",
        amount: 200
      },
      result: {
        id: "create:limestone",
        count: 1
      }
    })
    .id("ftb:productivemetalworks/casting/limestone");

  event
    .custom({
      type: "productivemetalworks:block_casting",
      cast: {
        item: "ftbmaterials:gold_cluster"
      },
      consume_cast: true,
      fluid: {
        fluid: "create_dragons_plus:yellow_dye",
        amount: 200
      },
      result: {
        id: "create:ochrum",
        count: 1
      }
    })
    .id("ftb:productivemetalworks/casting/ochrum");

  event
    .custom({
      type: "productivemetalworks:block_casting",
      cast: {
        item: "ftbmaterials:iron_cluster"
      },
      consume_cast: true,
      fluid: {
        fluid: "create_dragons_plus:red_dye",
        amount: 200
      },
      result: {
        id: "create:crimsite",
        count: 1
      }
    })
    .id("ftb:productivemetalworks/casting/crimsite");

});
