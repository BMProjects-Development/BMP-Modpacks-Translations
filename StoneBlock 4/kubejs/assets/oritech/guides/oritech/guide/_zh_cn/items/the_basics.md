---
navigation:
  title: 基础知识
  position: 1
  icon: "oritech:accelerator_ring"
  parent: oritech:getting_started.md
item_ids:
  - oritech:accelerator_ring
  - oritech:accelerator_motor
  - oritechthings:accelerator_magnetic_field
---
# 基础知识

<Column alignItems="center" fullWidth={true}>
### <ItemImage id="oritech:accelerator_controller" scale="0.75" /> <Color id="aqua">基础知识</Color> <ItemImage id="oritech:accelerator_controller" scale="0.75" />

<GameScene zoom="2.5" interactive={true}>
  <ImportStructure src="oritech:assets/basic_accelerator.nbt" />
  <IsometricCamera yaw="225" pitch="30" />
  <DiamondAnnotation pos="0.5 0.5 1.5" color="#ff6d6dff">
  每套装置需配备2台粒子加速器，用于输入待加速物品。<ItemImage id="oritech:accelerator_controller" />
  </DiamondAnnotation>
  <DiamondAnnotation pos="3.5 0.5 2.5" color="#ff6d6dff">
  加速器磁场置于中心，需使用高级目标标识器将其连接至主粒子加速器。
  
  该设备支持安装机器插件！<ItemImage id="oritechthings:accelerator_magnetic_field" />
  </DiamondAnnotation>
  <DiamondAnnotation pos="5.5 0.5 2.5" color="#ff6d6dff">
  直线型马达需置于加速环内。通电后即可为粒子提供加速。<ItemImage id="oritech:accelerator_motor" />
  </DiamondAnnotation>
  <DiamondAnnotation pos="2.5 0.5 4.5" color="#ff6d6dff">
  导向环用于引导粒子沿环运动。放置后右击可调整其入射角度。<ItemImage id="oritech:accelerator_ring" />
  </DiamondAnnotation>
</GameScene>

#### *粒子加速器搭建基础示例*
</Column>

---

搭建<Color id="aqua">粒子加速器</Color>需准备以下物品：

<ItemGrid>
  <ItemIcon id="oritech:accelerator_motor" />
  <ItemIcon id="oritech:accelerator_controller" />
  <ItemIcon id="oritech:accelerator_ring" />
  <ItemIcon id="oritechthings:accelerator_magnetic_field" />
  <ItemIcon id="oritechthings:advanced_target_designator" />
</ItemGrid>

---

<Column alignItems="center" fullWidth={true}>
<ItemImage scale="3" id="oritech:accelerator_controller" />
</Column>

<Color id="aqua">粒子加速器</Color>是整套装置的核心主机，用于将物品注入加速环。基础结构至少需要2台<Color id="aqua">粒子加速器</Color>，且均需附着于<Color id="green">加速器导向环</Color>上。

---

<Column alignItems="center" fullWidth={true}>
<ItemImage scale="3" id="oritech:accelerator_ring" />
</Column>
<Color id="green">加速器导向环</Color>用于引导粒子进行圆周运动。放置后右击可调整入射角度。环体尺寸越大，所需导向环越多。

---

<Column alignItems="center" fullWidth={true}>
<ItemImage scale="3" id="oritech:accelerator_motor" />
</Column>
<Color id="green">粒子加速器直线型马达</Color>用于沿环加速粒子，工作时必须通电。虽仅需1台即可运作，但增加马达数量能显著提升加速效率。

---

<Column alignItems="center" fullWidth={true}>
<ItemImage scale="3" id="oritechthings:accelerator_magnetic_field" />
</Column>
<Color id="gold">加速器磁场</Color>需置于装置中心。连接方式：手持<Color id="aqua">高级目标标识器</Color>，先<Color id="gold">潜行+右击</Color>主粒子加速器，再<Color id="gold">潜行+右击</Color>磁场方块。

磁场耗能极高。可直接安装机器插件或使用机器插件拓展器，这是小型加速环达到15kJ能级的前提条件。

---

磁场推荐插件：

<ItemGrid>
  <ItemIcon id="oritechthings:addon_block_efficient_speed_tier_8" />
  <ItemIcon id="oritechthings:addon_block_capacitor_tier_8" />
</ItemGrid>

*注：搭配机器扩展坞及上述插件，即使是此类小型装置也能达到15kJ能级。*



