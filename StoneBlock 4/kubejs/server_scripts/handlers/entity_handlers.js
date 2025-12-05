let $SalvagingMenu = Java.loadClass("dev.shadowsoffire.apotheosis.affix.salvaging.SalvagingMenu")

const RANGETYPE = {
  BLOCK: "block",
  CHUNK: "chunk",
};

const SPIRIT_SETTINGS = {
  maxAmount: 2,
  range: 1,
  rangeType: RANGETYPE.CHUNK,
};

EntityEvents.checkSpawn("irregular_implements:spirit", (event) => {
  const { entity, level } = event;
  let range =
    SPIRIT_SETTINGS.rangeType === RANGETYPE.CHUNK
      ? SPIRIT_SETTINGS.range * 16
      : SPIRIT_SETTINGS.range;
  let aabb = entity.getBoundingBox().inflate(range, range, range);

  let spirits = level.getEntities(entity, aabb);
  if (spirits.size() > SPIRIT_SETTINGS.maxAmount) {
    //console.log(`Removed spirit at ${entity.blockPosition().toString()} due to exceeding max amount of spirits in range.`);
    event.cancel();
  }
});


EntityEvents.beforeHurt("cataclysm:ignis", event => {
    const level = event.level
    if (level.isClientSide()) return

    const source = event.source
    if (!source) return

    const player = source.player
    if (!player) return  // only care about player attacks

    const offhand = player.getOffhandItem()
    if (offhand.isEmpty() || offhand.id !== "cataclysm:music_disc_ignis") {
        return
    }

    // Triple the damage dealt to Ignis
    if (typeof event.amount === "number") {
        event.amount = event.amount * 3
    }
})

EntityEvents.drops((event) => {
  if (event.getEntity() instanceof $Player || !(event.getEntity().isMonster())) return
  let actual = event.getSource().getActual()

  let new_items_list = [];

  if (isEntityRealPlayer(actual)) {

  } else {
    event.getDrops().removeIf((item) => {
      if (item.getItem().has("apotheosis:rarity") || item.getItem().has("apotheosis:gem")) {
        $SalvagingMenu.getSalvageResults(event.getLevel(), item.getItem()).forEach((new_item)=>{
          new_items_list.push(new_item)
        })
        return true
      } else {
        return false
      }
    })
    new_items_list.forEach((item)=> {
      event.addDrop(item)
    })
  }
})

EntityEvents.spawned(["justdirethings:portal_entity","justdirethings:portal_projectile"], (event) => {
  if (event.getLevel().isOverworld()) {
    event.getEntity().discard()
    event.cancel()
  }
})