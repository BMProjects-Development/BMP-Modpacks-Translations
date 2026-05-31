ServerEvents.recipes(event => {
  event.shaped('xp_synthesiser:kill_recorder', [
    'ABA',
    'ACA',
    'ABA'
  ], {
    A: 'minecraft:copper_ingot',
    B: 'minecraft:redstone',
    C: 'cognition:primordial_assembly'
  }).id("ftb:xp_synthesiser/kill_recorder")
})