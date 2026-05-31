-- Find the connected monitor, speaker, and NBT storage peripherals
local monitor = peripheral.find("monitor")
local speaker = peripheral.find("speaker")
local nbtStorage = peripheral.find("nbt_storage")

-- Exit the program if a monitor is not found
if not monitor then
  print("No monitor found.")
  return
end

-- Exit the program if a speaker is not found
if not speaker then
  print("No speaker found.")
  return
end

-- Exit if the NBT Storage peripheral is not found
if not nbtStorage then
  print("NBT Storage peripheral not found!")
  return
end

-- Key to store the puzzle completion status
local completionKey = "game_complete"

-- Function to check the completion state from the NBT storage
local function checkCompletionState()
  local nbt = nbtStorage.read()
  -- Check if the completion flag is set in the NBT data
  if nbt and nbt[completionKey] then
    os.sleep(5)
    return true -- Return true if the game is already complete
  end
  return false -- Return false if the game has not been completed
end

-- Check the completion state first. If the flag is set in the NBT storage, exit.
if checkCompletionState() then
  return
end

-- We will use the computer's built-in redstone functions, so we don't need a redstone peripheral.

-- Set up the monitor display
monitor.setTextScale(1) -- 1 char = 1 pixel
local w, h = monitor.getSize()
monitor.setBackgroundColor(colors.black)
monitor.setTextColor(colors.white)
monitor.clear()

-- Button dimensions (change width here!)
local buttonWidth = 10
local buttonHeight = 6

-- Function to convert block coordinates to pixel coordinates
local function blockToPixel(blockX, blockY)
  return (blockX - 1) * 5 + 1, (blockY - 1) * 5 + 1
end

-- Define the button positions in block coordinates
local buttons = {
  {bx = 5, by = 1.3}, -- 1 top
  {bx = 7, by = 2.5}, -- 2 top-right
  {bx = 9, by = 3.7}, -- 3 right
  {bx = 7, by = 4.9}, -- 4 bottom-right
  {bx = 5, by = 6.1}, -- 5 bottom
  {bx = 3, by = 4.9}, -- 6 bottom-left
  {bx = 1, by = 3.7}, -- 7 left
  {bx = 3, by = 2.5}, -- 8 top-left
}

local correctCode = {1, 7, 4, 8, 2, 6, 3, 5}
local inputSequence = {1}
local pressed = { [1] = true }

-- Function to draw a single button
local function drawButton(i)
  local btn = buttons[i]
  local x, y = blockToPixel(btn.bx, btn.by)

  local bg, fg
  if pressed[i] then
    bg = colors.lime
    fg = colors.black
  else
    bg = colors.blue
    fg = colors.white
  end

  monitor.setBackgroundColor(bg)
  monitor.setTextColor(fg)

  -- Fill rectangle
  for dy = 0, buttonHeight - 1 do
    monitor.setCursorPos(x, y + dy)
    monitor.write(string.rep(" ", buttonWidth))
  end

  -- Center number inside
  local numX = x + math.floor(buttonWidth / 2)
  local numY = y + math.floor(buttonHeight / 2)
  monitor.setCursorPos(numX, numY)
  monitor.write(tostring(i))
end

-- Function to draw all buttons
local function drawAll()
  monitor.setBackgroundColor(colors.black)
  monitor.clear()
  for i = 1, #buttons do
    drawButton(i)
  end
end

-- Function to detect which button was clicked based on pixel coordinates
local function getClickedButton(px, py)
  for i, btn in ipairs(buttons) do
    local x, y = blockToPixel(btn.bx, btn.by)
    if px >= x and px <= x + buttonWidth - 1 and py >= y and py <= y + buttonHeight - 1 then
      return i
    end
  end
  return nil
end

-- Function to compare two sequences
local function sequencesMatch(a, b)
  if #a ~= #b then return false end
  for i = 1, #a do
    if a[i] ~= b[i] then return false end
  end
  return true
end

-- Function to blink the monitor red
local function blinkRed(times, delay)
  for _ = 1, times do
    monitor.setBackgroundColor(colors.red)
    monitor.clear()
    os.sleep(delay)
    drawAll()
    os.sleep(delay)
  end
end

-- Initial drawing of all buttons
drawAll()

-- Main program loop
while true do
  -- Wait for a monitor touch event
  local event, side, x, y = os.pullEvent("monitor_touch")
  local btn = getClickedButton(x, y)
  
  -- Check if a valid, unpressed button was clicked
  if btn and not pressed[btn] then
    -- Only play the xylophone sound if this is not the final button press
    if #inputSequence < #correctCode then
        speaker.playSound("minecraft:block.note_block.xylophone")
    end
    
    table.insert(inputSequence, btn)
    pressed[btn] = true
    drawButton(btn)

    if #inputSequence == #correctCode then
      if sequencesMatch(inputSequence, correctCode) then
        -- Blink the monitor green
        monitor.setBackgroundColor(colors.green)
        monitor.clear()
        os.sleep(0.5)
        
        -- Reset monitor to black, display DONE, and play success sound
        monitor.setBackgroundColor(colors.black)
        speaker.playSound("minecraft:entity.experience_orb.pickup")
        
        -- Use the computer's built-in redstone output to signal on all sides
        commands.exec("/kubejs stages add @a[distance=..50] tf_hydra")
        
        -- Write the completion status to the NBT storage block.
        local nbt = nbtStorage.read() or {} -- Read existing data to preserve it
        nbt[completionKey] = true
        nbtStorage.writeTable(nbt)
        
        -- Display a final message and reset the monitor
        monitor.clear()
        
        break
      else
        -- Play a sound for failure
        speaker.playSound("minecraft:block.fire.extinguish")
        blinkRed(3, 0.4)
        inputSequence = {1}
        pressed = { [1] = true }
        drawAll()
      end
    end
  end
end
