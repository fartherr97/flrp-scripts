# Minor Update - 1.0.2 [24/04/2025]
- Updated the database.sql to remove the foreign keys that were causing issues when inserting into your database.
- Fixed an issue with Config.NexHUD option having no impact at all to whether nex-hud exports would be called or not.
- Added two new server events, `nex-duty:server:onDutyStart` and `nex-duty:server:onDutyEnd`, start provides the source, callsign and entity_id, end provides the source and entity_id. 
- Fixed an issue where the data returned after clicking a unit in /duty units would always be the original user, it now shows the correct data for the unit clicked on.
- Added the missing chat suggestion for /duty manage and removed the depreciated /duty info command chat suggestion.
- Created a `getUnitData` export which'll return either information on the unit, or a null if the source is off duty. 

# New Minor Feature - 1.0.3 [27/04/2025]
- Fixed an issue where clicking on another unit from another department wouldn't work.
- Added an AFK checking system to the duty, if a unit is AFK for more than 5 minutes, they'll be marked as AFK and any time clocked whilst AFK will be stored seperately for extra data.
- Added the AFK metrics to the unit and department menus, these are displayed as stacked values, to provide better context to how much time is spent active, compared to being AFK.
- Added `upgrade.sql`, you must run this sql query to insert the added afk_time column to the duty_sessions table, otherwise this won't work!

# New Minor Feature - 1.0.4 [27/04/2025]
- Fixed an issue where kicking a unit off duty would kick the supervisor, instead of the targeted user. 
- Added `has_global_permissions` option to entity ranks, if true, this provides global, unrestricted access to suspending and kicking units off duty, including outside of their entities. 

# Bug Fix - 1.0.5 [10/05/2025]
- Fixed an incorrectly formatted onDutyEnd event which prevented the event from posting data when units were going off duty, this has been fixed and listening to the event should now work effectively. 

# New Minor Feature - 1.0.10 [22/09/2025]
- Added the ability to restrict Dual Duty to an ace permission: `nex-duty.dual_duty`.

# New Minor Changes - 1.0.11 [25/09/2025]
- Added Weapon Attachment support for `Config.Loadouts`.
- Added new script version update alerts in the server console on resource start.

# Bug Fix - 1.0.12 [25/09/2025]
- Added `Config.IsTestServer` configuration option for using the script on a test server, to prevent duplication with dutylogs.com

# Bug Fix - 1.0.14 [29/09/2025]
- Added back `Config.DisableOffDutyMessages` to the configuration.

# Bug Fix - 1.0.15 [13/05/2025]
- Fixed an issue where, when going off duty, the entity going off duty was picked at random, not the one selected.

# Bug Fix - 1.0.16 [17/11/2025]
- Fixed an issue where if a player was suspended from one department, the duty menu wouldn't show up when executing /duty.

# Major Update - 1.2.0 [03/12/2025]
- Updated the Notification System to include a Type and Position variable.
- Added `can_direct_message` configuration option for ranks, allowing the ability to Direct Message other units through dutylogs.com
- Added a Backup API System, which'll failover in the rare and unplanned situation where the Main API is unreachable, or down.
- Added support for the Live Map feature for dutylogs.com.

# Minor Fix - 1.2.1 [04/12/2025]
- We now send the `has_global_permissions` value when going on duty to dutylogs.com, to provide an exemption to any livemap restrictions.

# Minor Update - 1.2.2 + 1.2.3 [06/12/2025]
- Added support for Boats for Player Blips (and for dutylogs.com live map).
- Reduced the amount of data being sent when updating the livemap + added street data to each unit.

# Minor Update - 1.2.4 [22/01/2026]
- Added back AFK Configuration, allowing you to disable it fully, adjust the movement threshold and stood-still duration.
- Added a `nex-duty:server:onUnitSuspended` event handler, which is fired once a unit is suspended.
- Added `nex-duty:server:onDutyEnd` to when a unit is sent off duty.

# Minor Update - 1.2.5 [15/02/2026]
- Added a placeholder image to replace the Discord avatar if no `Config.BotToken` is provided.
- Added `Config.WideDutyMenu` to provide a wider duty menu for servers with rather long department names.
- Added the ability to call `nex-duty:server:go_off_duty` to send a unit off duty, requires the entity_id then source in the arguments

# Minor Update - 1.2.6 [22/02/2026]
- Added increased support for Livemap support with Dutylogs, with even more detail to view for units.
- Refreshed the `/duty units` menu, to support more units, include department icons, per-department counts and a global unit count.
- Added `Config.ServerName` to the shared configuration, and `server_icon.png` to `ui/assets` to be used in the duty menu.

# Major Update - 1.3.0 [03/05/2026]
- Fixed street location data being immediately initialised for DutyLogs.com support, instead of waiting for the player to move.
- Updated the End of Duty embed colour players receive to include Active / AFK time, instead of total time.
- Added Hyperlinks to Unit Embed Fields for DutyLogs.com supported-servers, these will open the players unit profile on DutyLogs.com.
- Merged Active Time and AFK Time into one Embed Field for End of Duty messages. 
- Fixed an issue removing a Unit Suspension in the Standalone version.
- Added support for Remote Unit Suspensions via DutyLogs.com.
- Added a retry option for Discord Messages, if the first one fails due to somesort of issue.
- Upgraded the DutyLogs.com Livemap, blips now update every 500ms (2x a second), instead of every 3 seconds. 
- Added partial support for Coloured Blips in the DutyLogs.com Livemap, supported colours are: 3, 16, 25, 38, 40, 47, 49 and 52.
- Updated AFK Notifications text to include the dynamically configurable AFK buffer.
- Fixed setting the correct Sender for Duty DM messages.

# Minor Fix - 1.3.1 [04/05/2026]
- Fixed nil data on Sending Off and Suspending units.

# Minor Update - 1.3.2 [04/05/2026]
- Removed old plain-text documentation and updated with links to new documentation site.

# Minor Fix - 1.3.3 [04/05/2026]
- Added `yarn` as a depdendency, and added `package.json` to install websocket module.

# Minor Fixes - 1.3.4 [04/05/2026]
- Fixed `has_blips` entity configuration option, this controls whether or not an entity has duty blips or not.
- Fixed toggling duty blips, they now properly disable and enable on `/duty toggleblips`.