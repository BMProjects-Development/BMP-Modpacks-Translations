// server_scripts/recipes/mods/avaritia.js
ServerEvents.recipes(event => {
  const specialSword = Item.of(
    `avaritia:skullfire_sword[apothic_attributes:bonus_stack_attribute_modifiers={modifiers:[{amount:0.05000000074505806d,id:"apothic_attributes:command_generated_-80873100",operation:"add_value",slot:"apothic_attributes:mainhand",type:"apothic_attributes:current_hp_damage"},{amount:4.0d,id:"apothic_attributes:command_generated_-1838094545",operation:"add_value",slot:"apothic_attributes:mainhand",type:"apothic_attributes:armor_pierce"},{amount:15.0d,id:"apothic_attributes:command_generated_837949580",operation:"add_value",slot:"apothic_attributes:mainhand",type:"apothic_attributes:fire_damage"}]}]`
  );

  event.custom({
    type: "minecraft:smithing_transform",
    template: { item: "cataclysm:ignitium_upgrade_smithing_template" },
    base:     { item: "justdirethings:celestigem_sword" },
    addition: { item: "cataclysm:ignitium_ingot" },
    result: specialSword.toJson()
  })
  .id("ftb:smithing/avaritia_skullfire_sword");
});
