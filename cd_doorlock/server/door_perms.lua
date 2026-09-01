-- ┌──────────────────────────────────────────────────────────────────┐
-- │                           ADMIN PERMS                            │
-- └──────────────────────────────────────────────────────────────────┘

function HasDoorlockAdminPerms(source)
    local Player = GetPlayer(source)
    if not Player then return false end

    if Config.AdminAccess.Framework.ENABLE then
        local perms = HasAdminPerms(source, Config.AdminAccess.Framework[Config.Framework])
        if perms then return true end
    end
    if Config.AdminAccess.Identifiers.ENABLE then
        local perms = HasPerms_Identifiers(source, Config.AdminAccess.Identifiers.identifier_list, 'admin_perms')
        if perms then return true end
    end
    if Config.AdminAccess.AcePerms.ENABLE then
        local perms = HasPerms_Ace(source, Config.AdminAccess.AcePerms.aceperms_list)
        if perms then return true end
    end
    if Config.AdminAccess.Discord.ENABLE then
        local perms = HasPerms_Discord(source, Config.AdminAccess.Discord.discord_list)
        if perms then return true end
    end
    return false
end

-- ┌──────────────────────────────────────────────────────────────────┐
-- │                            DOOR PERMS                            │
-- └──────────────────────────────────────────────────────────────────┘

function HasDoorPerms(source, door_perms_data)
    --job checks are done on client side before calling this server callback.
    if Config.DoorAccessPerms.Identifiers and door_perms_data.identifier and #door_perms_data.identifier > 0 then
        local perms = HasPerms_Identifiers(source, door_perms_data.identifier, 'door_perms')
        if perms then return true end
    end
    if Config.DoorAccessPerms.AcePerms and door_perms_data.ace and #door_perms_data.ace > 0 then
        local perms = HasPerms_Ace(source, door_perms_data.ace)
        if perms then return true end
    end
    if Config.DoorAccessPerms.Discord and door_perms_data.discord and #door_perms_data.discord > 0 then
        local perms = HasPerms_Discord(source, door_perms_data.discord)
        if perms then return true end
    end
    if Config.DoorAccessPerms.Items and door_perms_data.items and #door_perms_data.items > 0 then
        local perms = PermsCheck_Items(source, door_perms_data.items)
        if perms then
            for _, item in pairs(door_perms_data.items) do
                if item.destroy then
                    if type(item) == 'string' then
                        RemoveItem(source, item, 1)
                    elseif type(item) == 'table' then
                        RemoveItem(source, item.name, item.amount or 1)
                    end
                end
            end
            return true
        end
    end
    return false
end

function GetOtherDoorPerms(source, permsToGet)
    local result = {}

    if permsToGet.identifiers and Config.DoorAccessPerms.Identifiers then
        result.identifiers = GetAllFivemIdentifiers(source)
    end

    if permsToGet.discord and Config.DoorAccessPerms.Discord then
        result.discord = GetAllDiscordRoles(source)
    end
    return result
end

-- ┌──────────────────────────────────────────────────────────────────┐
-- │                         IDENTIFIER PERMS                         │
-- └──────────────────────────────────────────────────────────────────┘

function GetAllFivemIdentifiers(source)
    local out = {}

    for cd = 0, 7 do
        local identifier = GetPlayerIdentifier(source, cd)
        if not identifier then break end

        local colonPos = identifier:find(':', 1, true)
        local trimmed = colonPos and identifier:sub(colonPos + 1) or identifier

        out[#out + 1] = {
            full = identifier:lower(),
            trimmed = trimmed:lower()
        }
    end

    return out
end

function HasPerms_Identifiers(source, data, perms_type)
    if type(data) ~= 'table' or not source then return false end

    local ids = GetAllFivemIdentifiers(source)

    local lookup = {}
    for _, cd in ipairs(ids) do
        lookup[cd.full] = true
        lookup[cd.trimmed] = true
    end

    local allowFrameworkId = (perms_type == 'admin_perms' and Config.AdminAccess.Framework.ENABLE) or (perms_type == 'door_perms' and Config.DoorAccessPerms.Framework)

    local frameworkId = nil
    if allowFrameworkId then
        frameworkId = GetIdentifier(source)
        frameworkId = type(frameworkId) == 'string' and frameworkId:lower() or nil
    end

    for _, d in pairs(data) do
        if type(d) == 'string' then
            local needle = d:lower()

            if lookup[needle] then
                return true
            end

            if frameworkId and needle == frameworkId then
                return true
            end
        end
    end

    return false
end

-- ┌──────────────────────────────────────────────────────────────────┐
-- │                             ACE PERMS                            │
-- └──────────────────────────────────────────────────────────────────┘

function HasPerms_Ace(source, data)
    for _, ace in pairs(data) do
        if IsPlayerAceAllowed(source, ace) then
            return true
        end
    end
    return false
end

function GetPlayersAcePerms(source)
    local result = {}
    for _, ace in pairs(AcePerms) do

        if IsPlayerAceAllowed(source, ace) then
            result[#result+1] = ace
        end
    end
    return result
end

-- ┌──────────────────────────────────────────────────────────────────┐
-- │                           DISCORD PERMS                          │
-- └──────────────────────────────────────────────────────────────────┘

function GetAllDiscordRoles(source)
    return exports.Badger_Discord_API:GetDiscordRoles(source)
end

function HasPerms_Discord(source, data)
    local discord_roles = GetAllDiscordRoles(source)
    for c, d in pairs(data) do
        for cc, dd in pairs(discord_roles) do
            if d == dd then
                return true
            end
        end
    end
    return false
end

-- ┌──────────────────────────────────────────────────────────────────┐
-- │                            ITEMS PERMS                           │
-- └──────────────────────────────────────────────────────────────────┘

function PermsCheck_Items(source, data)
    for _, item in pairs(data) do
        if type(item) == 'string' then
            local has_item = HasItem(source, item, 1)
            if has_item then
                return true
            end

        elseif type(item) == 'table' then
            local has_item = HasItem(source, item.name, item.amount or 1)
            if has_item then
                return true
            end
        end
    end
    return false
end

function AddAcePermToAcePermsCache(data)
    for _, newAce in pairs(data) do
        for _, existingAce in pairs(DoorAccessItems) do
            if existingAce ~= newAce then
                table.insert(AcePerms, newAce)
            end
        end
    end
end

-- ┌──────────────────────────────────────────────────────────────────┐
-- │                            VRP PERMS                             │
-- └──────────────────────────────────────────────────────────────────┘

function HasDoorPerms_Vrp(source, door_perms_data)
    for c, d in pairs(door_perms_data) do
        if GetJobName(source) == d.name and GetJobGrade(source) >= d.grade then
            return true
        end
    end
    return false
end