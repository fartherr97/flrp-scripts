Config = {}
for c, d in pairs(Cfg) do
    Config[c] = d
end

-- ┌──────────────────────────────────────────────────────────────────┐
-- │                            IMPORTANT                             │
-- └──────────────────────────────────────────────────────────────────┘

Config.DoorDataStorageMethod = 'database'
-- ['file', 'database']
-- Where door data is stored: 'file' (JSON file: door_data.json) or 'database' (SQL database).

Config.AutoInsertSQL = true
-- Enable to automatically add and fix required SQL entries (recommended before updating).


Config.DoorlockDrawTextUI = 'cd_doorlock'
-- ['cd_doorlock', 'auto_detect']
-- Draw Text UI to use, or 'auto_detect' to use a compatible running UI automatically.


Config.Debug = false
-- Enable console debug output.

-- ┌──────────────────────────────────────────────────────────────────┐
-- │                             MAIN                                 │
-- └──────────────────────────────────────────────────────────────────┘

Config.AdminAccess = { -- Defines who can create, edit, delete, and import doors via the in-game admin UI.
    Framework = { -- Framework-based admin groups (ESX, QBCore, Qbox, vRP only).
        ['esx'] = {'superadmin', 'admin', },
        ['qbcore'] = {'god', 'admin', },
        ['qbox'] = {'god', 'admin', },
        ['vrp'] = {5, 6, 7, 8, 9, 10, }
    },

    Identifiers = {
        ENABLE = false, -- Allow admin access based on player identifiers (license, steam, FiveM ID).
        identifier_list = {'license:xxxxx', 'steam:xxxxx', }, -- List of allowed player identifiers.
    },

    AcePerms = {
        ENABLE = false, -- Allow admin access based on ACE permissions.
        aceperms_list = {'doorlock.police', }, -- ACE permissions required (must be set in server.cfg).
    },

    Discord = { -- Requires Badger Discord API.
        ENABLE = false, -- Allow admin access based on Discord roles.
        discord_list = {'xxxxx', 'xxxxx', }, -- Discord role IDs allowed to use admin features.
    }
}

Config.DoorAccessPerms = { -- Controls which permission types can be assigned to doors in the UI.
    Identifiers = true, -- Allow door access based on player identifiers.
    AcePerms = true, -- Allow door access based on ACE permissions.
    Discord = true, -- Allow door access based on Discord roles (requires Badger Discord API).
    Items = true -- Allow door access based on inventory items (requires ESX/QBCore/Qbox).
}

Config.DoorStateDisplay = {
    DrawTextUI = true, -- Show door lock state using built-in draw text UI.
    Icon = true, -- Show door lock state using lock/unlock icons.
    Notification = false -- Show a notification when a door is locked or unlocked.
}

Config.IconSize = 0.5 -- Size of the lock/unlock icon displayed above doors.

Config.LockpickItems = {
    ENABLE = false, -- Require an inventory item to lockpick doors (ESX & QBCore only).
    usable_lockpick_item = true, -- Allow lockpicking via usable inventory item.
    police_alert_chance = 50, -- Chance (0–100%) to alert police during lockpicking.
    lockpick_items = { -- Items that allow a player to lockpick doors.
        'lockpick',
        --'add_more_here',
    }
}

Config.DoorDetection = { -- Controls whether only doors or most objects can be targeted.
    ENABLE = false, -- When true, only doors are detected; when false, most targeted objects are detected.

    OutlineAllDoorsInBuildingInBuilding = true, -- Outline all detected doors in the building.
    DoorModelAllowList = {}, -- Models always treated as doors, regardless of size. Usage: { "model", `model`, -12345678 }
    DoorModelDenyList = {}, -- -- Models never treated as doors, regardless of size. Usage: { "model", `model`, -12345678 }

    Dimensions = {
        normal = {
            max_height = 3.0,
            min_height = 1.5,

            max_width = 2.0,
            min_width = 1.0,

            max_depth = 0.4,
            min_depth = 0.05,
        },

        garage = {
            max_height = 8.0,
            min_height = 3.0,

            max_width = 8.0,
            min_width = 3.0,

            max_depth = 0.3,
            min_depth = 0.05,
        },

        gate = {
            max_height = 10.0,
            min_height = 3.0,

            max_width = 10.0,
            min_width = 5.0,

            max_depth = 0.6,
            min_depth = 0.1,
        }
    }
}

-- ┌──────────────────────────────────────────────────────────────────┐
-- │                         KEYS & COMMANDS                          │
-- └──────────────────────────────────────────────────────────────────┘

Config.OpenDoorMenu = {
    ENABLE = true, -- Allow players to open the door lock UI.
    command = 'doorlockui' -- Chat command to open the door UI.
}

Config.ToggleDoorLock = {
    ENABLE = true, -- Allow players to lock and unlock doors.
    command = 'doorlocktoggle', -- Chat command to toggle door locks.
    key = 'e' -- Key used to toggle the door lock.
}

-- ┌──────────────────────────────────────────────────────────────────┐
-- │                            AUTO DETECT                           │
-- └──────────────────────────────────────────────────────────────────┘    

if Config.Database == 'none' then
    Config.DoorDataStorageMethod = 'file'
end
if GetResourceState('Badger_Discord_API') ~= 'started' then
    Config.AdminAccess.Discord.ENABLE = false
    Config.DoorAccessPerms.Discord = false
end

if Config.Framework == 'esx' or Config.Framework == 'qbcore' or Config.Framework == 'qbox' or Config.Framework == 'other' then
    Config.AdminAccess.Framework.ENABLE = true
    Config.DoorAccessPerms.Framework = true
else
    Config.AdminAccess.Framework.ENABLE = false
    Config.DoorAccessPerms.Framework = false
    Config.LockpickItems.ENABLE = false
    Config.DoorAccessPerms.Items = false
end
----- DO NOT CHANGE ANYTHING ABOVE THIS LINE. INCORRECT EDITS MAY BREAK THE SCRIPT. -----

function GetConfig()
    return Config
end