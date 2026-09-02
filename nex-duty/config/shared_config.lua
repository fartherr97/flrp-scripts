Config = Config or {}

-- General Configuration
Config.ServerName = "Florida Roleplay" -- This is the name of your server, used in the /duty units menu, and more in the future
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
Config.UseNexHUD = true -- If true, the script will automatically send exports to Nex HUD to display the players duty status.
Config.UseShortName = true -- If true, and the entity has a short name, the short name will be used in the HUD's job details, instead of the entities normal, extended, name.
Config.DisplayTimeOnHUD = true -- If true, the duty time will be displayed as part of the job details of nex-hud.

-- ==========================================================================
-- FLRP departments. The `id` of each department MUST be bso / fhp / mpd —
-- flrp_duty maps these ids onto the FLRP departments (see the
-- flrp_duty_entity_bso / _fhp / _mpd convars). Going on duty grants the
-- nex-duty.<id>.<rank> ace and the department loadout; going off duty revokes
-- them. Add real Discord logging guild/channel ids when ready.
-- ==========================================================================
Config.Entities = {
    {
        id = "bso",
        name = "Broward Sheriff's Office",
        image_url = "https://www.flrp.us/images/c8452f76261f8e9c.png",
        short_name = "BSO",
        prefix = "the",
        colour = 46, -- gold
        has_blips = true,
        require_callsign = true,
        loadout = "police",
        enable_bodycam = true,
        can_view = {"fhp", "mpd", "staff"},
        logging = { enabled = false, guild_id = "", channel_id = "" },
        ranks = {
            [1] = { rank = "patrol",     name = "Patrol",     can_direct_message = true, is_supervisor = false, is_command = false, manage_suspensions = false, has_global_permissions = false, ace_permissions = {}, groups = {} },
            [2] = { rank = "supervisor", name = "Supervisor", can_direct_message = true, is_supervisor = true,  is_command = false, manage_suspensions = true,  has_global_permissions = false, ace_permissions = {}, groups = {} },
            [3] = { rank = "command",    name = "Command",    can_direct_message = true, is_supervisor = false, is_command = true,  manage_suspensions = true,  has_global_permissions = false, ace_permissions = {}, groups = {} },
        }
    },
    {
        id = "fhp",
        name = "Florida Highway Patrol",
        image_url = "https://www.flrp.us/images/c8452f76261f8e9c.png",
        short_name = "FHP",
        prefix = "the",
        colour = 47, -- dark orange / tan
        has_blips = true,
        require_callsign = true,
        loadout = "police",
        enable_bodycam = true,
        can_view = {"bso", "mpd", "staff"},
        logging = { enabled = false, guild_id = "", channel_id = "" },
        ranks = {
            [1] = { rank = "patrol",     name = "Patrol",     can_direct_message = true, is_supervisor = false, is_command = false, manage_suspensions = false, has_global_permissions = false, ace_permissions = {}, groups = {} },
            [2] = { rank = "supervisor", name = "Supervisor", can_direct_message = true, is_supervisor = true,  is_command = false, manage_suspensions = true,  has_global_permissions = false, ace_permissions = {}, groups = {} },
            [3] = { rank = "command",    name = "Command",    can_direct_message = true, is_supervisor = false, is_command = true,  manage_suspensions = true,  has_global_permissions = false, ace_permissions = {}, groups = {} },
        }
    },
    {
        id = "mpd",
        name = "Miami Police Department",
        image_url = "https://www.flrp.us/images/c8452f76261f8e9c.png",
        short_name = "MPD",
        prefix = "the",
        colour = 3, -- blue
        has_blips = true,
        require_callsign = true,
        loadout = "police",
        enable_bodycam = true,
        can_view = {"bso", "fhp", "staff"},
        logging = { enabled = false, guild_id = "", channel_id = "" },
        ranks = {
            [1] = { rank = "patrol",     name = "Patrol",     can_direct_message = true, is_supervisor = false, is_command = false, manage_suspensions = false, has_global_permissions = false, ace_permissions = {}, groups = {} },
            [2] = { rank = "supervisor", name = "Supervisor", can_direct_message = true, is_supervisor = true,  is_command = false, manage_suspensions = true,  has_global_permissions = false, ace_permissions = {}, groups = {} },
            [3] = { rank = "command",    name = "Command",    can_direct_message = true, is_supervisor = false, is_command = true,  manage_suspensions = true,  has_global_permissions = false, ace_permissions = {}, groups = {} },
        }
    },
    {
        id = "staff",
        name = "Staff",
        image_url = "https://www.flrp.us/images/c8452f76261f8e9c.png",
        prefix = "",
        colour = 4,
        has_blips = false,
        require_callsign = false,
        can_view = {"bso", "fhp", "mpd"},
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
