function GetDoorlockDatabase_OX()
    local formattedTable = {}
    local OX = DB.fetch('SELECT * FROM ox_doorlock')
    if not OX then return nil end
    for _, tbl in ipairs(OX) do
        local oxDoor = json.decode(tbl.data)
        local door = {
            perms = {},
            unique_id = GenerateUniqueId(16),
            door_name = tbl.name,
            door_sound = type(oxDoor.lockSound) == 'string' and oxDoor.lockSound or '',
            door_sound_unlock = type(oxDoor.unlockSound) == 'string' and oxDoor.unlockSound or '',
            door_data = {},
            state = oxDoor.state == 1 and true or false,
            secret = type(oxDoor.hideUi) == 'boolean' and oxDoor.hideUi or nil,
            lockpickable = oxDoor.lockpick == true,
            distance = oxDoor.maxDistance or 2,
            autolock = type(oxDoor.autolock) == 'number' and oxDoor.autolock or nil,
            keep_open = type(oxDoor.holdOpen) == 'boolean' and oxDoor.holdOpen or nil,
            default_state = false,
            camera = false,
        }

        if oxDoor.doors and #oxDoor.doors > 1 then
            door.door_type = 'double'
        elseif oxDoor.coords and oxDoor.model then
            door.door_type = 'single'
        elseif oxDoor.doors and #oxDoor.doors > 1 and oxDoor.auto then
            door.door_type = 'double_gate'
        elseif oxDoor.auto then
            door.door_type = 'garage'
        end

        if type(oxDoor.groups) == 'table' then
            door.perms.job = {}
            for name, grade in pairs(oxDoor.groups) do
                table.insert(door.perms.job, { name = name, grade = tonumber(grade) or 0 })
            end
        end

        if type(oxDoor.characters) == 'table' then
            door.perms.identifier = {}
            for _, identifier in pairs(oxDoor.characters) do
                table.insert(door.perms.identifier, identifier)
            end
        end

        if type(oxDoor.items) == 'table' then
            door.perms.items = {}
            for _, item in pairs(oxDoor.items) do
                table.insert(door.perms.items, {name = item.name, amount = 1, destroy = item.remove})
            end
        end

        if type(oxDoor.passcode) == 'string' then
            door.perms.passcode = oxDoor.passcode
            if tonumber(oxDoor.passcode) then
                door.perms.job = oxDoor.passcode
            end
        end

        if oxDoor.doors and #oxDoor.doors > 0 then
            for _, data in ipairs(oxDoor.doors) do
                table.insert(door.door_data, {
                    unique_id = GenerateUniqueId(16),
                    model_hash = data.model,
                    door_coords = data.coords
                })
            end
        else
            table.insert(door.door_data, {
                unique_id = GenerateUniqueId(16),
                model_hash = oxDoor.model,
                door_coords = oxDoor.coords
            })
        end
        table.insert(formattedTable, door)
    end

    local allDoors = GetAllDoors()
    if allDoors then
        for c, d in pairs(allDoors) do
            local oldCoord = d.door_data[1].door_coords
            for cc, dd in pairs(formattedTable) do
                local newCoord = dd.door_data[1].door_coords
                if oldCoord.x == newCoord.x and oldCoord.y == newCoord.y and oldCoord.z == newCoord.z then
                    table.remove(formattedTable, cc)
                    break
                end
            end
        end
    end
    return formattedTable
end