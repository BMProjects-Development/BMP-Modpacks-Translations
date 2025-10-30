let $ItemCost = Java.loadClass("net.minecraft.world.item.trading.ItemCost");
let $MerchantOffer = Java.loadClass(
  "net.minecraft.world.item.trading.MerchantOffer"
);
let $VillagerTrades$ItemListing = Java.loadClass(
  "net.minecraft.world.entity.npc.VillagerTrades$ItemListing"
);
// priority: 800
const event_trader = {
  name: "ftb:wandering_trader",
  displayName: "Wandering Trader",
  description:
    "Toggles the Villager Event. Has a random chance of spawning a Wanderer Trader.",
  chance: 0.2,
  minDistance: 2,
  maxDistance: 20,
  size: 0,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: true,
  stage: null,
  disableStage: null,

  execute(event, player, location, name) {
    const level = player.getLevel();
    const checkAmountOfTraders = new Ku.Level(level).findEntitiesWithinRadius(
      "minecraft:wandering_trader",
      location.pos,
      64
    );

    if(checkAmountOfTraders.length >= 2){
      Statistics().addFailure(this.displayName);
      Statistics().removeSuccess(this.displayName);
      if(Math.random() < 0.5) {
        eventSystem(event);
      }
      return;
    }

    player.tell(Text.translate("ftb.event.wandering_trader.spawned",location.pos.x,location.pos.y, location.pos.z));

    let entityWandering = level.createEntity("minecraft:wandering_trader");
    if (name) {
      entityWandering.setCustomName(name);
      entityWandering.setCustomNameVisible(true);
    }
    entityWandering.setPosition(
      location.pos.x + 0.5,
      location.pos.y + 0.5,
      location.pos.z + 0.5
    );
    entityWandering.spawn();
    
  },
};

const heads = [
  "Artpoke_",
  "desht",
  "DinnerBeef",
  "ErrorMikey",
  "Everlipse",
  "Gaz492",
  "Jake_Evans",
  "kSunekaer",
  "manmaed",
  "OfficialyAwsome",
  "Saereth",
  "Nyxane",
  "twsparklecat",
  "LegendaryRylex",
  "slowpoke101",
  "Squidgyface1478",
  "TheonlyTazz",
  "UnRealDinnerbone",
];

const wanderingTradertrades = [
  {
    input: { id: "irregular_implements:ectoplasm", count: 1 },
    output: { id: "mob_grinding_utils:delightful_dirt", count: 4 },
    maxUses: 1,
  },
  {
    input: { id: "minecraft:red_mushroom", count: 1 },
    output: { id: "irregular_implements:glowing_mushroom", count: 4 },
    maxUses: 8,
  },
  {
    input: { id: "immersiveengineering:ersatz_leather", count: 4 },
    output: { id: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:silk_touch":1}}]', count: 1 },
    maxUses: 1,
  },
  {
    input: { id: "occultism:otherflower", count: 1 },
    output: { id: "ars_nouveau:magebloom_crop", count: 1 },
    maxUses: 4,
  },
    {
    input: { id: "ae2:fluix_pearl", count: 1 },
    output: { id: "ae2:mysterious_cube", count: 1 },
    maxUses: 1,
  },
  {
    input: { id: "minecraft:emerald", count: 1 },
    output: { id: "minecraft:diamond", count: 1 },
    maxUses: 10,
  },
  {
    input: { id: "minecraft:ender_pearl", count: 1 },
    output: { id: "simpleteleporters:teleporter", count: 1 },
    maxUses: 1,
  },
  {
    input: { id: "minecraft:nether_wart", count: 4 },
    output: { id: "ars_nouveau:bastion_pod", count: 1 },
    maxUses: 4,
  },
  {
    input: { id: "minecraft:emerald", count: 1 },
    output: { id: "minecraft:podzol", count: 16 },
    maxUses: 12,
  },
  {
    input: { id: "minecraft:emerald", count: 1 },
    output: { id: "minecraft:mycelium", count: 8 },
    maxUses: 12,
  },
  {
    input: { id: "minecraft:emerald", count: 1 },
    output: { id: "minecraft:small_dripleaf", count: 2 },
    maxUses: 10,
  },
  {
    input: { id: "minecraft:emerald", count: 1 },
    output: { id: "minecraft:big_dripleaf", count: 2 },
    maxUses: 10,
  },
];

EntityEvents.spawned((event) => {
  const { entity, server } = event;
  if (entity.type !== "minecraft:wandering_trader") return;

  let merchantOffers = entity.getOffers();
  entity.getOffers().clear();

  // MerchantOffer(ItemCost baseCostA, ItemStack result, int maxUses, int xp, float priceMultiplier)
  let offer = new $MerchantOffer(
    new $ItemCost("minecraft:bamboo", 1),
    Item.of("constructionstick:iron_stick"),
    1,
    0,
    0
  );

  merchantOffers.push(offer);

  wanderingTradertrades.forEach((trade) => {
    let input = Item.of(trade.input.id);
    let output = Item.of(trade.output.id, trade.output.count);
    let offer = new $MerchantOffer(
      new $ItemCost(input, trade.input.count || 1),
      output,
      trade.maxUses,
      0,
      0
    );
    merchantOffers.push(offer);
  });

  let headsCopy = [];
  headsCopy = Array.from(heads);

  server.players.forEach((player) => {
    if (!headsCopy.some((n) => n === player.username)) {
      headsCopy.push(player.username);
    }
  });

  //Shuffling the heads array a lot
  headsCopy = headsCopy
    .sort(() => Math.random() - 0.6)
    .sort(() => Math.random() - 0.2)
    .sort(() => Math.random() - 0.1);

  headsCopy.slice(0, 3).forEach((name) => {
    //Get random price between 1 and 3
    let price = Math.round(Math.random() * 3 + 1);
    let offer = new $MerchantOffer(
      new $ItemCost("minecraft:emerald", price),
      Item.of(`minecraft:player_head[profile=${name}]`),
      1,
      0,
      0
    );
    merchantOffers.push(offer);
  });

  entity.setDespawnDelay(48000);
});
