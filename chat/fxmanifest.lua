fx_version 'cerulean'
game 'gta5'

author 'FLRP'
description 'FLRP standalone chat — drop-in replacement for the missing built-in chat resource. Implements chatMessage / chat:addMessage / chat:addSuggestion.'
version '1.0.0'
lua54 'yes'

ui_page 'html/index.html'

files {
  'html/index.html',
  'html/style.css',
  'html/script.js',
}

client_script 'client.lua'
server_script 'server.lua'
