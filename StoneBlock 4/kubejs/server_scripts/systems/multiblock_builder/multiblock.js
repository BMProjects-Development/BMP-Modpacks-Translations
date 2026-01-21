const BrandonsCore$ProcessHandler = Java.loadClass("com.brandon3055.brandonscore.handlers.ProcessHandler");
const DraconicEvolution$MultiBlockBuilder = Java.loadClass("com.brandon3055.draconicevolution.lib.MultiBlockBuilder");
const BrandonsCore$MultiBlockManager = Java.loadClass("com.brandon3055.brandonscore.multiblock.MultiBlockManager");
const BrandonsCore$MultiBlockDefinition = Java.loadClass(
  "com.brandon3055.brandonscore.multiblock.MultiBlockDefinition"
);
const CCL$Rotation = Java.loadClass("codechicken.lib.vec.Rotation");
const CCL$Vector3 = Java.loadClass("codechicken.lib.vec.Vector3");
const CCL$Quat = Java.loadClass("codechicken.lib.vec.Quat");



const Vector3$ZERO = new CCL$Vector3(0, 0, 0);
const Vector3$CENTER = new CCL$Vector3(0.5, 0.5, 0.5);
/**
 * ### Currently Disabled as No Defined Item/Builder or Multiblocks
 *
 * ### Overview
 * Will construct the Defined multiblock where the player r-clicks the item
 * It will extract each block 1 by 1 from the players inventory to then place
 * the defined block.
 *
 * The builder will stop if it <can't place> / <no item> / <invalid block>.
 *
 *
 * ### How to use as Dev
 * To Define a Multiblock add a json file under data/ftb/multiblocks/<name>.json
 * JSON Should be as follows:
 *
 * ```
 * {
 *   "keys": {
 *     "A": {
 *       "block": "minecraft:air"
 *     },
 *     "B": {
 *       "block": "minecraft:stone"
 *     },
 *     "T": {
 *       "tag": "minecraft:logs"
 *     }
 *   },
 *   "origin": {
 *     "x": 1,
 *     "y": 1,
 *     "z": 1
 *   },
 *   "structure": [
 *     [
 *       "AAA",
 *       "A A",
 *       "AAA"
 *     ],
 *     [
 *       "BBB",
 *       "B B",
 *       "BBB"
 *     ],
 *     [
 *       "TTT",
 *       "T T",
 *       "TTT"
 *     ]
 *   ]
 * }
 * ```
 *
 * If placed, the structure will have explicit AIR at the bottom layer (center is ANY)
 * Specified block in middle layer (center is ANY)
 * Any block found in inventory tagged with "minecraft:logs" (center is ANY)
 * 
 * Origin is the spot User clicks, usually the letter 'm" in custommachinery
 * Remove the 'm' key from the structure definition
 *
 * On execution of this script, it will center the placement on the "origin" of the JSON file
 * In this case origin will be 1 1 1.
 *
 * Add `#ftb:compatible_multiblock` tag to the block to ensure its whitelisted
 *
 * Client Scripts -> tooltips.js -> Look for `ftb.tooltip.multiblock_printer.compatible`
 * Add the item to the list to add a tooltip telling user it has a defined multiblock.
 *
 * ### Dev Notes:
 * - Script Executes as Structure[YPos][ZPos][XPos]
 * - If Origin is Undefined in JSON file, It will automatically be 0 0 0.
 * - This Script uses Draconic Evolution, Brandon's Core, Code Chicken Lib.
 * - The origin will also be verified by the script.
 * - Ensure JSON filters / allows origin to pass.
 * - Origin should be the block the user clicks on. (Normally Controller)
 * - Adding the tooltip to all tagged blocks is not possible due to Custom Machinery being the same item
 * ### Works/Tested in Minecraft Versions:
 * -
 * - 1.21.1
 * @version 2.0.0
 */

function RotatePointVec(ShapeVector, Point, Degrees, WillTranslate) {
  let RotationMatrix = new CCL$Rotation(new CCL$Quat(RotationAxis.YN.deg(Degrees))).at(Vector3$ZERO);
  ShapeVector = ShapeVector.apply(RotationMatrix);
  let MinVec = new CCL$Vector3(
    Math.sign(Math.min(0, ShapeVector.x)),
    Math.sign(Math.min(0, ShapeVector.y)),
    Math.sign(Math.min(0, ShapeVector.z))
  );
  let TranslationMatrix = ShapeVector.copy().multiply(MinVec).floor().translation();
  Point.apply(RotationMatrix);
  if (WillTranslate) {
    Point.apply(TranslationMatrix);
  }
}
ItemEvents.firstRightClicked("ftb:multiblock_printer", (event) => {
  let TargetBlock = event.getTarget().block;

  if (!TargetBlock.hasTag("ftb:printable_multiblock")) {
    event.getPlayer().sendSystemMessage(Text.translate("ftb.multiblock_printer.invalid_block").red());
    return;
  }

  let MultiblockIDs = BrandonsCore$MultiBlockManager.getDefinitions().keySet();
  MultiblockIDs = MultiblockIDs.toArray().filter((value) => value.getNamespace() == "ftb");
  if (!(MultiblockIDs.find((e) => e == TargetBlock.getEntity().getId()))) {
    event.getPlayer().sendSystemMessage(Text.translate("ftb.multiblock_printer.no_multiblock_found").red());
    return;
  }

  let MultiblockDefinition = BrandonsCore$MultiBlockManager.getDefinition(TargetBlock.getEntity().getId());
  if (MultiblockDefinition == null) return;

  let FacingDegrees = TargetBlock.getProperties().get("facing");
  if (FacingDegrees == null) {
    event.getPlayer().sendSystemMessage(Text.translate("ftb.multiblock_printer.no_orientation").red());
    return;
  }
  FacingDegrees = Direction[FacingDegrees].getYaw();

  let MultiblockJSON = JSON.parse(MultiblockDefinition.getJson());
  let MultiblockOrigin = new BlockPos(MultiblockJSON.origin.x, MultiblockJSON.origin.y, MultiblockJSON.origin.z);

  let MultiblockYSize = MultiblockJSON.structure.length;
  let MultiblockZSize = MultiblockJSON.structure[0].length;
  let MultiblockXSize = MultiblockJSON.structure[0][0].length;

  let MultiblockShape = CCL$Vector3.fromBlockPosCenter(new BlockPos(MultiblockXSize, MultiblockYSize, MultiblockZSize));
  let TransformedShape = MultiblockShape.copy()["subtract(double)"](0.5);

  RotatePointVec(MultiblockShape.copy(), TransformedShape, FacingDegrees, false);

  TransformedShape = TransformedShape.vec3();
  TransformedShape = new CCL$Vector3(
    Math.round(TransformedShape.x),
    Math.round(TransformedShape.y),
    Math.round(TransformedShape.z)
  );

  let TransformedJSON = new Object(MultiblockJSON);
  let TransformedOrigin = CCL$Vector3.fromBlockPosCenter(MultiblockOrigin);

  RotatePointVec(MultiblockShape.copy(), TransformedOrigin, FacingDegrees, true);

  TransformedOrigin = TransformedOrigin.vec3();
  TransformedOrigin = new BlockPos(TransformedOrigin.x, TransformedOrigin.y, TransformedOrigin.z);
  TransformedJSON.origin.x = TransformedOrigin.x;
  TransformedJSON.origin.y = TransformedOrigin.y;
  TransformedJSON.origin.z = TransformedOrigin.z;

  let TransformedRotation = new Array(Math.abs(TransformedShape.y))
    .fill(null)
    .map(() =>
      new Array(Math.abs(TransformedShape.z)).fill(null).map(() => new Array(Math.abs(TransformedShape.x)).fill(null))
    );

  for (const layer = 0; layer < MultiblockYSize; layer++) {
    for (const row = 0; row < MultiblockZSize; row++) {
      let Aisle = MultiblockJSON.structure[layer][row];
      for (let i = 0; i < MultiblockXSize; i++) {
        let BlockKey = Aisle.charAt(i);
        let MultiblockPos = new BlockPos(i, layer, row);
        let TransformedPos = CCL$Vector3.fromBlockPosCenter(MultiblockPos);

        RotatePointVec(MultiblockShape.copy(), TransformedPos, FacingDegrees, true);

        TransformedPos = TransformedPos.vec3();

        TransformedPos = new BlockPos(TransformedPos.x, TransformedPos.y, TransformedPos.z);
        TransformedRotation[TransformedPos.y][TransformedPos.z][TransformedPos.x] = BlockKey;
      }
    }
  }

  for (const layer in TransformedRotation) {
    for (const row in TransformedRotation[layer]) {
      TransformedRotation[layer][row] = TransformedRotation[layer][row].join("");
    }
  }

  TransformedJSON.structure = TransformedRotation;

  BrandonsCore$ProcessHandler.addProcess(
    new DraconicEvolution$MultiBlockBuilder(
      event.getLevel(),
      TargetBlock.getPos(),
      new BrandonsCore$MultiBlockDefinition(MultiblockDefinition.getId(), TransformedJSON),
      event.getPlayer(),
      null
    )
  );
});

// ItemEvents.firstLeftClicked("ftb:multiblock_printer", (event) => {
//   let TargetBlock = event.getTarget().block;

//   if (!TargetBlock.hasTag("ftb:printable_multiblock")) {
//     event.getPlayer().sendSystemMessage(Text.translate("ftb.multiblock_printer.invalid_block").red());
//     return;
//   }

//   let MultiblockIDs = BrandonsCore$MultiBlockManager.getDefinitions().keySet();
//   MultiblockIDs = MultiblockIDs.toArray().filter((value) => value.getNamespace() == "ftb");
//   if (!(MultiblockIDs.find((e) => e == TargetBlock.getEntity().getId()))) {
//     event.getPlayer().sendSystemMessage(Text.translate("ftb.multiblock_printer.no_multiblock_found").red());
//     return;
//   }
  
//   let MultiblockDefinition = BrandonsCore$MultiBlockManager.getDefinition(TargetBlock.getEntity().getId());
//   if (MultiblockDefinition == null) return;

//   let BlockList = new Map()

//   MultiblockDefinition.getBlocks().values().forEach((block) => {
//     let part = String(block.getFirstValidBlock().asItem())
//     // event.getPlayer().tell(`${part}`)
//     if (BlockList.has(part)) {
//       // event.getPlayer().tell(`${part}`)
//       BlockList.set(part, BlockList.get(part) + 1)
//     } else {
//       BlockList.set(part, 1)
//     }
    
//   })
//   BlockList.forEach((value, key) => {
    
//     event.getPlayer().tell(Text.translate("%s: %s", Item.of(key).getDisplayName(), value.toFixed(0)))
//   })
  
  
  
// })