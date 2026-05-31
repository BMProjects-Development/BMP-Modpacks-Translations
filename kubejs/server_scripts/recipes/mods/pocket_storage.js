ServerEvents.recipes(event => {
  function smithing(id, templateItem, baseItem, additionItem, resultItem) {
    event
      .custom({
        type: "minecraft:smithing_transform",
        template: { item: templateItem },
        base: { item: baseItem },
        addition: { item: additionItem },
        result: { id: resultItem }
      })
      .id(id);
  }

  // PSU 1 -> PSU 2
  smithing(
    "ftb:smithing/psu_2",
    "apotheosis:iron_upgrade_smithing_template",
    "pocketstorage:psu_1",
    "minecraft:iron_ingot",
    "pocketstorage:psu_2"
  );

  // PSU 2 -> PSU 3
  smithing(
    "ftb:smithing/psu_3",
    "apotheosis:gold_upgrade_smithing_template",
    "pocketstorage:psu_2",
    "minecraft:gold_ingot",
    "pocketstorage:psu_3"
  );

  // PSU 3 -> PSU 4
  smithing(
    "ftb:smithing/psu_4",
    "apotheosis:diamond_upgrade_smithing_template",
    "pocketstorage:psu_3",
    "minecraft:diamond",
    "pocketstorage:psu_4"
  );
});
