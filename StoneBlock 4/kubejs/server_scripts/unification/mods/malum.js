// priority: 50

global.removeOre.push("malum:natural_quartz_ore", "malum:deepslate_quartz_ore")

global.removeRecipe.push(
  "malum:natural_quartz_from_deepslate_blasting",
  "malum:natural_quartz_from_blasting",
  "malum:natural_quartz_from_deepslate_smelting",
  "malum:natural_quartz_from_smelting",
  "malum:create/crushing/ore/crush_natural_quartz_ore",
  "malum:create/crushing/ore/crush_natural_quartz_deepslate_ore"
)

global.removeItem.push("malum:natural_quartz")

global.removeItemTag.push(["minecraft:logs_that_burn", ["#malum:runewood_logs", "#malum:soulwood_logs"]])
