fx_version 'cerulean'
games {'gta5'}
author 'Sonoran Software'
version '1.0.7'
config_version '1.0'
real_name 'Sonoran Radar Display'
lua54 'yes'

client_scripts {'client/*.lua'}

server_scripts {'server/*.lua', 'server/util/unzip.js'}

shared_script {'config/*.lua', 'shared/*.lua'}

files {
    'html/**/*'
}

file 'html/main.html'
file 'html/main.js'
file 'html/style.css'
files {'stream/*.ytyp'}

data_file 'DLC_ITYP_REQUEST' 'stream/*.ytyp'

escrow_ignore {'config/config.CHANGEME.lua', 'config/radars.CHANGEME.json'}

dependency '/assetpacks'