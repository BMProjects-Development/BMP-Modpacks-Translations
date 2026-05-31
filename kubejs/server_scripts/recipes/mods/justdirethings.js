ServerEvents.recipes((event) => {
  event
    .custom({
      type: "justdirethings:goospread",
      craftingDuration: 2400,
      id: "justdirethings:coal_block_t1",
      input: {
        Name: "ae2:sky_stone_block",
      },
      output: {
        Name: "xycraft_world:kivi",
      },
      tierRequirement: 1,
    })
    .id("ftb:justdirethings/goo/tier1/kivi");

  event
    .custom({
      type: "justdirethings:goospread",
      craftingDuration: 2400,
      id: "justdirethings:dire_netherite_block",
      input: {
        Name: "ftbmaterials:platinum_block",
      },
      output: {
        Name: "irons_spellbooks:mithril_ore",
      },
      tierRequirement: 3,
    })
    .id("ftb:justdirethings/goo/tier3/raw_mithril");

  //Hand Tilling Dire Soils =======================================================================

  event
    .shapeless(Item.of("justdirethings:goosoil_tier1", 2), [
      "#minecraft:dirt",
      "#minecraft:dirt",
      Item.of("justdirethings:ferricore_hoe"),
    ])
    .damageIngredient("justdirethings:ferricore_hoe", 1)
    .id("ftb:justdirethings/hand_tilling/soil_1");

  event
    .shapeless(Item.of("justdirethings:goosoil_tier2", 2), [
      "#minecraft:dirt",
      "#minecraft:dirt",
      Item.of("justdirethings:blazegold_hoe"),
    ])
    .damageIngredient("justdirethings:blazegold_hoe", 1)
    .id("ftb:justdirethings/hand_tilling/soil_2");

  event
    .shapeless(Item.of("justdirethings:goosoil_tier3", 2), [
      "#minecraft:dirt",
      "#minecraft:dirt",
      Item.of("justdirethings:celestigem_hoe"),
    ])
    .damageIngredient("justdirethings:celestigem_hoe", 1)
    .id("ftb:justdirethings/hand_tilling/soil_3");

  event
    .shapeless(Item.of("justdirethings:goosoil_tier4", 2), [
      "#minecraft:dirt",
      "#minecraft:dirt",
      Item.of("justdirethings:eclipsealloy_hoe"),
    ])
    .damageIngredient("justdirethings:eclipsealloy_hoe", 1)
    .id("ftb:justdirethings/hand_tilling/soil_4");
});
