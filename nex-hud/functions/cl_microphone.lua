local last_is_talking = false
local last_voice_state = 2

Citizen.CreateThread(function()
    local player_id = PlayerId()

    while true do
        Citizen.Wait(100)

        local is_talking = NetworkIsPlayerTalking(player_id)

        if is_talking ~= last_is_talking then
            SendNUIMessage({ action = "update_microphone", player_id = player_id, is_talking = is_talking })
            last_is_talking = is_talking
        end
    end
end)

RegisterNetEvent("pma-voice:radioActive")
AddEventHandler("pma-voice:radioActive", function(active)
    SendNUIMessage({ action = "update_microphone_type", type = active and 5 or last_voice_state, is_talking = true })
end)

RegisterNetEvent("pma-voice:setTalkingMode")
AddEventHandler("pma-voice:setTalkingMode", function(talking_mode)
    if talking_mode ~= last_voice_state then last_voice_state = talking_mode end

    local is_talking = NetworkIsPlayerTalking(PlayerId())
    if is_talking ~= last_is_talking then last_is_talking = is_talking end

    SendNUIMessage({ action = "update_microphone_type", type = talking_mode, is_talking = is_talking })
end)