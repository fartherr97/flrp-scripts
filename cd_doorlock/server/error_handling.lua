-- ┌──────────────────────────────────────────────────────────────────┐
-- │                              DEBUG                               │
-- └──────────────────────────────────────────────────────────────────┘

local function DebugPrints(source)
    local lines = {}
    local function add(str)
        lines[#lines + 1] = str
    end

    add('^6-----------------------^0')
    add(('^1CODESIGN DEBUG^0 (%s - v%s - %s)'):format(GetCurrentResourceName(), GetResourceMetadata(GetCurrentResourceName(), 'version', 0), source and 'client' or 'server'))

    add('^3CONFIG^0')
    add(('^6Config.AutoInsertSQL:^0 %s'):format(tostring(Config.AutoInsertSQL)))
    add(('^6Config.Debug:^0 %s'):format(tostring(Config.Debug)))
    add(('^6Config.DoorDataStorageMethod:^0 %s'):format(tostring(Config.DoorDataStorageMethod)))
    add(('^6Config.DoorlockDrawTextUI:^0 %s'):format(tostring(Config.DoorlockDrawTextUI)))
    add(('^6Config.AdminAccess: [Framework: ^0%s^6] [Identifiers: ^0%s^6] [AcePerms: ^0%s^6] [Discord: ^0%s^6]'):format(Config.AdminAccess.Framework.ENABLE, Config.AdminAccess.Identifiers.ENABLE, Config.AdminAccess.AcePerms.ENABLE, Config.AdminAccess.Discord.ENABLE))
    add(('^6Config.DoorAccessPerms: [Framework: ^0%s^6] [Identifiers: ^0%s^6] [AcePerms: ^0%s^6] [Discord: ^0%s^6] [Items: ^0%s^6]'):format(Config.DoorAccessPerms.Framework, Config.DoorAccessPerms.Identifiers, Config.DoorAccessPerms.AcePerms, Config.DoorAccessPerms.Discord, Config.DoorAccessPerms.Items))
    add('^6-----------------------^0')

    if source then
        add('^3PERMS^0')
        add(('^6Admin Perms:^0 %s'):format(HasDoorlockAdminPerms(source)))
        add('^6-----------------------^0')

        add('^3IDENTIFIERS^0')
        add(('^6fivem:^0 %s'):format(GetPlayerIdentifierByType(source, 'fivem')))
        add(('^6license:^0 %s'):format(GetPlayerIdentifierByType(source, 'license')))
        add(('^6steam:^0 %s'):format(GetPlayerIdentifierByType(source, 'steam')))
        add(('^6discord:^0 %s'):format(GetPlayerIdentifierByType(source, 'discord')))
        add(('^6license2:^0 %s'):format(GetPlayerIdentifierByType(source, 'license2')))
        add(('^6xbl:^0 %s'):format(GetPlayerIdentifierByType(source, 'xbl')))
        add(('^6live:^0 %s'):format(GetPlayerIdentifierByType(source, 'live')))
        add('^6-----------------------^0')

        if Config.AdminAccess.Framework.ENABLE then
            add('^3FRAMEWORK PERMS^0')
            for _, perms in pairs(Config.AdminAccess.Framework[Config.Framework]) do
                add(('^6%s:^0 %s'):format(perms, HasAdminPerms(source, {perms})))
            end
            add('^6-----------------------^0')
        end

        if Config.AdminAccess.Identifiers.ENABLE then
            add('^3IDENTIFIER PERMS^0')
            for _, identifier in pairs(Config.AdminAccess.Identifiers.identifier_list) do
                add(('^6%s:^0 %s'):format(identifier, HasPerms_Identifiers(source, {identifier})))
            end
            add('^6-----------------------^0')
        end

        if Config.AdminAccess.AcePerms.ENABLE then
            add('^3ACE PERMS^0')
            for _, aceperm in pairs(Config.AdminAccess.AcePerms.aceperms_list) do
                add(('^6%s:^0 %s'):format(aceperm, HasPerms_Ace(source, {aceperm})))
            end
            add('^6-----------------------^0')
        end

        if Config.AdminAccess.Discord.ENABLE then
            add('^3DISCORD PERMS^0')
            for _, discord_role in pairs(Config.AdminAccess.Discord.discord_list) do
                add(('^6%s:^0 %s'):format(discord_role, HasPerms_Discord(source, {discord_role})))
            end
            add('^6-----------------------^0')

            add('^3YOUR DISCORD ROLES^0')
            for _, discord_role in pairs(GetAllDiscordRoles(source)) do
                add(('^0%s'):format(discord_role))
            end
            add('^6-----------------------^0')
        end

        TriggerClientEvent('cd_bridge:Notification', source, 2, 'DEBUG INFO: OPEN F8 CONSOLE TO VIEW')
    end

    local output = table.concat(lines, '\n')
    Citizen.Trace(output .. '\n')
    if source then
        CreateThread(function()
            Wait(0)
            Citizen.Trace(output)
        end)
    end
end

RegisterCommand('debugdoorlock', function(source)
    local isConsole = type(source) ~= 'number' or source == 0
    local isAdmin = not isConsole and HasAdminPerms(source, {'owner', 'superadmin', 'god', 'admin', 'moderator', 'mod'}) or false
    local isDebugEnabled = Config.Debug

    if isConsole then
        DebugPrints(nil)
        return
    end

    if isAdmin or isDebugEnabled then
        DebugPrints(source)
        return
    end

    local msg = 'You cannot use this command. You must have admin permissions, enable Confg.Debug, or run it from the server console.'
    Citizen.Trace('^1'..msg..'^0\n')
    if not isConsole then
        TriggerClientEvent('cd_bridge:Notification', source, 2, msg)
    end
end, false)


RegisterCommand('debugdoorlocktable', function(source)
    local isConsole = type(source) ~= 'number' or source == 0
    local isAdmin = not isConsole and HasAdminPerms(source, {'owner', 'superadmin', 'god', 'admin', 'moderator', 'mod'}) or false
    local isDebugEnabled = Config.Debug
    local getSource = source > 0 and source or -1

    if isConsole or isAdmin or isDebugEnabled then
        TBL(GetAllDoors(), getSource)
    else
        local msg = 'You cannot use this command. You must have admin permissions, enable Confg.Debug, or run it from the server console.'
        Citizen.Trace('^1'..msg..'^0\n')
        if not isConsole then
            TriggerClientEvent('cd_bridge:Notification', source, 2, msg)
        end
    end
end, false)


-- ┌──────────────────────────────────────────────────────────────────┐
-- │                        PRE START CHECKS                          │
-- └──────────────────────────────────────────────────────────────────┘

CreateThread(function()
    if GetResourceState('cd_bridge') ~= 'started' then
        BridgeDependancyMissingPrint()
    end
    if Config == nil then
        ERROR('configuration_error_found', 'Config.lua Syntax Error')
    end
    if LocalesTable[Config.Language] == nil then
        ERROR('configuration_error_found', 'Config.Language/locales.lua Typo : ['..Config.Language..']')
    end
    if GetCurrentResourceName() ~= 'cd_doorlock' then
        ERROR('configuration_error_found', 'Resource Name Changed : ['..GetCurrentResourceName()..']')
    end
    if Config.DoorDataStorageMethod ~= 'file' and Config.DoorDataStorageMethod ~= 'database' then
        ERROR('configuration_error_found', 'Config.DoorDataStorageMethod invalid value: ['..tostring(Config.DoorDataStorageMethod)..']')
    end
    if Config.DoorlockDrawTextUI ~= 'cd_doorlock' and Config.DoorlockDrawTextUI ~= 'auto_detect' then
        ERROR('configuration_error_found', 'Config.DoorlockDrawTextUI invalid value: ['..tostring(Config.DoorlockDrawTextUI)..']')
    end
    if not Config.AdminAccess.Framework.ENABLE and not Config.AdminAccess.Identifiers.ENABLE and not Config.AdminAccess.AcePerms.ENABLE and not Config.AdminAccess.Discord.ENABLE then
        ERROR('configuration_error_found', 'All Config.AdminAccess options disabled')
    end
    if not Config.DoorAccessPerms.Framework and not Config.DoorAccessPerms.Identifiers and not Config.DoorAccessPerms.AcePerms and not Config.DoorAccessPerms.Discord and not Config.DoorAccessPerms.Items then
        ERROR('configuration_error_found', 'All Config.DoorAccessPerms options disabled')
    end

    if Config.OpenDoorMenu.ENABLE and (Config.OpenDoorMenu.command == nil or IsBlankString(Config.OpenDoorMenu.command)) then
        ERROR('configuration_error_found', 'Config.OpenDoorMenu.command is blank while OpenDoorMenu is enabled')
    end

    if Config.ToggleDoorLock.ENABLE and (Config.ToggleDoorLock.command == nil or IsBlankString(Config.ToggleDoorLock.command)) then
        ERROR('configuration_error_found', 'Config.ToggleDoorLock.command is blank while ToggleDoorLock is enabled')
    end

    if Config.Database ~= 'none' then
        while not SQLCheckDone do Wait(100) end
        PreStartItemChecks()
        JsonToSqlPrompt()
    end
end)

function BridgeDependancyMissingPrint()
    Citizen.Trace([[
        ^5===============================================================
        ^3[cd_doorlock] ^7Missing required dependency: ^1cd_bridge^7
        ^5===============================================================

        ^7This resource requires the ^2cd_bridge^7 framework bridge to function correctly.

        ^7Please download ^2cd_bridge^7 from the official source:
            ^3https://portal.cfx.re/assets/granted-assets?search=cd_bridge

        ^6After installing:
        • Ensure the ^2cd_bridge^7 resource is started ^4before^7 this resource
        • Verify it is named exactly ^2"cd_bridge"^7 in your resources folder
        • Restart your server after adding it

        ^5===============================================================
    ]] .. '^0\n')
end

function PreStartItemChecks()
    local needed = {}

    for _, item in pairs(Config.LockpickItems.lockpick_items) do
        needed[#needed+1] = item
    end

    local allDoors = GetAllDoors()
    if allDoors then
        for _, tbl in pairs(allDoors) do
            if tbl.perms and tbl.perms.items and type(tbl.perms.items) == 'table' then
                for _, item in pairs(tbl.perms.items) do
                    if type(item) == 'string' then
                        needed[#needed+1] = item
                    elseif type(item) == 'table' and item.name then
                        needed[#needed+1] = item.name
                    end
                end
            end
        end
    end
    CheckAllItemsExist(needed)
end

function JsonToSqlPrompt()
    --json file to sql check
    if Config.DoorDataStorageMethod == 'database' then
        local query = DB.single('SELECT 1 from cd_doorlock LIMIT 1')
        if not query then
            local doors = LoadResourceFile(GetCurrentResourceName(), './JSON files/door_data.json')
            if doors and #doors > 2 then
                Citizen.Trace([[
                ^5===============================================================
                ^3[cd_doorlock] ^7We have detected the switched from ^2JSON storage^7 to ^4SQL storage^7.
                ^5===============================================================

                ^7To migrate your existing doors from JSON → SQL, you must run:
                    ^3json_2_sql
                ^7This command must be executed ^1ONLY from the server console^7 (not in-game).

                ^6After running the migration:
                • All doors will be imported into the database
                • Future changes will automatically save to SQL
                • You may safely delete the old JSON data once migration is complete

                ^5===============================================================
                ]] .. '^0\n')
            end
        end
    end
end