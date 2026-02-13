ServerEvents.recipes((event) => {
  event
    .custom({
      "type": "create:item_application",
      "ingredients": [
        {
          "item": "create:item_hatch"
        },
        {
          "item": "create:experience_block"
        }
      ],
      "results": [
        {
          "id": "create_enchantment_industry:experience_hatch"
        }
      ]
    })
    .id("ftb:create_enchantment_industry/experience_hatch");
});
