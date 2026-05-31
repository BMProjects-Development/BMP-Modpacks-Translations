// priority: 50

ServerEvents.recipes((event) => {
    //Adding more Alloying Recipe options of Steerling Silver.
    const steerling_silver_input_types = ["ingots", "dusts"];
    const steerling_silver_requirements = [{input: "copper", input_1: "silver"}];

    steerling_silver_requirements.forEach(material => {
        steerling_silver_input_types.forEach(material_type => {
            addRecipeImmersiveEngineeringAlloy(
                event,
                [`c:${material_type}/${material.input}`, 1],
                [`c:${material_type}/${material.input_1}`, 1],
                ["occultengineering:sterling_silver_ingot", 1],
                `ftb:ie/alloy_smelting/create/steerling_silver_${material_type}`
            );
            event.custom({
                type: "enderio:alloy_smelting",
                energy: 3200,
                experience: 0.3,
                is_smelting: false,
                inputs: [
                  {
                    tag: `c:${material_type}/${material.input}`,
                    count: 1
                  },
                  {
                    tag: `c:${material_type}/${material.input_1}`,
                    count: 1
                  }
                ],
                output: {
                  id: "occultengineering:sterling_silver_ingot",
                  count: 1
                }
            }).id(`ftb:enderio/alloy_smelting/create/steerling_silver_${material_type}`);

            event.custom({
                "type": "immersiveengineering:arc_furnace",
                "additives": [
                    {
                    "tag": `c:${material_type}/${material.input}`
                    }
                ],
                "energy": 51200,
                "input": {
                    "basePredicate": {
                        "tag": `c:${material_type}/${material.input_1}`
                    },
                    "count": 1
                },
                "results": [
                    {
                    "basePredicate": {
                        "tag": "c:ingots/sterling_silver"
                    },
                    "count": 1
                    }
                ],
                "time": 100
            }).id(`ftb:ie/arc_furnace/alloying/create/steerling_silver_${material_type}`);

            event.custom({
                "type": "oritech:foundry",
                "fluidInput": {
                  "amount": 0,
                  "fluid": "minecraft:empty"
                },
                "fluidOutputs": [],
                "ingredients": [
                  {
                    "tag": `c:${material_type}/${material.input}`
                  },
                  {
                    "tag": `c:${material_type}/${material.input_1}`
                  }
                ],
                "results": [
                  {
                    "count": 1,
                    "id": "occultengineering:sterling_silver_ingot"
                  }
                ],
                "time": 120
            }).id(`ftb:oritech/foundry/create/steerling_silver_${material_type}`);


        });
    });
})