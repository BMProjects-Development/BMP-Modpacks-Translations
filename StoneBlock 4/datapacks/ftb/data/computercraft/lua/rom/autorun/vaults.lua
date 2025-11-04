dofile("rom/programs/ftb/versions.lua")

local storage = peripheral.find("nbt_storage")

if not storage then
    return
end

local data = storage.read()
local vault_id = data.vault_id
local stored_version = data.version

local function updateStartup(sourceFile, versionValue, id)
    if stored_version < versionValue then
        print("New Version detected for", id)
        if fs.exists("startup") then
            fs.delete("startup")
        end
        fs.copy(sourceFile, "startup")
        storage.writeTable({ vault_id = id, version = versionValue })
        print("Updated startup to", id)
    else
        print(id, "is up to date.")
    end
end

local cases = {
    heads = function()
        updateStartup("rom/programs/ftb/heads.lua", version.heads, "heads")
    end,

    slide = function()
        updateStartup("rom/programs/ftb/slide.lua", version.slide, "slide")
    end,
}

if cases[vault_id] then
    cases[vault_id]()
end

-- storage = peripheral.find("nbt_storage")
-- storage.writeTable({vault_id = "heads", version = 0.0})
-- storage.writeTable({vault_id = "slide", version = 0.0})