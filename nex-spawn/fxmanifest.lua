fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Nexeum Studios'
description 'nex-spawnselect'
version '1.1.0'

server_scripts {
    'server.lua'
}

client_scripts {
    'client.lua',
    'functions/cl_functions.lua'
}

shared_script 'config.lua'

files {
    'ui/index.html',
    'ui/styles.css',
    'ui/script.js',
    'ui/assets/***'
}

escrow_ignore {
    'config.lua'
}

ui_page('ui/index.html')
dependency '/assetpacks'