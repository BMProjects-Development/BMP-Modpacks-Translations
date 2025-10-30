const questions = {
  1: [
    {
      question: "ftb.trivia.everyone.quarry_energy",
      answers: {
        1: "ftb.trivia.everyone.quarry_energy.answer.1",
        2: "ftb.trivia.everyone.quarry_energy.answer.2",
        3: "ftb.trivia.everyone.quarry_energy.answer.3",
        4: "ftb.trivia.everyone.quarry_energy.answer.4"
      },
      answer: 4
    },
    {
      question: "ftb.trivia.everyone.twilight_material",
      answers: {
        1: "ftb.trivia.everyone.twilight_material.answer.1",
        2: "ftb.trivia.everyone.twilight_material.answer.2",
        3: "ftb.trivia.everyone.twilight_material.answer.3",
        4: "ftb.trivia.everyone.twilight_material.answer.4"
      },
      answer: 3
    }
  ],
  2: [
    {
      question: "ftb.trivia.everyone.create_su_generator",
      answers: {
        1: "ftb.trivia.everyone.create_su_generator.answer.1",
        2: "ftb.trivia.everyone.create_su_generator.answer.2",
        3: "ftb.trivia.everyone.create_su_generator.answer.3",
        4: "ftb.trivia.everyone.create_su_generator.answer.4"
      },
      answer: 1
    },
    {
      question: "ftb.trivia.everyone.phase_shifter_output",
      answers: {
        1: "ftb.trivia.everyone.phase_shifter_output.answer.1",
        2: "ftb.trivia.everyone.phase_shifter_output.answer.2",
        3: "ftb.trivia.everyone.phase_shifter_output.answer.3",
        4: "ftb.trivia.everyone.phase_shifter_output.answer.4"
      },
      answer: 4
    }
  ],
  3: [
    {
      question: "ftb.trivia.everyone.ars_nouveau_summon",
      answers: {
        1: "ftb.trivia.everyone.ars_nouveau_summon.answer.1",
        2: "ftb.trivia.everyone.ars_nouveau_summon.answer.2",
        3: "ftb.trivia.everyone.ars_nouveau_summon.answer.3",
        4: "ftb.trivia.everyone.ars_nouveau_summon.answer.4"
      },
      answer: 1
    },
    {
      question: "ftb.trivia.everyone.ae2_non_tunnel",
      answers: {
        1: "ftb.trivia.everyone.ae2_non_tunnel.answer.1",
        2: "ftb.trivia.everyone.ae2_non_tunnel.answer.2",
        3: "ftb.trivia.everyone.ae2_non_tunnel.answer.3",
        4: "ftb.trivia.everyone.ae2_non_tunnel.answer.4"
      },
      answer: 4
    }
  ],
  4: [
    {
      question: "ftb.trivia.everyone.stoneblock_release_year",
      answers: {
        1: "ftb.trivia.everyone.stoneblock_release_year.answer.1",
        2: "ftb.trivia.everyone.stoneblock_release_year.answer.2",
        3: "ftb.trivia.everyone.stoneblock_release_year.answer.3",
        4: "ftb.trivia.everyone.stoneblock_release_year.answer.4"
      },
      answer: 3
    },
    {
      question: "ftb.trivia.everyone.stoneblock_oil_source",
      answers: {
        1: "ftb.trivia.everyone.stoneblock_oil_source.answer.1",
        2: "ftb.trivia.everyone.stoneblock_oil_source.answer.2",
        3: "ftb.trivia.everyone.stoneblock_oil_source.answer.3",
        4: "ftb.trivia.everyone.stoneblock_oil_source.answer.4"
      },
      answer: 2
    }
  ],
  5: [
    {
      question: "ftb.trivia.everyone.malum_spirit_crucible",
      answers: {
        1: "ftb.trivia.everyone.malum_spirit_crucible.answer.1",
        2: "ftb.trivia.everyone.malum_spirit_crucible.answer.2",
        3: "ftb.trivia.everyone.malum_spirit_crucible.answer.3",
        4: "ftb.trivia.everyone.malum_spirit_crucible.answer.4"
      },
      answer: 1
    },
    {
      question: "ftb.trivia.everyone.tame_wolf_item",
      answers: {
        1: "ftb.trivia.everyone.tame_wolf_item.answer.1",
        2: "ftb.trivia.everyone.tame_wolf_item.answer.2",
        3: "ftb.trivia.everyone.tame_wolf_item.answer.3",
        4: "ftb.trivia.everyone.tame_wolf_item.answer.4"
      },
      answer: 3
    }
  ]
}

const customQuestions = {
  direwolf20: {
    1: {
      question: "ftb.trivia.direwolf20.best_room_size",
      answers: {
        1: "ftb.trivia.direwolf20.best_room_size.answer.1",
        2: "ftb.trivia.direwolf20.best_room_size.answer.2",
        3: "ftb.trivia.direwolf20.best_room_size.answer.3",
        4: "ftb.trivia.direwolf20.best_room_size.answer.4"
      },
      answer: 3
    }
  },
  slowpoke101: {
    1: {
      question: "ftb.trivia.slowpoke101.charcoal_version",
      answers: {
        1: "ftb.trivia.slowpoke101.charcoal_version.answer.1",
        2: "ftb.trivia.slowpoke101.charcoal_version.answer.2",
        3: "ftb.trivia.slowpoke101.charcoal_version.answer.3",
        4: "ftb.trivia.slowpoke101.charcoal_version.answer.4"
      },
      answer: 2
    },
    2: {
      question: "ftb.trivia.slowpoke101.river_material",
      answers: {
        1: "ftb.trivia.slowpoke101.river_material.answer.1",
        2: "ftb.trivia.slowpoke101.river_material.answer.2",
        3: "ftb.trivia.slowpoke101.river_material.answer.3",
        4: "ftb.trivia.slowpoke101.river_material.answer.4"
      },
      answer: 3
    }
  },
  chosenarchitect: {
    1: {
      question: "Which of the following is one of ChosenArchitect's Favorite Mod?",
      answers: {
        1: "Create",
        2: "Gregtech",
        3: "Pneumaticcraft",
        4: "Spice of Life"
      },
      answer: 1
    }
  }
}

const triviaSettings = {
  distance: 128,
  gateways: {
    1: "ftb:vault/tier_1",
    2: "ftb:vault/tier_2",
    3: "ftb:vault/tier_3",
    4: "ftb:vault/tier_4",
    5: "ftb:vault/tier_5"
  },
  gatewayOffset: { x: 0, y: -1, z: -4 },
  startOffset: { x: 0, y: -2, z: 40 },
  arenaOffset: { x: 0, y: -13, z: 28 },
  wallBottomLeft: { x: -4, y: -3, z: 1 },
  wallTopRight: { x: 4, y: 1, z: -3 }
}

ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event

  event.register(
    Commands.literal("trivia")
      .requires((s) => s.hasPermission(2))
      .executes((c) => {
        const player = c.source?.player ?? c.source?.entity
        const level = player.level
        const server = level.server

        Object.keys(questions).forEach((tier) => {
          let randomIndex = Math.floor(Math.random() * questions[tier].length)
          let randomQuestion = questions[tier][randomIndex]
          let playerName = player.getUsername()

          //if (customQuestions[playerName] !== undefined) {
          //  if (customQuestions[playerName][tier] !== undefined) {
          //    randomQuestion = customQuestions[playerName][tier]
          //  }
          //}

          let answer = randomQuestion.answer
          for (let i = 1; i <= 4; i++) {
            // assuming there aren't going to be more displays in a 128block radius
            let display = level
              .getEntities()
              .filter(
                (e) =>
                  e.type === "minecraft:text_display" &&
                  e.getTags().contains(`trivia_${tier}_answer_${parseInt(i)}`) &&
                  e.distanceToEntity(player) < triviaSettings.distance
              )[0]

            let tag = `trivia_${tier}_answer_${parseInt(i)}`
            let atPosition = `positioned ${player.x} ${player.y} ${player.z}`
            let as = `as @e[type=minecraft:text_display,tag=${tag},sort=nearest,limit=1]`
            let inDimension = `in ${level.dimension}`

            let win = i === answer
            server.runCommandSilent(
              `execute ${as} ${inDimension} ${atPosition} run data modify entity @s text set value '{"color":"aqua","translate":"${
                randomQuestion.answers[parseInt(i)]
              }"}'`
            )
            if (display) {
              display.addTag(win ? "win" : "lose")
              if (display.getTags().contains(win ? "win" : "lose")) {
                display.removeTag(win ? "lose" : "win")
              }
            }
          }

          player.runCommandSilent(
            `execute as @e[type=minecraft:text_display,tag=trivia_${tier}_question,sort=nearest,limit=1] run data modify entity @s text set value '{color:"aqua",translate:"${randomQuestion.question}"}'`
          )
        })

        return 1
      })
      .then(
        Commands.literal("spawn").executes((c) => {
          const player = c.source?.player ?? c.source?.entity
          const level = player.level

          teleportToStart(level, player)
          // player.tell("§aTeleported you back!");
          return 1
        })
      )
      .then(
        Commands.literal("arena").executes((c) => {
          const player = c.source?.player ?? c.source?.entity
          const level = player.level

          teleportToArena(level, player)
          // player.tell("§aTeleported you to the trivia arena!");
          return 1
        })
      )
      .then(
        Commands.literal("remove")
          .executes((c) => {
            const player = c.source?.player ?? c.source?.entity
            const level = player.level

            let tier
            if (!Teams.hasData(player, "tf_vault_wins")) {
              tier = 0
            } else {
              tier = Teams.getData(player).getInt("tf_vault_wins")
            }
            console.log(`Removing blocks for tier ${tier}`)
            console.log(Teams.getData(player))
            let display = getQuestionDisplay(level, tier, player)
            console.log(display)
            if (!display) {
              player.tell(Text.translate("ftb.trivia.no_blocks"))
              return 1
            }
            removeBlockWall(level, display, player)
            return 1
          })
          .then(
            Commands.argument("tier", Arguments.INTEGER.create(event)).executes((c) => {
              const player = c.source?.player ?? c.source?.entity
              const level = player.level
              let tier = Arguments.INTEGER.getResult(c, "tier")

              if (tier < 1 || tier > 5) {
                player.tell(Text.translate("ftb.trivia.invalid_tier"))
                return 1
              }
              let display = getQuestionDisplay(level, tier, player)
              if (!display) {
                player.tell(Text.translate("ftb.trivia.no_blocks"))
                return 1
              }
              removeBlockWall(level, display, player)
              return 1
            })
          )
      )
      .then(
        Commands.literal("set_level")
          .then(
            Commands.argument("level", Arguments.INTEGER.create(event)).executes((c) => {
              const player = c.source?.player ?? c.source?.entity
              const level = player.level
              let newLevel = Arguments.INTEGER.getResult(c, "level")

              if (newLevel < 0 || newLevel > 5) {
                player.tell(Text.translate("ftb.trivia.invalid_level"))
                return 1
              }

              Teams.setData(player, "tf_vault_wins", newLevel)
              // player.tell(`§aSet trivia level to ${newLevel}`);
              return 1
            })
          )
          .then(
            Commands.argument("target", Arguments.PLAYER.create(event)).executes((c) => {
              const player = c.source?.player ?? c.source?.entity
              const target = Arguments.PLAYER.getResult(c, "target")

              if (!target) {
                player.tell(Text.translate("ftb.trivia.invalid_player"))
                return 1
              }

              Teams.setData(target, "tf_vault_wins", Teams.getDataValue(player, "tf_vault_wins"))
              // player.tell(`§aSet trivia level for ${target.name} to ${Teams.getDataValue(player, "tf_vault_wins")}`);
              return 1
            })
          )
      )
      .then(
        Commands.literal("increase_level").executes((c) => {
          const player = c.source?.player ?? c.source?.entity
          const level = player.level
          let tier
          if (!Teams.hasData(player, "tf_vault_wins")) {
            tier = 0
          } else {
            tier = Teams.getData(player).getInt("tf_vault_wins")
          }
          if (tier >= 5) {
            player.tell(Text.translate("ftb.trivia.already_completed"))
            return 1
          }
          Teams.setData(player, "tf_vault_wins", tier + 1)
          // player.tell(`§aIncreased trivia level to ${tier + 1}`);
          return 1
        })
      )
      .then(
        Commands.literal("decrease_level").executes((c) => {
          const player = c.source?.player ?? c.source?.entity
          const level = player.level
          let tier
          if (!Teams.hasData(player, "tf_vault_wins")) {
            tier = 0
          } else {
            tier = Teams.getData(player).getInt("tf_vault_wins")
          }
          if (tier <= 0) {
            player.tell(Text.translate("ftb.trivia.too_low"))
            return 1
          }
          Teams.setData(player, "tf_vault_wins", tier - 1)
          // player.tell(`§aDecreased trivia level to ${tier - 1}`);
          return 1
        })
      )
  )
})

PlayerEvents.tick((event) => {
  const { player, server, level } = event
  if (server.getTickCount() % 20 !== 0) return
  if (!String(level.dimension).includes("ftbteambases:")) return
  level
    .getEntities()
    .filter(
      (e) => e.type === "minecraft:text_display" && distanceBetween(player.block.pos.offset(0, 1, 1), e.block.pos) < 1.7
    )
    .forEach((display) => {
      if (display.getTags().contains("win")) {
        player.tell(Text.translate("ftb.trivia.correct_answer"))
        removeBlockWall(level, display, player)
      } else if (display.getTags().contains("lose")) {
        player.tell(Text.translate("ftb.trivia.wrong_answer"))
        let tier = display
          .getTags()
          .find((tag) => tag.startsWith("trivia_"))
          .split("_")[1]
        teleportToArena(level, player, triviaSettings.gateways[tier])
      }
    })
})

const distanceBetween = (pos1, pos2) => {
  return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) + Math.pow(pos1.z - pos2.z, 2))
}

const $GatewayRegistry = Java.loadClass("dev.shadowsoffire.gateways.gate.GatewayRegistry")
const teleportToStart = (level, player) => {
  let display = getQuestionDisplay(level, 5, player)
  const { x, y, z } = triviaSettings.startOffset
  let start = display.getOnPos().offset(x, y, z)
  player.teleportTo(start.x, start.y, start.z)
}

const teleportToArena = (level, player, gateway) => {
  player.potionEffects.add("minecraft:blindness", 40, 1, false, false)
  let display = getQuestionDisplay(level, 5, player)
  const { x, y, z } = triviaSettings.arenaOffset
  let arena = display.getOnPos().offset(x, y, z)
  player.teleportTo(arena.x, arena.y, arena.z)
  spawnGateway(arena, player, gateway)
}

const spawnGateway = (position, summoner, gateway) => {
  let gate = $GatewayRegistry.INSTANCE.holder(gateway)
  let entity = gate.get().createEntity(summoner.level, summoner)
  const { x, y, z } = triviaSettings.gatewayOffset
  entity.moveTo(position.offset(x, y, z))
  summoner.level.addFreshEntity(entity)
  entity.onGateCreated()
  return entity
}
const getQuestionDisplay = (level, tier, player) => {
  return level
    .getEntities()
    .filter(
      (e) =>
        e.type === "minecraft:text_display" &&
        e.getTags().contains(`trivia_${tier}_question`) &&
        e.distanceToEntity(player) < triviaSettings.distance
    )[0]
}
const removeBlockWall = (level, display, player) => {
  let tier = display
    .getTags()
    .find((tag) => tag.startsWith("trivia_"))
    .split("_")[1]
  let questionDisplay = getQuestionDisplay(level, tier, player)

  level
    .getEntities()
    .filter(
      (e) =>
        e.type === "minecraft:text_display" &&
        (e.getTags().contains(`trivia_${tier}_answer_1`) ||
          e.getTags().contains(`trivia_${tier}_answer_2`) ||
          e.getTags().contains(`trivia_${tier}_answer_3`) ||
          e.getTags().contains(`trivia_${tier}_answer_4`) ||
          e.getTags().contains(`trivia_${tier}_question`))
    )
    .forEach((e) => {
      e.discard()
    })

  Teams.setData(player, "tf_vault_wins", parseInt(tier))
  const { wallBottomLeft, wallTopRight } = triviaSettings

  let blockArray = []
  let vanishArray = []
  for (let i = wallBottomLeft.x; i <= wallTopRight.x; i++) {
    for (let j = wallBottomLeft.y; j <= wallTopRight.y; j++) {
      for (let k = wallBottomLeft.z; k >= wallTopRight.z; k--) {
        let block = level.getBlock(questionDisplay.x + i, questionDisplay.y + j, questionDisplay.z + k)
        if (block.id == "minecraft:air") continue

        let object = { block: block, blockid: block.id, x: block.x, y: block.y, z: block.z }
        blockArray.push(object)
        vanishArray.push({ x: block.x, y: block.y, z: block.z })
      }
    }
  }
  // Shuffle vanishArray
  for (let i = vanishArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[vanishArray[i], vanishArray[j]] = [vanishArray[j], vanishArray[i]]
  }

  // Slowly vanish blocks
  vanishArray.forEach((pos, i) => {
    level.server.scheduleInTicks(i * 0.3, () => {
      level.getBlock(pos.x, pos.y, pos.z).set("minecraft:air")
    })
  })

  // Uncomment this to restore the blocks after a delay
  // Testing purpose only
  // level.server.scheduleInTicks(10*20, (_) => {
  //   blockArray.forEach((object) => {
  //     level.getBlock(object.x, object.y, object.z).set(object.blockid);
  //   });
  // });

  // Remove all trivia text displays for the tier
  // Comment this out if you want to keep the displays (e.g. for debugging)
}
