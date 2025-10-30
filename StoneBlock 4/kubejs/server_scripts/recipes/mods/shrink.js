ServerEvents.recipes((event) => {
  event
    .shaped("shrink:shrinking_device", [" S ", "FAF", " S "], {
      S: "#c:ingots/steel",
      F: "#c:ingots/fortron_infused",
      A: "compactmachines:shrinking_module"
    })
    .id("ftb:crafting/shrinking_device")

})
