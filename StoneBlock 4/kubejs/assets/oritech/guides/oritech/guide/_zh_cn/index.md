---
navigation:
  title: 粒子加速器概览
  position: 1
  icon: "oritech:accelerator_controller"
item_ids:
  - oritech:accelerator_controller

---
# 粒子加速器概览

<Column alignItems="center" fullWidth={true}>
### <ItemImage id="oritech:accelerator_controller" scale="0.75" /> <Color id="aqua">粒子加速器</Color><ItemImage id="oritech:accelerator_controller" scale="0.75" />

---


<GameScene zoom="2.5" interactive={true}>
  <ImportStructure src="assets/particle_accelerator.nbt" />
  <RemoveBlocks id="minecraft:stone" />
  <IsometricCamera yaw="225" pitch="30" />
</GameScene>
#### *能级达15,000J的加速器搭建示例*
</Column>

---

<Color id="aqua">粒子加速器</Color>是一种用于将物品加速并与另一物品发生撞击的高级装置。新物品的合成成功率取决于<Color id="gold">碰撞</Color>时的速度。

虽然<Color id="aqua">粒子加速器</Color>可用于多种合成配方，但其核心用途是制造<Color id="gold">黑洞</Color>：需将<Color id="light_purple">小的混沌碎片</Color>加速撞击<Color id="light_purple">反物质球</Color>，且能量需至少达到<Color id="aqua">15,000J</Color>。

<Column alignItems="center" fullWidth={true}>
## [了解基础知识](oritech:items/the_basics.md)
</Column>


