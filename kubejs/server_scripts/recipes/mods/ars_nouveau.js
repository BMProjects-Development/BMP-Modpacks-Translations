ServerEvents.recipes((event) => {

  function addCrush(idPath, input, outputId, count) {
    event.custom({
      type: "ars_nouveau:crush",
      input: input,
      output: [
        {
          chance: 1.0,
          maxRange: 1,
          stack: {
            count: count,
            id: outputId,
          },
        },
      ],
    }).id(`ftb:ars_nouveau/crush/${idPath}`);
  }

  addCrush("certus_quartz_dust", { tag: "c:gems/certus_quartz" }, "ae2:certus_quartz_dust", 1);
  addCrush("fluix_dust",         { tag: "c:gems/fluix" },         "ae2:fluix_dust",         1);
  addCrush("ender_dust",         { item: "minecraft:ender_pearl" }, "ae2:ender_dust",       1);
  addCrush("sky_dust",           { item: "ae2:sky_stone_block" },   "ae2:sky_dust",         1);

});
