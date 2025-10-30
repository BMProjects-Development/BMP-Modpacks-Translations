let variants = [
	"minecraft:$_stained_glass",
	"connectedglass:clear_glass_$",
	"connectedglass:borderless_glass_$",
	"connectedglass:scratched_glass_$",
	"connectedglass:tinted_borderless_glass_$",
	"minecraft:$_stained_glass_pane",
	"connectedglass:clear_glass_$_pane",
	"connectedglass:borderless_glass_$_pane",
	"connectedglass:scratched_glass_$_pane"
];
function getNextVariant(v) {
	if (v == 4) return 0;
	if (v == 8) return 5;
	return v + 1;
}

let colors = [
	"white",
	"light_gray",
	"gray",
	"black",
	"brown",
	"red",
	"orange",
	"yellow",
	"lime",
	"green",
	"cyan",
	"light_blue",
	"blue",
	"purple",
	"magenta",
	"pink"
];

ServerEvents.recipes((event) => {
	for (let v = 0; v < variants.length; v++) {
		let current = variants[v].replace("_$", "").replace("$_stained_", "");
		let next = variants[getNextVariant(v)]
			.replace("_$", "")
			.replace("$_stained_", "");
		event
			.shapeless(next, [current])
			.id(`ftb:connected_glass/${current.path}_to_${next.path}`);
	}
	for (let c = 0; c < colors.length; c++) {
		let color = colors[c];
		for (let v = 0; v < variants.length; v++) {
			let current = variants[v].replace("$", color);
			let next = variants[getNextVariant(v)].replace("$", color);
			event
				.shapeless(next, [current])
				.id(`ftb:connected_glass/${current.path}_to_${next.path}`);
		}
	}
});
