fx_version 'cerulean'
name 'pCore'
description 'Monolithic core for in-house systems'
author 'VikingTheDev <support@vikingthe.dev>'
version '0.0.1'
game 'gta5'
lua54 'yes'

server_script 'dist/server/**/*.js'
client_script 'dist/client/**/*.js'

escrow_ignore {
    'fxmanifest.lua'
}
dependency '/assetpacks'