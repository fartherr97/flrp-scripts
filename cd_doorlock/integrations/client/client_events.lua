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

RegisterNetEvent('cd_doorlock:SetDoorState_closest', function(state)
    if not CheckValidParameter('state', state) then
        return
    end

    local door = GetDoorDataFull_closest()
    if door and door.unique_id then
        TriggerServerEvent('cd_doorlock:SetDoorState_sync', door.unique_id, state)
    else
        if Config.Debug then
            WARN('7854', 'no door nearby')
        end
    end
end)

RegisterNetEvent('cd_doorlock:SetDoorState_name', function(state, door_name, location_group)
    if not CheckValidParameter('state', state) or
    not CheckValidParameter('door_name', door_name) or
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
            TriggerServerEvent('cd_doorlock:SetDoorState_sync', door.unique_id, state)
            break
        end
    end
end)

RegisterNetEvent('cd_doorlock:SetDoorState_uniqueid', function(state, unique_id)
    if not CheckValidParameter('state', state) or
    not CheckValidParameter('unique_id', unique_id) then
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
            TriggerServerEvent('cd_doorlock:SetDoorState_sync', door.unique_id, state)
            break
        end
    end
end)