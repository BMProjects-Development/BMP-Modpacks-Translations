PlayerEvents.loggedOut(event => {
  if (!global.noteStateMap) return;
  delete global.noteStateMap[event.player.uUID];
});

let SB4$WE_BLACKLIST_BLOCKS = [
  "minecraft:deepslate",
  "minecraft:cobbled_deepslate",
  "minecraft:green_stained_glass",
  "twilightforest:green_force_field",
  "ae2:not_so_mysterious_cube",
  "chisel_chipped_integration:factory_wireframe",
  "minecraft:verdant_froglight",
  "minecraft:deepslate_bricks",
  "minecraft:stone",
  "immersiveengineering:sheetmetal_steel",
  "ae2:sky_stone_block",
  "minecraft:deepslate_brick_wall",
  "chipped:sanded_deepslate",
  "create:cut_deepslate_wall",
  "minecraft:cyan_stained_glass",
  "minecraft:deepslate_tiles",
  "chisel_chipped_integration:metal_iron_shipping_crate",
  "minecraft:polished_deepslate",
  "antiblocksrechiseled:bright_orange",
  "chisel_chipped_integration:wool_legacy_green",
  "minecraft:oxidized_copper_bulb",
  "ftb:world_engine_slab_plating",
  "chisel_chipped_integration:carpet_legacy_green",
  "ftb:world_engine_plating",
  "chipped:sheet_waxed_oxidized_copper",
  "supplementaries:deepslate_lamp",
  "chisel_chipped_integration:factory_circuit",
  "antiblocksrechiseled:bright_black",
  "chisel_chipped_integration:technical_large_pipes",
  "create:cut_deepslate",
  "chipped:arched_white_stained_glass_pane_pillar",
  "ftb:world_engine_wall_plating",
  "chisel_chipped_integration:metal_iron_scaffold",
  "chisel_chipped_integration:technical_malfunction_fan",
  "minecraft:deepslate_tile_wall",
  "enderio:dark_steel_trapdoor",
  "create:copper_table_cloth",
  "chisel_chipped_integration:metal_invar_shipping_crate",
  "minecraft:cobbled_deepslate_wall",
  "minecraft:deepslate_brick_slab",
  "chipped:tiled_acacia_planks",
  "minecraft:deepslate_tile_slab",
  "ftb:world_engine_stairs_plating",
  "simplylight:rodlamp_gray",
  "simplylight:wall_lamp_black",
  "minecraft:polished_deepslate_wall",
  "simplylight:rodlamp",
  "minecraft:deepslate_tile_stairs",
  "chisel_chipped_integration:technical_grate",
  "minecraft:waxed_chiseled_copper",
  "minecraft:cobbled_deepslate_stairs",
  "simplylight:wall_lamp",
  "xycraft_world:immortal_stone_green",
  "minecraft:oxidized_copper_trapdoor",
  "minecraft:deepslate_brick_stairs",
  "minecraft:cobbled_deepslate_slab",
  "ftb:world_engine_circuit",
  "ftb:world_engine_vent",
  "supplementaries:netherite_trapdoor",
  "connectedglass:tinted_borderless_glass_black",
  "minecraft:waxed_cut_copper_stairs",
  "simplylight:wall_lamp_orange",
  "minecraft:andesite_stairs",
  "create:flywheel",
  "simplylight:illuminant_lime_block_on",
  "custommachinery:custom_machine_block",
]

BlockEvents.broken(SB4$WE_BLACKLIST_BLOCKS, (event) => {
  let entity = event.getEntity()
  let player = event.getPlayer()
  let block = event.getBlock()

  if (isPlayerInCreativeSpectator(
    player
  )) return

  if (!(isEntityInPlayerDimension(
    entity,
    player
  ))) return

  if (!(isEntityInBiome(
    entity,
    "minecraft:the_void"
  ))) return

  if (!(isBlockInAABB(
    block.getPos(),
    AABB.of(61, 27, -62, -57, -61, 56)
  ))) return

  event.cancel()

})

BlockEvents.rightClicked("minecraft:bed", event => {event.cancel()});

BlockEvents.placed(SB4$WE_BLACKLIST_BLOCKS.concat([
  "minecraft:tnt",
  "projecte:nova_catalyst",
  "projecte:nova_cataclysm"
]), (event) => {
  let entity = event.getEntity()
  let player = event.getPlayer()
  let block = event.getBlock()

  if (isPlayerInCreativeSpectator(
    player
  )) return

  if (!(isEntityInPlayerDimension(
    entity,
    player
  ))) return
  
  if (!(isEntityInBiome(
    entity,
    "minecraft:the_void"
  ))) return

  if (!(isBlockInAABB(
    block.getPos(),
    AABB.of(61, 27, -62, -57, -61, 56)
  ))) return

  event.cancel()

})

const $Tristate = Java.loadClass('net.neoforged.neoforge.common.util.TriState');
const arsRings = [
  "ars_nouveau:ring_of_lesser_discount",
  "ars_nouveau:ring_of_greater_discount",
]
NativeEvents.onEvent('top.theillusivec4.curios.api.event.CurioCanEquipEvent', (event) => {
  const {slotContext, stack, result, entity} = event;
  try{
    if(!entity.isPlayer()) return;
    for(let i = 0; i < entity.equippedCurios.getSlots(); i++) {
      let equipped = entity.equippedCurios.getStackInSlot(i);
      if(arsRings.includes(equipped.id) && arsRings.includes(stack.id)) {
        entity.sendSystemMessage(Text.translate("curios.arsnouveau.discount_ring_denied").red(), true);
        event.setEquipResult($Tristate.FALSE);
        return $Tristate.FALSE;
      }
    }
  }
  catch(e){
  }
});

NativeEvents.onEvent("net.neoforged.neoforge.event.entity.EntityInvulnerabilityCheckEvent", (event)=>{
  let entity = event.getEntity()
  if (entity.type !="minecraft:end_crystal") return
  let source = event.getSource()
  let inBiome = entity.getLevel().getBiome(entity.blockPosition()).is("minecraft:the_void")
  let result = source.isCreativePlayer() ? event.getOriginalInvulnerability() : inBiome
  event.setInvulnerable(result)
})

ItemEvents.entityInteracted(event => {
  cancelOverWorldInteractions(event);
})
BlockEvents.rightClicked(event => {
  cancelOverWorldInteractions(event);
});

const cancelOverWorldInteractions = (event) => {
  const { player, entity, item, level } = event;
  if (player.isCreative()) return;
  if (level.dimension != "minecraft:overworld") return;
  if (entity?.type == "ftbechoes:echo") return;

  if (player.getMainHandItem().id == "minecraft:air" && player.getOffhandItem().id == "minecraft:air") return;
  event.cancel();
}

