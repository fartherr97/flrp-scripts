-- ==========================================================================
-- FLRP :: chat/client.lua — standalone chat client
-- ==========================================================================
-- Replaces the FiveM built-in `chat` resource (missing on this artifact).
-- Implements the community-standard contract other resources rely on:
--   TriggerEvent('chat:addMessage', { color = {r,g,b}, multiline = true,
--                                     args = { 'Name', 'message' } })
--   TriggerEvent('chat:addSuggestion', '/cmd', 'help', { {name,help}, ... })
--   TriggerEvent('chat:removeSuggestion', '/cmd')
--   TriggerEvent('chat:clear')
-- Player input is sent to the server as `chat:messageSent`, which fires the
-- standard server-side `chatMessage` event.
-- ==========================================================================

local isOpen = false

-- Open the input line. Keyboard focus only (no mouse cursor).
local function openChat()
  if isOpen then return end
  isOpen = true
  SetNuiFocus(true, false)
  SendNUIMessage({ type = 'OPEN' })
end

-- 'T' opens chat, '/' opens it pre-filled with a slash for a command.
RegisterKeyMapping('flrp_chat:open', 'Open chat', 'keyboard', 'T')
RegisterCommand('flrp_chat:open', function() openChat() end, false)

RegisterKeyMapping('flrp_chat:openCmd', 'Open chat (command)', 'keyboard', 'Z')
RegisterCommand('flrp_chat:openCmd', function()
  if isOpen then return end
  isOpen = true
  SetNuiFocus(true, false)
  SendNUIMessage({ type = 'OPEN', prefill = '/' })
end, false)

-- NUI -> Lua: the input line was submitted (or dismissed with Esc).
RegisterNUICallback('sent', function(data, cb)
  isOpen = false
  SetNuiFocus(false, false)
  local msg = data and data.message
  if msg and msg ~= '' then
    if msg:sub(1, 1) == '/' then
      ExecuteCommand(msg:sub(2)) -- run as a client command / gets routed to server
    else
      TriggerServerEvent('chat:messageSent', msg)
    end
  end
  cb('ok')
end)

RegisterNUICallback('closed', function(_, cb)
  isOpen = false
  SetNuiFocus(false, false)
  cb('ok')
end)

-- Render an incoming message. Fired locally and from the server.
local function addMessage(data)
  SendNUIMessage({ type = 'MESSAGE', message = data })
end
RegisterNetEvent('chat:addMessage', addMessage)
AddEventHandler('chat:addMessage', addMessage)
exports('addMessage', addMessage)

-- Command suggestions (autocomplete). Stored + shown by the NUI.
local function addSuggestion(name, help, params)
  SendNUIMessage({ type = 'SUGGEST_ADD', suggestion = {
    name = name, help = help or '', params = params or {},
  }})
end
RegisterNetEvent('chat:addSuggestion', addSuggestion)
AddEventHandler('chat:addSuggestion', addSuggestion)
exports('addSuggestion', addSuggestion)

local function removeSuggestion(name)
  SendNUIMessage({ type = 'SUGGEST_REMOVE', name = name })
end
RegisterNetEvent('chat:removeSuggestion', removeSuggestion)
AddEventHandler('chat:removeSuggestion', removeSuggestion)

local function clearChat()
  SendNUIMessage({ type = 'CLEAR' })
end
RegisterNetEvent('chat:clear', clearChat)
AddEventHandler('chat:clear', clearChat)
exports('clear', clearChat)

-- Pull registered command suggestions from the server on load (so /commands
-- other resources registered show up in autocomplete).
AddEventHandler('onClientResourceStart', function(res)
  if res ~= GetCurrentResourceName() then return end
  Wait(500)
  TriggerServerEvent('chat:init')
end)
