Config = {}

-- General Configuration
Config.DefaultAOP = "bc" -- The available options for the default area of play are: ss, pb, gs, bc, nls, sls, mp, ls, fz and sw
Config.ServerName = "Nexeum Roleplay" -- This is the server name that shows at the top of the Interface Settings menu.. you'll also want to replace the server_icon.png file in /ui/assets too
Config.VanityURL = "<accent>store</accent><light>.nexeumstudios.com</light>" -- This is the vanity URL that shows at the top of the map, you can include HTML tags for styling
Config.DefaultColour = "rgb(111, 201, 255)" -- This is the default accent colour for the interface, new players will automatically have this colour set.. MUST be in the RGB format!
Config.ColourCustomisation = true -- If set to false, this will disable the ability for players to change the theme of the interface
Config.ExtraPriorities = false -- If set to true, this will enable Fort Zancudo and Banks as priority zones
Config.DisableHealthArmour = false -- If set to true, this will disable the Health, Armour and Microphone elements of the HUD to allow for external integrations with frameworks.
Config.PreventDisablingPriorities = false -- If set to true, this will prevent users from being able to hide the Priority elements of the interface.
Config.NotificationTime = 5000 -- This is the default time for notifications, 5000 = 5 seconds
Config.EnableAreaNotifications = true -- If set to true, this will enable the area notifications for all players, regardless of their settings
Config.WebhookFooter = "Server Interface Logging"
Config.PeacetimeRefresh = 1 -- 1ms is the best option, whilst this does increase the resource usage, it limits any possibility of players being able to bypass the system.

-- Permission Configuration
Config.ManageMenuAcePermission = "nexhud.manage" -- This is the DEFAULT PERMISSION NODE to access the /manage menu. If you want to restrict certain aspects (like only changing AOP), use Config.RestrictManagementElements
Config.RestrictManagementElements = false -- If true, this will require the player to have specific ace permissions to access certain parts of the menu. "nexhud.manage" will provide overall access
Config.ManagementPermissions = {
    ["aop"] = "nexhud.manage.aop",
    ["priority"] = "nexhud.manage.priority",
    ["peacetime"] = "nexhud.manage.peacetime",
    ["createvote"] = "nexhud.manage.createvote"
}
Config.RestrictCustomisation = false -- If set to true, this will restrict the ability to change the theme to only those with the ace permission
Config.RestrictionAcePermission = "nexhud.customise" -- This is the ace permission required to change the theme of the interface, if RestrictCustomisation is set to true

-- Manual Commands - If you want to disable a certain command, like /peacetime, set the value to false.
Config.AdminCommands = {
    peacetime = true,
    priority = true,
    setaop = true,
}

-- Driving Mode / Speedometer Configuration
Config.EnableDrivingMode = true -- If set to true, this will enable the driving mode for the location, bringing the location information to the center bottom, instead of next to the map.
Config.EnableEmergencyLightEffect = true -- The Emergency Light Effect flashes a faint red and blue effect on parts of the driving mode.
Config.SeatbeltKey = 311 -- This is the key control for the seatbelt, the full list can be found here: https://docs.fivem.net/docs/game-references/controls/
Config.SeatbeltKeyText = "K" -- This should be the associated key from Config.SeatbeltKey, so this can be displayed visually to players.
Config.PromptDelay = 1000 -- This is the delay, in miliseconds, that will take place before a prompt shows after stopping in a vehicle.
Config.EngineKey = 246 -- This is the key control for toggling a vehicles engine, the full list can be found here: https://docs.fivem.net/docs/game-references/controls/
Config.EngineKeyText = "Y" -- This should be the associated key from Config.EngineKey, so this can be displayed visually to players.

-- Fuel Configuration (If you are using a fuel script that uses 'SetFuelConsumptionRateMultiplier', you may want to disable this section to prevent conflicts)
Config.EnableFuelConsumption = true -- If set to true, this will enable fuel consumption for vehicles.
Config.FuelConsumptionRate = 15.0 -- This is the multiplier for fuel consumption, the higher the number, the faster fuel will be consumed.

-- Seatbelt / Windscreen Configuration
Config.MinimumVehicleSpeed = 16.0 -- This is the minimum speed (in mph) for the seatbelt/fly through windscreen effects to take place.
Config.NoSeatbeltWindscreenDamage = 2000.0 -- This is the amount of damage that will be applied to the windscreen when flying through it without a seatbelt on (2000.0 will kill the player)

-- Voting Configuration
Config.VoteTime = 60 -- The minimum time is 30 seconds, maximum time is 300 seconds, time must be in seconds, like "120"
Config.DisableVoteAutomation = false -- If set to true, this will disable automatically setting the Area of Play to the winning area after a vote

-- These are the Custom Areas. If you're going to add an area, make sure it's under the "Custom" section of the "Config.Areas", below in the Wording Configuration otherwise it won't show up.
Config.CustomAreas = {
    EnableCustomAreas = false, 
    EnableDebug = false,
    Zones = {
        ["roxwood"] = {
            points = { -- these are test points, it's recommended you create your own polyzones beore enabling custom areas :)
                vector2(1727.9975585938, -1667.4693603516),
                vector2(1710.5059814453, -1669.2998046875),
                vector2(1704.0036621094, -1623.4089355469),
                vector2(1733.4923095703, -1621.6483154297)
            },
            minZ = 110.0,
            maxZ = 115.0,
        },
    }
}

-- Custom Elements Configuration (these are placeholders for you to build your own) 
Config.CustomElements = {
    ["unit_counts"] = {
        Enabled = false,
        Name = "Unit Counts",
        Description = "This controls the display of the custom unit counts element.", -- This is displayed in the /ui menu for players to see what this element is
        Restricted = true, -- If set to true, only those with the ace permission can view this element
        AcePermission = "nex-hud.custom_element.unit_counts", -- The ace permission required to view this element
        Position = 2, -- Position index, 1 being at the top of the list, 2 being below that, etc
        DefaultState = true, -- If set to true, this element will be enabled by default for new players
        CanDisable = true, -- If set to false, this element cannot be disabled by players
        DefaultInnerHTML = '<b>LEO:</b> <span style="color:#BBB;">0</span> <span style="color: #BBB">/</span> <b>SAMR:</b> <span style="color:#BBB;">0</span> <span style="color: #BBB">/</span> <b>DHS:</b> <span style="color:#BBB;">0</span> <span style="color: #BBB">/</span> <b>STAFF:</b> <span style="color:#BBB;">0</span>',
    },
    ["staff_element"] = {
        Enabled = false,
        Name = "Staff Element",
        Description = "This controls the display of the custom staff element.", -- This is displayed in the /ui menu for players to see what this element is
        Restricted = true, -- If set to true, only those with the ace permission can view this element
        AcePermission = "nex-hud.custom_element.staff_element", -- The ace permission required to view this element
        Position = 2, -- Position index, 1 being at the top of the list, 2 being below that, etc
        DefaultState = true, -- If set to true, this element will be enabled by default for new players
        CanDisable = true, -- If set to false, this element cannot be disabled by players
        DefaultInnerHTML = '<b>Online Players:</b> <span style="color:#BBB;"><span style="color: var(--accent-color)">1</span>/<span style="color: var(--accent-color)">64</span></span> <span style="color: #BBB">/</span> <b>Active Reports:</b> <span style="color:#BBB;"><span style="color: var(--accent-color)">5</span></span>',
    }
}

-- Integrations for Nex Spawn
Config.UseNexSpawnIntegration = false -- If set to true, this will enable the integration with Nex Spawn.

-------------------------------------------------------------------------------------------------------------------------------------------------------------
-- BELOW IS ALL THE CONFIGURATION FOR WORDING. If you want to update a command, what a notification says, the name of an area, this can all be done below. --
-------------------------------------------------------------------------------------------------------------------------------------------------------------

-- These are all the commands for the script, you can adjust the commands by changing the values below
Config.Commands = {
    interface_settings = "ui",
    manage_menu = "manage",
    vote_menu = "vote",
    toggle_votes = "togglevotes",
    toggle_interface = "toggleui",
    toggle_hud = "togglehud",
    toggle_ui = "toggleui",
    reload_interface = "reloadui",
}

-- This is the areas configuration, DO NOT CHANGE the indexes, only the values: (the indexes are the first set of values, like "Default", and "ss")
Config.Areas = {
    -- Do Not Change the indexes for Default, PriorityZones, Misc or Custom!
    Default = {
        ["ss"] = "Sandy Shores",
        ["pb"] = "Paleto Bay",
        ["gs"] = "Grapeseed",
        ["bc"] = "Blaine County",
        ["nls"] = "North Los Santos", 
        ["sls"] = "South Los Santos",
        ["mp"] = "Mirror Park",
        ["ls"] = "Los Santos",
        ["sw"] = "State Wide"
    },
    PriorityZones = {
        ["fz"] = "Fort Zancudo",
        ["banks"] = "Banks",
    },
    Misc = {
        ["disabled"] = "Disabled",
    },
    -- If you have any Config.CustomAreas, make sure they're reflected here with a name.. and that the index is shared with the index of the zone in Config.CustomAreas.Zones
    Custom = {
        ["roxwood"] = "Roxwood",
    },
}

-- This is the types configuration, DO NOT CHANGE the indexes, only the values: (indexes are the first set of values, like "aop" and "peacetime")
Config.Types = {
    ["aop"] = "Area of Patrol",
    ["peacetime"] = "Peacetime",
    ["priority"] = "Priority Zone",
    ["vote"] = "Area of Play Vote"
}

-- The Priority States can now be customised, you cannot remove/change the 'available', but the others can be adjusted, removed, and new ones can be added.. Just make sure not to remove 'Available'
Config.States = {
    { id = "available", label = "Available" },
    { id = "cooldown", label = "On Cooldown" },
    { id = "hold", label = "On Hold" },
    { id = "inprogress", label = "In Progress"}
}

-- These are the titles and descriptions for the notifications, these can be adjusted, but be careful not to remove any variables like {area} or {time}:
Config.Messages = {
    -- This is for the /togglevote command notification
    ["toggle_vote_title"] = "Server Vote Results",
    ["toggle_vote_text"] = "You have toggled the display of the vote results",

    -- This is the notification provided if the Config.RestrictCustomisation is set to true
    ["command_restricted_title"] = "Interface Customisation",
    ["command_restricted_text"] = "This feature has been disabled by the server",

    -- These are the collection of notifications for the Voting System
    ["no_vote_title"] = "Server Vote",
    ["no_vote_text"] = "There is no active vote at this time",
    ["vote_start_title"] = "New Server Vote",
    ["vote_start_text"] = "A new server vote is live for the next Area of Play, choose between {areas} using /vote. You have two minutes to cast a vote",
    ["vote_in_progress_title"] = "Server Vote",
    ["vote_in_progress_text"] = "There's an active vote in progress, you must wait for it to end before starting a new one",
    ["vote_end_title"] = "Server Vote Results",
    ["vote_end_text"] = "The voting period has ended. The winning Area of Play is {areas}!",
    ["vote_end_empty_text"] = "The voting period ended with no votes cast",
    ["vote_cancel_title"] = "Server Vote Cancelled",
    ["vote_cancel_text"] = "The Server Vote for the Area of Play was cancelled by an administrator",
    ["vote_success_title"] = "Server Vote",
    ["vote_success_text"] = "You have successfully voted for {area}",
    ["vote_already_title"] = "Server Vote",
    ["vote_already_text"] = "You have already voted for {area}",
    ["vote_end_tied_text"] = "The voting period ended with a tie between {areas}, the Area of Play will remain the same",

    -- These are the collection of notifications for the Priority System
    ["priority_update_title"] = "Priority Zone",
    ["priority_update_text"] = "The {area} Priority Zone has been updated to {priority_type} for {time} minutes",
    ["priority_update_text_indefinite"] = "The priority in {area} has been set to {priority_type}",
    ["priority_remove_title"] = "Priority Zone",
    ["priority_remove_text"] = "The {area} Priority Zone has been disabled",
    ["priority_end_title"] = "Priority Zone",
    ["priority_end_text"] = "The {area} Priority Zone is now available",

    -- These are the collection of notifications for the Peacetime System
    ["peacetime_start_title"] = "Peacetime",
    ["peacetime_start_text"] = "The Peacetime for {area} has been enabled for {time} minutes",
    ["peacetime_update_title"] = "Peacetime",
    ["peacetime_update_text"] = "The Peacetime for {area} has been updated to {time} minutes remaining",
    ["peacetime_remove_title"] = "Peacetime",
    ["peacetime_remove_text"] = "The Peacetime for {area} has been disabled",
    ["peacetime_end_title"] = "Peacetime",
    ["peacetime_end_text"] = "The Peacetime for {area} has ended",

    -- This is the notification for updates to the Area of Play
    ["aop_update_title"] = "Area of Play",
    ["aop_update_text"] = "The Area of Play has been updated to {areas}",

    -- This is for the /manage command when a player doesn't have access
    ["manage_command_title"] = "Interface Management",
    ["manage_command_text"] = "You do not have permission to access this menu",

    -- These are for the manage commands (like /setaop, /peacetime and /priority)
    ["invalid_area_title"] = "No Areas Specified",
    ["invalid_area_text"] = "You haven't specified a valid area: {available}, for example: /setaop ss,gs for Sandy Shores and Grapeseed",
    ["invalid_priority_title"] = "Invalid Priority Area",
    ["invalid_priority_text"] = "You haven't specified a valid area: {available}, for example: /setpriority ss available",
    ["invalid_priority_state_title"] = "Invalid Command Value",
    ["invalid_priority_state_text"] = "An invalid value has been provided, states should be available, cooldown <time> or hold <time>",
    ["invalid_peacetime_title"] = "Invalid Peacetime Selection",
    ["invalid_peacetime_text"] = "You must specify a valid area: {available}, for example: /setpeacetime ss 10",
    ["peacetime_single_area_text"] = "You can only set Peacetime for one area at a time, for example: /setpeacetime ss 10",
    ["invalid_area_title"] = "Invalid Area",
    ["invalid_area_text"] = "You haven't specified a valid area: {available}, for example: /priority bc available",
}

-- These are the chat suggestions for the commands. If you change the commands from Config.Commands, it's recommended you update the command here too.
Config.ChatSuggestions = {
    { command = "/ui", description = "Opens the player configuration for the interface" },
    { command = "/manage", description = "Opens the administrator panel for the interface" },
    { command = "/vote", description = "Opens the voting interface when an active vote is happening" },
    { command = "/togglevotes", description = "Toggle the display of the live results for active votes" },
    { command = "/toggleui", description = "Toggles the display of the whole interface/hud" },
    { command = "/togglehud", description = "Toggles the display of the whole hud/interface" }
}

-- These shouldn't be adjusted unless you're instructed to do so:
Config.MapRefreshTime = 1000
Config.AreaNotificationCooldown = 10000