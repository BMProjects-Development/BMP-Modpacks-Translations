const ScreenshakeHandler = Java.loadClass('team.lodestar.lodestone.handlers.ScreenshakeHandler')
const ScreenshakeInstance = Java.loadClass('team.lodestar.lodestone.systems.screenshake.ScreenshakeInstance')
const ScreenshakeBuilder = Java.loadClass('team.lodestar.lodestone.systems.screenshake.ScreenshakeBuilder')

const Easing = Java.loadClass('team.lodestar.lodestone.systems.easing.Easing')




NetworkEvents.dataReceived('screenshake', event => {
    const { i1, i2, i3, duration } = event.data
    let builder = ScreenshakeBuilder.create()
    ScreenshakeHandler.addScreenshake(builder.setDuration(duration.getAsInt()).setEasing(Easing.SINE_IN, Easing.QUAD_IN).build())
})
