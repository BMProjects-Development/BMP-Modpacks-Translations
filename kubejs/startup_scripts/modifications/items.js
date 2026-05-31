const maxStackSizeItems = [
  "minecraft:egg",
  "minecraft:snowball",
  "minecraft:ender_pearl",
  "minecraft:experience_bottle",
  "minecraft:fire_charge",
];

const heartStacks = [
  "bhc:red_heart_canister",
  "bhc:yellow_heart_canister",
  "bhc:green_heart_canister",
  "bhc:blue_heart_canister"
]

ItemEvents.modification((event) => {
  event.modify("ftbunearthed:crude_brush", (item) => {
    item.maxDamage = 128;
  });
  event.modify("minecraft:brush", (item) => {
    item.maxDamage = 384;
  });
  event.modify("ftbunearthed:reinforced_brush", (item) => {
    item.maxDamage = 1152;
  });
  event.modify("petrock:kibble", (item) => {
    item.setFood(2, 1);
    item.setNameKey("ftb.item.rock_cookie");
  });
  event.modify("relics:infinity_ham", (item) => {
    item.setFood(6, 1);
  });
  event.modify("oritech:super_ai_chip", (item) => {
    item.maxStackSize = 16;
  });

  heartStacks.forEach((stackItem) => {
    event.modify(stackItem, (item) => {
      item.maxStackSize = 20;
    });
  });

  maxStackSizeItems.forEach((stackItem) => {
    event.modify(stackItem, (item) => {
      item.maxStackSize = 64;
    });
  });
});

// Removes the ItemAttributeModifierEvent Psi is subscribing into
if (Platform.isLoaded("psi")) {
  let $NeoForge = Java.loadClass("net.neoforged.neoforge.common.NeoForge")
  let $ItemPsimetalAxe = Java.loadClass("vazkii.psi.common.item.tool.ItemPsimetalAxe")
  let $ItemPsimetalPickaxe = Java.loadClass("vazkii.psi.common.item.tool.ItemPsimetalPickaxe")
  let $ItemPsimetalShovel = Java.loadClass("vazkii.psi.common.item.tool.ItemPsimetalShovel")
  let $ItemPsimetalSword = Java.loadClass("vazkii.psi.common.item.tool.ItemPsimetalSword")
  let $ItemPsimetalArmor = Java.loadClass("vazkii.psi.common.item.armor.ItemPsimetalArmor")

  StartupEvents.postInit(() => {
    $NeoForge.EVENT_BUS.unregister($ItemPsimetalAxe)
    $NeoForge.EVENT_BUS.unregister($ItemPsimetalPickaxe)
    $NeoForge.EVENT_BUS.unregister($ItemPsimetalShovel)
    $NeoForge.EVENT_BUS.unregister($ItemPsimetalSword)
    $NeoForge.EVENT_BUS.unregister($ItemPsimetalArmor)
  })
}