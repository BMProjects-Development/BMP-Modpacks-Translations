ServerEvents.recipes((event) => {
  event
    .shaped("xycraft_machines:void_container", ["AWA", "ABA", "DDD"], {
      A: "draconicevolution:awakened_draconium_nugget",
      B: "oritech:black_hole_block",
      W: "xycraft_world:xychorium_gem_dark",
      D: "projecte:dark_matter_block"
    })
    .id("ftb:void_container")

  event
    .shaped("xycraft_machines:extractor", ["AGA", "FGF", "AKA"], {
      A: "#c:ingots/aluminum",
      G: "#c:glass_blocks",
      F: "#c:ingots/fortron_infused",
      K: "#xycraft:kivi"
    })
    .id("ftb:crafting/extractor")
    
})
