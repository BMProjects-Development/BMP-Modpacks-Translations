NetworkEvents.dataReceived('close_screen', event => {
    let currentScreen = Client.getCurrentScreen();
    if (currentScreen != null) Client.setCurrentScreen(null);
})
