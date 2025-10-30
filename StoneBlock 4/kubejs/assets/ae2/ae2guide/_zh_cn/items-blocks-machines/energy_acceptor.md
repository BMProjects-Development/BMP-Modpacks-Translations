---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
  title: 能源接收器
  icon: energy_acceptor
  position: 110
categories:
- network infrastructure
item_ids:
- ae2:energy_acceptor
---

# 能源接收器

<Row gap="20">
<BlockImage id="energy_acceptor" scale="8" /> 

<GameScene zoom="8" background="transparent">
  <ImportStructure src="../assets/blocks/cable_energy_acceptor.snbt" />
</GameScene>
</Row>

能源接收器会将其他科技模组的常见能量系统转换为AE2内部使用的[能量](../ae2-mechanics/energy.md)⸺AE。虽然<ItemLink id="controller" />也能做到这一点，但控制器的面非常珍贵，一般还是推荐使用能源接收器。

Forge Energy与Techreborn Energy的转换比为

*  2 FE = 1 AE（Forge）
*  1 E  = 2 AE（Fabric）

转换速度完全由网络能量容量决定，具体原因参见[此页](../ae2-mechanics/energy.md)。

## 变种

能源接收器有2种变种⸺**普通**、**面板/[子部件](../ae2-mechanics/cable-subparts.md)**，便于设计紧凑设施。能源接收器可以在合成方格中转换为普通和面板形态。

## 合成

能源接收器无法在标准工作台中合成。相反，它是在解锁**机器方块升级**后，在**世界引擎**中合成的。

请在游戏内参考**JEI**以获取准确的配方，因为所有世界引擎配方都会在其中显示。