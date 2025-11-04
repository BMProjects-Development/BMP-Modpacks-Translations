NetworkEvents.dataReceived('close_screen', event => {
    let currentScreen = Client.getCurrentScreen();
    if (currentScreen != null) Client.setCurrentScreen(null);
})

NetworkEvents.dataReceived('intro_ready', event => {
    if (Client.getCurrentScreen() != null) return;
    event.player.sendData('trigger_intro', {});
});