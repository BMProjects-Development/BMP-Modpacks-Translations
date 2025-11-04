-- 3x3 Sliding Puzzle with World Blocks Mirroring Puzzle State
-- This script synchronizes an in-game monitor puzzle with physical blocks in the world.

-- Find required peripherals
local mon = peripheral.find("monitor")
local speaker = peripheral.find("speaker")
local nbtStorage = peripheral.find("nbt_storage")
if not mon then error("No monitor found!") end
if not speaker then error("Speaker not found") end
if not nbtStorage then error("NBT Storage peripheral not found!") end
-- commands is a global object from the Command Computer
if not commands then error("This computer must be command-enabled") end

-- Key to store the puzzle completion status in the NBT storage block
local completionKey = "puzzle_complete"

-- This function will be called on startup to check for the completion status in the NBT storage.
local function checkCompletionState()
    local nbt = nbtStorage.read()
    if nbt and nbt[completionKey] then
        mon.setBackgroundColor(colors.green)
        mon.setTextColor(colors.black)
        os.sleep(10)
        return true
    end
    return false
end

-- Check the completion state first. If the flag is set in the NBT storage, the puzzle is already solved and we can exit.
if checkCompletionState() then
    return
end

mon.setTextScale(1)
mon.setBackgroundColor(colors.black)
mon.setTextColor(colors.white)

local monW, monH = mon.getSize()
if monW < 3 or monH < 3 then error("Monitor must be at least 3x3") end

-- Hardcoded puzzle start
local puzzle = {
  {1, 2, 3},
  {4, 0, 6},
  {7, 5, 8}
}

local moves = 0
local maxMovesBeforeEasy = 20
local useNumbers = false
local easierMessageShown = false

-- Slot to entity/block mapping (slot = position 1-9)
-- These entities are placeholders for the physical blocks in the world.
local slotEntities = {
  [1] = "@e[nbt={data:{vault_name:tf_lich,number:1}},sort=nearest,limit=1]",
  [2] = "@e[nbt={data:{vault_name:tf_lich,number:2}},sort=nearest,limit=1]",
  [3] = "@e[nbt={data:{vault_name:tf_lich,number:3}},sort=nearest,limit=1]",
  [4] = "@e[nbt={data:{vault_name:tf_lich,number:4}},sort=nearest,limit=1]",
  [5] = "@e[nbt={data:{vault_name:tf_lich,number:5}},sort=nearest,limit=1]",
  [6] = "@e[nbt={data:{vault_name:tf_lich,number:6}},sort=nearest,limit=1]",
  [7] = "@e[nbt={data:{vault_name:tf_lich,number:7}},sort=nearest,limit=1]",
  [8] = "@e[nbt={data:{vault_name:tf_lich,number:8}},sort=nearest,limit=1]",
  [9] = "@e[nbt={data:{vault_name:tf_lich,number:9}},sort=nearest,limit=1]"
}

-- Set block in the world based on slot and tile value
local function setBlock(slotNumber, tileValue)
  local sel = slotEntities[slotNumber]
  if tileValue == 0 then
    -- The blank tile is represented by a barrier block
    commands.exec("/execute as " .. sel .. " at @s run setblock ~ ~ ~ minecraft:stone")
  else
    -- A numbered tile is represented by a specific lich_door block
    commands.exec("/execute as " .. sel .. " at @s run setblock ~ ~ ~ ftb:lich_door_" .. tileValue)
  end
end

-- Initialize world blocks according to puzzle state
-- This is the function that sets the initial world state
local slot = 1
for y, row in ipairs(puzzle) do
  for x, tile in ipairs(row) do
    setBlock(slot, tile)
    slot = slot + 1
  end
end

-- Get blank tile
local function getBlank()
  for y = 1,3 do
    for x = 1,3 do
      if puzzle[y][x] == 0 then return x, y end
    end
  end
end

-- Swap tiles + update world
local function swap(x1, y1, x2, y2)
  local slot1 = (y1 - 1) * 3 + x1
  local slot2 = (y2 - 1) * 3 + x2
  puzzle[y1][x1], puzzle[y2][x2] = puzzle[y2][x2], puzzle[y1][x1]

  -- Update world blocks
  -- This updates the two physical blocks that were swapped
  setBlock(slot1, puzzle[y1][x1])
  setBlock(slot2, puzzle[y2][x2])

  -- Play a sound effect when a tile is successfully swapped
  speaker.playSound("twilightforest:block.twilightforest.vanish.vanish", 1)
end

-- Check adjacency
local function isAdjacent(x1, y1, x2, y2)
  return (math.abs(x1 - x2) == 1 and y1 == y2) or (math.abs(y1 - y2) == 1 and x1 == x2)
end

-- Check if puzzle is solved
local function isSolved()
  local n = 1
  for y = 1,3 do
    for x = 1,3 do
      if y == 3 and x == 3 then return puzzle[y][x] == 0 end
      if puzzle[y][x] ~= n then return false end
      n = n + 1
    end
  end
  return true
end

-- Monitor math
local tileW = math.floor(monW / 3)
local tileH = math.floor(monH / 3)
local function clickToTile(x, y)
  local tileX = math.ceil(x / tileW)
  local tileY = math.ceil(y / tileH)
  if tileX >= 1 and tileX <= 3 and tileY >= 1 and tileY <= 3 then
    return tileX, tileY
  end
end

-- Draw puzzle on monitor
local function draw()
  mon.clear()
  for y = 1,3 do
    for x = 1,3 do
      local val = puzzle[y][x]
      local text = val == 0 and " " or "#"
      if useNumbers then text = val == 0 and " " or tostring(val) end
      local cx = math.floor((x - 1) * tileW + tileW / 2)
      local cy = math.floor((y - 1) * tileH + tileH / 2)
      mon.setCursorPos(cx, cy)
      mon.write(text)
    end
  end

  if moves >= maxMovesBeforeEasy and not easierMessageShown then
    mon.setCursorPos(1, monH)
    mon.setTextColor(colors.yellow)
    mon.write("The puzzle has been made easier")
    mon.setTextColor(colors.white)
    easierMessageShown = true
  end
end

-- Main loop
while true do
  draw()
  if isSolved() then
    mon.setBackgroundColor(colors.green)
    mon.setTextColor(colors.black)
    mon.clear()
    mon.setCursorPos(math.floor(monW/2-4), math.floor(monH/2))
    mon.write("You did it!")
    speaker.playSound("minecraft:ui.toast.challenge_complete",5)
    
    -- Place final door block
    commands.exec("/execute as @e[nbt={data:{vault_name:tf_lich,number:9}},sort=nearest,limit=1] at @s run setblock ~ ~ ~ ftb:lich_door_9")
    
    -- Write the completion status to the NBT storage block.
    -- This first reads the existing data to avoid overwriting it.
    local nbt = nbtStorage.read() or {}
    nbt[completionKey] = true
    nbtStorage.writeTable(nbt)
    
    -- Change the color of the monitor background to green
    mon.setBackgroundColor(colors.green)

    -- Start countdown and remove blocks
    for i = 10, 1, -1 do
      mon.setCursorPos(math.floor(monW/2 - 10), monH - 1)
      mon.write("Blocks disappearing in: " .. i)
      os.sleep(1)
    end

    for slot = 1, 9 do
      local sel = slotEntities[slot]
      -- Remove the block
      commands.exec("/execute as " .. sel .. " at @s run setblock ~ ~ ~ air")
      -- Play a particle effect
      commands.exec("/execute as " .. sel .. " at @s run particle minecraft:block minecraft:barrier ~ ~ ~ 0.5 0.5 0.5 0 20")
    end
    mon.setBackgroundColor(colors.green)
    mon.setTextColor(colors.black)
    mon.clear()

    break
  end

  local _, side, px, py = os.pullEvent("monitor_touch")
  local tx, ty = clickToTile(px, py)
  if tx and ty then
    local bx, by = getBlank()
    if isAdjacent(tx, ty, bx, by) then
      swap(tx, ty, bx, by)
      moves = moves + 1
      if moves >= 20 then useNumbers = true end
    end
  end
end
