local function CheckValidParameter(param_name, data)
    local expectedType, errorCode
    if param_name == 'door_name' then
        expectedType = 'string'
        errorCode = '3987'
    elseif param_name == 'location_group' then
        expectedType = 'string'
        errorCode = '2397'
    elseif param_name == 'state' then
        expectedType = 'boolean'
        errorCode = '6423'
    elseif param_name == 'unique_id' then
        expectedType = 'string'
        errorCode = '7884'
    elseif param_name == 'source' then
        expectedType = 'number'
        errorCode = '1748'
    end

    if TypeCheck(data, expectedType, errorCode, 'invalid parameter recieved')  then
        return true
    end
    return false
end

function GetAllDoors()
    if DoorData and next(DoorData) ~= nil then
        return DoorData
    else
        return nil
    end
end

function GetDoorUniqueID(door_name, location_group)
    local doors = GetAllDoors()
    if not doors then
        if Config.Debug then
            WARN('3001', 'no_doors_created')
        end
        return
    end

    for _, door in pairs(doors) do
        if door.door_name == door_name and door.location_group == location_group then
            return door.unique_id
        end
    end
end

function GetDoorState_closest(source)
    if not CheckValidParameter('source', source) then
        return
    end

    local door = GetDoorDataFull_closest(source)
    if door then
        return door.state
    else
        if Config.Debug then
            ERROR('7854', 'no door nearby')
        end
    end
end

function GetDoorState_name(door_name, location_group)
    if not CheckValidParameter('door_name', door_name) or
    not CheckValidParameter('location_group', location_group) then
        return
    end

    local doors = GetAllDoors()
    if not doors then
        if Config.Debug then
            WARN('3001', 'no_doors_created')
        end
        return
    end

    for _, door in pairs(doors) do
        if door.door_name == door_name and door.location_group == location_group then
            return door.state
        end
    end
end

function GetDoorState_uniqueid(unique_id)
    if not TypeCheck(unique_id, 'string', '7884', 'unique_id not string')  then
        return
    end

    if not CheckValidParameter('unique_id', unique_id) then
        return
    end

    local doors = GetAllDoors()
    if not doors then
        if Config.Debug then
            WARN('3001', 'no_doors_created')
        end
        return
    end

    for _, door in pairs(doors) do
        if door.unique_id == unique_id then
            return door.state
        end
    end
end

function GetDoorDataFull_closest(source)
    if not CheckValidParameter('source', source) then
        return
    end

    local doors = GetAllDoors()
    if not doors then
        if Config.Debug then
            WARN('3001', 'no_doors_created')
        end
        return
    end

    local playerCoords = GetEntityCoords(GetPlayerPed(source))
    local closestDoor, closestDistance = nil, math.huge

    for _, door in pairs(doors) do
        for _, subDoor in pairs(door.door_data) do
            local doorCoords = vec3(subDoor.door_coords.x, subDoor.door_coords.y, subDoor.door_coords.z)
            local distance = #(playerCoords - doorCoords)

            if distance < door.distance and distance < closestDistance then
                closestDistance = distance
                closestDoor = door
            end
        end
    end
    return closestDoor
end

function GetDoorDataFull_name(door_name, location_group)
    if not CheckValidParameter('door_name', door_name) or
    not CheckValidParameter('location_group', location_group) then
        return
    end

    local doors = GetAllDoors()
    if not doors then
        if Config.Debug then
            WARN('3001', 'no_doors_created')
        end
        return
    end

    for _, door in pairs(doors) do
        if door.door_name == door_name and door.location_group == location_group then
            return door
        end
    end
end

function GetDoorDataFull_uniqueid(unique_id)
    if not CheckValidParameter('unique_id', unique_id) then
        return
    end

    local doors = GetAllDoors()
    if not doors then
        if Config.Debug then
            WARN('3001', 'no_doors_created')
        end
        return
    end

    for _, door in pairs(doors) do
        if door.unique_id == unique_id then
            return door
        end
    end
end