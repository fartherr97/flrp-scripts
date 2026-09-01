function GetDoorlockDatabase_QB()
    local formattedTable = {}

    local QB = nil
    local success, result = pcall(function()
        return exports['qb-doorlock']:GetDoorList()
    end)
    if success and result then
        QB = result
    else
        return nil
    end

    for key, qbDoor in ipairs(QB) do
        local door = {
            perms = {},
            unique_id = GenerateUniqueId(16),
            door_name = qbDoor.doorLabel or tostring(key),
            door_sound = (qbDoor.audioLock and qbDoor.audioLock.file) or '',
            door_sound_unlock = (qbDoor.audioUnlock and qbDoor.audioUnlock.file) or '',
            door_type = (qbDoor.doorType == 'double' or (qbDoor.doors and #qbDoor.doors > 1)) and 'double' or (qbDoor.doorType == 'doorlock') and 'doorlock' or'single',
            door_data = {},

            default_state = qbDoor.locked == true,
            state = qbDoor.locked == true,
            secret = qbDoor.hideLabel == true or false,
            lockpickable = qbDoor.pickable == true,
            camera = false,
            distance = qbDoor.distance or qbDoor.maxDistance or 2,

            autolock = (qbDoor.autolock ~= false) and qbDoor.autolock or nil,
            keep_open = false
        }

        if type(qbDoor.authorizedJobs) == 'table' then
            door.perms.job = {}
            for name, grade in pairs(qbDoor.authorizedJobs) do
                if type(name) == 'number' then
                    name = grade
                    grade = 0
                end
                table.insert(door.perms.job, { name = name, grade = tonumber(grade) or 0 })
            end
        end
        if type(qbDoor.authorizedGangs) == 'table' then
            for name, grade in pairs(qbDoor.authorizedGangs) do
                table.insert(door.perms.job, { name = name, grade = tonumber(grade) or 0 })
            end
        end

        if type(qbDoor.authorizedCitizenIDs) == 'table' then
            door.perms.identifier = {}
            for cid, allowed in pairs(qbDoor.authorizedCitizenIDs) do
                if allowed then table.insert(door.perms.identifier, tostring(cid)) end
            end
        end

        if type(qbDoor.items) == 'string' then
            door.perms.items = {}
            table.insert(door.perms.items, { name = qbDoor.items, amount = 1 })
        elseif type(qbDoor.items) == 'table' then
            door.perms.items = {}
            for name, amount in pairs(qbDoor.items) do
                if type(name) == 'string' then
                    table.insert(door.perms.items, { name = name, amount = tonumber(amount) or 1 })
                end
            end
        end

        if qbDoor.doors and #qbDoor.doors > 0 then
            for _, d in ipairs(qbDoor.doors) do
                table.insert(door.door_data, {
                    unique_id = GenerateUniqueId(16),
                    model_hash = type(d.objName) == 'number' and d.objName or GetHashKey(d.objName or d.objHash or 0),
                    door_coords = {x = d.objCoords.x, y = d.objCoords.y, z = d.objCoords.z}
                })
            end
        else
            table.insert(door.door_data, {
                unique_id = GenerateUniqueId(16),
                model_hash = type(qbDoor.objName) == 'number' and qbDoor.objName or GetHashKey(qbDoor.objName or qbDoor.objHash or 0),
                door_coords = {x = qbDoor.objCoords.x, y = qbDoor.objCoords.y, z = qbDoor.objCoords.z}
            })
        end

        table.insert(formattedTable, door)
    end

    local R = RoundDecimals

    local allDoors = GetAllDoors()
    if allDoors then
        for c, d in pairs(allDoors) do
            local oldCoord = d.door_data[1].door_coords
            for cc, dd in pairs(formattedTable) do
                local newCoord = dd.door_data[1].door_coords
                if R(oldCoord.x) == R(newCoord.x) and R(oldCoord.y) == R(newCoord.y) and R(oldCoord.z) == R(newCoord.z) then
                    table.remove(formattedTable, cc)
                    break
                end
            end
        end
    end

    return formattedTable
end