function GetPlayersDoorPerms()
    local temp_table = {}

    if Config.DoorAccessPerms.Framework then
        local jobName = GetJobName()
        local jobGrade = GetJobGrade()
        local gangName = GetGangName()
        local gangGrade = GetGangGrade()

        temp_table.job = {job_name = jobName, job_grade = jobGrade, gang_name = gangName, gang_grade = gangGrade}
    end

    if Config.DoorAccessPerms.Identifiers or Config.DoorAccessPerms.Discord then
        local perms = {
            identifiers = Config.DoorAccessPerms.Identifiers == true or nil,
            discord = Config.DoorAccessPerms.Discord == true or nil,
        }
        local callback = exports.cd_bridge:Callback('cd_doorlock:get_other_door_perms', perms)
        if callback then
            temp_table.identifiers = callback.identifiers
            temp_table.discord = callback.discord
        else
            ERROR('4395', 'get_other_door_perms returned nil')
        end
    end

    return temp_table
end

function HasDoorPerms(door_perms_data)
    if Config.DoorAccessPerms.Framework then
        local jobName = GetJobName()
        local jobGrade = GetJobGrade()
        local gangName = GetGangName()
        local gangGrade = GetGangGrade()
        local onDuty = GetJobDuty()

        if Config.Framework ~= 'vrp' then
            for _, d in pairs(door_perms_data.job) do
                if (jobName == d.name and jobGrade >= d.grade and onDuty) or (gangName == d.name and gangGrade >= d.grade) then
                    return true
                end
            end
        elseif Config.Framework == 'vrp' then
            local vrpPerms = exports.cd_bridge:Callback('cd_doorlock:has_door_perms_vrp', door_perms_data.job)
            if vrpPerms then
                return true
            end
        end
    end
    if Config.DoorAccessPerms.Identifiers or Config.DoorAccessPerms.AcePerms or Config.DoorAccessPerms.Discord or Config.DoorAccessPerms.Items then
        if (door_perms_data.identifier and #door_perms_data.identifier > 0) or (door_perms_data.ace and #door_perms_data.ace > 0) or (door_perms_data.discord and #door_perms_data.discord > 0) or (door_perms_data.items and #door_perms_data.items > 0) then
            return exports.cd_bridge:Callback('cd_doorlock:has_door_perms', door_perms_data)
        end
    end

    return false
end

function HasDoorlockAdminPerms()
    return exports.cd_bridge:Callback('cd_doorlock:has_admin_perms')
end