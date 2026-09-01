Config = Config or {}

-- General Configuration
Config.ServerName = "Nexeum Roleplay" -- This is the name of your server, used in the /duty units menu, and more in the future
Config.EnableInheritance = true -- If true, the player will inherit the permissions of the rank above them.
Config.DualDuty = true -- If true, the player will be able to be on duty in two entities at once, limited to any entity, then the DualDutyEntity below.
Config.DualDutyEntity = "staff" -- THe entity that the player can be on duty in, as well as their primary entity.
Config.RestrictDualDuty = false -- If true, players must have the nex-duty.dual_duty ace permission to be able to go on dual duty.
Config.BlipRefresh = 1000 -- The time, in milliseconds, that the blips will refresh on the map.. do not touch this unless you like bad performance, they won't go any faster.
Config.MaxCallsignLength = 8 -- The maximum length of the callsign, used to prevent players from putting stupidly long callsigns. The maximum allowed is 12.
Config.DisableOffDutyMessages = false -- If true, units won't receive private messages once they've gone off duty by the dedicated bot token.
Config.IsTestServer = false -- If true, this won't send the periodic unit activity updates to the api so to not overwrite live data with test server data.
Config.WideDutyMenu = false -- If true, the duty menu will be wider to display longer entity names if you have entities with rather long names.

-- Global Logging Configuration (this will send every and all log message to this discord channel)
Config.GlobalLogging = {
    enabled = false,
    guild_id = "",
    channel_id = "",
}

-- AFK Configuration
Config.EnableAFK = true -- If true, the AFK detection system will be enabled.
Config.AFKThreshold = 1.0 -- The movement threshold, in meters, that the player must exceed to not be considered AFK between intervals (every 60 seconds).
Config.AFKMinutes = 5 -- The number of minutes the player must be AFK for before being automatically marked as AFK.

-- Live Map Integrations
Config.LiveMap = false -- If true, the script will send positional data of on-duty units to dutylogs.com for use in the live map feature. (this requires a dutylogs.com subscription to use)
Config.LiveMapRefresh = 500 -- The time, in milliseconds, that the positional data will be sent to dutylogs.com for the live map feature. (the minimum is 3000ms)
Config.RestrictLiveMap = false -- If true, the live map will only be accessible to those on duty, and the units visible will be restricted through the configured 'can_view' settings per entity.

-- Nex HUD Integrations (https://nexeum-studios.tebex.io/package/6591574)
Config.UseNexHUD = false -- If true, the script will automatically send exports to Nex HUD to display the players duty status.
Config.UseShortName = true -- If true, and the entity has a short name, the short name will be used in the HUD's job details, instead of the entities normal, extended, name. 
Config.DisplayTimeOnHUD = true -- If true, the duty time will be displayed as part of the job details of nex-hud.

Config.Entities = {
    {
        id = "sasp", -- this is the ID of the entity and is used as part of the ace permission, such as, nex-duty.sasp.<rank>
        name = "San Andreas State Police",
        image_url = "https://placehold.co/512x512.png", -- this is the image URL used in the dutylogs.com integrations, must be a direct image link (.png), transparent and aim for 512x512 resolution
        short_name = "State Police",
        prefix = "the", -- this is the prefix for the entity, for example, "You have gone off duty with <prefix> <entity_name>" where required. 
        colour = 3, -- this is the colour of the blip, the list of colours can be found here: https://docs.fivem.net/docs/game-references/blips/#blip-colors
        has_blips = true, -- this controls whether the entity has duty blips or not
        require_callsign = true, -- this requires the unit to input a callsign or not
        loadout = "police", -- this is the loadout offered to units going on duty, this must exist in Config.Loadouts to work
        enable_bodycam = true, -- this controls whether or not the unit is provided an option for a bodycam for this entity
        can_view = {"pubcop", "fbi", "dod", "pubdot"}, -- this is a list of other entities duty blips this entity can view
        logging = { -- this is the independent logging for this entity, seperate to the Config.GlobalLogging, if you department/team is in a seperate discord server
            enabled = true,
            guild_id = "",
            channel_id = ""
        },
        ranks = {
            [1] = {
                rank = "member", -- this is the ID of the rank, used as part of the ace permission, such as, nex-duty.sasp.member, keep this lowercase, no special characters and only use underscores
                name = "Member", -- this is the name of the rank, pretty cool
                can_direct_message = true, -- this controls whether the rank can send direct messages to other units via dutylogs.com or not
                is_supervisor = false, -- this is whether the rank is a supervisor or not, supervisors can suspend/send off non-supervisor members
                is_command = false, -- this is the same for supervisor, but command can send off non-command members etc etc
                manage_suspensions = false, -- this is whether the rank can manage suspensions in /duty manage or not.
                has_global_permissions = false, -- this provides the rank with access to manage units from any and all entities, this will bypass is_supervisor and is_command and hierarchy restrictions
                ace_permissions = {"test.cool", "test.reallycool"}, -- this is a list of ace permissions the unit gets when going on duty, these are revoked when going off duty
                groups = {} -- this is a list of ace permission groups the unit gets when going on duty if you're organised like that, these are revoked when going off duty
            },
            [2] = {
                rank = "supervisor",
                name = "Supervisor",
                can_direct_message = true,
                is_supervisor = true,
                is_command = false,
                manage_suspensions = true,
                has_global_permissions = false,
                ace_permissions = {},
                groups = {}
            },
            [3] = {
                rank = "high_command",
                name = "High Command",
                can_direct_message = true,
                is_supervisor = false,
                manage_suspensions = true,
                is_command = true,
                has_global_permissions = false,
                ace_permissions = {},
                groups = {}
            },
        }
    },
    {
        id = "staff",
        name = "Staff",
        image_url = "https://placehold.co/512x512.png",
        prefix = "",
        colour = 4,
        has_blips = false,
        require_callsign = false,
        can_view = {"sasp", "pubcop", "dod", "fbi", "pubdot"},
        logging = {
            enabled = false,
            guild_id = "",
            channel_id = ""
        },
        ranks = {
            [1] = {
                rank = "junior_moderator",
                name = "Junior Moderator",
                can_direct_message = true,
                is_supervisor = false,
                is_command = false,
                has_global_permissions = false,
                ace_permissions = {},
                groups = {} 
            },
            [2] = {
                rank = "moderator",
                name = "Moderator",
                can_direct_message = true,
                is_supervisor = false,
                is_command = false,
                has_global_permissions = false,
                ace_permissions = {},
                groups = {} 
            },
            [3] = {
                rank = "senior_moderator",
                name = "Senior Moderator",
                can_direct_message = true,
                is_supervisor = false,
                is_command = false,
                has_global_permissions = false,
                ace_permissions = {},
                groups = {} 
            },
            [4] = {
                rank = "junior_administrator",
                name = "Junior Administrator",
                can_direct_message = true,
                is_supervisor = true,
                is_command = false,
                has_global_permissions = false,
                ace_permissions = {},
                groups = {} 
            },
            [5] = {
                rank = "administrator",
                name = "Administrator",
                can_direct_message = true,
                is_supervisor = true,
                is_command = false,
                has_global_permissions = false,
                ace_permissions = {},
                groups = {} 
            },
            [6] = {
                rank = "senior_administrator",
                name = "Senior Administrator",
                can_direct_message = true,
                is_supervisor = false,
                is_command = true,
                has_global_permissions = false,
                ace_permissions = {},
                groups = {} 
            },
            [7] = {
                rank = "head_administrator",
                name = "Head Administrator",
                can_direct_message = true,
                is_supervisor = false,
                is_command = true,
                has_global_permissions = true,
                ace_permissions = {},
                groups = {} 
            },
            [8] = {
                rank = "server_management",
                name = "Server Management",
                can_direct_message = true,
                is_supervisor = false,
                is_command = true,
                has_global_permissions = true,
                ace_permissions = {},
                groups = {}
            },
            [9] = {
                rank = "server_owner",
                name = "Server Owner",
                can_direct_message = true,
                is_supervisor = false,
                is_command = true,
                has_global_permissions = true,
                ace_permissions = {},
                groups = {}
            },
        }
    },
}

-- These are the wepaon loadouts for entities
Config.Loadouts = {
    {
        id = "police", -- this is the ID, keep this lowercase, no spaces, no weird characters, underscores are fine
        name = "Police Loadout", -- this is the name, fancy stuff
        weapons = { -- this is the list of weapons they'll get, make sure these are actually weapon names, optional ammo parameter can be added to control the ammo
            { name = "WEAPON_FLASHLIGHT" },
            { name = "WEAPON_STUNGUN" },
            { name = "WEAPON_COMBATPISTOL", ammo = 72, attachments = {"COMPONENT_AT_PI_FLSH"} },
            { name = "WEAPON_PUMPSHOTGUN", ammo = 16 },
            { name = "WEAPON_CARBINERIFLE", ammo = 90, attachments = {"COMPONENT_AT_AR_FLSH"} },
            { name = "WEAPON_NIGHTSTICK" }
        }
    }
}

-- An internal debugging mode, only enable this if you're asked to :)
Config.DebugMode = false