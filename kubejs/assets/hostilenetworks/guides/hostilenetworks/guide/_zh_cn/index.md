---
navigation:
  title: 数据中心
  icon: hostilenetworks:data_center
  position: 0
item_ids:
  - hostilenetworks:data_center
  - hostilenetworks:data_center_io_port
---
# <Color id="aqua">数据中心</Color>

<Column alignItems="center" fullWidth={true}>
  # <Color id="aqua">数据中心</Color>

  <ItemImage id="hostilenetworks:data_center" scale="2"/>

  <Color id="gold">数据中心</Color> 是一个 7×7×7 的多方块结构，最多可同时运行 25 个<Color id="light_purple">自我意识</Color> 数据模型，每个模型都会按自己的周期产出战利品。
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">结构</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Column alignItems="center" fullWidth={true}>
  <GameScene zoom="2" interactive={true} background="#333333">
    <ImportStructure src="hostilenetworks:hnn_data_center.nbt"/>
    <IsometricCamera yaw="-45" pitch="30"/>
    <BoxAnnotation min="1 1 1" max="6 6 6" color="#ff0000">
      内部必须保持中空。
    </BoxAnnotation>
    <BlockAnnotation x="5" y="1" z="6" color="#55ffff">
      可选。如果不打算自动输入数据模型，可以用**黑色染色玻璃**替换。
    </BlockAnnotation>
  </GameScene>
  #### *数据中心多方块结构*
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

先用<ItemLink id="minecraft:obsidian"/>铺出一个实心的 7×7 地板。然后用<ItemLink id="minecraft:black_stained_glass"/>搭建墙壁和天花板，并让内部完全中空。

在外侧底层放置<ItemLink id="hostilenetworks:data_center"/>控制器和至少三个<ItemLink id="hostilenetworks:data_center_io_port"/>方块，并分别配置为以下模式：<Color id="aqua">能量</Color>、<Color id="aqua">输入</Color>、<Color id="aqua">输出</Color>；还可以额外放置第四个端口，并将其配置为<Color id="aqua">模型</Color>。

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">IO 端口</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="hostilenetworks:data_center_io_port"/>
  ### <Color id="aqua">数据中心 IO 端口</Color>
</Row>

IO 端口可以替代外壳底层的任意墙面方块。右键点击可循环切换模式。多方块结构要正常工作，四种模式都必须存在。

| 模式 | 用途 |
|---|---|
| <Color id="aqua">能量</Color> | 接收电力输入 |
| <Color id="aqua">输入</Color> | 插入每个模型所需的材料物品 |
| <Color id="aqua">输出</Color> | 取出产出的战利品 |
| <Color id="aqua">模型</Color> | 将数据模型插入数据中心（可选） |
