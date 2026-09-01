RegisterCommand('json_2_sql', function(source, args, rawCommand)
    if source ~= 0 then
        Citizen.Trace('This command can only be run from the server console.\n')
        return
    end
    local resourceName = GetCurrentResourceName()
    local doors = json.decode(LoadResourceFile(resourceName, './JSON files/door_data.json'))
    local location_groups = json.decode(LoadResourceFile(resourceName, './JSON files/location_groups.json'))
    if not doors or not location_groups then
        Citizen.Trace('Failed to load JSON files.\n')
        return
    end
    for _, door in pairs(doors) do
        if door.id then
            door.id = nil
        end
        if not door.unique_id then
            door.unique_id = GenerateUniqueId(16)
        end
        DoorData[door.unique_id] = door
        DoorStates[door.unique_id] = door.state
        InsertNewLocationGroupIntoDatabase(door.location_group)
    end
    for _, lg in pairs(location_groups) do
        InsertNewLocationGroupIntoDatabase(lg.name)
    end
    SaveMultipleDoorsToDatabase(doors)
    SendDoorlockData(source)
end, false)