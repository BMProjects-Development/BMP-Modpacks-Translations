ServerEvents.recipes((event) => {
  event
    .custom({
      type: "immersiveengineering:squeezer",
      energy: 19200,
      input: {
        basePredicate: {
          tag: "minecraft:coals",
        },
        count: 1,
      },
      result: {
        tag: "c:carbon_fibre",
      },
    })
    .id(`ftb:immersive_engineering/squeezer/coal_to_carbon_fibre`);

  event
    .custom({
      type: "immersiveengineering:refinery",
      catalyst: {
        tag: "c:slime_balls",
      },
      energy: 80,
      input0: {
        amount: 250,
        fluid: "productivemetalworks:molten_carbon",
      },
      result: {
        amount: 2000,
        id: "immersiveengineering:biodiesel",
      },
    })
    .id(`ftb:immersive_engineering/refinery/molten_carbon_to_biodiesel`);
  event
    .custom({
      type: "immersiveengineering:refinery",
      energy: 80,
      input0: {
        amount: 50,
        fluid: "oritech:still_heavy_oil",
      },
      input1: {
        type: "neoforge:components",
        amount: 1,
        components: {
          "minecraft:potion_contents": {
            potion: "minecraft:strength",
          },
        },
        fluids: "immersiveengineering:potion",
      },
      result: {
        amount: 500,
        id: "immersiveengineering:high_power_biodiesel",
      },
    })
    .id(
      `ftb:immersive_engineering/refinery/heavy_oil_and_strength_potion_to_high_power_biodiesel`
    );
  event
    .custom({
      type: "immersiveengineering:refinery",
      energy: 80,
      input0: {
        amount: 50,
        tag: "c:biodiesel",
      },
      input1: {
        type: "neoforge:components",
        amount: 1,
        components: {
          "minecraft:potion_contents": {
            potion: "minecraft:strength",
          },
        },
        fluids: "immersiveengineering:potion",
      },
      result: {
        amount: 500,
        id: "immersiveengineering:high_power_biodiesel",
      },
    })
    .id(
      `ftb:immersive_engineering/refinery/biodiesel_and_strength_potion_to_high_power_biodiesel`
    );
});
