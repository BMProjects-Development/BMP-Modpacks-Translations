
// This is genius, i didn't expect this to work, how tf?
let $GridEventBus = Java.loadClass("appeng.me.GridEventBus")
$GridEventBus.subscribe("appeng.api.networking.events.GridSpatialEvent", (somegrid, event)=>{
  let {spatialIoLevel: level, spatialIoPos: pos} = event
  level.getBlockEntity(pos).getMainNode()["ifPresent(java.util.function.BiConsumer)"]((grid, node)=>{
    let spatial = grid.getSpatialService()
    let min = spatial.getMin()
    let max = spatial.getMax()

    let {x: minX, z: minZ} = min
    let {x: maxX, z: maxZ} = max

    let minPos = (minX * minX) + (minZ * minZ)
    let maxPos = (maxX * maxX) + (maxZ * maxZ)

    let limit = 512
    limit *= limit
    if (minPos < limit && maxPos < limit) {
    } else {
      event.preventTransition()
    }
  })
})