// priority: 490

StartupEvents.registry("villager_type", (event) => {
  event.create("ftb:stone")
})

StartupEvents.registry("point_of_interest_type", (event) => {
  event.create("ftb:archaeologist").block("minecraft:decorated_pot").maxTickets(1).validRange(16)
  event.create("ftb:geologist").block("apotheosis:salvaging_table").maxTickets(1).validRange(16)
  event.create("ftb:dimensionalist").block("immersiveengineering:resonanz_engineering").maxTickets(1).validRange(16)
})

StartupEvents.registry("villager_profession", (event) => {
  event.create("ftb:archaeologist").poiType("ftb:archaeologist")
  event.create("ftb:geologist").poiType("ftb:geologist")
  event.create("ftb:dimensionalist").poiType("ftb:dimensionalist")
})
