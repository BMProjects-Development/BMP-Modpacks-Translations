---
navigation:
  title: Extractor
  icon: "xycraft_machines:extractor"
  position: 1
item_ids:
  - xycraft_machines:extractor
  - minecraft:dragon_egg
---

# Extracting Items

<Color id="yellow">XyCraft Machines</Color> is a mod that adds a handful of useful machines and items that allow for basic automation. Of those things, the <Color id="green">Extractor</Color> plays a big role in automating important resources during your playthrough.

Most notably, you can harvest <Color id="light_purple">Dragon Eggs</Color> using the setup below:

<GameScene zoom="3" interactive={true}>
  <Block id="minecraft:barrel"/>
  <BoxAnnotation color="#000000ff" min="0 0 0" max="1 1 1">
    Any storage block
  </BoxAnnotation>
  <Block y="1" id="xycraft_machines:extractor" p:direction="up" p:status="success"/>
  <Block y="2" id="minecraft:dragon_egg"/>
</GameScene>