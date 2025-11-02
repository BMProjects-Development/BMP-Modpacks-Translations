ServerEvents.recipes((event) => {
  event
    .custom({
      type: "draconicevolution:fusion_crafting",
      catalyst: {
        item: "chicken_roost:c_awakeneddraconium",
      },
      ingredients: [
        {
          consume: true,
          ingredient: {
            tag: "c:ingots/draconium_awakened",
          },
        },
        {
          consume: true,
          ingredient: {
            tag: "c:ingots/draconium_awakened",
          },
        },
        {
          consume: true,
          ingredient: {
            item: "draconicevolution:awakened_core",
          },
        },
        {
          consume: true,
          ingredient: {
            item: "draconicevolution:awakened_core",
          },
        },
        {
          consume: true,
          ingredient: {
            item: "draconicevolution:large_chaos_frag",
          },
        },
        {
          consume: true,
          ingredient: {
            item: "draconicevolution:large_chaos_frag",
          },
        },
        {
          consume: true,
          ingredient: {
            tag: "c:ingots/draconium_awakened",
          },
        },
        {
          consume: true,
          ingredient: {
            item: "draconicevolution:awakened_core",
          },
        },
        {
          consume: true,
          ingredient: {
            item: "draconicevolution:awakened_core",
          },
        },
        {
          consume: true,
          ingredient: {
            item: "draconicevolution:large_chaos_frag",
          },
        },
        {
          consume: true,
          ingredient: {
            item: "draconicevolution:large_chaos_frag",
          },
        },
        {
          consume: true,
          ingredient: {
            tag: "c:ingots/draconium_awakened",
          },
        },
      ],
      result: {
        count: 1,
        id: "chicken_roost:c_chaos",
      },
      techLevel: "draconic",
      totalEnergy: 100000000,
    })
    .id("ftb:draconicevolution/fusion_crafting_chaos_chicken_roost");

  event
    .shaped(
      Item.of("draconicevolution:dislocator"),
      ["DBD", "BEB", "DBD"],
      {
        D: "draconicevolution:draconium_dust",
        B: "minecraft:blaze_powder",
        E: "chicken_roost:ingot_enderium",
      }
    )
    .id("ftb:shaped/dislocator");
});
