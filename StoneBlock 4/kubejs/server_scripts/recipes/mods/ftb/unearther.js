// priority: 100002

const VillagerProfessions = Object.freeze({
  FARMER: "minecraft:farmer",
  FISHERMAN: "minecraft:fisherman",
  SHEPHERD: "minecraft:shepherd",
  FLETCHER: "minecraft:fletcher",
  CLERIC: "minecraft:cleric",
  WEAPONSMITH: "minecraft:weaponsmith",
  ARMORER: "minecraft:armorer",
  TOOLSMITH: "minecraft:toolsmith",
  LIBRARIAN: "minecraft:librarian",
  CARTOGRAPHER: "minecraft:cartographer",
  LEATHERWORKER: "minecraft:leatherworker",
  BUTCHER: "minecraft:butcher",
  MASON: "minecraft:mason",
  NITWIT: "minecraft:nitwit",
  UNEMPLOYED: "minecraft:none",
  ARCHAEOLOGIST: "ftb:archaeologist",
  GEOLOGIST: "ftb:geologist",
  DIMENSIONALIST: "ftb:dimensionalist",
});

const uneartherRecipes = {
  professions: [
    {
      profession: VillagerProfessions.ARCHAEOLOGIST,
      inputBlocks: [
        {
          inputBlock: "minecraft:mud",
          tool: "#c:tools/brush",
          tiers: [
            {
              tier: 1,
              speed: 400,
              resources: [
                {
                  item: "minecraft:mangrove_propagule",
                  count: 1,
                  chance: 0.8,
                },
                { item: "minecraft:clay_ball", count: 3, chance: 0.4 },
              ],
            },
          ],
        },
        {
          inputBlock: "ftbstuff:dust",
          tool: "#c:tools/brush",
          tiers: [
            {
              tier: 1,
              speed: 400,
              resources: [
                { item: "minecraft:bone_meal", count: 1, chance: 0.3 },
                { item: "ftbmaterials:gold_chunk", count: 1, chance: 0.7 },
              ],
            },
            {
              tier: 2,
              speed: 360,
              resources: [
                { item: "minecraft:bone_meal", count: 1, chance: 0.5 },
                { item: "minecraft:redstone", count: 1, chance: 0.3 },
                { item: "ftbmaterials:gold_chunk", count: 1, chance: 0.7 },
                { item: "ftbmaterials:tin_chunk", count: 1, chance: 0.25 },
              ],
            },
            {
              tier: 3,
              speed: 360,
              resources: [
                { item: "minecraft:redstone", count: 1, chance: 0.5 },
                { item: "ftbmaterials:gold_chunk", count: 1, chance: 0.6 },
                { item: "ftbmaterials:tin_chunk", count: 1, chance: 0.4 },
              ],
            },
            {
              tier: 4,
              speed: 240,
              resources: [
                { item: "minecraft:redstone", count: 1, chance: 0.5 },
                { item: "ftbmaterials:gold_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:tin_chunk", count: 1, chance: 0.5 },
              ],
            },
            {
              tier: 5,
              speed: 300,
              resources: [
                { item: "minecraft:redstone", count: 1, chance: 0.5 },
                { item: "ftbmaterials:gold_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:tin_chunk", count: 1, chance: 0.5 },
              ],
            },
          ],
        },
        {
          inputBlock: "minecraft:dirt",
          tool: "#c:tools/brush",
          tiers: [
            {
              tier: 1,
              speed: 400,
              resources: [
                { item: "minecraft:wheat_seeds", count: 1, chance: 0.5 },
                { item: "minecraft:potato", count: 1, chance: 0.3 },
                { item: "minecraft:carrot", count: 1, chance: 0.3 },
                { item: "jags:grass_seed", count: 1, chance: 0.2 },
                { item: "ftb:andesite_pebble", count: 1, chance: 0.4 },
                { item: "ftb:diorite_pebble", count: 1, chance: 0.4 },
              ],
            },
            {
              tier: 2,
              speed: 360,
              resources: [
                { item: "minecraft:wheat_seeds", count: 1, chance: 0.5 },
                { item: "minecraft:potato", count: 1, chance: 0.3 },
                { item: "minecraft:carrot", count: 1, chance: 0.3 },
                { item: "jags:grass_seed", count: 1, chance: 0.2 },
                { item: "minecraft:beetroot_seeds", count: 1, chance: 0.3 },
                { item: "minecraft:pumpkin_seeds", count: 1, chance: 0.2 },
                { item: "minecraft:melon_seeds", count: 1, chance: 0.2 },
                { item: "immersiveengineering:seed", count: 1, chance: 0.2 },
                { item: "ftb:andesite_pebble", count: 1, chance: 0.6 },
                { item: "ftb:diorite_pebble", count: 1, chance: 0.6 },
              ],
            },
            {
              tier: 3,
              speed: 360,
              resources: [
                { item: "minecraft:wheat_seeds", count: 1, chance: 0.3 },
                { item: "minecraft:potato", count: 1, chance: 0.2 },
                { item: "minecraft:carrot", count: 1, chance: 0.2 },
                { item: "minecraft:beetroot_seeds", count: 1, chance: 0.2 },
                { item: "minecraft:pumpkin_seeds", count: 1, chance: 0.4 },
                { item: "minecraft:melon_seeds", count: 1, chance: 0.4 },
                { item: "immersiveengineering:seed", count: 1, chance: 0.5 },
                { item: "ftb:andesite_pebble", count: 1, chance: 0.8 },
                { item: "ftb:diorite_pebble", count: 1, chance: 0.8 },
                { item: "jags:grass_seed", count: 1, chance: 0.2 },
              ],
            },
            {
              tier: 4,
              speed: 360,
              resources: [
                {
                  item: "ars_nouveau:blue_archwood_sapling",
                  count: 1,
                  chance: 0.25,
                },
                {
                  item: "ars_nouveau:red_archwood_sapling",
                  count: 1,
                  chance: 0.25,
                },
                {
                  item: "ars_nouveau:purple_archwood_sapling",
                  count: 1,
                  chance: 0.25,
                },
                {
                  item: "ars_nouveau:green_archwood_sapling",
                  count: 1,
                  chance: 0.25,
                },
                { item: "ftb:andesite_pebble", count: 1, chance: 1.0 },
                { item: "ftb:diorite_pebble", count: 1, chance: 1.0 },
                { item: "jags:grass_seed", count: 1, chance: 0.2 },
              ],
            },
            {
              tier: 5,
              speed: 450,
              resources: [
                {
                  item: "ars_nouveau:blue_archwood_sapling",
                  count: 1,
                  chance: 0.25,
                },
                {
                  item: "ars_nouveau:red_archwood_sapling",
                  count: 1,
                  chance: 0.25,
                },
                {
                  item: "ars_nouveau:purple_archwood_sapling",
                  count: 1,
                  chance: 0.25,
                },
                {
                  item: "ars_nouveau:green_archwood_sapling",
                  count: 1,
                  chance: 0.25,
                },
                { item: "ftb:andesite_pebble", count: 1, chance: 1.2 },
                { item: "ftb:diorite_pebble", count: 1, chance: 1.2 },
                { item: "jags:grass_seed", count: 1, chance: 0.2 },
              ],
            },
          ],
        },
        {
          inputBlock: "minecraft:sand",
          tool: "#c:tools/brush",
          tiers: [
            {
              tier: 1,
              speed: 400,
              resources: [
                { item: "minecraft:clay_ball", count: 2, chance: 0.4 },
                { item: "ftbmaterials:copper_chunk", count: 1, chance: 0.7 },
              ],
            },
            {
              tier: 2,
              speed: 360,
              resources: [
                { item: "minecraft:clay_ball", count: 2, chance: 0.6 },
                { item: "ftbmaterials:copper_chunk", count: 1, chance: 0.8 },
                { item: "ftbmaterials:silver_chunk", count: 1, chance: 0.3 },
                { item: "ftbmaterials:nickel_chunk", count: 1, chance: 0.3 },
              ],
            },
            {
              tier: 3,
              speed: 360,
              resources: [
                { item: "minecraft:clay_ball", count: 2, chance: 1.9 },
                { item: "ftbmaterials:copper_chunk", count: 1, chance: 0.9 },
                { item: "ftbmaterials:silver_chunk", count: 1, chance: 0.4 },
                { item: "ftbmaterials:nickel_chunk", count: 1, chance: 0.4 },
              ],
            },
            {
              tier: 4,
              speed: 240,
              resources: [
                { item: "minecraft:clay_ball", count: 2, chance: 1.2 },
                { item: "ftbmaterials:copper_chunk", count: 1, chance: 1.2 },
                { item: "ftbmaterials:silver_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:nickel_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:uranium_chunk", count: 1, chance: 0.25 },
              ],
            },
            {
              tier: 5,
              speed: 300,
              resources: [
                { item: "minecraft:clay_ball", count: 2, chance: 1.2 },
                { item: "ftbmaterials:copper_chunk", count: 1, chance: 1.3 },
                { item: "ftbmaterials:silver_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:nickel_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:uranium_chunk", count: 1, chance: 0.25 },
              ],
            },
          ],
        },
      ],
    },
    {
      profession: VillagerProfessions.GEOLOGIST,
      inputBlocks: [
        {
          inputBlock: "minecraft:gravel",
          tool: "#c:tools/brush",
          tiers: [
            {
              tier: 1,
              speed: 400,
              resources: [
                { item: "ftbmaterials:coal_tiny", count: 1, chance: 0.8 },
                { item: "ftbmaterials:iron_chunk", count: 1, chance: 0.975 },
              ],
            },
            {
              tier: 2,
              speed: 360,
              resources: [
                { item: "ftbmaterials:iron_chunk", count: 1, chance: 1.3 },
                { item: "ftbmaterials:coal_tiny", count: 1, chance: 1.0 },
                { item: "ftbmaterials:zinc_chunk", count: 1, chance: 0.7 },
                { item: "ftbmaterials:aluminum_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:lead_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:osmium_chunk", count: 1, chance: 0.3 },
              ],
            },
            {
              tier: 3,
              speed: 360,
              resources: [
                { item: "minecraft:diamond", count: 1, chance: 0.1 },
                { item: "minecraft:lapis_lazuli", count: 1, chance: 0.3 },
                { item: "ftbmaterials:osmium_chunk", count: 1, chance: 0.3 },
                { item: "minecraft:coal", count: 1, chance: 0.3 },
                { item: "ftbmaterials:iron_chunk", count: 1, chance: 1.56 },
                { item: "ftbmaterials:zinc_chunk", count: 1, chance: 0.4 },
                { item: "ftbmaterials:lead_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:aluminum_chunk", count: 1, chance: 0.2 },
              ],
            },
            {
              tier: 4,
              speed: 240,
              resources: [
                { item: "minecraft:coal", count: 1, chance: 0.4 },
                { item: "minecraft:diamond", count: 1, chance: 0.15 },
                { item: "minecraft:emerald", count: 1, chance: 0.1 },
                { item: "minecraft:lapis_lazuli", count: 1, chance: 0.4 },
                { item: "ftbmaterials:osmium_chunk", count: 1, chance: 0.4 },
                { item: "ftbmaterials:iron_chunk", count: 1, chance: 1.95 },
                { item: "ftbmaterials:zinc_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:lead_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:aluminum_chunk", count: 1, chance: 0.3 },
              ],
            },
            {
              tier: 5,
              speed: 300,
              resources: [
                { item: "minecraft:coal", count: 1, chance: 0.45 },
                { item: "minecraft:diamond", count: 1, chance: 0.15 },
                { item: "minecraft:emerald", count: 1, chance: 0.1 },
                { item: "minecraft:lapis_lazuli", count: 1, chance: 0.4 },
                { item: "ftbmaterials:osmium_chunk", count: 1, chance: 0.4 },
                { item: "ftbmaterials:iron_chunk", count: 1, chance: 1.95 },
                { item: "ftbmaterials:zinc_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:lead_chunk", count: 1, chance: 0.5 },
                { item: "ftbmaterials:aluminum_chunk", count: 1, chance: 0.3 },
              ],
            },
          ],
        },
        {
          inputBlock: "minecraft:cobblestone",
          tool: "#c:tools/brush",
          tiers: [
            {
              tier: 1,
              speed: 400,
              resources: [
                { item: "petrock:raw_stoneium", count: 1, chance: 0.5 },
              ],
            },
            {
              tier: 2,
              speed: 360,
              resources: [
                { item: "petrock:raw_stoneium", count: 1, chance: 0.6 },
              ],
            },
            {
              tier: 3,
              speed: 360,
              resources: [
                { item: "petrock:raw_stoneium", count: 1, chance: 0.7 },
              ],
            },
            {
              tier: 4,
              speed: 240,
              resources: [
                { item: "petrock:raw_stoneium", count: 1, chance: 0.8 },
              ],
            },
            {
              tier: 5,
              speed: 300,
              resources: [
                { item: "petrock:raw_stoneium", count: 1, chance: 0.8 },
              ],
            },
          ],
        },
        {
          inputBlock: "minecraft:soul_sand",
          tool: "#c:tools/brush",
          tiers: [
            {
              tier: 1,
              speed: 400,
              resources: [
                { item: "minecraft:quartz", count: 1, chance: 0.2 },
                { item: "minecraft:glowstone_dust", count: 1, chance: 0.6 },
              ],
            },
            {
              tier: 2,
              speed: 360,
              resources: [
                { item: "minecraft:quartz", count: 1, chance: 0.3 },
                {
                  item: "actuallyadditions:black_quartz",
                  count: 1,
                  chance: 0.15,
                },
                { item: "minecraft:glowstone_dust", count: 1, chance: 0.7 },
              ],
            },
            {
              tier: 3,
              speed: 360,
              resources: [
                { item: "minecraft:quartz", count: 1, chance: 0.5 },
                {
                  item: "actuallyadditions:black_quartz",
                  count: 1,
                  chance: 0.3,
                },
                { item: "minecraft:glowstone_dust", count: 1, chance: 0.8 },
              ],
            },
            {
              tier: 4,
              speed: 360,
              resources: [
                { item: "minecraft:quartz", count: 1, chance: 0.8 },
                {
                  item: "actuallyadditions:black_quartz",
                  count: 1,
                  chance: 0.5,
                },
                { item: "minecraft:glowstone_dust", count: 1, chance: 0.9 },
              ],
            },
            {
              tier: 5,
              speed: 450,
              resources: [
                { item: "minecraft:quartz", count: 1, chance: 0.8 },
                {
                  item: "actuallyadditions:black_quartz",
                  count: 1,
                  chance: 0.5,
                },
                { item: "minecraft:glowstone_dust", count: 1, chance: 0.9 },
              ],
            },
          ],
        },
        {
          inputBlock: "ftb:crushed_kivi",
          tool: "#c:tools/brush",
          tiers: [
            {
              tier: 2,
              speed: 360,
              resources: [
                {
                  item: "xycraft_world:xychorium_gem_blue",
                  count: 1,
                  chance: 0.2,
                },
                {
                  item: "xycraft_world:xychorium_gem_green",
                  count: 1,
                  chance: 0.2,
                },
                {
                  item: "xycraft_world:xychorium_gem_red",
                  count: 1,
                  chance: 0.2,
                },
                {
                  item: "xycraft_world:xychorium_gem_dark",
                  count: 1,
                  chance: 0.2,
                },
                {
                  item: "xycraft_world:xychorium_gem_light",
                  count: 1,
                  chance: 0.2,
                },
              ],
            },
            {
              tier: 3,
              speed: 360,
              resources: [
                {
                  item: "xycraft_world:xychorium_gem_blue",
                  count: 1,
                  chance: 0.4,
                },
                {
                  item: "xycraft_world:xychorium_gem_green",
                  count: 1,
                  chance: 0.5,
                },
                {
                  item: "xycraft_world:xychorium_gem_red",
                  count: 1,
                  chance: 0.4,
                },
                {
                  item: "xycraft_world:xychorium_gem_dark",
                  count: 1,
                  chance: 0.4,
                },
                {
                  item: "xycraft_world:xychorium_gem_light",
                  count: 1,
                  chance: 0.5,
                },
              ],
            },
            {
              tier: 4,
              speed: 360,
              resources: [
                {
                  item: "xycraft_world:xychorium_gem_blue",
                  count: 1,
                  chance: 0.5,
                },
                {
                  item: "xycraft_world:xychorium_gem_green",
                  count: 1,
                  chance: 0.5,
                },
                {
                  item: "xycraft_world:xychorium_gem_red",
                  count: 1,
                  chance: 0.5,
                },
                {
                  item: "xycraft_world:xychorium_gem_dark",
                  count: 1,
                  chance: 0.5,
                },
                {
                  item: "xycraft_world:xychorium_gem_light",
                  count: 1,
                  chance: 0.5,
                },
              ],
            },
            {
              tier: 5,
              speed: 450,
              resources: [
                {
                  item: "xycraft_world:xychorium_gem_blue",
                  count: 1,
                  chance: 0.5,
                },
                {
                  item: "xycraft_world:xychorium_gem_green",
                  count: 1,
                  chance: 0.5,
                },
                {
                  item: "xycraft_world:xychorium_gem_red",
                  count: 1,
                  chance: 0.5,
                },
                {
                  item: "xycraft_world:xychorium_gem_dark",
                  count: 1,
                  chance: 0.5,
                },
                {
                  item: "xycraft_world:xychorium_gem_light",
                  count: 1,
                  chance: 0.5,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      profession: VillagerProfessions.DIMENSIONALIST,
      inputBlocks: [
        {
          inputBlock: "minecraft:netherrack",
          tool: "#c:tools/brush",
          tiers: [
            {
              tier: 1,
              speed: 400,
              resources: [
                { item: "ftbmaterials:sulfur_dust", count: 1, chance: 0.2 },
              ],
            },
            {
              tier: 2,
              speed: 400,
              resources: [
                { item: "ftbmaterials:sulfur_dust", count: 1, chance: 0.3 },
                { item: "minecraft:blaze_powder", count: 1, chance: 0.02 },
              ],
            },
            {
              tier: 3,
              speed: 400,
              resources: [
                { item: "ftbmaterials:sulfur_dust", count: 1, chance: 0.4 },
                { item: "minecraft:blaze_powder", count: 1, chance: 0.05 },
                { item: "occultism:iesnium_dust", count: 1, chance: 0.02 },
              ],
            },

            {
              tier: 4,
              speed: 240,
              resources: [
                { item: "ftbmaterials:sulfur_dust", count: 1, chance: 0.6 },
                { item: "minecraft:blaze_powder", count: 1, chance: 0.07 },
                { item: "occultism:iesnium_dust", count: 1, chance: 0.05 },
                {
                  item: "minecraft:netherite_scrap",
                  count: 1,
                  chance: 0.2,
                },
              ],
            },
            {
              tier: 5,
              speed: 300,
              resources: [
                { item: "ftbmaterials:sulfur_dust", count: 1, chance: 0.6 },
                { item: "minecraft:blaze_powder", count: 1, chance: 0.07 },
                { item: "occultism:iesnium_dust", count: 1, chance: 0.05 },
                {
                  item: "minecraft:netherite_scrap",
                  count: 1,
                  chance: 0.2,
                },
              ],
            },
          ],
        },
        {
          inputBlock: "minecraft:end_stone",
          tool: "#c:tools/brush",
          tiers: [
            {
              tier: 1,
              speed: 240,
              resources: [
                {
                  item: "ftbmaterials:fluorite_gem",
                  count: 1,
                  chance: 0.1,
                },
              ],
            },

            {
              tier: 2,
              speed: 240,
              resources: [
                {
                  item: "ftbmaterials:fluorite_gem",
                  count: 1,
                  chance: 0.16,
                },
                {
                  item: "ftbmaterials:dimensional_shard_gem",
                  count: 1,
                  chance: 0.02,
                },
              ],
            },
            {
              tier: 3,
              speed: 240,
              resources: [
                {
                  item: "ftbmaterials:fluorite_gem",
                  count: 1,
                  chance: 0.2,
                },
                {
                  item: "ftbmaterials:platinum_chunk",
                  count: 1,
                  chance: 0.02,
                },
                {
                  item: "ftbmaterials:dimensional_shard_gem",
                  count: 1,
                  chance: 0.03,
                },
              ],
            },
            {
              tier: 4,
              speed: 240,
              resources: [
                {
                  item: "ftbmaterials:fluorite_gem",
                  count: 1,
                  chance: 0.3,
                },
                {
                  item: "ftbmaterials:platinum_chunk",
                  count: 1,
                  chance: 0.3,
                },
                {
                  item: "draconicevolution:draconium_dust",
                  count: 1,
                  chance: 0.3,
                },
                {
                  item: "ftbmaterials:dimensional_shard_gem",
                  count: 1,
                  chance: 0.05,
                },
              ],
            },
            {
              tier: 5,
              speed: 300,
              resources: [
                {
                  item: "ftbmaterials:fluorite_gem",
                  count: 1,
                  chance: 0.3,
                },
                {
                  item: "ftbmaterials:platinum_chunk",
                  count: 1,
                  chance: 0.3,
                },
                {
                  item: "draconicevolution:draconium_dust",
                  count: 1,
                  chance: 0.3,
                },
                {
                  item: "ftbmaterials:dimensional_shard_gem",
                  count: 1,
                  chance: 0.05,
                },
              ],
            },
          ],
        },
        {
          inputBlock: "occultism:otherrock",
          tool: "#c:tools/brush",
          tiers: [
            {
              tier: 4,
              speed: 240,
              resources: [
                {
                  item: "replication:raw_replica",
                  count: 1,
                  chance: 0.2,
                },
                { item: "ae2:certus_quartz_dust", count: 1, chance: 0.7 },
              ],
            },
            {
              tier: 5,
              speed: 300,
              resources: [
                {
                  item: "replication:raw_replica",
                  count: 1,
                  chance: 0.2,
                },
                { item: "ae2:certus_quartz_dust", count: 1, chance: 0.7 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

ServerEvents.recipes((event) => {
  uneartherRecipes.professions.forEach((professionData) => {
    const villagerProfession = professionData.profession;

    professionData.inputBlocks.forEach((inputBlockData) => {
      const tool = inputBlockData.tool;
      const inputBlock = inputBlockData.inputBlock;
      inputBlockData.tiers.forEach((tierData) => {
        const tier = tierData.tier;
        const baseSpeed = tierData.speed;
        const speed = Math.max(1, Math.floor(baseSpeed / 4));

        const resources = tierData.resources;

        const id =
          `ftb:unearther/${villagerProfession.split(":")[1]}/` +
          `${inputBlock.split(":")[1]}/` +
          `${tier}`;

        event.recipes.ftbunearthed
          .unearther(
            resources,
            inputBlock,
            {
              type: "ftb:stone",
              profession: villagerProfession,
              level: tier,
            },
            tool,
            speed
          )
          .id(id);
      });
    });
  });
});
