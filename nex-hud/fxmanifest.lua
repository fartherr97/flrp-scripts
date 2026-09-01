fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Nexeum Studios'
description 'nex-hud'
version '1.2.5'

shared_script 'config/shared_config.lua'

server_scripts {
    'functions/sv_functions.lua',
    'server.lua',
    'config/server_config.lua',
    'functions/sv_notifications.lua',
    'custom_elements.lua',
}

client_scripts {
    '@PolyZone/client.lua',
    'client.lua',
    'functions/cl_functions.lua',
    'functions/cl_microphone.lua',
}

files {
    'ui/index.html',
    'ui/styles.css',
    'ui/script.js',
    'ui/assets/PFDinDisplayPro-Bold.ttf',
    'assets/postals.json',
    'ui/assets/server_icon.png'
}

server_exports {
    'updateJobData',
    'updateHeadtags',
    'getAop',
    'getPeacetime',
    'getPriority',
}

escrow_ignore {
    'config/server_config.lua',
    'config/shared_config.lua',
    'functions/cl_microphone.lua',
    'functions/sv_notifications.lua',
    'custom_elements.lua',
}

ui_page('ui/index.html')
dependency '/assetpacks'