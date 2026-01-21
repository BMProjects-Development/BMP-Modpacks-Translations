'use strict';

var StartEvent    = Java.loadClass('net.neoforged.neoforge.event.level.ExplosionEvent$Start');
var DetonateEvent = Java.loadClass('net.neoforged.neoforge.event.level.ExplosionEvent$Detonate');
var BlockPos      = Java.loadClass('net.minecraft.core.BlockPos');

// --- Explosion center as [x,y,z] without optional chaining/nullish ---
function getExplosionXYZ(explosion) {
  if (!explosion) return null;

  var c = null;
  if (typeof explosion.center === 'function') c = explosion.center();
  else if (explosion.center) c = explosion.center;
  if (!c) return null;

  var x = (typeof c.x === 'function') ? c.x() : (c.x !== undefined ? c.x : (typeof c.getX === 'function' ? c.getX() : undefined));
  var y = (typeof c.y === 'function') ? c.y() : (c.y !== undefined ? c.y : (typeof c.getY === 'function' ? c.getY() : undefined));
  var z = (typeof c.z === 'function') ? c.z() : (c.z !== undefined ? c.z : (typeof c.getZ === 'function' ? c.getZ() : undefined));

  return (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') ? [x, y, z] : null;
}

// --- Resolve biome id at BlockPos to "namespace:path" ---
function getBiomeId(level, pos) {
  // level.getBiome(pos) -> Holder<Biome>
  var holder = level.getBiome(pos);

  // Holder.unwrapKey(): Optional<ResourceKey<Biome>>
  var opt = (holder && typeof holder.unwrapKey === 'function') ? holder.unwrapKey() : null;
  if (opt && typeof opt.isPresent === 'function' && opt.isPresent()) {
    var key = opt.get(); // ResourceKey<Biome>
    var loc = (typeof key.location === 'function') ? key.location() : key.location;
    return String(loc); // "minecraft:plains", etc.
  }

  // Fallback
  if (holder && typeof holder.key === 'function') {
    var key2 = holder.key();
    var loc2 = (typeof key2.location === 'function') ? key2.location() : key2.location;
    if (loc2) return String(loc2);
  }

  return String(holder);
}

function isBiome(level, x, y, z, targetId) {
  var pos = BlockPos.containing(x, y, z);
  return getBiomeId(level, pos) === targetId;
}

// 1) Cancel explosions if in the void
NativeEvents.onEvent(StartEvent, function (event) {
  var level = event.getLevel();
  var explosion = (typeof event.getExplosion === 'function') ? event.getExplosion() : event.getExplosion;
  var xyz = getExplosionXYZ(explosion);
  if (!xyz) return;

  var x = xyz[0], y = xyz[1], z = xyz[2];
  if (isBiome(level, x, y, z, 'minecraft:the_void')) {
    event.setCanceled(true);
  }
});

// 2) strip Detonate effects in minecraft:the_void
NativeEvents.onEvent(DetonateEvent, function (event) {
  var level = event.getLevel();
  var explosion = (typeof event.getExplosion === 'function') ? event.getExplosion() : event.getExplosion;
  var xyz = getExplosionXYZ(explosion);
  if (!xyz) return;

  var x = xyz[0], y = xyz[1], z = xyz[2];
  if (!isBiome(level, x, y, z, 'minecraft:the_void')) return;

  var blocks = (typeof event.getAffectedBlocks === 'function') ? event.getAffectedBlocks() : event.getAffectedBlocks;
  var ents   = (typeof event.getAffectedEntities === 'function') ? event.getAffectedEntities() : event.getAffectedEntities;

  if (blocks && typeof blocks.clear === 'function') blocks.clear(); // stop block damage
  if (ents && typeof ents.clear === 'function')     ents.clear();   // stop knockback/damage list
});
