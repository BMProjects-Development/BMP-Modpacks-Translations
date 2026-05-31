---
navigation:
  title: The Basics
  position: 1
  icon: "oritech:accelerator_ring"
  parent: oritech:getting_started.md
item_ids:
  - oritech:accelerator_ring
  - oritech:accelerator_motor
  - oritechthings:accelerator_magnetic_field
---
# The Basics

<Column alignItems="center" fullWidth={true}>
### <ItemImage id="oritech:accelerator_controller" scale="0.75" /> <Color id="aqua">The Basics</Color> <ItemImage id="oritech:accelerator_controller" scale="0.75" />

<GameScene zoom="2.5" interactive={true}>
  <ImportStructure src="oritech:assets/basic_accelerator.nbt" />
  <IsometricCamera yaw="225" pitch="30" />
  <DiamondAnnotation pos="0.5 0.5 1.5" color="#ff6d6dff">
  Each setup requires 2 Particle Accelerators. Used to insert items to accelerate. <ItemImage id="oritech:accelerator_controller" />
  </DiamondAnnotation>
  <DiamondAnnotation pos="3.5 0.5 2.5" color="#ff6d6dff">
  The Accelerator Magnetic Field is placed in the center and linked to the main Particle Accelerator with an Advanced Target Designator.
  
  These also support addons! <ItemImage id="oritechthings:accelerator_magnetic_field" />
  </DiamondAnnotation>
  <DiamondAnnotation pos="5.5 0.5 2.5" color="#ff6d6dff">
  The Linear Motor is placed within the Accelerator Ring. When powered, this will accelerate the particle. <ItemImage id="oritech:accelerator_motor" />
  </DiamondAnnotation>
  <DiamondAnnotation pos="2.5 0.5 4.5" color="#ff6d6dff">
  Guide Rings help guide the particle around the ring. They can be Right-clicked once placed to change the angle of entry. <ItemImage id="oritech:accelerator_ring" />
  </DiamondAnnotation>
</GameScene>

#### *Basic Particle Acclerator Setup*
</Column>

---

To set up the <Color id="aqua">Particle Accelerator</Color>, you will need these items:

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

The <Color id="aqua">Particle Accelerators</Color> is the main machine in any accelerator setup. This is where items will be inserted into the particle acceleration ring. A basic setup requires at least 2 <Color id="aqua">Particle Accelerators</Color>, both attached to a <Color id="green">Particle Accelerator Guide Ring</Color>.

---

<Column alignItems="center" fullWidth={true}>
<ItemImage scale="3" id="oritech:accelerator_ring" />
</Column>
<Color id="green">Particle Accelerator Guide Rings</Color> are used to guide the particle around in a circle. Once placed, they can be Right-clicked to change the angle of entry. Depending on the size of the ring, you will want to use more of these.

---

<Column alignItems="center" fullWidth={true}>
<ItemImage scale="3" id="oritech:accelerator_motor" />
</Column>
The <Color id="green">Particle Accelerator Linear Motor</Color> is used to accelerate the particles around the ring. These must be powered. While only 1 is required, having more will accelerate the particle faster.

---

<Column alignItems="center" fullWidth={true}>
<ItemImage scale="3" id="oritechthings:accelerator_magnetic_field" />
</Column>
The <Color id="gold">Accelerator Magnetic Field</Color> is placed in the middle of the of the setup, and is linked by Sneak + Right-clicking on the main Particle Accelerator with an <Color id="aqua">Advanced Target Designator</Color>, then Sneak + Right-clicking on the Magnetic Field.

The Magnet is also very power hungry. You can attach addons or Machine Addon Extenders, which is required to hit 15kJ for smaller rings.

---

Suggested Addons to use for the Magnetic Field:

<ItemGrid>
  <ItemIcon id="oritechthings:addon_block_efficient_speed_tier_8" />
  <ItemIcon id="oritechthings:addon_block_capacitor_tier_8" />
</ItemGrid>

*Note: This small setup can also hit 15kJ using a Machine Addon Extender and several of the above addons.*



