// priority: 50

if (Platform.isLoaded("immersivepetroleum")) {
  remFluid.push("immersivepetroleum:crudeoil", "immersivepetroleum:crudeoil_flowing")

  ServerEvents.tags("fluid", (event) => {
    event.add("c:crude_oil", "oritech:still_oil")
  })
}
