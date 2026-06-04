ServerEvents.recipes((event) => {

    const banister_wood_types = [

        //Twilight Forest has a Typo where instead of Mangrove, it is defined as "Vangrove"...
        //So it needs some special handling until this is adressed.
        {provider: "minecraft", type: "vangrove"},

        {provider: "minecraft", type: "oak"},
        {provider: "minecraft", type: "crimson"},
        {provider: "minecraft", type: "spruce"},
        {provider: "minecraft", type: "birch"},
        {provider: "minecraft", type: "jungle"},
        {provider: "minecraft", type: "acacia"},
        {provider: "minecraft", type: "dark_oak"},
        {provider: "minecraft", type: "cherry"},
        {provider: "minecraft", type: "bamboo"},
        {provider: "minecraft", type: "warped"},

        {provider: "twilightforest", type: "dark"},
        {provider: "twilightforest", type: "mining"},
        {provider: "twilightforest", type: "sorting"},
        {provider: "twilightforest", type: "twilight_oak"},
        {provider: "twilightforest", type: "canopy"},
        {provider: "twilightforest", type: "mangrove"},
        {provider: "twilightforest", type: "time"},
        {provider: "twilightforest", type: "transformation"}
    ];

    banister_wood_types.forEach(wood => {

        if (wood.type == "vangrove") {
            event.custom({
                type: "farmersdelight:cutting",
                ingredients: [
                    {
                    item: `twilightforest:${wood.type}_banister`
                    }
                ],
                result: [
                    {
                    item: {
                        count: 2,
                        id: `${wood.provider}:mangrove_slab`
                    }
                    }
                ],
                tool: {
                    type: "farmersdelight:item_ability",
                    action: "axe_dig"
                }
            }).id(`ftb:farmersdelight/cutting/recycling/${wood.type}_banister`);
        } else {
            event.custom({
                type: "farmersdelight:cutting",
                ingredients: [
                    {
                    item: `twilightforest:${wood.type}_banister`
                    }
                ],
                result: [
                    {
                    item: {
                        count: 2,
                        id: `${wood.provider}:${wood.type}_slab`
                    }
                    }
                ],
                tool: {
                    type: "farmersdelight:item_ability",
                    action: "axe_dig"
                }
            }).id(`ftb:farmersdelight/cutting/recycling/${wood.type}_banister`);
        }
    });

});
  