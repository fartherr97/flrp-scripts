-- ==========================================================================
-- FLRP :: chat/server.lua — standalone chat server
-- ==========================================================================
-- Fires the standard `chatMessage(source, name, message)` event so command
-- handlers and moderation resources keep working. If nothing cancels it, the
-- message is broadcast to everyone as a normal chat line.
-- Also exposes the server-side `chat:addMessage` export used by many scripts.
-- ==========================================================================

RegisterNetEvent('chat:messageSent', function(msg)
  local src = source
  if type(msg) ~= 'string' or msg == '' then return end
  -- Trim to a sane length.
  if #msg > 256 then msg = msg:sub(1, 256) end

  local name = GetPlayerName(src) or ('Player ' .. src)

  -- Standard hook: resources may CancelEvent() to suppress/handle it.
  TriggerEvent('chatMessage', src, name, msg)
  if WasEventCanceled() then return end

  TriggerClientEvent('chat:addMessage', -1, {
    color = { 255, 255, 255 },
    multiline = true,
    args = { name, msg },
  })
end)

-- Server-side export: exports.chat:addMessage(target, { color, args, ... })
-- target -1 = everyone.
exports('addMessage', function(target, data)
  if data == nil and type(target) == 'table' then
    data, target = target, -1
  end
  TriggerClientEvent('chat:addMessage', target or -1, data)
end)

-- When a client boots, replay the command list as suggestions so autocomplete
-- is populated (mirrors the built-in chat behaviour).
RegisterNetEvent('chat:init', function()
  local src = source
  local cmds = GetRegisteredCommands and GetRegisteredCommands() or {}
  for _, c in ipairs(cmds) do
    if c.name and c.name:sub(1, 1) ~= '_' then
      TriggerClientEvent('chat:addSuggestion', src, '/' .. c.name, '')
    end
  end
end)
