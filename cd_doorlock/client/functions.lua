DoingAnimation = false

local tablet_prop

function FindDoorEntityNear(coords, model_hash, radius)
    local foundDoor = nil
    local closest = 1000

    local objects = GetGamePool('CObject')
    for cd = 1, #objects do
        local obj = objects[cd]
        if DoesEntityExist(obj) and GetEntityModel(obj) == model_hash then
            local distance = #(GetEntityCoords(obj) - coords)
            if distance < radius and distance < closest then
                foundDoor = obj
                closest = distance
            end
        end
    end
    return foundDoor
end

function TabletAnimation(boolean)
    local ped = PlayerPedId()
    if boolean then
        PlayAnimation('amb@world_human_seat_wall_tablet@female@base', 'base', -1)
        tablet_prop = CreateObject(`prop_cs_tablet`, 0, 0, 0, true, true, true)
        AttachEntityToEntity(tablet_prop, ped, GetPedBoneIndex(ped, 57005), 0.17, 0.10, -0.13, 20.0, 180.0, 180.0, true, true, false, true, 1, true)
        SetModelAsNoLongerNeeded(tablet_prop)
    else
        StopAnimTask(ped, 'amb@world_human_seat_wall_tablet@female@base', 'base' ,8.0, -8.0, -1, 50, 0, false, false, false)
        NetworkRequestControlOfEntity(tablet_prop)
        SetEntityAsMissionEntity(tablet_prop, true, true)
        DeleteEntity(tablet_prop)
        tablet_prop = nil
    end
end

function CalculateDistance(door_coords)
    local ped_coords = GetEntityCoords(PlayerPedId())
    local dist = #(ped_coords-vec3(door_coords.x, door_coords.y, door_coords.z))
    return dist*600
end

function DoKeyAnimation()
    CreateThread(function()
        RequestAnimDict('anim@heists@keycard@')
        while not HasAnimDictLoaded('anim@heists@keycard@') do Wait(0) end
        TaskPlayAnim(PlayerPedId(), 'anim@heists@keycard@', 'exit', 8.0, 1.0, 500, 48, 0, 0, 0, 0)
        RemoveAnimDict('anim@heists@keycard@')
    end)
end

function DoPasscodeAnimation(unique_id)
    DoingAnimation = true
    CreateThread(function()
        local ped = PlayerPedId()
        local ped_heading = GetEntityHeading(ped)
        local door_data = DoorData[unique_id].door_data[1]
        local entity = GetClosestObjectOfType(door_data.door_coords.x, door_data.door_coords.y, door_data.door_coords.z, DoorData[unique_id].distance+1.0, door_data.model_hash, false, false, false)
        local coords = GetOffsetFromEntityInWorldCoords(entity, door_data.text_dimensions, 0, 0)
        TaskGoStraightToCoord(ped, coords.x, coords.y, coords.z, 1.0, 1000.0, ped_heading, -1)
        Wait(CalculateDistance(coords))
        TaskTurnPedToFaceEntity(ped, entity, 1000)
        RequestAnimDict('anim@heists@keypad@')
        while not HasAnimDictLoaded('anim@heists@keypad@') do Wait(0) end
        TaskPlayAnim(ped, 'anim@heists@keypad@', 'idle_a', 2.0, -2.0, -1, 1, 0, 0, 0, 0 )
        RemoveAnimDict('anim@heists@keypad@')
        if not DoingAnimation then Wait(1000) ClearPedTasks(ped) end
    end)
end

function DoLockpickAnimation(unique_id)
    DoingAnimation = true
    CreateThread(function()
        local ped = PlayerPedId()
        local ped_heading = GetEntityHeading(ped)
        local door_data = DoorData[unique_id].door_data[1]
        local entity = GetClosestObjectOfType(door_data.door_coords.x, door_data.door_coords.y, door_data.door_coords.z, DoorData[unique_id].distance+1.0, door_data.model_hash, false, false, false)
        local coords = GetOffsetFromEntityInWorldCoords(entity, door_data.text_dimensions, 0, 0)
        TaskGoStraightToCoord(ped, coords.x, coords.y, coords.z, 1.0, 1000.0, ped_heading, -1)
        Wait(CalculateDistance(coords))
        TaskTurnPedToFaceEntity(ped, entity, 1000)
        RequestAnimDict('veh@break_in@0h@p_m_one@')
        while not HasAnimDictLoaded('veh@break_in@0h@p_m_one@') do Wait(0) end
        FreezeEntityPosition(ped, true)
        while DoingAnimation do
            TaskPlayAnim(ped, 'veh@break_in@0h@p_m_one@', 'low_force_entry_ds', 2.0, -2.0, -1, 1, 0, 0, 0, 0 )
            Wait(1000)
            ClearPedTasks(ped)
        end
        FreezeEntityPosition(ped, false)
        RemoveAnimDict('veh@break_in@0h@p_m_one@')
    end)
end

function CalculateVolumeBasedonDistance(coords)  --0.0 - 0.5
    if type(coords) == 'table' then
        coords = vec3(coords.x, coords.y, coords.z)
    end
    local ped_coords = GetEntityCoords(PlayerPedId())
    local dist = #(ped_coords - coords)
    local volume = 0.5 - (dist / 20.0)
    if volume < 0.0 then volume = 0.0 end
    return volume
end

function DoorlockDrawTextUI(action, text, doorLocked)
    if Config.DoorlockDrawTextUI == 'cd_doorlock' then
        if action == 'show' then
            local colour
            if doorLocked then
                colour = 'rgba(255, 93, 87, 0.8)'
            else
                colour = 'rgba(25, 135, 84, 0.8)'
            end
            SendNUIMessage({action = 'showdrawtext', message = text, colour = colour})
        elseif action == 'hide' then
            SendNUIMessage({action = 'hidedrawtext'})
        end
    else
        DrawTextUI(action, text)
    end
end

AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() then
        local ped = PlayerPedId()
        DisableCam()
        TabletAnimation(false)
        ClearPedTasks(ped)
        FreezeEntityPosition(ped, false)
        if NearbyDoors and next(NearbyDoors) then
            for _, door in pairs(NearbyDoors) do
                SetEntityDrawOutline(door, false)
            end
        end
    end
end)