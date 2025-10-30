ServerEvents.recipes((event) => {
  event
    .shaped("functionalstorage:storage_controller", ["SDS", "BRB", "SCS"], {
      S: "#c:plates/steel",
      B: "#functionalstorage:drawer",
      C: "#c:stones",
      D: "#c:gems/diamond",
      R: "minecraft:comparator",
    })
    .id("ftb:storage_controller");

  event
    .shaped("functionalstorage:framed_storage_controller", [" F ", "FDF", " F "], {
      F: "cable_facades:facade",
      D: "functionalstorage:storage_controller",
    })
    .id("ftb:framed_storage_controller");
});
