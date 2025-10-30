// priority: 50

global.removeRecipe.push(
	"occultism:blasting/silver_ingot_from_raw",
	"occultism:crafting/raw_silver_block",
	"occultism:crafting/raw_silver_ingot_from_block",
	"occultism:crushing/aluminum_dirty_dust_from_clump",
	"occultism:crushing/copper_dirty_dust_from_clump",
	"occultism:crushing/gold_dirty_dust_from_clump",
	"occultism:crushing/iron_dirty_dust_from_clump",
	"occultism:crushing/lead_dirty_dust_from_clump",
	"occultism:crushing/nickel_dirty_dust_from_clump",
	"occultism:crushing/osmium_dirty_dust_from_clump",
	"occultism:crushing/platinum_dirty_dust_from_clump",
	"occultism:crushing/tin_dirty_dust_from_clump",
	"occultism:crushing/uranium_dirty_dust_from_clump",
	"occultism:crushing/zinc_dirty_dust_from_clump",
	"occultism:crushing/bauxite_dust_from_ore",
	"occultism:smelting/silver_ingot_from_raw",
	"occultism:crushing/silver_dirty_dust_from_clump",
	"occultism:crushing/tungsten_dust_from_raw",
	"occultism:crafting/raw_iesnium_block",
	"occultism:crafting/silver_block",
	"occultism:crafting/silver_nugget",
	"occultism:crafting/silver_ingot_from_nuggets",
	"occultism:crafting/silver_ingot_from_block",
	"occultism:blasting/silver_ingot_from_dust",
	"occultism:blasting/silver_ingot",
	"occultism:smelting/silver_ingot_from_dust",
	"occultism:smelting/silver_ingot",
	"occultism:crushing/titanium_dust",
	"occultism:crushing/titanium_dust_from_raw_block",
	"occultism:crushing/titanium_dust_from_raw",
	"occultism:smelting/copper_ingot_from_dust",
	"occultism:smelting/iron_ingot_from_dust",
	"occultism:smelting/gold_ingot_from_dust",
	"occultism:blasting/gold_ingot_from_dust",
	"occultism:blasting/copper_ingot_from_dust",
	"occultism:blasting/iron_ingot_from_dust"
);

global.removeItem.push(
	"occultism:silver_ore",
	"occultism:silver_ore_deepslate",
	"occultism:raw_silver",
	"occultism:raw_silver_block",
	"occultism:silver_block",
	"occultism:silver_nugget",
	"occultism:lapis_dust",
	"occultism:obsidian_dust",
	"occultism:silver_dust",
	"occultism:emerald_dust",
	"occultism:iron_dust",
	"occultism:netherite_dust",
	"occultism:copper_dust",
	"occultism:gold_dust",
	"occultism:silver_ingot"
);

ServerEvents.recipes((event) => {
	global.resourceOresIngots.forEach((mod) => {
		mod.materials.forEach((material) => {
			addRecipeOccultismCrushing(
				event,
				`c:clumps/${material}`,
				[`c:dusts/${material}`, 2],
				`ftb:occultism/crushing/clumps/${material}`
			);
		});
	});

	// Loop For Gem Ores
	global.resourcesOresGem.forEach((mod) => {
		mod.materials.forEach((material) => {
			const gemType = material[0];
			let oreTag = `${global.tagPrefix}:ores/${gemType}`;
			if (oreTag === "c:ores/lapis_lazuli") {
				oreTag = "c:ores/lapis";
			}
			const outputId = material[2] ?? `${mod.modID}:${gemType}`;
			const outputAmount = material[1] ?? 1;

			addRecipeOccultismCrushing(
				event,
				oreTag,
				[outputId, outputAmount],
				`ftb:occultism/crusher/raw_ore/${gemType}`
			);
		});
	});
});
