// priority: 50

global.removeRecipe.push(
	"xycraft_world:compacting/raw_aluminum",
	"xycraft_world:compacting/aluminum_ingot",
	"xycraft_world:compacting/aluminum_nugget",
	"xycraft_world:blasting/aluminum",
	"xycraft_world:smelting/aluminum",
	"xycraft_world:unpacking/raw_aluminum",
	"xycraft_world:packing/aluminum_storage_forced",
	"xycraft_world:unpacking/aluminum_nugget",
	"xycraft_world:packing/aluminum_ingot_forced",
	"xycraft_world:unpacking/aluminum_ingot",
	"xycraft_machines:shaped/sticky_piston_tagged",
	"xycraft:packing/copper_ingot_forced",
	"xycraft:shaped/sticky_piston_tagged",
	"xycraft:shaped/lead_tagged",
	"xycraft:unpacking/copper_nugget",
	"xycraft_machines:compat/mek/processing/aluminum/ingot/from_dust_blasting",
	"xycraft_machines:compat/mek/processing/aluminum/ingot/from_dust_smelting",
	"xycraft:smelting/aluminum",
	"xycraft:blasting/aluminum"
);

global.removeItem.push(
	"xycraft_world:raw_aluminum",
	"xycraft_world:raw_aluminum_block",
	"xycraft_world:aluminum_storage",
	"xycraft_world:aluminum_nugget",
	"xycraft_world:aluminum_ingot",
	"xycraft_machines:iron_sheet"
);

global.removeOre.push(
	"xycraft_world:aluminum_ore_kivi",
	"xycraft_world:aluminum_ore_deepslate",
	"xycraft_world:aluminum_ore_stone"
);

const xychorium_types = ["blue", "green", "red", "dark", "light"];

// Add
ServerEvents.tags("item", (event) => {
	xychorium_types.forEach((color) => {
		event.add(`${global.tagPrefix}:ores/xychorium_${color}`, [
			`xycraft_world:xychorium_ore_stone_${color}`,
			`xycraft_world:xychorium_ore_deepslate_${color}`,
			`xycraft_world:xychorium_ore_kivi_${color}`
		]);
	});
});
