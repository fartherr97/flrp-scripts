-- This is where you can insert your own notifications system for your server, we don't natively provide one, so you'll need to do this!
function display_notification(source, title, description, time, notification_type, position)
    if time == nil then time = 5000 end
    if notification_type == nil then notification_type = 'info' end
    if position == nil then position = 'right' end

    -- Examples, replace with your own:
    -- TriggerClientEvent('okokNotify:Alert', source, title, description, time, 'info')
    -- TriggerClientEvent("nh:client:notify", source, title, description, time, notification_type, position)
end