if Config.LockpickItems.ENABLE and Config.LockpickItems.usable_lockpick_item then
    for _, item_name in pairs(Config.LockpickItems.lockpick_items) do
        RegisterUsableItem(item_name, function(source)
            TriggerClientEvent('cd_doorlock:LockpickDoor_usableitem', source)
        end)
    end
end

function CheckLockpickAndRemove(source)
    for _, itemName in pairs(Config.LockpickItems.lockpick_items) do
        if HasItem(source, itemName, 1) then
            RemoveItem(source, itemName, 1)
            return true
        end
    end
    return false
end