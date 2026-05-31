let $MagicCoinsConfig = Java.loadClass("net.sirgrantd.magic_coins.config.ClientConfig")

ClientEvents.loggedIn((event) => {
    $MagicCoinsConfig.ySilverButton = -9999
    $MagicCoinsConfig.yGoldButton = -9999
    $MagicCoinsConfig.yCrystalButton = -9999
});
