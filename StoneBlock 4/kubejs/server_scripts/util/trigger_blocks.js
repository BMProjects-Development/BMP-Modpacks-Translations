// server_scripts/handlers/trigger_block_router.js
// Routes Pack Companion TriggerBlock events to commands OR custom code by identifier.

const DEBUG = true

// ---------------- CONFIG ----------------
const TRIGGER_ROUTES = [
  //{ id: "go_to_thing", cmd: "summon cow {x} {y} {z}" },
  //{ id: "testing",     cmd: "custom" } // handled in CUSTOM_HANDLERS

  {
    id: "trivia_start",
    cmd: "execute as @e[type=minecraft:marker,sort=nearest,limit=1,tag=tf_knight_redstone] at @s run setblock ~ ~ ~ minecraft:redstone_block"
  },
  {
    id: "spawn_carb",
    cmd: 'execute at @e[type=minecraft:marker,tag=spawn_carb] unless   entity @e[type=twilightforest:helmet_crab,distance=..50] run summon twilightforest:helmet_crab ~ ~0.2 ~ {Attributes:[{id:"minecraft:generic.scale",base:0.5}]}'
  },
  //Portal Vault Triggers =========================================================================

  { id: "gladios_welcome", cmd: "custom" },
  { id: "gladios_unmonitored_chamber", cmd: "custom" },
  { id: "gladios_fabrication_notice", cmd: "custom" },
  { id: "gladios_please_mind_the_gap", cmd: "custom" },
  { id: "cavemanjohn_repulsion_chicken_gel", cmd: "custom" },
  { id: "gladios_next_test_static", cmd: "custom" },
  { id: "gladios_weee", cmd: "custom" },
  { id: "gladios_shift_negates_gel", cmd: "custom" },
  { id: "gladios_completion_mock", cmd: "custom" },
  { id: "gladios_no_reward", cmd: "custom" },
  { id: "portal_vault_cleanup", cmd: "custom" },
  { id: "portal_vault_teleport", cmd: "custom" }

  // ==============================================================================================
]

// ---------------- CUSTOM HANDLERS ----------------
// ctx: { level, player, pos, dim, x,y,z, px,py,pz, name, uuid }
var CUSTOM_HANDLERS = {
  //Portal Vault Triggers =========================================================================

  gladios_welcome: function (ctx) {
    ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.welcome"))
    ctx.level.server.scheduleInTicks(36, () => {
      ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.relaxation_vault"))
    })
    ctx.level.server.runCommandSilent(`kubejs stages add ${ctx.player.username} gladios_welcome`)
  },

  gladios_unmonitored_chamber: function (ctx) {
    ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.unmonitored_chamber"))
    ctx.level.server.runCommandSilent(`kubejs stages add ${ctx.player.username} gladios_unmonitored_chamber`)
  },

  gladios_fabrication_notice: function (ctx) {
    ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.fabrication_notice"))
    ctx.level.server.runCommandSilent(`kubejs stages add ${ctx.player.username} gladios_fabrication_notice`)
  },

  gladios_please_mind_the_gap: function (ctx) {
    ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.please_mind_the_gap"))
    ctx.level.server.runCommandSilent(`kubejs stages add ${ctx.player.username} gladios_please_mind_the_gap`)
  },

  cavemanjohn_repulsion_chicken_gel: function (ctx) {
    ctx.player.tell(Text.translate("ftb.vaults.portal.message.caveman_john.repulsion_chicken_gel"))
    ctx.level.server.runCommandSilent(`kubejs stages add ${ctx.player.username} cavemanjohn_repulsion_chicken_gel`)
  },

  gladios_next_test_static: function (ctx) {
    ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.next_test_static"))
    ctx.level.server.runCommandSilent(`kubejs stages add ${ctx.player.username} gladios_next_test_static`)
  },

  gladios_weee: function (ctx) {
    ctx.level.server.runCommandSilent(
      `title ${ctx.player.username} title ${Text.translate("ftb.vaults.portal.message.gladios.weee").toJson()}`
    )
    ctx.level.server.runCommandSilent(`kubejs stages add ${ctx.player.username} gladios_weee`)
  },

  gladios_shift_negates_gel: function (ctx) {
    ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.shift_negates_gel"))
    ctx.level.server.runCommandSilent(`kubejs stages add ${ctx.player.username} gladios_shift_negates_gel`)
  },

  gladios_completion_mock: function (ctx) {
    ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.completion_mock"))
    ctx.level.server.scheduleInTicks(200, () => {
      ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.proceed_to_next"))
    })
    ctx.level.server.runCommandSilent(`kubejs stages add ${ctx.player.username} gladios_completion_mock`)
  },

  gladios_no_reward: function (ctx) {
    ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.no_reward"))
    ctx.level.server.scheduleInTicks(1200, () => {
      ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.gas_system_failure"))
    })
    ctx.level.server.runCommandSilent(`kubejs stages add ${ctx.player.username} gladios_no_reward`)
  },

  portal_vault_cleanup: function (ctx) {
    // Remove all specified stages from the player.
    const portal_stages = [
      "gladios_welcome",
      "gladios_unmonitored_chamber",
      "gladios_fabrication_notice",
      "gladios_please_mind_the_gap",
      "cavemanjohn_repulsion_chicken_gel",
      "gladios_next_test_static",
      "gladios_weee",
      "gladios_shift_negates_gel",
      "gladios_completion_mock",
      "gladios_no_reward"
    ]
    portal_stages.forEach((stage) => {
      ctx.level.server.runCommandSilent(`kubejs stages remove ${ctx.player.username} ${stage}`)
    })

    // Remove all specified cores from the player's inventory
    const itemsToRemove = ["ftb:blue_core", "ftb:purple_core", "ftb:red_core", "ftb:orange_core"]

    itemsToRemove.forEach((itemId) => {
      ctx.player.inventory.clear(itemId)
    })
  },

  portal_vault_teleport: function (ctx) {
    const player = ctx.player
    const pos = player.blockPosition()
    ctx.level.server.runCommandSilent(
      `execute in ${ctx.level.dimension} run tp ${ctx.player.username} ${pos.x + 3} ${pos.y + 103} ${pos.z - 26}`
    )
    ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.reward.reminder"))
    ctx.level.server.scheduleInTicks(60, () => {
      ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.reward.reminder_1"))
    })
    ctx.level.server.scheduleInTicks(120, () => {
      ctx.player.tell(Text.translate("ftb.vaults.portal.message.gladios.reward.reminder_2"))
    })
  }

  // ==============================================================================================
}

// -------------- IMPLEMENTATION --------------
function safeEventWrap(fn) {
  return function (e) {
    try {
      fn(e)
    } catch (err) {
      console.error("Error in TriggerBlock handler:")
      console.error(err)
    }
  }
}

var triggerRouteMap = {}
for (var i = 0; i < TRIGGER_ROUTES.length; i++) {
  var r = TRIGGER_ROUTES[i]
  triggerRouteMap[String(r.id)] = { id: String(r.id), cmd: String(r.cmd) }
}

function fillTemplate(tpl, ctx) {
  var out = String(tpl)
  out = out.replace(/\{x\}/g, String(ctx.x))
  out = out.replace(/\{y\}/g, String(ctx.y))
  out = out.replace(/\{z\}/g, String(ctx.z))
  out = out.replace(/\{px\}/g, String(ctx.px))
  out = out.replace(/\{py\}/g, String(ctx.py))
  out = out.replace(/\{pz\}/g, String(ctx.pz))
  out = out.replace(/\{name\}/g, String(ctx.name))
  out = out.replace(/\{uuid\}/g, String(ctx.uuid))
  out = out.replace(/\{dim\}/g, String(ctx.dim))
  return out
}

function num(n) {
  if (typeof n !== "number") return n
  if (!isFinite(n)) return 0
  return Math.round(n * 1000) / 1000
}

NativeEvents.onEvent(
  "dev.ftb.packcompanion.features.triggerblock.TriggerBlockEvent",
  safeEventWrap(function (event) {
    var player = event.player
    if (!player) return

    var level = player.level
    // Only act on the server; some envs report client first
    if (!level || level.isClientSide()) return

    var identifier = String(event.identifier || "")
    var pos = event.pos
    if (!pos) return

    var route = triggerRouteMap[identifier]
    if (!route) {
      if (DEBUG) console.log("[TriggerBlock] no route for id=", identifier)
      return
    }

    var dim = String(level.dimension)
    var nameStr = String(player.name ? player.name.string : player.username)

    var ctx = {
      level: level,
      player: player,
      pos: pos,
      dim: dim,
      x: num(pos.x),
      y: num(pos.y),
      z: num(pos.z),
      px: num(player.x),
      py: num(player.y),
      pz: num(player.z),
      name: nameStr,
      uuid: String(player.uuid)
    }

    if (DEBUG) {
      console.log(
        "[TriggerBlock] route hit id=" +
          identifier +
          " cmdType=" +
          route.cmd +
          " dim=" +
          dim +
          " pos=(" +
          ctx.x +
          "," +
          ctx.y +
          "," +
          ctx.z +
          ")"
      )
    }

    // Custom branch
    if (route.cmd === "custom") {
      var handler = CUSTOM_HANDLERS[identifier]
      if (!handler) {
        console.warn("[TriggerBlock] No custom handler for id: " + identifier)
        return
      }
      handler(ctx)
      return
    }

    // Command branch
    var filled = fillTemplate(route.cmd, ctx)
    var finalCmd = filled.indexOf("execute ") === 0 ? filled : "execute in " + dim + " run " + filled

    // Execute as the server via the level (reliable on dedicated + integrated)
    level.server.runCommand(finalCmd)
  })
)

// One-time load log
console.log("[TriggerBlock] router loaded; routes:", Object.keys(triggerRouteMap).join(", "))
