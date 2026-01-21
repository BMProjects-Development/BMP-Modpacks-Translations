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

  event
    .custom({
      type: "functionalstorage:custom_compacting",
      higher_input: {
        count: 1,
        id: "minecraft:white_wool",
      },
      lower_input: {
        count: 4,
        id: "minecraft:string",
      },
    })
    .id("ftb:compacting/string_to_wool");

  event
    .custom({
      type: "functionalstorage:custom_compacting",
      higher_input: {
        count: 1,
        id: "minecraft:honeycomb_block",
      },
      lower_input: {
        count: 4,
        id: "minecraft:honeycomb",
      },
    })
    .id("ftb:compacting/honeycomb_block");

  event
    .custom({
      type: "functionalstorage:custom_compacting",
      higher_input: {
        count: 1,
        id: "minecraft:snow_block",
      },
      lower_input: {
        count: 4,
        id: "minecraft:snowball",
      },
    })
    .id("ftb:compacting/snow_block");

  event
    .custom({
      type: "functionalstorage:custom_compacting",
      higher_input: {
        count: 1,
        id: "oritech:packed_wheat",
      },
      lower_input: {
        count: 4,
        id: "minecraft:wheat",
      },
    })
    .id("ftb:compacting/wheat");
});
