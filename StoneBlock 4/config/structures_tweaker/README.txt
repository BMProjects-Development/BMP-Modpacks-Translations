Structures Tweaker Configuration Guide
=====================================

This folder contains configuration files for the Structures Tweaker mod.

GLOBAL CONFIGURATION
-------------------
The 'global.json' file sets default behavior for ALL structures.
Configure your server-wide settings here first.

INDIVIDUAL STRUCTURE CONFIGS
---------------------------
Each structure can have its own config file in subfolders by mod:
  - minecraft/village_plains.json
  - dungeons_arise/shiraz_palace.json
  - etc.

These individual files only need to contain settings that differ from
the global defaults. For example:

global.json (server defaults):
{
  "config": {
    "canBreakBlocks": false,
    "canPlaceBlocks": false,
    "blockBreakWhitelist": ["minecraft:spawner", "minecraft:chest"],
    "blockPlaceWhitelist": ["minecraft:torch", "minecraft:ladder"]
  }
}

minecraft/stronghold.json (dungeon with restrictions):
{
  "individualOverrides": {
    "canBreakBlocks": false,
    "blockBreakBlacklist": ["minecraft:end_portal_frame", "minecraft:bedrock"]
  }
}

In this setup, most structures prevent breaking/placing blocks but allow
torches and ladders to be placed. The stronghold specifically prevents
breaking the end portal frame, even if breaking becomes allowed.

LIST MERGING BEHAVIOR
---------------------
**IMPORTANT**: List properties (whitelists/blacklists) are ADDITIVE!
Individual configs ADD to global lists, they don't replace them.

Example:
  Global: "itemUseBlacklist": ["minecraft:flint_and_steel"]
  Individual: "itemUseBlacklist": ["minecraft:tnt"]
  Result: ["minecraft:flint_and_steel", "minecraft:tnt"]

This means you can:
- Set common restrictions in global.json
- Add structure-specific restrictions without losing global ones
- Build cumulative protection rules

Boolean/other properties still REPLACE (not merge).

HOW PRIORITY WORKS
-----------------
Settings are applied in this order:
1. Individual structure config (highest priority, ADDS to lists)
2. Global config
3. Mod defaults (if nothing else is set)

AVAILABLE SETTINGS
-----------------
- canBreakBlocks      : Allow breaking blocks in structure (default: true)
- canInteract         : Allow interaction with blocks (default: true)
- canPlaceBlocks      : Allow placing blocks in structure (default: true)
- allowPlayerPVP      : Allow PVP in structure (default: true)
- allowCreatureSpawning: Allow mob spawning in structure (default: true)
- preventHostileSpawns: Prevent hostile mob spawning in structure (default: false)
- preventPassiveSpawns: Prevent passive mob spawning in structure (default: false)
- allowFireSpread     : Allow fire to spread in structure (default: true)
- allowExplosions     : Allow explosions in structure (default: true)
- allowItemPickup     : Allow picking up items in structure (default: true)
- onlyProtectOriginalBlocks: Only protect blocks that were part of the original structure (default: false)
- allowElytraFlight   : Allow elytra flight in structure (default: true)
- allowEnderPearls    : Allow ender pearl usage in structure (default: true)
- allowRiptide        : Allow riptide trident usage in structure (default: true)
- allowCreativeFlight : Allow creative flight in structure (default: true)
- allowEnderTeleportation: Allow all ender-based teleportation (pearls, chorus fruit) in structure (default: true)
- creativeBypass      : Allow creative mode players to bypass player restrictions (default: false)
- preventMobGriefing  : Prevent mob griefing (e.g., creeper explosions, enderman block picking, wither destruction) in structure (default: false)
- interactionWhitelist: Blocks that can always be interacted with (e.g., minecraft:lever, minecraft:button) (default: [])
- interactionBlacklist: Blocks that can never be interacted with (e.g., minecraft:repeater, minecraft:comparator) (default: [])
- itemUseBlacklist    : Items that cannot be used in the structure (e.g., minecraft:boat, minecraft:water_bucket) (default: [])
- itemUseWhitelist    : Items that can always be used in the structure, overrides blacklist (default: [])
- blockBreakWhitelist : Blocks that can always be broken, overrides canBreakBlocks restriction (e.g., minecraft:spawner, minecraft:chest) (default: [])
- blockBreakBlacklist : Blocks that can never be broken, even if canBreakBlocks is true (e.g., minecraft:bedrock, minecraft:barrier) (default: [])
- blockPlaceWhitelist : Blocks that can always be placed, overrides canPlaceBlocks restriction (e.g., minecraft:torch, minecraft:ladder) (default: [])
- blockPlaceBlacklist : Blocks that can never be placed, even if canPlaceBlocks is true (e.g., minecraft:tnt, minecraft:wither_skeleton_skull) (default: [])

TIPS
----
- Start by configuring global.json with your server's base rules
- Only create individual configs for structures that need exceptions
- Delete individual config files to make structures use global defaults
- The mod automatically cleans up old/invalid settings from files
- Changes take effect after server restart or /reload command
- See availableconfigs.txt for a complete list of all config options
