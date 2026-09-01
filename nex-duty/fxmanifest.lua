fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Nexeum Studios'
description 'nex-duty'
version '1.3.5'

dependency 'yarn'

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'config/server_config.lua',
    'functions/sv_functions.lua',
    'server/websocket.js',
    'server/server.lua',
    'server/sv_blips.lua',
    'server/endpoints.lua',
    'functions/notifications.lua',
}

shared_script 'config/shared_config.lua'

client_scripts {
    'client/client.lua',
    'client/cl_blips.lua',
    'functions/cl_functions.lua'
}

files {
    'ui/index.html',
    'ui/styles.css',
    'ui/script.js',
    'ui/assets/*.png',
    'assets/postals.json'
}

escrow_ignore {
    'config/shared_config.lua',
    'config/server_config.lua',
    'functions/notifications.lua'
}

ui_page('ui/index.html')
dependency '/assetpacks'