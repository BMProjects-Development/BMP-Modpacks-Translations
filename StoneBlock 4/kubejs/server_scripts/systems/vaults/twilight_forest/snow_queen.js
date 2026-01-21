// priority: 50

EntityJSEvents.addGoals("twilightforest:helmet_crab", (event) => {
  if (checkTag(event.entity.tags, "vault_tf_crab")) {
    event.removeAllGoals()
  }
})
