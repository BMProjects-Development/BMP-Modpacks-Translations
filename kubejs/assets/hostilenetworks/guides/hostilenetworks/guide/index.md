---
navigation:
  title: Data Center
  icon: hostilenetworks:data_center
  position: 0
item_ids:
  - hostilenetworks:data_center
  - hostilenetworks:data_center_io_port
---
# <Color id="aqua">Data Center</Color>

<Column alignItems="center" fullWidth={true}>
  # <Color id="aqua">Data Center</Color>

  <ItemImage id="hostilenetworks:data_center" scale="2"/>

  The <Color id="gold">Data Center</Color> is a 7×7×7 multiblock that runs up to 25 <Color id="light_purple">Self Aware</Color> Data Models simultaneously, each producing drops on its own cycle.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Structure</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Column alignItems="center" fullWidth={true}>
  <GameScene zoom="2" interactive={true} background="#333333">
    <ImportStructure src="hostilenetworks:hnn_data_center.nbt"/>
    <IsometricCamera yaw="-45" pitch="30"/>
    <BoxAnnotation min="1 1 1" max="6 6 6" color="#ff0000">
      Interior must be hollow.
    </BoxAnnotation>
    <BlockAnnotation x="5" y="1" z="6" color="#55ffff">
      Optional. Can be replaced with **Black Stained Glass** if data model input is not being automated.
    </BlockAnnotation>
  </GameScene>
  #### *Data Center Multiblock*
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

Start with a solid 7×7 <ItemLink id="minecraft:obsidian"/> floor. Build up the walls and ceiling with <ItemLink id="minecraft:black_stained_glass"/>, leaving the interior fully hollow.

On the outer bottom layer, place the <ItemLink id="hostilenetworks:data_center"/> controller and at least three <ItemLink id="hostilenetworks:data_center_io_port"/> blocks, one configured to each mode: <Color id="aqua">Energy</Color>, <Color id="aqua">Inputs</Color>, <Color id="aqua">Outputs</Color>, and an optional fourth Port configured to <Color id="aqua">Models</Color>.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">IO Ports</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="hostilenetworks:data_center_io_port"/>
  ### <Color id="aqua">Data Center IO Port</Color>
</Row>

IO Ports substitute any bottom-layer wall in the shell. Right-click to cycle the mode. Each of the four modes must be present for the multiblock to function.

| Mode | Purpose |
|---|---|
| <Color id="aqua">Energy</Color> | Accepts power input |
| <Color id="aqua">Inputs</Color> | Insert per-model ingredient items |
| <Color id="aqua">Outputs</Color> | Retrieve produced drops |
| <Color id="aqua">Models</Color> | Inserts data models to the Data Center (optional) |