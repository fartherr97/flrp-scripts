-- If you wish to replace the built-in notification system, you can do this by commenting out the nex-hud event and replacing it with your own.
function display_notification(source, title, description, time, style, location)
    if time == nil then time = Config.NotificationTime end
    style = style or "info"
    location = location or "right"

    TriggerClientEvent("nh:client:notify", source, title, description, time, style, location)
end