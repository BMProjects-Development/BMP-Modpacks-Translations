// priority: 987

global.removeItem.push(
	"industrialforegoing:iron_gear",
	"industrialforegoing:diamond_gear",
	"industrialforegoing:gold_gear"
);

ServerEvents.tags("item", (event) => {

	//Adding Industrial Foregoing to other Plastics Tags
	event.add("pneumaticcraft:plastic_sheets", "industrialforegoing:plastic");
	event.add("c:plates/plastic", "industrialforegoing:plastic");

});