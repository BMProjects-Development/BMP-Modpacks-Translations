---
navigation:
  title: 提取机
  icon: "xycraft_machines:extractor"
  position: 1
item_ids:
  - xycraft_machines:extractor
  - minecraft:dragon_egg
---

# 提取物品

<Color id="yellow">XyCraft Machines</Color>模组添加了一些实用机器和物品，旨在实现简单的自动化。在这些东西中，<Color id="green">提取机</Color>在你的游戏过程中自动化重要资源方面起着重要作用。

需要特别注意的是，你可以使用以下装置收集<Color id="light_purple">龙蛋</Color>：

<GameScene zoom="3" interactive={true}>
  <Block id="minecraft:barrel"/>
  <BoxAnnotation color="#000000ff" min="0 0 0" max="1 1 1">
    Any storage block
  </BoxAnnotation>
  <Block y="1" id="xycraft_machines:extractor" p:direction="up" p:status="success"/>
  <Block y="2" id="minecraft:dragon_egg"/>
</GameScene>