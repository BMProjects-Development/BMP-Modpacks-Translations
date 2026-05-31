ServerEvents.recipes((event) => {
  event
    .custom({
      type: "minecraft:crafting_shapeless",
      ingredients: [{ item: "minecraft:book" }, { item: "mffs:focus_matrix" }],
      result: {
        id: "patchouli:guide_book",
        count: 1,
        components: {
          "patchouli:book": "mffs:handbook",
        },
      },
    })
    .id("ftb:crafting/mffs/guide_book");
});
