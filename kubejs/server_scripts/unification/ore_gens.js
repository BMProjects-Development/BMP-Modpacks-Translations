ServerEvents.recipes((event) => {
	// Remove Current Recipes
	event.remove({ type: "botania:orechid" });
	event.remove({ type: "botania:orechid_ignem" });
	event.remove({ type: "actuallyadditions:mining_lens" });
	event.remove({ type: "occultism:miner" });

	Object.entries(global.oreGenOres).forEach(([oreType, oreData]) => {
		const weight = oreData.weight;
		const override = oreData.dimensions_override ?? [];
		const dims = oreData.dimensions ?? ["overworld", "nether", "end"];
		const blockVariants = oreData.blockVariants ?? {};

		const stoneBlock = blockVariants.stone
			? blockVariants.stone
			: `ftbmaterials:${oreType}_stone_ore`;

		const deepslateBlock = blockVariants.deepslate
			? blockVariants.deepslate
			: `ftbmaterials:${oreType}_deepslate_ore`;

		const netherBlock = blockVariants.nether
			? blockVariants.nether
			: `ftbmaterials:${oreType}_nether_ore`;

		const storageBlock = blockVariants.storage
			? blockVariants.storage
			: `ftbmaterials:${oreType}_raw_block`;

		// Overworld (Stone / Deepslate)
		if (dims.includes("overworld") || override.includes("overworld")) {
			const inputStone = "minecraft:stone";
			const inputDeepslate = "minecraft:deepslate";

			if (Platform.isLoaded("actuallyadditions")) {
				addRecipeActuallyAdditionsMiningLens(
					event,
					inputStone,
					stoneBlock,
					weight,
					`ftb:actuallyadditions/mining_lens/stone/${oreType}`
				);
				addRecipeActuallyAdditionsMiningLens(
					event,
					inputDeepslate,
					deepslateBlock,
					weight,
					`ftb:actuallyadditions/mining_lens/deepslate/${oreType}`
				);
			}

			if (Platform.isLoaded("botania")) {
				botaniaOrechidRecipe(
					event,
					inputStone,
					stoneBlock,
					weight,
					`ftb:botania/orechid/stone/${oreType}`
				);
				botaniaOrechidIgnemRecipe(
					event,
					inputDeepslate,
					deepslateBlock,
					weight,
					`ftb:botania/orechid/deepslate/${oreType}`
				);
			}

			if (Platform.isLoaded("occultism")) {
				addRecipeOccultismMiner(
					event,
					"occultism:miners/ores",
					stoneBlock,
					weight,
					`ftb:occultism/miner/stone/${oreType}`
				);
				addRecipeOccultismMiner(
					event,
					"occultism:miners/deeps",
					deepslateBlock,
					weight,
					`ftb:occultism/miner/deepslate/${oreType}`
				);
				addRecipeOccultismMiner(
					event,
					"occultism:miners/eldritch",
					storageBlock,
					weight,
					`ftb:occultism/miner/eldritch/${oreType}`
				);
			}
		}

		// Nether
		if (
			(dims.includes("nether") && global.enableNetherOres) ||
			override.includes("nether")
		) {
			const input = "minecraft:netherrack";

			if (Platform.isLoaded("actuallyadditions")) {
				addRecipeActuallyAdditionsMiningLens(
					event,
					input,
					netherBlock,
					weight,
					`ftb:actuallyadditions/mining_lens/netherrack/${oreType}`
				);
			}

			if (Platform.isLoaded("botania")) {
				botaniaOrechidIgnemRecipe(
					event,
					input,
					netherBlock,
					weight,
					`ftb:botania/orechid/netherrack/${oreType}`
				);
			}

			if (Platform.isLoaded("occultism")) {
				addRecipeOccultismMiner(
					event,
					"occultism:miners/master",
					netherBlock,
					weight,
					`ftb:occultism/miner/netherrack/${oreType}`
				);
			}
		}
	});

	if (Platform.isLoaded("occultism")) {
		addRecipeOccultismMiner(
			event,
			"occultism:miners/master",
			"occultism:mining_dim_core",
			1,
			`ftb:occultism/miner/dim_core`
		);

		addRecipeOccultismMiner(
			event,
			"occultism:miners/master",
			"occultism:iesnium_ore",
			100,
			`ftb:occultism/miner/ore/dim_core`
		);

		addRecipeOccultismMiner(
			event,
			"occultism:miners/eldritch",
			"occultism:raw_iesnium_block",
			100,
			`ftb:occultism/miner/eldritch/raw_iesnium_block`
		);
	}
});
