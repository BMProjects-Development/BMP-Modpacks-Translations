---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
  title: Energy Acceptor
  icon: energy_acceptor
  position: 110
categories:
- network infrastructure
item_ids:
- ae2:energy_acceptor
---

# The Energy Acceptor

<Row gap="20">
<BlockImage id="energy_acceptor" scale="8" /> 

<GameScene zoom="8" background="transparent">
  <ImportStructure src="../assets/blocks/cable_energy_acceptor.snbt" />
</GameScene>
</Row>

The Energy Acceptor converts common forms of energy from other tech mods into AE2's internal form of [energy](../ae2-mechanics/energy.md), AE.  
While the <ItemLink id="controller" /> can also do this, controller faces are valuable so it's often better to use an Energy Acceptor instead.

The ratios for conversion of Forge Energy and TechReborn Energy are:

* 2 FE = 1 AE (Forge)  
* 1 E  = 2 AE (Fabric)  

The speed of conversion is entirely dependent on how much AE your network can store, for reasons that are explained on [this page](../ae2-mechanics/energy.md).

## Variants

Energy Acceptors come in 2 different variants: **normal** and **flat/[subpart](../ae2-mechanics/cable-subparts.md)**.  
This allows you to make some setups more compact. Energy Acceptors can be swapped between normal and flat in a crafting grid.

## Crafting

The Energy Acceptor is not crafted in a standard crafting table.  
It is instead **crafted in the World Engine** once you have unlocked the **Basic Machine Block Upgrade**.  

Please refer to **JEI** in-game for the exact recipe, as all World Engine recipes are displayed there.
