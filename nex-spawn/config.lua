Config = {}

-- General Configuration
Config.MarkerType = 2 -- This is the marker type, documentation can be found here: https://docs.fivem.net/docs/game-references/markers/
Config.MarkerSize = vector3(150.0, 100.0, 150.0) -- This is the size of the marker, this is setup for the '2' marker, others may require adjustment to look normal
Config.ToggleMarkerBounce = true -- This toggles the bounce animation of the selected marker
Config.MarkerColour = "rgba(255, 255, 255, 255)" -- This is the colour of the marker, white by default
Config.ActiveMarkerColour = "rgba(0, 126, 197, 200)" -- This is the colour of the marker when it's selected, blue by default

-- Last Location Configuration
Config.DisableLastLocation = false -- If true, this will remove the 'Spawn at Last Location' functionality from periodically saving data, this will not prevent manual usage of the last location through the player_spawned event though
Config.RestrictLastLocation = false -- If set to true, the option will only be shown to those with: `nex-spawn.lastlocation` ace permission
Config.SaveLocationTime = 1 -- The time interval, in minutes, that the players location will be periodically saved, used for the last location coordinates.
Config.RestrictOptionsOnReconnect = true -- If true, the player will be restricted to only spawning at the last location after recently disconnecting.
Config.ReconnectTime = 5 -- The time, in minutes, that a player has to reconnect within to be restricted to only spawning at the last location if RestrictOptionsOnReconnect is true

-- Misc Configuration
Config.DisableSelectorOnRestart = false -- If true, the spawn selector won't show for each player when the resource is restarted.
Config.DisableSelectorOnSpawned = false -- If true, this will disable the system from automatically showing the selector on the 'playerSpawned' event, see the readme for how to manually call the event

-- Integrations with Nex HUD (requires nex-hud)
Config.DynamicDisplay = true -- If true, this will hide the HUD when the spawn selector is shown, and re-show it when the selector is closed
Config.ShowAreaOfPlay = false -- If true, this will show the area of play in the top-center of the selector when the spawn selector is shown

-- These are the spawn points that'll be displayed in the spawn selector, a maximum of 11 spawnpoints can be added, as no scroll bar is implemented by deliberate design.
Config.SpawnPoints = {
    {
        name = "Legion Square",
        image = "legionsquare.png",
        coords = vector4(197.94, -932.4, 30.69, 320.0),
    },
    {
        name = "Pillbox",
        image = "pillbox.png",
        coords = vector4(298.98, -584.45, 43.26, 70.0),
    },
    {
        name = "Los Santos Airport",
        image = "airport.png",
        coords = vector4(-1037.74, -2738.04, 20.17, 330.0),
    },
    {
        name = "Mission Row PD (MPD)",
        image = "mrpd.jpg",
        coords = vector4(428.23, -984.28, 30.71, 0.0),
        -- LEO-only: any sworn BSO/FHP/MPD member may spawn here; civilians are
        -- refused (checked server-side by nex-spawn). `flrp.leo` is a PERSISTENT
        -- membership ace granted at connection from the player's Discord role —
        -- NOT the on-duty ace (nobody is on duty yet at spawn select), so it is
        -- already held. For MPD-only, use ace = "flrp.dept.mpd" instead.
        ace = "flrp.leo",
    },
    {
        name = "Sandy Shores",
        image = "sandy.png",
        coords = vector4(1884.41, 3714.45, 32.93, 210.0),
    },
    {
        name = "Paleto Bay",
        image = "paleto.png",
        coords = vector4(-134.1997, 6212.2002, 31.2063, 47.0921),
    },
    {
        name = "Grapeseed",
        image = "grapeseed.png",
        coords = vector4(1654.72, 4825.46, 42.08, 280.0),
    },
    {
        name = "Vinewood",
        image = "vinewood.png",
        coords = vector4(436.64, 218.38, 103.62, 160.0),
    },
    {
        name = "Del Perro",
        image = "delperro.png",
        coords = vector4(-1341.27, -1298.66, 4.84, 292.0),
    },
    {
        name = "Fort Zancudo",
        image = "fortzancudo.png",
        coords = vector4(-2040.0, 3132.0, 32.81, 240.0),
    },
    {
        name = "Mirror Park",
        image = "mirrorpark.png",
        coords = vector4(1130.21, -645.9, 56.58, 272.0),
    },
}

-- Don't change these unless you know what you're doing
Config.CameraStartPosition = vector3(-410, -5021, 3000.0)
Config.CameraStartRotation = vector3(-40.0, 0.0, 0.0)