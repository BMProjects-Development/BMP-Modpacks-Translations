// Dust processing recipes for various machines
// Addresses issue #10831 - Add dust to Stonework Factory and other machines

ServerEvents.recipes((event) => {
  // Create Crushing Wheel - sand to dust
  addRecipeCreateCrushing(
    event,
    "c:sands",
    [["ftbstuff:dust", 1]],
    "ftb:create/crushing/sand_to_dust"
  )

  // Create Millstone - sand to dust (slower alternative)
  event.custom({
    type: "create:milling",
    ingredients: [{ tag: "c:sands" }],
    processingTime: 150,
    results: [{ id: "ftbstuff:dust", count: 1 }]
  }).id("ftb:create/milling/sand_to_dust")

  // Immersive Engineering Crusher - sand to dust
  addRecipeImmersiveEngineeringCrusher(
    event,
    "c:sands",
    [["ftbstuff:dust", 1]],
    "ftb:immersiveengineering/crusher/sand_to_dust"
  )
})
