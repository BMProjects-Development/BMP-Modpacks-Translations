// priority: 50

remFluid.push(
    "create_enchantment_industry:experience",
    "create_enchantment_industry:flowing_experience"
)

ServerEvents.recipes((event) => {
    //Adding a way to Convert Create Enchantment's XP into Cognitium.
    event.custom({
        type: "create:mixing",
        ingredients: [
          {
            type: "neoforge:tag",
            amount: 100,
            tag: "c:experience"
          }
        ],
        results: [
          {
            amount: 100,
            id: "cognition:cognitium_source"
          }
        ]
    }).id(`ftb:create/mixing/convertion/create_experience`)
})