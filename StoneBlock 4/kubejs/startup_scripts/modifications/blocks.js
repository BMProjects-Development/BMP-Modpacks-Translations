const chicken_unbreakable = ['draconicevolution:dislocator_receptacle', 'draconicevolution:infused_obsidian', 'antiblocksrechiseled:bright_black']

BlockEvents.modification((event) => {
  event.modify("minecraft:stone", (block) => {
    block.setRequiresTool(false)
  })

  event.modify("twilightforest:mazestone", (block) => {
    block.destroySpeed = 7
  })
})
