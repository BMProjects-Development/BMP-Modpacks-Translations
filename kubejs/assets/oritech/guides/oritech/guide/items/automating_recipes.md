---
navigation:
  title: Automating Recipes
  position: 2
  icon: "oritechthings:particle_accelerator_speed_sensor"
  parent: oritech:getting_started.md
item_ids:
  - oritechthings:particle_accelerator_speed_sensor
  - oritech:accelerator_sensor
  - oritechthings:advanced_target_designator
---
# Automating Recipes

<Column alignItems="center" fullWidth={true}>
### <ItemImage id="oritechthings:particle_accelerator_speed_sensor" scale="0.75" /> <Color id="aqua">Automating the Particle Accelerator</Color> <ItemImage id="oritechthings:particle_accelerator_speed_sensor" scale="0.75" />
</Column>

---

A <Color id="aqua">Particle Accelerator</Color> recipe only completes when a second item collides with the accelerated particle at the right velocity. Automating that requires two things:

1. Detecting when the particle has reached recipe speed.
2. Releasing the collision item at exactly that moment.

The <Color id="aqua">Speed Sensor</Color> handles step 1. A <Color id="green">Dispenser</Color> + <Color id="green">Hopper</Color> pair handles step 2.

---

<Column alignItems="center" fullWidth={true}>
## <Color id="gold">Speed Sensor</Color>
</Column>

<Column alignItems="center" fullWidth={true}>
<ItemImage scale="3" id="oritechthings:particle_accelerator_speed_sensor" />
</Column>

The <Color id="aqua">Speed Sensor</Color> emits a redstone signal when the particle inside a linked accelerator reaches a target velocity. Two modes:

- <Color id="green">Auto</Color> — pulls the required velocity straight from the accelerator's active recipe. Use this for normal recipes.
- <Color id="yellow">Manual</Color> — you set a specific threshold yourself, for custom redstone logic.

The on/off toggle in the GUI controls whether the sensor outputs at all.

---

### <Color id="aqua">Linking</Color>

Linking works the same way as the <Color id="gold">Magnetic Field</Color>, using the <ItemLink id="oritechthings:advanced_target_designator" />:

1. Sneak + Right-click a <Color id="aqua">Particle Accelerator</Color> with the Designator to save its position.
2. Place the <Color id="aqua">Speed Sensor</Color> anywhere within <Color id="green">128 blocks</Color>.
3. Sneak + Right-click the Speed Sensor with the Designator to bind it.

The sensor's GUI will show the linked accelerator's coordinates once paired.

<RecipeFor id="oritechthings:particle_accelerator_speed_sensor" />

---

<Column alignItems="center" fullWidth={true}>
## <Color id="gold">Injecting the Collision Item</Color>
</Column>

A <Color id="green">Dispenser</Color> placed directly against a <Color id="aqua">Particle Accelerator</Color> face <Color id="red">does not</Color> push items into the accelerator's inventory. It spits the item out as a free item entity instead.

The fix: place a <Color id="green">Hopper</Color> between the Dispenser and the Accelerator. The Hopper catches the dropped item entity and feeds it into the accelerator's inventory normally.

<Column alignItems="center" fullWidth={true}>
<Row>
  <ItemImage scale="2" id="minecraft:dispenser" />
  <ItemImage scale="2" id="minecraft:hopper" />
  <ItemImage scale="2" id="oritech:accelerator_controller" />
</Row>
</Column>

Aim the Dispenser so its dropped entity falls onto the Hopper, and aim the Hopper into the Accelerator. Stock the Dispenser with the collision item.

---

<Column alignItems="center" fullWidth={true}>
## <Color id="gold">Putting It Together</Color>
</Column>

1. Build a working accelerator (see [The Basics](oritech:items/the_basics.md)).
2. Place and link a <ItemLink id="oritechthings:particle_accelerator_speed_sensor" />, leave it on <Color id="green">Auto</Color>.
3. Set up a <Color id="green">Dispenser</Color> + <Color id="green">Hopper</Color> feeding into one of the accelerator's input faces. Stock the Dispenser with the collision item.
4. Wire the Speed Sensor's redstone output to the Dispenser.
5. Insert the first ingredient into the accelerator and power your motors. The system fires the second ingredient automatically once recipe speed is reached.

For comparison, the base <ItemLink id="oritech:accelerator_sensor" /> only outputs an analog signal proportional to particle speed — usable, but it requires a comparator and manual threshold tuning per recipe. The <Color id="aqua">Speed Sensor</Color>'s Auto mode skips that work.
