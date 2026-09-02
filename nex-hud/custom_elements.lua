-- this is the same template from the "DefaultInnerHTML" option from the Config.CustomElements
local template = '<b>LEO:</b> <span style="color:{LEO_COLOUR};">{LEO}</span> <span style="color: #BBB;">/</span> <b>SAMR:</b> <span style="color:{SAMR_COLOUR};">{SAMR}</span> <span style="color: #BBB;">/</span> <b>DHS:</b> <span style="color:{DHS_COLOUR};">{DHS}</span> <span style="color: #BBB;">/</span> <b>STAFF:</b> <span style="color:{STAFF_COLOUR};">{STAFF}</span>'

-- This is jsut a helper function to set the colour depending on whether a department has on-duty units or not. The "var(--accent-color)" will use the customised colour the player has set through the /ui settings menu.
function set_colour(value)
    if value == 0 then
        return "#BBB"
    else
        return "var(--accent-color)"
    end
end

-- This queries nex-duty each interval (30s) to fetch the counts for each part of the custom element.
Citizen.CreateThread(function()
    while true do
        local leo_units = exports["nex-duty"]:getUnitsByEntities({ "sasp", "bso", "lspd" })
        local staff_units = exports["nex-duty"]:getUnitsByEntities({ "staff" })
        local fire_units = exports["nex-duty"]:getUnitsByEntities({ "samr" })
        local dhs_units = exports["nex-duty"]:getUnitsByEntities({ "dhs" })

        -- count how many entries are in units
        local leo_count = #leo_units
        local staff_count = #staff_units
        local fire_count = #fire_units
        local dhs_count = #dhs_units

        local inner_html = template
            :gsub("{LEO}", leo_count)
            :gsub("{LEO_COLOUR}", set_colour(leo_count))
            :gsub("{STAFF}", staff_count)
            :gsub("{STAFF_COLOUR}", set_colour(staff_count))
            :gsub("{SAMR}", fire_count)
            :gsub("{SAMR_COLOUR}", set_colour(fire_count))
            :gsub("{DHS}", dhs_count)
            :gsub("{DHS_COLOUR}", set_colour(dhs_count))

        TriggerEvent("nh:server:update_custom_element", "unit_counts", inner_html)

        Wait(30000)
    end
end)

-- If you want to add and remove the ace permission from a player, so, for example, they only have the Custom Element whilst they're on duty, and it's removed once they go off, these two listening events will refresh their custom elements, so the script will recheck their permissions. If the ace permission is removed when going off duty, this will remove the custom element too. You must wait at least 1000ms for the permissions to be removed, otherwise it won't work.
AddEventHandler("nex-duty:server:go_on_duty", function()
    local src = tonumber(source)
    Citizen.Wait(1000)
    TriggerEvent("nh:server:refresh_custom_elements", src)
end)

AddEventHandler("nex-duty:server:go_off_duty", function()
    local src = tonumber(source)
    Citizen.Wait(1000)
    TriggerEvent("nh:server:refresh_custom_elements", src)
end)