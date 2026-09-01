exports.cd_bridge:RegisterServerCallback('cd_doorlock:has_admin_perms', function(src)
    return HasDoorlockAdminPerms(src)
end)

exports.cd_bridge:RegisterServerCallback('cd_doorlock:has_door_perms', function(src, ...)
    return HasDoorPerms(src, ...)
end)

exports.cd_bridge:RegisterServerCallback('cd_doorlock:has_door_perms_vrp', function(src, ...)
    return HasDoorPerms_Vrp(src, ...)
end)



exports.cd_bridge:RegisterServerCallback('cd_doorlock:get_other_door_perms', function(src, ...)
    return GetOtherDoorPerms(src, ...)
end)


exports.cd_bridge:RegisterServerCallback('cd_doorlock:get_players_ace_perms', function(src, ...)
    return GetPlayersAcePerms(src)
end)

exports.cd_bridge:RegisterServerCallback('cd_doorlock:get_doorlock_database_ox', function(src)
    return GetDoorlockDatabase_OX()
end)



exports.cd_bridge:RegisterServerCallback('cd_doorlock:check_lockpick_and_remove', function(src)
    return CheckLockpickAndRemove(src)
end)

exports.cd_bridge:RegisterServerCallback('cd_doorlock:export_location_group_data', function(src, ...)
    return ExportLocationGroupData(src, ...)
end)

exports.cd_bridge:RegisterServerCallback('cd_doorlock:add_import_data', function(src, ...)
    return AddImportData(src, ...)
end)