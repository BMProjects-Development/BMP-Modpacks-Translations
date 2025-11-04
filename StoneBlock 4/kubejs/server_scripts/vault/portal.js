const $DoorType = Java.loadClass("earth.terrarium.tempad.api.sizing.DoorType");
const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');
const ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey');
const Registries = Java.loadClass('net.minecraft.core.registries.Registries');
const $NamedGlobalVec3 = Java.loadClass("earth.terrarium.tempad.api.locations.NamedGlobalVec3");
const $Color = Java.loadClass("com.teamresourceful.resourcefullib.common.color.Color");
const $TimeDoorEntity = Java.loadClass("earth.terrarium.tempad.common.entity.TimedoorEntity");

const SoundEvents = Java.loadClass("net.minecraft.sounds.SoundEvents");
const SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource");

let exitCoords = {};
const portalGun = "ftb:portal_gun";
const portalBlacklist = [
    "chisel_chipped_integration:laboratory_console", 
    "chisel_chipped_integration:laboratory_dotted_panel", 
    "chisel_chipped_integration:laboratory_fuzzy_screen", 
    "chisel_chipped_integration:laboratory_large_steel", 
    "chisel_chipped_integration:laboratory_large_tiles", 
    "chisel_chipped_integration:laboratory_left_faced_arrows", 
    "chisel_chipped_integration:laboratory_medium_tiles", 
    "chisel_chipped_integration:laboratory_right_faced_arrows", 
    "chisel_chipped_integration:laboratory_roundel", 
    "chisel_chipped_integration:laboratory_screen", 
    "chisel_chipped_integration:laboratory_small_steel", 
    "chisel_chipped_integration:laboratory_tiles", 
    "chisel_chipped_integration:laboratory_vents", 
    "chisel_chipped_integration:laboratory_white_panel",
    "chicken_roost:slime_block",
    "immersiveengineering:warning_sign_attention", 
    "immersiveengineering:warning_sign_magnet", 
    "immersiveengineering:warning_sign_cold", 
    "immersiveengineering:warning_sign_electric", 
    "immersiveengineering:warning_sign_hot", 
    "immersiveengineering:warning_sign_fire", 
    "immersiveengineering:warning_sign_falling", 
    "immersiveengineering:warning_sign_sound", 
    "immersiveengineering:warning_sign_ear_defenders", 
    "immersiveengineering:warning_sign_cat", 
    "immersiveengineering:warning_sign_villager", 
    "immersiveengineering:warning_sign_turret", 
    "immersiveengineering:warning_sign_creeper", 
    "immersiveengineering:warning_sign_shrieker", 
    "immersiveengineering:warning_sign_warden", 
    "immersiveengineering:warning_sign_arrow_up", 
    "immersiveengineering:warning_sign_arrow_down", 
    "immersiveengineering:warning_sign_arrow_left", 
    "immersiveengineering:warning_sign_arrow_right", 
    "immersiveengineering:warning_sign_arrow_double_up", 
    "immersiveengineering:warning_sign_arrow_double_down", 
    "immersiveengineering:warning_sign_arrow_double_left", 
    "immersiveengineering:warning_sign_arrow_double_right", 
    "framedblocks:framed_panel", 
    "framedblocks:framed_slope", 
    "framedblocks:framed_stairs", 
    "chisel_chipped_integration:factory_blue_circuits",
    "chisel_chipped_integration:factory_blue_framed_circuit",
    "chisel_chipped_integration:factory_blue_wireframe",
    "chisel_chipped_integration:factory_circuit",
    "chisel_chipped_integration:factory_dotted_rusty_plate",
    "chisel_chipped_integration:factory_gold_framed_purple_plates",
    "chisel_chipped_integration:factory_gold_plated_circuit",
    "chisel_chipped_integration:factory_grinder",
    "chisel_chipped_integration:factory_ice_ice_ice",
    "chisel_chipped_integration:factory_metalbox",
    "chisel_chipped_integration:factory_metal_column",
    "chisel_chipped_integration:factory_old_vents",
    "chisel_chipped_integration:factory_orange_white_caution_stripes",
    "chisel_chipped_integration:factory_rusty_plate",
    "chisel_chipped_integration:factory_segmented_rusty_plates",
    "chisel_chipped_integration:factory_slighly_rusty_plate",
    "chisel_chipped_integration:factory_vents",
    "chisel_chipped_integration:factory_very_rusty_plate",
    "chisel_chipped_integration:factory_wireframe",
    "chisel_chipped_integration:factory_yellow_black_caution_stripes",
    "framedblocks:framed_iron_door",
    "minecraft:player_head",
    "minecraft:skeleton_skull",
    "minecraft:redstone_wire",
    "minecraft:red_carpet",
    "minecraft:white_carpet",
    "minecraft:quartz_stairs",
    "minecraft:quartz_block",
    "minecraft:iron_trapdoor",
    "minecraft:piston",
    "minecraft:sticky_piston",
    "minecraft:white_stained_glass",
    "minecraft:lever",
    "minecraft:gold_block",
    "minecraft:note_block",
    "justdirethings:sensort2",
    "rftoolsutility:creative_screen",
    "simplylight:illuminant_block_on",
    "simplylight:lightbulb",
    "simplylight:edge_light_top",
    "simplylight:edge_light",
    "ae2:quartz_vibrant_glass",
    "enderio:dark_steel_bars",
    "immersiveengineering:metal_ladder_none",
    "minecraft:white_stained_glass",
    "chisel_chipped_integration:technical_cables",
    "chisel_chipped_integration:technical_caution_framed_plates",
    "chisel_chipped_integration:technical_engineering_pipes_0",
    "chisel_chipped_integration:technical_engineering_pipes_1",
    "chisel_chipped_integration:technical_engineering_pipes_2",
    "chisel_chipped_integration:technical_engineering_pipes_3",
    "chisel_chipped_integration:technical_exhaust_plating",
    "chisel_chipped_integration:technical_extremely_corroded_panels",
    "chisel_chipped_integration:technical_extremely_rusted_panels",
    "chisel_chipped_integration:technical_fan",
    "chisel_chipped_integration:technical_gears",
    "chisel_chipped_integration:technical_glowing_vent",
    "chisel_chipped_integration:technical_grate",
    "chisel_chipped_integration:technical_industrial_relic",
    "chisel_chipped_integration:technical_insulation",
    "chisel_chipped_integration:technical_large_pipes",
    "chisel_chipped_integration:technical_large_rusty_scaffold",
    "chisel_chipped_integration:technical_make_shift_plating",
    "chisel_chipped_integration:technical_malfunction_fan",
    "chisel_chipped_integration:technical_massive_fan",
    "chisel_chipped_integration:technical_massive_hexagonal_plating",
    "chisel_chipped_integration:technical_megacell",
    "chisel_chipped_integration:technical_old_vent",
    "chisel_chipped_integration:technical_pipes",
    "chisel_chipped_integration:technical_rusty_bolted_plates",
    "chisel_chipped_integration:technical_rusty_grate",
    "chisel_chipped_integration:technical_rusty_scaffold",
    "chisel_chipped_integration:technical_small_pipes",
    "chisel_chipped_integration:technical_still_fan",
    "chisel_chipped_integration:technical_transparent_fan",
    "chisel_chipped_integration:technical_transparent_rusty_scaffold",
    "chisel_chipped_integration:technical_transparent_still_fan",
    "chisel_chipped_integration:technical_vent",
    "chisel_chipped_integration:futura_gray_screen",
    "rftoolsutility:creative_screen",
    "minecraft:polished_blackstone",
    "immersiveengineering:steel_catwalk",
    "immersiveengineering:steel_fence",
    "simplylight:illuminant_red_block_on",
    "simplylight:illuminant_orange_block_on",
    "simplylight:illuminant_orange_block",
    "simplylight:illuminant_purple_block_on",
    "simplylight:illuminant_blue_block_on",
    "simplylight:illuminant_light_blue_block",
    "simplylight:illuminant_light_blue_block_on",
    "simplylight:illuminant_gray_block_on",
    "chisel:crate_dark/iron_block",
    "simplylight:illuminant_panel",
    "minecraft:glowstone",
    "minecraft:iron_door",
    "minecraft:coal_block",
    "minecraft:orange_concrete",
    "minecraft:blue_concrete",
    "minecraft:red_concrete",
    "minecraft:purple_concrete",
    "minecraft:blue_concrete",
    "minecraft:oak_stairs",
    "minecraft:oak_sign",
    "minecraft:barrier",
    "twilightforest:orange_force_field",
    "ftb:companion_cube",
    "ftb:test_cube"
];

// List of collectible cubes
const collectibleCubes = [
    "ftb:companion_cube",
    "ftb:test_cube"
];

//Collecting Companion Cubes with Portal Guns.
BlockEvents.rightClicked(event => {
    const { player, block, item, hand } = event;

    // Only main hand
    if (hand !== "MAIN_HAND") return;

    // Must be holding the portal gun
    if (String(item.id) !== "ftb:portal_gun") return;

    // Must be crouching (shift)
    // Disabled the Requirement for Shift + Click cause in some edge cases people
    // may get stuck inside Air Vents if they place a Cube inside it.
    // if (!player.isCrouching()) return;

    // Only act if the block is in our collectible list
    const blockId = String(block.id);
    if (!collectibleCubes.includes(blockId)) return;

    // Remove the block from the world
    block.set("minecraft:air");

    // Give the block back to the player, but with a Data that allows it to be placeable in Adventure Mode.
    if (blockId === "ftb:companion_cube") {
        player.give('ftb:companion_cube[can_place_on={predicates:[{blocks:"minecraft:gold_block"}]}]');
    } else if (blockId === "ftb:test_cube") {
        player.give('ftb:test_cube[can_place_on={predicates:[{blocks:"minecraft:gold_block"}]}]');
    } else {
        player.give(blockId); // fallback
    }

    // Play pickup sound
    player.level.playSound(
        null,
        player.x, player.y, player.z,
        SoundEvents.ITEM_PICKUP,
        SoundSource.PLAYERS,
        1.0,
        1.0
    );

    //Adding a Cooldown.
    player.addItemCooldown(event.item, 20);

    // Stop default right-click action
    event.cancel();
});

ItemEvents.rightClicked(portalGun, event => {

    const {player, level} = event;

    //If the Portal Gun is not in the Main Hand, It will not Work.
    if (event.hand != "MAIN_HAND") { return; };

    //If the Player is Crouching, Nothing Should Happen.
    // if (player.isCrouching()) return;
    
    //Ray Tracing the Block to place the Exit Portal at.
    const distance = 32;
    const trace = player.rayTrace(distance);
    if (!trace || !trace.block) {
        player.tell(Text.translate("ftb.vaults.portal.portalgun.reach").red());
        return;
    }
    
    const lookPos = trace.block.pos;
    const blockState = level.getBlock(lookPos);
    const blockId = String(blockState.id);
    lookPos.y++;
    exitCoords = {x: lookPos.x, y: lookPos.y, z: lookPos.z};

    if (!portalBlacklist.includes(blockId)) {

        //Checking if there's enough space for the Portal.
        if (!isSpaceClear(level, lookPos)) {
            player.level.playSound(null, player.x, player.y, player.z, SoundEvents.GENERIC_EXTINGUISH_FIRE, SoundSource.PLAYERS, 1.0, 1.0);
            player.tell(Text.translate("ftb.vaults.portal.portalgun.space").red());
            player.tell(Text.translate("ftb.vaults.portal.portalgun.wall").green());
            return;
        } else {
            player.level.playSound(null, player.x, player.y, player.z, SoundEvents.FIRECHARGE_USE, SoundSource.PLAYERS, 1.0, 1.0);
            //player.tell(Text.green("The Portal will be placed at:"));
            //player.tell(Text.green(`${blockId}, ${player.level.dimension}, X:${lookPos.x}, Y:${lookPos.y}, Z:${lookPos.z}`));
            spawnTimeDoor(level, player, exitCoords, player.level.dimension, $Color.RAINBOW);
        }
        
    } else { 
        player.level.playSound(null, player.x, player.y, player.z, SoundEvents.GENERIC_EXTINGUISH_FIRE, SoundSource.PLAYERS, 1.0, 1.0);
        player.tell(Text.translate("ftb.vaults.portal.portalgun.placement_fail").red());
        return;
    }

    //Adding a Cooldown.
    player.addItemCooldown(event.item, 20);

});

// Checks if space is clear
function isSpaceClear(level, pos) {
    // Height of the door in blocks
    const height = 2;
    const width = 1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let checkPos = pos.offset(x, y, 0);
            let blockState = level.getBlock(checkPos);
            let id = String(blockState.id);
                
            // If the block is not air, fail
            if (id !== "minecraft:air") {
                return false;
            }
        }
    }
    return true;
}

