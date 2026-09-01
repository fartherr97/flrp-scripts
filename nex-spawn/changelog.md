# Minor Update - 1.0.2 [06/04/2025]
- Added Ace Permission integration for spawn locations. You are now able to add an `ace` value to a location, if one is present, the script will check the player. If they have the ace permission, the location will show, if not, it will be hidden.

# Minor Update - 1.0.3 [11/04/2025]
- Updated the `readme.md` file with the updated event for the manual execution of the spawn selector. The event has been updated to `TriggerServerEvent("ns:server:player_spawned", source)` due to the update in Ace Permission integrations.
- Fixed the client automatically having the time set to night on spawn when the system is in manual mode. 

# Minor Update - 1.0.4 [08/05/2025]
- Added an optional Coordinates parameter to the `ns:server:player_spawned` event, manually overriding the last location coordinates to allow for framework integrations for seperate characters.
- Added `Config.DisableLastLocation` for those wanting to integrate the system with their framework, this disables the native last location saving system entirely and will only show if coordinates are provided to the above event.
- The `Config.SaveLocationTime` has been updated from seconds to minutes, the config value has been updated, it *was* saving every 10 seconds, it should now, by defualt, save every minute instead.

# Minor Update - 1.0.5 [16/05/2025]
- Added a listenable client event, `ns:client:player_spawned` that's triggered when the player has spawned at a location for integrational purposes.

# Really Minor Update - 1.0.6 [20/09/2025]
- Adjusted the Default Value for `Config.DisableSelectorOnSpawned`

# Minor Update - 1.0.7 [27/01/2026]
- Rewrote parts of the HTML and CSS, a lot of it was made 12+ months ago and some things required refactoring.
- Added `Config.DynamicDisplay` for nex-hud, so the full HUD will disappear whilst a player is selecting a spawn, and load once spawned.
- Added `Config.ShowAreaOfPlay`, which'll show the current Area of Play from nex-hud in the top-center of the spawn selector.

# Bug Fix - 1.0.8 [27/01/2026]
- Fixed an issue with Spawn at Last Location not working with the Nex HUD integration

# Bug Fix - 1.0.9 [15/02/2026]
- Fixed an issue where the Spawn Selector element was showing by default, it's now hidden by default

# Minor Update - 1.1.0 [29/03/2026]
- Added `Config.RestrictLastLocation`, which will restrict the button to `nex-spawn.lastlocation` ace permission.