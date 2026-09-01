fx_version 'cerulean'
game 'gta5'
author 'discord.gg/codesign'
description 'Codesign Door Lock'
version '2.2.0'
lua54 'yes'

dependency 'cd_bridge'

shared_scripts {
    '@cd_bridge/shared/config.lua',
    '@cd_bridge/shared/auto_detect.lua',
    'configs/locales.lua',
    'configs/config.lua'
}

client_scripts {
    '@cd_bridge/client/init.lua',
    'integrations/client/*.lua',
    'client/*.lua'
}

server_scripts {
    '@cd_bridge/server/init.lua',
    'configs/server_webhooks.lua',
    'integrations/server/*.lua',
    'server/*.lua',
    'server/*.js'
}

ui_page {
    'html/index.html',
}

files {
    'configs/locales_ui.js',
    'configs/config_ui.js',
    'html/index.html',
    'html/assets/*.css',
    'html/assets/*.js',
    'html/fonts/*.woff2',
    'html/css/vendor/*.css',
    'sounds/*.ogg',
    'html/images/*.png',
}

export 'GetDoorID'
export 'GetAllDoors'
export 'GetDoorState_closest'
export 'GetDoorState_name'
export 'GetDoorState_uniqueid'
export 'GetDoorDataFull_closest'
export 'GetDoorDataFull_name'
export 'GetDoorDataFull_uniqueid'

server_export 'GetDoorID'
server_export 'GetAllDoors'
server_export 'GetDoorState_closest'
server_export 'GetDoorState_name'
server_export 'GetDoorState_uniqueid'
server_export 'GetDoorDataFull_closest'
server_export 'GetDoorDataFull_name'
server_export 'GetDoorDataFull_uniqueid'

dependencies {
    '/server:4960' -- ⚠️PLEASE READ⚠️; Requires at least server build 4960.
}

dependencies {
  '/server:7290',
  '/onesync',
}

escrow_ignore {
    'client/chat_commands.lua',
    'client/door_perms.lua',
    'client/error_handling.lua',
    'client/functions.lua',
    'client/lockpicking.lua',
    'configs/*.lua',
    'integrations/**/*.lua',
    'server/auto_insert_sql.lua',
    'server/callbacks.lua',
    'server/door_perms.lua',
    'server/error_handling.lua',
    'server/functions.lua',
    'server/lockpick.lua',
    'server/read_files.js'
}
dependency '/assetpacks'