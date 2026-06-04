let CustomMachine$BlockStructure$Builder = Java.loadClass(
  "fr.frinn.custommachinery.common.util.BlockStructure$Builder"
);

let BlockStructures = new Array();

if (BlockStructures.length == 0) {
  for (const machine in FTBStructures$ALL) {
    for (const structure in FTBStructures$ALL[machine]) {
      let builder = CustomMachine$BlockStructure$Builder.start();
      let build = {};

      for (const aisle in FTBStructures$ALL[machine][structure].pattern) {
        builder.aisle(FTBStructures$ALL[machine][structure].pattern[aisle]);
      }
      for (const key in FTBStructures$ALL[machine][structure].keys) {
        builder.where(key, FTBStructures$ALL[machine][structure].keys[key]);
      }

      BlockStructures.push({
        machine: machine,
        module: structure,
        display_name: machine.replace(":", ".") + "." + structure,
        object: builder.build(),
      });
    }
  }
}

ItemEvents.firstLeftClicked("ftb:multiblock_validator", (event) => {

  if (!isEntityRealPlayer(event.getPlayer())) return;

  let be = event.getTarget().block;

  if (be == null) return;

  if (be.getEntity() == null) return;

  be = be.getEntity();

  if (be.getBlockState() != "custommachinery:custom_machine_block") return;



  let structure_component = be.getComponentManager().getComponent("custommachinery:structure");


  try {
    structure_component = structure_component.orElseThrow();
  } catch (_) {
    event.getPlayer().tell(Text.translate("ftb.multiblock_validator.no_structure_component"));
    return;
  }

  let has = BlockStructures.filter((structure) => structure.machine == be.getId());
  if (has.length == 0) {
    event.getPlayer().tell(Text.translate("ftb.multiblock_validator.no_structure_requirement"));
    return;
  }


  // Realignment
  if (
    be.getId() == "ftb:world_engine" &&
    be.getBlockState().getValue(BlockProperties.HORIZONTAL_FACING) != Facing.SOUTH
  ) {
    event.getPlayer().tell(Text.translate("ftb.multiblock_validator.realigned"));
    event.getTarget().block.setBlockState(be.getBlockState().setValue(BlockProperties.HORIZONTAL_FACING, Facing.SOUTH));
  }

  // Start List
  event.getPlayer().tell(Text.translate("ftb.multiblock_validator.list_header"));

  BlockStructures.filter((structure) => structure.module == "main")
    .filter((structure) => structure.machine == be.getId())
    .forEach((structure) => {
      if (structure_component.checkStructure(structure.object)) {
        event
          .getPlayer()
          .tell(
            Text.of(" - ")
              .append(Text.translate(structure.display_name))
              .append(Text.translate("ftb.multiblock_validator.active"))
              .green()
          );
      } else {
        event
          .getPlayer()
          .tell(
            Text.of(" - ")
              .append(Text.translate(structure.display_name))
              .append(Text.translate("ftb.multiblock_validator.inactive"))
              .red()
          );
      }
    });
  BlockStructures.filter((structure) => structure.module != "main")
    .filter((structure) => structure_component.checkStructure(structure.object))
    .forEach((structure) => {
      event
        .getPlayer()
        .tell(
          Text.of(" - ")
            .append(Text.translate(structure.display_name))
            .append(Text.translate("ftb.multiblock_validator.active"))
            .green()
        );
    });
});

ItemEvents.firstRightClicked("ftb:multiblock_validator", (event) => {
  
  if (!isEntityRealPlayer(event.getPlayer())) return;

  if (!event.getPlayer().isCrouching()) return;

  let be = event.getTarget().block;

  if (be == null) return;

  if (be.getEntity() == null) return;

  be = be.getEntity();

  if (be.getBlockState() != "custommachinery:custom_machine_block") return;

  be.getProcessor()
    .getCores()
    .forEach((core) => {
      if (core.getStatus() == "ERRORED") {
        core.reset();
      }
    });
});
