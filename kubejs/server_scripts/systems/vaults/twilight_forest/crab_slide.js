const $LivingEntity = Java.loadClass("net.minecraft.world.entity.LivingEntity");
const $Vec3 = Java.loadClass("net.minecraft.world.phys.Vec3");

const SB4_SLIDE = {
  initialSpeed: 0.9,
  decay: 0.95,
  minSpeed: 0.05,
  maxTicks: 20,
  requireIce: true,
  noGravityDuringSlide: true,
};

// Mark puzzle crabs by setting ent.persistentData.putInt("sb4_docile", 1) at spawn
function isDocile(ent) {
  return ent.persistentData.sb4_docile == 1;
}

function toCardinal(dx, dz) {
  if (Math.abs(dx) >= Math.abs(dz)) return { x: dx >= 0 ? 1 : -1, z: 0 };
  return { x: 0, z: dz >= 0 ? 1 : -1 };
}

let slideAbleBlocks = [
  "minecraft:ice",
  "minecraft:blue_ice",
  "minecraft:frosted_ice",
  "minecraft:packed_ice",
  "minecraft:lime_wool",
  "minecraft:red_wool",
]

function isOnIce(ent) {
  if (!SB4_SLIDE.requireIce) return true;
  try {
    let block = ent.block.offset(0, -1, 0).id
    return slideAbleBlocks.includes(block.toString());
  } catch (_) {
    return false;
  }
}

// Cancel outgoing damage from docile crabs
EntityEvents.beforeHurt("minecraft:player", (event) => {
  const { entity, source } = event;

  const attacker = source?.actual;
  if (!attacker) return;

  const attackerTypeId = attacker.type?.id;
  if (attackerTypeId !== "twilightforest:helmet_crab") return;
  if (attacker.persistentData?.getInt("sb4_docile") === 1) {
    event.cancel();
  }
});

//  Start slide on player hit
EntityEvents.beforeHurt("twilightforest:helmet_crab", (event) => {
  const { entity } = event;

  const attacker = event.source?.actual;
  if (!attacker || !attacker.isPlayer()) return;
  event.setDamage(0); // keep hit feedback, no damage

  if (!isOnIce(entity)) return;


  const dx = entity.x - attacker.x;
  const dz = entity.z - attacker.z;

  const dirX = Math.abs(dx) >= Math.abs(dz) ? (dx >= 0 ? 1 : -1) : 0;
  const dirZ = Math.abs(dz) > Math.abs(dx) ? (dz >= 0 ? 1 : -1) : 0;

  const data = entity.persistentData;
  data.putInt("sb4_slide_active", 1);
  data.putInt("sb4_slide_dir_x", dirX);
  data.putInt("sb4_slide_dir_z", dirZ);
  data.putDouble("sb4_slide_speed", SB4_SLIDE.initialSpeed);
  data.putInt("sb4_slide_ticks", 0);
  if (SB4_SLIDE.noGravityDuringSlide) entity.setNoGravity(true);
  // entity.setNoAi(true);

});


NativeEvents.onEvent("net.neoforged.neoforge.event.entity.living.LivingBreatheEvent", (event) => {
  const { entity } = event;
  try{
    if (entity.type != "twilightforest:helmet_crab") return;
      let data = entity.persistentData;

      let dirX = data.getInt("sb4_slide_dir_x");
      let dirZ = data.getInt("sb4_slide_dir_z") ;

      if(entity.block.offset(0, -1, 0).id == "minecraft:red_wool" && data.getInt("sb4_slide_active") === 0) {
          let entities = entity.level.getEntities().filter(e => e.type == "minecraft:player" && e.distanceToEntity(entity) < 64);
          entities.forEach(player => {
            if (!player.stages.has("tf_snow")) {
              player.stages.add("tf_snow");
              player.sendSystemMessage("§6You have obtained the §e'TF Snow'§6 stage!", true);
            }
          });
      }

      if (data.getInt("sb4_slide_active") !== 1) return;

      let ticks = data.getInt("sb4_slide_ticks");
      let speed = data.getDouble("sb4_slide_speed");


      let stop = ticks > SB4_SLIDE.maxTicks || speed < SB4_SLIDE.minSpeed || !isOnIce(entity);
      if (stop) {
        data.putInt("sb4_slide_active", 0);
        data.putInt("sb4_slide_ticks", 0);
        data.putDouble("sb4_slide_speed", 0);
        data.putInt("sb4_slide_dir_x", 0);
        data.putInt("sb4_slide_dir_z", 0);


        // Stay AI off if this crab is flagged docile, else restore AI
        // entity.setNoAi(isDocile(entity) ? true : false);

        // Restore gravity after the slide
        if (SB4_SLIDE.noGravityDuringSlide) entity.setNoGravity(false);

        // Kill horizontal motion and Y drift
        entity.setDeltaMovement($Vec3.ZERO);
        return;
      }


      let yVel = SB4_SLIDE.noGravityDuringSlide ? 0 : entity.deltaMovement.y;
      entity.setDeltaMovement(new $Vec3(dirX * speed, yVel, dirZ * speed));
      entity.hurtMarked = true; // Force velocity update


      // console.log(`  -> dir ${dirX}, ${dirZ}`);
      // console.log(`  -> vel ${entity.deltaMovement.x}, ${entity.deltaMovement.y}, ${entity.deltaMovement.z}`);

      // Decay speed and increment tick count
      data.putDouble("sb4_slide_speed", speed * SB4_SLIDE.decay);
      data.putInt("sb4_slide_ticks", ticks + 1);  
  }catch (e) { console.log(e); }

});
const $Attributes = Java.loadClass("net.minecraft.world.entity.ai.attributes.Attributes");
EntityEvents.spawned("twilightforest:helmet_crab", (event) => {
  const { entity, level, server } = event;
  // const dimension = entity.level.dimension; // e.g. "ftb:trial_vault"
  // if (dimension !== "ftb:trial_vault") return;
  entity.getAttributes().getInstance($Attributes.MOVEMENT_SPEED).setBaseValue(0.0);
  entity.persistentData.putInt("sb4_docile", 1);
  entity.getAttributes().getInstance($Attributes.KNOCKBACK_RESISTANCE).setBaseValue(1.0);
  entity.getAttributes().getInstance($Attributes.STEP_HEIGHT).setBaseValue(0.0);
  // entity.setNoAi(true);
});


const customTick = (entity, tickDelay, callback) => {
  if (!entity || !entity.isAlive()) {
    console.log(`[customTick] Entity ${entity ? entity.type : "unknown"} is not alive`);
    return;
  }

  if (callback){
    try {
      callback(entity);
    } catch (error) {
      console.log(`[customTick] Error occurred while processing entity ${entity.id}:`,error);
    }
  }

  entity.getServer().scheduleInTicks(tickDelay, () =>
    customTick(entity, tickDelay, callback)
  );
};
