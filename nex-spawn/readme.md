# HELLO, thanks for purchasing nex-spawn from Nexeum Studios, here's a bit of information about the script!

If you choose to NOT have the selector show automatically on the `playerSpawned` event for framework intergration, this is the event you'll need to use!
Alternatively, if you wish to serve the spawn selector upon a player dying, or for whatever reason, the following event can be used to re-serve the player the spawn selector.

Client:
```lua
TriggerServerEvent("ns:server:player_spawned")

-- with coordinates for the players last location, for framework integrations
TriggerServerEvent("ns:server:player_spawned", vector3(1702, 3821, 35))
```

If you want to perform an action when the player has selected and spawned at a location, listen to this event:
```lua
AddEventHandler("ns:client:player_spawned")
```