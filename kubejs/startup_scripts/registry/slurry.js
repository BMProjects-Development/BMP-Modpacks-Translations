// priority: 100

StartupEvents.registry("mekanism:chemical", function (event) {
  global.addSlurry.forEach((slurry) => {
    const [ore, dirtyColor, cleanColor] = slurry
    event.create(`ftb:clean_${ore}`, "clean_slurry").tint(cleanColor)
    event.create(`ftb:dirty_${ore}`, "dirty_slurry").tint(dirtyColor)
  })

  event.create(`ftb:zinc`, "infuse_type").tint(0xc3ccd4)
  event.create(`ftb:nickel`, "infuse_type").tint(0xc3ccd4)
})
