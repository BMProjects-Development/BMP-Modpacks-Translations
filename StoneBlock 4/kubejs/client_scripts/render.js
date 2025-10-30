let arrow = 'jade:textures/gui/sprites/progress.png'
let oblong_frame = 'minecraft:textures/gui/sprites/advancements/goal_frame_unobtained.png'

/**
 * Renders a conversion recipe GUI, displaying the left item, a catalyst, a right-click icon, and the right item.
 * Originally designed by Matryoshika at lat.dev
 *
 * @param {object} event - The render event object, providing rendering methods.
 * @param {Item} left - The item.id to render on the left side of the recipe.
 * @param {Item} right - The item.id to render on the right side of the recipe.
 */
let renderCowTransmutationRecipe = (event, left, right) => {

    let screenHeight = Client.window.getGuiScaledHeight()
    let screenWidth = Client.window.getGuiScaledWidth()

    let sine = Math.sin((Utils.getSystemTime() % 9000) / 180.0)

    event.renderGuiItem(left, (screenWidth / 2) - 8 - 24, (screenHeight / 2) - 8 + 8 + (sine * 4))
    event.drawTexture(oblong_frame, (screenWidth / 2) - 10, (screenHeight / 2) - 8 + 12, 20, 20)
    event.drawTexture("lychee:textures/gui/sprites/right_click.png", (screenWidth / 2) - 8, (screenHeight / 2) - 8 + 14, 16, 16)
    event.drawTexture(arrow, (screenWidth / 2) - 8, (screenHeight / 2) - 8 + 36, 16, 10, 0, 0, Math.min(((Utils.getSystemTime() % 1800) / 100.0), 16.0), 10 )
    event.renderGuiItem(right, (screenWidth / 2) - 8 + 24, (screenHeight / 2) - 8 + 32)
    event.drawString(Fluid.of(right).getDisplayName(), (screenWidth / 2) - 8 + 24, (screenHeight / 2) - 8 + 15, 255, 255, 255, 255)

    let x;
    let y;
    let entity;
    let scale = 15;

    entity = event.client.level.createEntity("minecraft:cow")
    x = (screenWidth / 2) - 8 - 20
    y = (screenHeight / 2) - 8 + 50

    // Jacky Hack mate
    let pose = event.getPoseStack();
    pose.translate(x, y, 50);
    pose.scale(scale, scale, scale);
    pose.mulPose($Axis.ZP.rotationDegrees(180));
    pose.mulPose($Axis.YP.rotationDegrees(45));
    let mc = event.client.getInstance();
    let bufferSource = mc.renderBuffers().bufferSource();
    let entityRenderDispatcher = mc.getEntityRenderDispatcher();
    entityRenderDispatcher.render(entity, 0, 0, 0, 0, 0, pose, bufferSource, 0xF000F0);

    entity = event.client.level.createEntity("moofluids:fluid_cow")
    entity.setFluid(right)
    pose.translate(-5, 0, 0);
    entityRenderDispatcher.render(entity, 0, 0, 0, 0, 0, pose, bufferSource, 0xF000F0);
}

const $Axis = Java.loadClass("com.mojang.math.Axis");

RenderJSEvents.onGuiPostRender(event => {
    // return early if a screen is open
    let currentScreen = Client.getCurrentScreen();
    if (currentScreen != null) return;


    const debug = false;
    const client = event.client;
    const player = client.getCameraEntity();

    if (!player) {
        if (debug) console.log("No player entity found.");
        return;
    }

    const handItem = player.getMainHandItem();
    if (!handItem) {
        if (debug) console.log("No item in main hand.");
        return;
    }

    const raytrace = player.rayTrace(5);
    if (!raytrace) {
        if (debug) console.log("No block in sight.");
        return;
    }

    const block = raytrace?.block;
    const entity = raytrace?.entity;


    if(entity){
        switch(entity.type){
            case "minecraft:cow":
                let rule =  global.COW_TRANSMUTE_RULES.filter(entry => entry.item == handItem.id)
                if(rule.length > 0){
                    if(rule[0].weighted){
                        let time = Utils.getSystemTime() / 1000;
                        let weightedList = rule[0].weighted;
                        let index = Math.floor(time / 2) % weightedList.length;
                        let selectedFluid = weightedList[index].id;
                        renderCowTransmutationRecipe(event, handItem, selectedFluid);
                    }
                    renderCowTransmutationRecipe(event, handItem, rule[0].fluid);
                    return;
                }
        }
    }
    if(block){
    }


});


const renderEntity = (event, entity, x, y, scale) => {
    try{
        let pose = event.getPoseStack();
        pose.translate(x, y, 50);
        pose.scale(scale, scale, scale);
        pose.mulPose($Axis.ZP.rotationDegrees(180));
        pose.mulPose($Axis.YP.rotationDegrees(45));
        let mc = event.client.getInstance();
        let bufferSource = mc.renderBuffers().bufferSource();
        let entityRenderDispatcher = mc.getEntityRenderDispatcher();
        entityRenderDispatcher.render(entity, 0, 0, 0, 0, 0, pose, bufferSource, 0xF000F0);
        bufferSource.endBatch();
    } catch(e){
        console.log(e)
    }
 

}