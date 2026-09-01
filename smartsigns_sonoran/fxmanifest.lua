fx_version 'bodacious'
game 'gta5'

author 'London Studios'
description 'Setup and control dynamic traffic signs'
version '1.0.0'
lua54 'yes'

client_scripts {
    'cl_utils.lua',
    'cl_smartsigns.lua',
    'cl_setuputil.lua',
    'ui.lua',
    'text_ui.lua',
}

ui_page 'index.html'

shared_script 'config.lua'

server_scripts {
    'sv_smartsigns.lua',
    'sonoran.lua',
    'sv_discordConfig.lua',
}

files {
    'stream/data/*.ytyp',
    'locations.json',
    'index.html',
}

escrow_ignore {
    'stream/*',
    'stream/data/*',
    'config.lua',
    'cl_utils.lua',
    'locations.json',
    'sv_discordConfig_RENAMEME.lua',
}

data_file 'DLC_ITYP_REQUEST' 'stream/data/*.ytyp'

dependency '/assetpacks'