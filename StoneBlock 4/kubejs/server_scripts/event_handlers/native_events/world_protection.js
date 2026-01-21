const $Tristate = Java.loadClass("net.neoforged.neoforge.common.util.TriState");
const $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier");
const $EchoManager = Java.loadClass("dev.ftb.mods.ftbechoes.echo.EchoManager");
const $ShoppingKey = Java.loadClass("dev.ftb.mods.ftbechoes.shopping.ShoppingKey");
const $EchoArgumentType = Java.loadClass("dev.ftb.mods.ftbechoes.command.EchoArgumentType");

const SB4$WE_BLACKLIST_BLOCKS = [
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
];

const ARS_DISCOUNT_RINGS = [
  "ars_nouveau:ring_of_lesser_discount",
  "ars_nouveau:ring_of_greater_discount",
];

function safeString(val) {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  if (typeof val === "function") return String(val());
  if (typeof val.toString === "function") return String(val.toString());
  return String(val);
}

function safeNumber(val) {
  if (val === null || val === undefined) return 0;
  if (typeof val === "number") return val;
  if (typeof val === "function") return Number(val());
  if (typeof val.doubleValue === "function") return val.doubleValue();
  if (typeof val.floatValue === "function") return val.floatValue();
  if (typeof val.intValue === "function") return val.intValue();
  return Number(val) || 0;
}

function getResourceLocationString(val) {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val.unwrapKey === "function") {
    let optKey = val.unwrapKey();
    if (optKey && typeof optKey.isPresent === "function" && optKey.isPresent()) {
      return String(optKey.get().location());
    }
  }
  if (typeof val.location === "function") return String(val.location());
  if (val.getNamespace && val.getPath) return val.getNamespace() + ":" + val.getPath();
  return safeString(val);
}

function getOperationString(val) {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val.getSerializedName === "function") return String(val.getSerializedName());
  if (typeof val.name === "function") return String(val.name()).toLowerCase();
  return safeString(val).toLowerCase();
}

function normalizeModifierEntry(entry) {
  if (!entry) return null;

  let amount, id, operation, slot, type;

  let modifier = typeof entry.modifier === "function" ? entry.modifier() : entry.modifier;
  let attribute = typeof entry.attribute === "function" ? entry.attribute() : entry.attribute;
  slot = typeof entry.slot === "function" ? entry.slot() : entry.slot;

  if (modifier || attribute) {
    if (modifier) {
      amount = typeof modifier.amount === "function" ? modifier.amount() : modifier.amount;
      id = typeof modifier.id === "function" ? modifier.id() : modifier.id;
      operation = typeof modifier.operation === "function" ? modifier.operation() : modifier.operation;
    }
    type = attribute;
  } else {
    amount = typeof entry.amount === "function" ? entry.amount() : entry.amount;
    id = typeof entry.id === "function" ? entry.id() : entry.id;
    operation = typeof entry.operation === "function" ? entry.operation() : entry.operation;
    type = typeof entry.type === "function" ? entry.type() : entry.type;
  }

  return {
    amount: safeNumber(amount),
    id: getResourceLocationString(id),
    operation: getOperationString(operation),
    slot: safeString(slot),
    type: getResourceLocationString(type),
  };
}

function extractModifiers(comp) {
  if (!comp) return [];

  let mods = null;
  if (typeof comp.modifiers === "function") {
    mods = comp.modifiers();
  } else if (typeof comp.getModifiers === "function") {
    mods = comp.getModifiers();
  } else if (comp.modifiers !== undefined && comp.modifiers !== null) {
    mods = comp.modifiers;
  }

  if (!mods) return [];

  let result = [];

  if (typeof mods.size === "function" && typeof mods.get === "function") {
    for (let i = 0; i < mods.size(); i++) {
      let entry = normalizeModifierEntry(mods.get(i));
      if (entry && entry.type) result.push(entry);
    }
    return result;
  }

  if (Array.isArray(mods)) {
    mods.forEach((raw) => {
      let entry = normalizeModifierEntry(raw);
      if (entry && entry.type) result.push(entry);
    });
    return result;
  }

  if (typeof mods.length === "number") {
    for (let i = 0; i < mods.length; i++) {
      let entry = normalizeModifierEntry(mods[i]);
      if (entry && entry.type) result.push(entry);
    }
    return result;
  }

  if (typeof mods.forEach === "function") {
    mods.forEach((raw) => {
      let entry = normalizeModifierEntry(raw);
      if (entry && entry.type) result.push(entry);
    });
    return result;
  }

  if (typeof mods[Symbol.iterator] === "function") {
    for (let raw of mods) {
      let entry = normalizeModifierEntry(raw);
      if (entry && entry.type) result.push(entry);
    }
    return result;
  }

  return result;
}

function getBaseDimString(base) {
  const dim = base.dimension();
  if (!dim) return "";
  if (dim.getNamespace && dim.getPath) return dim.getNamespace() + ":" + dim.getPath();
  if (dim.namespace && dim.path) return dim.namespace + ":" + dim.path;
  return String(dim);
}

function getLevelDimString(level) {
  if (!level) return "";
  let dim = level.dimension;
  if (typeof dim === "function") dim = dim.call(level);
  if (!dim) return "";
  if (typeof dim === "string") return dim;
  if (dim.getNamespace && dim.getPath) return dim.getNamespace() + ":" + dim.getPath();
  if (dim.namespace && dim.path) return dim.namespace + ":" + dim.path;
  return String(dim);
}

function cancelOverWorldInteractions(event) {
  const { player, entity, level } = event;
  if (player.isCreative()) return;
  if (level.dimension != "minecraft:overworld") return;
  if (entity?.type == "ftbechoes:echo") return;
  if (player.getMainHandItem().id == "minecraft:air" && player.getOffhandItem().id == "minecraft:air") return;
  event.cancel();
}

BlockEvents.broken(SB4$WE_BLACKLIST_BLOCKS, (event) => {
  let entity = event.getEntity();
  let player = event.getPlayer();
  let block = event.getBlock();

  if (isPlayerInCreativeSpectator(player)) return;
  if (!isEntityInPlayerDimension(entity, player)) return;
  if (!isEntityInBiome(entity, "minecraft:the_void")) return;
  if (!isBlockInAABB(block.getPos(), AABB.of(61, 27, -62, -57, -61, 56))) return;

  event.cancel();
});

BlockEvents.rightClicked("minecraft:bed", (event) => {
  event.cancel();
});

BlockEvents.placed(
  SB4$WE_BLACKLIST_BLOCKS.concat([
    "minecraft:tnt",
    "projecte:nova_catalyst",
    "projecte:nova_cataclysm",
  ]),
  (event) => {
    let entity = event.getEntity();
    let player = event.getPlayer();
    let block = event.getBlock();

    if (isPlayerInCreativeSpectator(player)) return;
    if (!isEntityInPlayerDimension(entity, player)) return;
    if (!isEntityInBiome(entity, "minecraft:the_void")) return;
    if (!isBlockInAABB(block.getPos(), AABB.of(61, 27, -62, -57, -61, 56))) return;

    event.cancel();
  }
);

NativeEvents.onEvent("top.theillusivec4.curios.api.event.CurioCanEquipEvent", (event) => {
  const { stack, entity } = event;
  try {
    if (!entity.isPlayer()) return;
    for (let i = 0; i < entity.equippedCurios.getSlots(); i++) {
      let equipped = entity.equippedCurios.getStackInSlot(i);
      if (ARS_DISCOUNT_RINGS.includes(equipped.id) && ARS_DISCOUNT_RINGS.includes(stack.id)) {
        entity.sendSystemMessage(Text.translate("curios.arsnouveau.discount_ring_denied").red(), true);
        event.setEquipResult($Tristate.FALSE);
        return $Tristate.FALSE;
      }
    }
  } catch (e) {}
});

NativeEvents.onEvent("net.neoforged.neoforge.event.entity.EntityInvulnerabilityCheckEvent", (event) => {
  let entity = event.getEntity();
  if (entity.type != "minecraft:end_crystal") return;

  let source = event.getSource();
  let inBiome = entity.getLevel().getBiome(entity.blockPosition()).is("minecraft:the_void");
  let result = source.isCreativePlayer() ? event.getOriginalInvulnerability() : inBiome;
  event.setInvulnerable(result);
});

ItemEvents.entityInteracted((event) => {
  cancelOverWorldInteractions(event);
});

BlockEvents.rightClicked((event) => {
  cancelOverWorldInteractions(event);
});

NativeEvents.onEvent("net.neoforged.neoforge.event.ItemAttributeModifierEvent", (event) => {
  if (event.getItemStack() == "projecte:gem_boots") {
    event.addModifier(
      "neoforge:creative_flight",
      $AttributeModifier("ftb:echo_add_value", 1, "add_value"),
      "feet"
    );
  }
});

ItemEvents.rightClicked("create:handheld_worldshaper", (event) => {
  const player = event.player;
  const level = event.level;

  if (!player || !level) return;
  if (level.isClientSide()) return;

  if (typeof $BaseInstanceManager === "undefined") {
    console.log("Worldshaper guard: $BaseInstanceManager not defined, skipping base check");
    return;
  }

  const baseOpt = $BaseInstanceManager.get(player.server).getBaseForPlayer(player);

  if (!baseOpt || !baseOpt.isPresent || !baseOpt.isPresent()) {
    event.cancel();
    return;
  }

  const base = baseOpt.get();
  const baseDimStr = getBaseDimString(base);
  const currentDimStr = getLevelDimString(level);

  if (baseDimStr !== currentDimStr) {
    event.cancel();
  }
});

ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event;
  const { DOUBLE: DoubleArgument, PLAYER: PlayerArgument, STRING: StringArgument } = Arguments;
  const ResourceArgument = Arguments.registry(event, "minecraft:attribute");

  function refund(player, amount) {
    let name = player.getUsername();
    player.sendSystemMessage(Text.translate("ftb.shop.player_upgrade.refund", amount).green(), true);
    player.getServer().runCommandSilent(`coins add ${name} ${amount}`);
  }

  function addModifier(ctx, operation) {
    let attribute = ResourceArgument.getResult(ctx, "attribute");
    let value = DoubleArgument.getResult(ctx, "value");
    let limit = DoubleArgument.getResult(ctx, "limit");
    let player = ctx.getSource().getPlayerOrException();
    let echo = $EchoArgumentType.get(ctx, "echo");
    let shop_name = StringArgument.getResult(ctx, "shop_name");
    let item = player.getMainHandItem();

    let cost = -1;
    $EchoManager
      .getServerInstance()
      .getShopData($ShoppingKey(echo.id(), shop_name))
      .ifPresent((data) => {
        cost = data.cost();
      });

    if (cost === -1) {
      player.sendSystemMessage(Text.translate("ftb.shop.player_upgrade.no_shop_error").red(), true);
      cost = 0;
    }

    if (item.isEmpty() || !item.hasTag("curios:player_upgrade")) {
      ctx.getSource().sendSystemMessage(Text.translate("ftb.shop.player_upgrade.no_item").yellow());
      refund(player, cost);
      return 1;
    }

    let attrId = "";
    try {
      if (attribute && typeof attribute.unwrapKey === "function") {
        let optKey = attribute.unwrapKey();
        if (optKey && optKey.isPresent && optKey.isPresent()) {
          attrId = String(optKey.get().location());
        }
      } else if (attribute && typeof attribute.key === "function") {
        attrId = String(attribute.key().location());
      }
    } catch (e) {
      console.error("echo_attribute: failed to unwrap attribute key", e);
    }

    if (!attrId) {
      ctx.getSource().sendSystemMessage(Text.literal("echo_attribute: invalid attribute").red());
      refund(player, cost);
      return 1;
    }

    let comp = item.get("curios:attribute_modifiers");

    let showTooltip = true;
    if (comp) {
      if (typeof comp.show_in_tooltip === "boolean") {
        showTooltip = comp.show_in_tooltip;
      } else if (typeof comp.showInTooltip === "function") {
        showTooltip = comp.showInTooltip();
      } else if (typeof comp.getShowInTooltip === "function") {
        showTooltip = comp.getShowInTooltip();
      }
    }

    let existing = extractModifiers(comp);
    let echoTotals = {};
    let others = [];

    existing.forEach((entry) => {
      if (!entry) return;

      let isEcho =
        entry.slot === "player_upgrade" &&
        typeof entry.type === "string" &&
        entry.type.length > 0 &&
        typeof entry.id === "string" &&
        entry.id.startsWith("ftb:echo_") &&
        typeof entry.operation === "string";

      if (isEcho) {
        let key = entry.type + "|" + entry.operation;
        echoTotals[key] = (echoTotals[key] || 0) + (entry.amount || 0);
      } else {
        others.push(entry);
      }
    });

    let newKey = attrId + "|" + operation;
    let currentTotal = echoTotals[newKey] || 0;
    let newTotal = currentTotal + value;

    if (newTotal > limit) {
      ctx.getSource().sendSystemMessage(
        Text.translate("ftb.shop.player_upgrade.limit_reached", limit, item.getDisplayName()).yellow()
      );
      refund(player, cost);
      return 1;
    }

    echoTotals[newKey] = newTotal;

    let newMods = others.slice();

    Object.keys(echoTotals).forEach((key) => {
      let total = echoTotals[key];
      if (!total) return;

      let sep = key.indexOf("|");
      let typeStr = key.substring(0, sep);
      let opStr = key.substring(sep + 1);
      let rand = Math.floor(Math.random() * 2147483647);

      newMods.push({
        amount: total,
        id: `ftb:echo_${opStr}_${rand}`,
        operation: opStr,
        slot: "player_upgrade",
        type: typeStr,
      });
    });

    item.set("curios:attribute_modifiers", {
      show_in_tooltip: showTooltip,
      modifiers: newMods,
    });

    return 1;
  }

  let root = Commands.literal("echo_attribute")
    .requires((src) => src.hasPermission(2))
    .then(
      Commands.argument("echo", $EchoArgumentType.echo()).then(
        Commands.argument("shop_name", StringArgument.create(event)).then(
          Commands.argument("target", PlayerArgument.create(event)).then(
            Commands.argument("attribute", ResourceArgument.create(event)).then(
              Commands.literal("modifier").then(
                Commands.literal("add").then(
                  Commands.argument("value", DoubleArgument.create(event)).then(
                    Commands.argument("limit", DoubleArgument.create(event))
                      .then(Commands.literal("add_value").executes((ctx) => addModifier(ctx, "add_value")))
                      .then(Commands.literal("add_multiplied_base").executes((ctx) => addModifier(ctx, "add_multiplied_base")))
                      .then(Commands.literal("add_multiplied_total").executes((ctx) => addModifier(ctx, "add_multiplied_total")))
                  )
                )
              )
            )
          )
        )
      )
    );

  event.register(root);
});

const bedLimit = 128
NativeEvents.onEvent("net.neoforged.neoforge.event.entity.player.PlayerSetSpawnEvent", (event)=>{
  let player = event.getEntity()
  if (player == null) return

  let level = player.getLevel()
  if (level == null) return
  
  let blockpos = event.getNewSpawn()
  if (blockpos == null) return
  
  let block = level.getBlockState(blockpos)
  if (!(block.isBed(level, blockpos, player))) return

  let base = $BaseInstanceManager.get(player.getServer()).getBaseForPlayer(player)
  if (base.isEmpty()) return

  let pos = base.get().spawnPos()
  let dist = pos.atY(0).distToCenterSqr(blockpos.x, 0, blockpos.z)
  dist = Math.sqrt(dist).toFixed(2)
  if (dist <= bedLimit) return

  player.sendSystemMessage(Text.translate("ftb.bed.denied", `X: ${pos.x}, Z: ${pos.z}`, dist, bedLimit).red())
  event.setCanceled(true)
})