ServerEvents.recipes(event => {

    //Storage Tool
    event.shaped(
        Item.of("sophisticatedstorage:storage_tool", 1),
        [
            " EI",
            " SR",
            "S  "
        ],
        {
          R: "minecraft:redstone_torch",
          S: "#c:rods/wooden",
          I: "#c:ingots/iron",
          E: "#c:ender_pearls"
        }
    ).id("ftb:shaped/sophisticatedstorage/storage_tool");

    //Storage Link
    event.shaped(
        Item.of("sophisticatedstorage:storage_link", 1),
        [
            "EP",
            "RS"
        ],
        {
          E: "#c:ender_pearls",
          P: "#minecraft:planks",
          R: "minecraft:repeater",
          S: "#c:stones"
        }
    ).id("ftb:shaped/sophisticatedstorage/storage_link");


})