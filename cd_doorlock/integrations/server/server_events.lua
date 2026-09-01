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
    elseif param_name == 'perms' then
        expectedType = 'table'
        errorCode = '7228'
    end

    if TypeCheck(data, expectedType, errorCode, 'invalid parameter recieved')  then
        return true
    end
    return false
end

RegisterServerEvent('cd_doorlock:LockdownBuilding', function(state, location_group)
    if not CheckValidParameter('state', state) or
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
        if door.location_group == location_group then
            TriggerClientEvent('cd_doorlock:SetDoorState_sync', -1, door.unique_id, state)
        end
    end
    TriggerClientEvent('cd_doorlock:LockdownBuilding_notify', -1, location_group, state)
end)

RegisterServerEvent('cd_doorlock:SetDoorPerms', function(unique_id, new_perms)
    if not CheckValidParameter('unique_id', unique_id) or
    not CheckValidParameter('perms', new_perms) then
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

            if type(new_perms.job) == 'table' then
                for index, job in pairs(new_perms.job) do
                    if type(job) ~= 'table' then
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    end

                    if not job.grade then
                        job.job = 0
                    end
                    if job.name and type(job.name) ~= 'string' then
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    else
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    end
                    if #new_perms.job == 0 then
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    end
                end
            else
                return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
            end

            if type(new_perms.identifier) == 'table' then
                for index, identifier in pairs(new_perms.identifier) do
                    if type(identifier) ~= 'string' then
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    end
                    if #new_perms.identifier == 0 then
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    end
                end
            else
                return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
            end

            if type(new_perms.ace) == 'table' then
                for index, ace in pairs(new_perms.ace) do
                    if type(ace) ~= 'string' then
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    end
                    if #new_perms.ace == 0 then
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    end
                end
            else
                return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
            end

            if type(new_perms.discord) == 'table' then
                for index, discord in pairs(new_perms.discord) do
                    if type(discord) ~= 'string' then
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    end
                    if #new_perms.discord == 0 then
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    end
                end
            else
                return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
            end

            if type(new_perms.items) == 'table' then
                for index, item in pairs(new_perms.items) do
                    if type(item) ~= 'table' then
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    end

                    if not item.amount then
                        item.amount = 1
                    end
                    if not item.destroy then
                        item.destroy = false
                    end
                    if item.name and type(item.name) ~= 'string' then
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    else
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    end
                    if #new_perms.items == 0 then
                        return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
                    end
                end
            else
                return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
            end

            if type(new_perms.passcode) ~= 'number' then
                return ERROR('1010', 'cd_doorlock:SetDoorPerms - Invalid data format. Please check your input.')
            end

            DoorData[unique_id].perms = new_perms
            TriggerClientEvent('cd_doorlock:EditDoor', -1, DoorData[unique_id])
        end
    end
end)

RegisterServerEvent('cd_doorlock:AddDoorPerms', function(unique_id, new_perms)
    if not CheckValidParameter('unique_id', unique_id) or
    not CheckValidParameter('perms', new_perms) then
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
            if new_perms.job then
                for _, job in pairs(new_perms.job) do
                    table.insert(DoorData[unique_id].perms.job, job)
                end
            end
            if new_perms.identifier then
                for _, identifier in pairs(new_perms.identifier) do
                    table.insert(DoorData[unique_id].perms.identifier, identifier)
                end
            end
            if new_perms.ace then
                for _, ace in pairs(new_perms.ace) do
                    table.insert(DoorData[unique_id].perms.ace, ace)
                end
            end
            if new_perms.discord then
                for _, discord in pairs(new_perms.discord) do
                    table.insert(DoorData[unique_id].perms.discord, discord)
                end
            end
            if new_perms.items then
                for _, item in pairs(new_perms.items) do
                    if not item.amount then
                        item.amount = 1
                    end
                    if not item.destroy then
                        item.destroy = false
                    end
                    table.insert(DoorData[unique_id].perms.items, item)
                end
            end
            if new_perms.passcode then
                DoorData[unique_id].perms.passcode = new_perms.passcode
            end
        end
    end
    TriggerClientEvent('cd_doorlock:EditDoor', -1, DoorData[unique_id])
end)