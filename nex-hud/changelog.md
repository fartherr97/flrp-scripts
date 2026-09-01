# Bug Fix - 1.0.1 [19/12/2024]
- An issue where active Peacetime Zones weren't preventing violence has been fixed, the system will prevent players from accessing the weapon wheel and actively holding a weapon.
- A new config option has been added, Config.PeacetimeRefresh, this controls the refresh rate at which the client checks the current zone and whether they're in a peacetime zone. 
- Added two new server events: `nh:server:update_job_data` and `nh:server:update_headtags` to interact with job and headtags elements of the UI, require the same parameters as the client. [`THIS CHANGE HAS BEEN REVERTED`]

# New Feature - 1.0.2 [20/12/2024]
- Added `Config.RestrictManagementElements`, to restrict the individual elements of the management menu, with configurable ace permissions for each.
- If `Config.RestrictManagementElements` is enabled, elements of the menu will be blurred out and not interactable for those who don't the required permissions.
- Secured the Server Events for the entire management menu.

# Big Fix - 1.0.3 [20/12/2024]
- An issue where the headtags wouldn't display on being set has been resolved.
- An issue where the initial settings of the interface were not set on first join has been resolved, on first join, the client will now set the default values if they don't exist.
- The permissions for the system have been adjusted, `nexhud.manage` is the global permission for the elements of the manage menu and `nexhud.command` is the ace permission for `/manage`.

# Bug Fix - 1.0.4 [20/12/2024]
- The `R` key has been added to the list of disabled keybinds when Peacetime is enabled.
- The `State Wide` peacetime option now properly functions and disables actions whilst enabled.
- The `Config.PeacetimeRefresh` base value has been increased from `500ms` to `1ms` to provide better performance when disabling actions properly.
- An issue where the peacetime restrictions weren't reset upon a peacetime automatically ending has been resolved. 
- An issue where restricted elements of the `/manage` menu weren't being reset upon opening the menu again has been resolved.

# New Feature - 1.0.5 [20/12/2024]
- Added `Config.ShortenPeacetime` to shorten the values of the Peacetime, from `Blaine County` to `BC`, if preferred. 

# Bug Fix - 1.0.6 [20/12/2024]
- An issue where the default settings weren't being properly applied to players on first join has been fixed.
- The `Config.DefaultColour` has been updated to use the RBGA colour format, the config value must use the RGBA format to properly show in the interface settings page.

# New Feature - 1.0.7 [22/12/2024] Files Changed: config.lua, server.lua, ui/script.js, function/cl_functions.lua
- The `Update Peacetime` button now functions as intended.
- The Peacetime notifications now properly reflect whether the Peacetime is being set, or updated.
- The `Set By` value inside the Area of Play Modal now reflects the administrator who updated the Area of Play, with support for the default settings and voting.
- Added `Config.Webhook` and `Config.WebhookFooter` options to the configuration for the new `Logging System`, which will send all actions taken by an administrator to the webhook.

# Bug Fixes - 1.0.8 [06/01/2025] Files Changed: server.lua, config.lua, ui/script.js, functions/cl_functions.lua
- An issue where the Area Notifications configuration didn't work the way the user had configured it has been resolved and notifications now show exactly how the user configured them.
- An issue where first-time players wouldn't have the interface settings applied properly has been fixed.
- The Config.DefaultColour was updated from RGBA to RGB, this caused the health and armour bars not to fill up with the default accent colour.
- In order to rectify the above issue for existing players, code has been implemented to update each user from RGBA to RGB so they don't need to set their colours manually for it to work. 
- The Config.VoteTime has been updated from 30s to 60s, this was always intended but was overridden during development.
- An issue where the Area of Play wouldn't automatically switch after a vote has ended has been fixed and will now automatically update once the vote has concluded.
- A collection of small bugs regarding the voting system have been fixed, including checks for existing votes, fixes for buttons executing multiple times and more.

# Large Update with Bug Fixes - 1.0.9 [27/01/2025] The whole script has been updated, so please install FRESH when updating to this version
- Added two new events, `nhud:client:disable_hud` and `nhud:client:enable_hud` to toggle the full visibility of the interface.
- If the Pause Menu is actively open, the whole interface will be hidden whilst the menu is open for better visibility.
- Added a collection of new microphone types, the microphone element will now show when you're talking at different volumes, in a Radio and with a Megaphone.
- Improved the interface layout for screens that are outside of 1920x1080, the interface will no longer overlap with the map, or anything else.
- Moved the Webhook URL to a server-sided configuration file for security purposes.
- Added a `Driving Mode` for the Location Cluster which centers the cluster, and a basic speedometer, configurable through `Config.EnableDrivingMode` and `Config.EnableSpeeodmeter`
- Added fully configurable Area Names and Types, so you can adjust `Blaine County` to `Cook County`, or shorten `Area of Play` to `AOP` across the whole interface, in the config file. 
- Added support for when the results are tied in a vote, when this happens, the area of play will stay the same. 
- Added three new server exports, `getAop`, `getPeacetime` and `getPriority`, which return the data for each respective element.
- Added configurable options for the States, if you wish to change `Available`, `On Cooldown` or `On Hold` to anything else.
- Created a `readme.md` with information and code examples to use the exports provided with the script.

# Minor Changes - 1.0.10 [11/02/2025] Files Changed: ui/script.js, ui/script.css, functions/cl_functions.lua, client.lua
- Added a /toggleui and /togglehud command, both serve the same purpose, but will toggle the visibility of the whole interface.
- Added show/hide support for the speedometer, which can be enabled via `Config.EnableSpeedometer`, so it hides with /hideui and when the pause menu is opened.
- Added further support for monitors with larger resolutions, the hud elements and above map element will now resize horizontally to fit the increased size in the mini map.
- Fixed an issue with the compass directions being flipped
- Added support for streets and areas that are unknown in the compass road information element.
- Updated the Area Notifications to say 'Welcome to Blaine County', instead of just being the area name. 

# Large Update - 1.0.11 [22/03/2025] The whole script has been updated, so please install FRESH when updating to this version
- Added configurable commands, mostly all commands (except manual commands) are now configurable through the `config.lua`.
- Added a new config option for preventing players from disabling the Priority Zone elements of the interface, via `Config.PreventDisablingPriorities`. 
- Created manual commands for administrators to use to bypass the manage interface, including `/setaop`, `/peacetime` and `/priority`, all come with chat suggestions for further information on usage. 
- Added custom zones using `PolyZone`, via `Config.CustomAreas`. These can be used to add Roxwood, Cayo Perico or other custom areas that aren't included in the preset areas. 
- Updated the layout of `Config.Areas`, they're now split into a more informative layout, including a section to add labels for the Custom Areas.

# Minor Update - 1.0.12 [23/03/2025]
- Updated the manual events for managing the `Area of Play`, `Peacetime`, and `Priority Statuses` to allow manual execution from external scripts.
- Added examples inside the `readme.md` of how to use the manual server events to control elements.
- Added support for the manual commands to be executed via the console + updated the webhook logging to reflect that.
- Added configurable priority states for those who want to customise, add or remove states.. just make sure that the 'available' state always exists.

# Minor Update - 1.0.13 [06/04/2025]
- Added indefinite time support for `Priority Statuses`, so if you provide a `0` for the time value for a status (not including `available`), the priority won't show a time and will instead be indefinite. 
- Added an ace permission for creating a vote, the default permission is `nexhud.manage.createvote`. 

# Major Update - 1.2.0 [17/12/2025]
- New Interface Settings: We have completely reworked the interface settings menu, now on the side, users can adjust the positioning of the all elements, including the alignment of the main cluster.
- Notifications are now built-in to the script with three positions: top-center, bottom-left (above the map) and top-right, all moveable inside the new interface settings.
- Driving Mode brings a simplistic speedometer, and central information cluster, with fuel and vehicle health indication, and intelligent prompts for seatbelt and engine controls.
- Custom Elements can be created for various uses, such as: providing a playercount and active/pending reports count for on-duty staff members or unit counts for on-duty units for real-time insights.

# Minor Update - 1.2.1 [27/01/2026]
- Added support for `nex-spawn`'s new Dynamic Display, toggling the HUD's display when the player is selecting a spawn location.
- Added a new export, `getAreaOfPlay`, returning a text-ready display of the current Area of Play.

# Minor Bug Fix - 1.2.2 [15/02/2026]
- Fixed the stacking of Center and Right notifications, so new notifications will start at the top, not bottom.
- Added a `/reloadmap` command, configurable the same as others, to reload the map in the case of mini map issues.

# Minor Bug Fix - 1.2.3 [22/02/2026]
- Adjusted /reloadmap to /reloadui, and made it reload whole interface

# Minor Bug Fix - 1.2.4 [27/03/2026]
- Fixed the duplicated card text in the Interface Settings
- Added the missing Server Exports for Job Data and Head Tags

# Minor Update - 1.2.5 [01/06/2026]
- Added back Area Notifications, now with UI colour-coordinated elements for active peacetime and priorities.
- Added `custom_elements.lua` file to contain custom logic for the custom elements.
- Replaced the `readme.md` content with links to the new documentation for the script.