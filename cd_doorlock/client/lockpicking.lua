function StartLockpicking()
    if math.random(1, 100) <= Config.LockpickItems.police_alert_chance then
        PoliceDispatchAlert()
    end

    if GetResourceState('cd_keymaster') == 'started' then
        local result = exports['cd_keymaster']:StartKeyMaster()
        return result
    else
        --Add your own lockpick/minigame here. You must return a boolean (true or false).
        Citizen.Trace('^1You must configure a lockpick/minigame resource to use this feature.^0\n')
        return false
    end
end

function PoliceDispatchAlert()
    local dispatch = GetResourceState('cd_dispatch3d') == 'started' and 'cd_dispatch3d' or (GetResourceState('cd_dispatch') == 'started' and 'cd_dispatch')
    if dispatch then
        local data = exports[dispatch]:GetPlayerInfo()
        TriggerServerEvent('cd_dispatch:AddNotification', {
            job_table = {'police'},
            coords = data.coords,
            title = '10-15 - Store Robbery',
            message = ('A %s robbing a store at %s'):format(data.sex, data.street),
            flash = false,
            sound = 1,
            unique_id = GenerateUniqueId(16),
            blip = {
                sprite = 431,
                scale = 1.2,
                colour = 3,
                flashes = false,
                text = '911 - Store Robbery',
                time = 5,
                radius = 0,
            }
        })
    else
        --Add your own police dispatch alert here.
        Citizen.Trace('^1You must configure a dispatch resource to use this feature.^0\n')
    end
end