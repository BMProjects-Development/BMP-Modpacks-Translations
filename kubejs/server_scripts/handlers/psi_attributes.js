
// Reimplement Psi's removal with proper filtering
if (Platform.isLoaded("psi")) {
  NativeEvents.onEvent("net.neoforged.neoforge.event.ItemAttributeModifierEvent", (event) => {
    let item = event.getItemStack()
    if (item.getIdLocation().getNamespace() != "psi") return
    if (!(item.getDamageValue() < item.getMaxDamage())) {
      event.removeAllModifiersFor("minecraft:generic.armor")
      event.removeAllModifiersFor("minecraft:generic.attack_damage")
      event.removeAllModifiersFor("minecraft:generic.armor_toughness")
    }
  })
}