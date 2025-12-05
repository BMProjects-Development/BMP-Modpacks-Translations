---
navigation:
  title: Particle Accelerator Overview
  position: 1
  icon: "oritech:accelerator_controller"
item_ids:
  - oritech:accelerator_controller

---
# Particle Accelerator Overview

<Column alignItems="center" fullWidth={true}>
### <ItemImage id="oritech:accelerator_controller" scale="0.75" /> <Color id="aqua">The Particle Accelerator</Color><ItemImage id="oritech:accelerator_controller" scale="0.75" />

---


<GameScene zoom="2.5" interactive={true}>
  <ImportStructure src="assets/particle_accelerator.nbt" />
  <RemoveBlocks id="minecraft:stone" />
  <IsometricCamera yaw="225" pitch="30" />
</GameScene>
#### *Example Particle Accelerator Setup Used To Hit 15,000J*
</Column>

---

The <Color id="aqua">Particle Accelerator</Color> is an advanced setup used to accelerate an item until it collides into another item. The speed at which the <Color id="gold">collision</Color> happens determines the success of creating a new item.

While the <Color id="aqua">Particle Accelerator</Color> can be used for several crafts, it is most notably used in creating the <Color id="gold">Black Hole</Color> by having a <Color id="light_purple">Small Chaos Fragment</Color> collide into a <Color id="light_purple">Antimatter Pellet</Color> at a minimum of <Color id="aqua">15,000J</Color>.

<Column alignItems="center" fullWidth={true}>
## [Learn The Basics](oritech:items/the_basics.md)
</Column>


