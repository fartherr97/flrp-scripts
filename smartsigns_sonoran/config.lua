config = {
    main = {
        -- Here you are able to define how far the sign will load in from.
        -- If the player has loaded in the sign and goes out of this range the sign will unload on their client.
        loadInDistance = 300.0,

        -- Here you are able to define how close the player must be to the signs keypad in order to edit the text.
        -- 3.0 is the ideal value for "arms reach"
        accessPointDistance = 3.0,

        christmasDecorations = false, -- This enables Christmas decorations
        
        -- Here is the prop for the sign. 
        -- You can change this if you wish but we recommend leaving this unless you are highly experienced.
        signModelName = {
            left = `prop_led_trafficsign_left`,
            right = `prop_led_trafficsign_right`,
        },
        
        -- This is the text that appears when you are changing the message. You could use this to translate to another language.
        instructionalText = "Press [E] to adjust sign",

        resetSignCommand = {
            enabled = true,
            commandName = "resetsmartsigns",
            commandSuggestion = "Reset all smart signs around the map!",
            Permissions = {
                EnablePermissions = false, -- If set to false, all below job checks will be disabled, even if they are enabled in the config.lua
                AcePermissions = {
                    Enabled = false,
                    Permission = "update.sign"
                },
            
                ESX = {
                    Enabled = false,
                    CheckJob = {
                        Enabled = false, -- Enable this to use ESX job check
                        Jobs = {"police"} -- A user can have any of the following jobs, allowing you to add multiple
                    }
                },
                -- We've added vRP integration. All you need to do is enable it below. Then, configure if you wish to check for groups or permissions, or even both
                vRP = {
                    Enabled = false,
                    CheckGroup = {
                        Enabled = false, -- Enable this to use vRP group check
                        Groups = {"police"}, -- A user can have any of the following groups, meaning you can add different jobs
                    },
                    CheckPermission = {
                        Enabled = false, -- Enable this to use vRP permission check
                        Permissions = {"police"} -- A user can have any of the following permissions, allowing you to add multiple
                    },
                },
                -- We've added QBCore integration. All you need to do is enable it below. Then, configure if you wish to check for jobs or permissions, or even both
                QBCore = {
                    Enabled = false,
                    CheckJob = {
                        Enabled = false, -- Enable this to use QBCore job check
                        Jobs = {"police"}, -- A user can have any of the following jobs, meaning you can add different jobs
                    },
                    CheckPermission = {
                        Enabled = false, -- Enable this to use QBCore permission check
                        Permissions = {"police"}, -- A user can have any of the following permissions, allowing you to add multiple
                    },
                },
                -- We've added QBX integration. All you need to do is enable it below. Then, configure if you wish to check for jobs or permissions, or even both
                QBX = {
                    Enabled = false,
                    CheckJob = {
                        Enabled = false, -- Enable this to use QBX job check
                        Jobs = {"police"}, -- A user can have any of the following jobs, meaning you can add different jobs
                    }
                },
            },
        },

        editSignCommand = {
            enabled = true,
            commandName = "editsmartsigns",
            commandSuggestion = "Edit all smart signs around the map!",
            Permissions = {
                EnablePermissions = false, -- If set to false, all below job checks will be disabled, even if they are enabled in the config.lua
                AcePermissions = {
                    Enabled = false,
                    Permission = "update.sign"
                },
            
                ESX = {
                    Enabled = false,
                    CheckJob = {
                        Enabled = false, -- Enable this to use ESX job check
                        Jobs = {"police"} -- A user can have any of the following jobs, allowing you to add multiple
                    }
                },
                -- We've added vRP integration. All you need to do is enable it below. Then, configure if you wish to check for groups or permissions, or even both
                vRP = {
                    Enabled = false,
                    CheckGroup = {
                        Enabled = false, -- Enable this to use vRP group check
                        Groups = {"police"}, -- A user can have any of the following groups, meaning you can add different jobs
                    },
                    CheckPermission = {
                        Enabled = false, -- Enable this to use vRP permission check
                        Permissions = {"police"} -- A user can have any of the following permissions, allowing you to add multiple
                    },
                },
                -- We've added QBCore integration. All you need to do is enable it below. Then, configure if you wish to check for jobs or permissions, or even both
                QBCore = {
                    Enabled = false,
                    CheckJob = {
                        Enabled = false, -- Enable this to use QBCore job check
                        Jobs = {"police"}, -- A user can have any of the following jobs, meaning you can add different jobs
                    },
                    CheckPermission = {
                        Enabled = false, -- Enable this to use QBCore permission check
                        Permissions = {"police"}, -- A user can have any of the following permissions, allowing you to add multiple
                    },
                },
                -- We've added QBX integration. All you need to do is enable it below. Then, configure if you wish to check for jobs or permissions, or even both
                QBX = {
                    Enabled = false,
                    CheckJob = {
                        Enabled = false, -- Enable this to use QBX job check
                        Jobs = {"police"}, -- A user can have any of the following jobs, meaning you can add different jobs
                    }
                },
            },
        },
    
        -- Here you can change which button must be pressed to change the text on the sign
        -- A list of controls can be found on the official FiveM documentation @ https://docs.fivem.net/docs/game-references/controls/
        adjustButton = {0, 103}, -- {control group, control}
        
        -- This will change whether users can use /createsmartsign to automatically add signs into the locations.json file
        -- This will also enable debug printing on both the client and the server. This should be set to false most of the time.
        developerMode = false,

        -- Blips for all signs are automatically enabled on developer mode. This allows you to keep blips while disabling developer mode
        enableBlips = false,
        shortRangeBlips = false,
        
        -- Here you can define a list of words which cannot be placed on signs.
        -- These are automatically removed and replaced with blank text
        bannedWords = {
            "fuck",
            "shit",
        },

        -- This setting will toggle automatic centering of text 
        -- Please note that centering may not be perfect due to the even amount of characters accepted by the sign
        centerText = true,

        -- These permissions are to edit signs at the bottom of them
        Permissions = {
            EnablePermissions = false, -- If set to false, all below job checks will be disabled, even if they are enabled in the config.lua
            AcePermissions = {
                Enabled = false,
                Permission = "update.sign"
            },
        
            ESX = {
                Enabled = false,
                CheckJob = {
                    Enabled = false, -- Enable this to use ESX job check
                    Jobs = {"police"} -- A user can have any of the following jobs, allowing you to add multiple
                }
            },
            -- We've added vRP integration. All you need to do is enable it below. Then, configure if you wish to check for groups or permissions, or even both
            vRP = {
                Enabled = false,
                CheckGroup = {
                    Enabled = false, -- Enable this to use vRP group check
                    Groups = {"police"}, -- A user can have any of the following groups, meaning you can add different jobs
                },
                CheckPermission = {
                    Enabled = false, -- Enable this to use vRP permission check
                    Permissions = {"police"} -- A user can have any of the following permissions, allowing you to add multiple
                },
            },
            -- We've added QBCore integration. All you need to do is enable it below. Then, configure if you wish to check for jobs or permissions, or even both
            QBCore = {
                Enabled = false,
                CheckJob = {
                    Enabled = false, -- Enable this to use QBCore job check
                    Jobs = {"police"}, -- A user can have any of the following jobs, meaning you can add different jobs
                },
                CheckPermission = {
                    Enabled = false, -- Enable this to use QBCore permission check
                    Permissions = {"police"}, -- A user can have any of the following permissions, allowing you to add multiple
                },
            },
            -- We've added QBX integration. All you need to do is enable it below. Then, configure if you wish to check for jobs or permissions, or even both
            QBX = {
                Enabled = false,
                CheckJob = {
                    Enabled = false, -- Enable this to use QBX job check
                    Jobs = {"police"}, -- A user can have any of the following jobs, meaning you can add different jobs
                }
            },
        },
        
        -- Here is the animations which are played when entering text for a sign.
        -- It is unlikely that this will need to be changed but you can disable the animation if you wish to do so.
        -- Find the animation list here: https://alexguirre.github.io/animations-list/
        animation = {
            enabled = true,
            dict = "anim@heists@prison_heiststation@cop_reactions", -- This is the animation dictionary (these show in bold on the animation list)
            name = "cop_b_idle", -- This is the animation name (these show below bold dictionaries on the animation list)
        },

        -- This allows you to enable Discord logging for the signs
        -- You must add your webhook in sv_smartsigns.lua
        logging = {
            enabled = false,
            displayName = "Smart Signs",
            colour = 31487,
            title = "**New Sign Log**",
            icon = "https://i.imgur.com/o7oAPb8.png",
            footerIcon = "https://i.imgur.com/n3n7JNW.png",
            dateFormat = "%d-%m-%Y %H:%M:%S", -- Day-Month-Year Hour-Minute-Second

            -- This section will work regardless of logging being enabled 
            -- Make sure to set this to false in order to disable all logging
            bannedWordLogs = {
                enabled = true, 
                colour = 16711680,
            }
        },

        soundEffect = {
            enabled = true,
            name = "CONFIRM_BEEP",
            dict = "HUD_MINI_GAME_SOUNDSET",
        },
        
        -- This allows you to move the position of every sign to a certain offSet, such as 1m down, if you feel they are all too high for example
        signOffset = {0.0, 0.0, 0.0}, -- x, y, z

        christmasModel = {
            left = `bv_trafficsign_santa_left`,
            right = `bv_trafficsign_santa_right`,
        },
    },
    
    -- You can add your own letters below
    -- This allows you to retexture them into your own language
    letterModels = {
        ["a"] = `prop_font_a`,
        ["b"] = `prop_font_b`,
        ["c"] = `prop_font_c`,
        ["d"] = `prop_font_d`,
        ["e"] = `prop_font_e`,
        ["f"] = `prop_font_f`,
        ["g"] = `prop_font_g`,
        ["h"] = `prop_font_h`,
        ["i"] = `prop_font_i`,
        ["j"] = `prop_font_j`,
        ["k"] = `prop_font_k`,
        ["l"] = `prop_font_l`,
        ["m"] = `prop_font_m`,
        ["n"] = `prop_font_n`,
        ["o"] = `prop_font_o`,
        ["p"] = `prop_font_p`,
        ["q"] = `prop_font_q`,
        ["r"] = `prop_font_r`,
        ["s"] = `prop_font_s`,
        ["t"] = `prop_font_t`,
        ["u"] = `prop_font_u`,
        ["v"] = `prop_font_v`,
        ["w"] = `prop_font_w`,
        ["x"] = `prop_font_x`,
        ["y"] = `prop_font_y`,
        ["z"] = `prop_font_z`,
        ["0"] = `prop_font_0`,
        ["1"] = `prop_font_1`,
        ["2"] = `prop_font_2`,
        ["3"] = `prop_font_3`,
        ["4"] = `prop_font_4`,
        ["5"] = `prop_font_5`,
        ["6"] = `prop_font_6`,
        ["7"] = `prop_font_7`,
        ["8"] = `prop_font_8`,
        ["9"] = `prop_font_9`,
        ["&"] = `prop_font_and`,
        ["-"] = `prop_font_dash`,
        ["$"] = `prop_font_dollar`,
        ["="] = `prop_font_equals`,
        ["!"] = `prop_font_exclamation`,
        ["."] = `prop_font_fullstop`,
        ["%"] = `prop_font_percentage`,
        ["+"] = `prop_font_plus`,
        ["£"] = `prop_font_pounds`,
        ["?"] = `prop_font_question`,
    },

    icons = {
        'bv_smart_alcohol',
        'bv_smart_cyclists',
        'bv_smart_drivecare',
        'bv_smart_flood',
        'bv_smart_ice',
        'bv_smart_laneclosed',
        'bv_smart_lowbridge',
        'bv_smart_moveover',
        'bv_smart_no_u_turn',
        'bv_smart_nophone',
        'bv_smart_nowaiting',
        'bv_smart_pedestrian',
        'bv_smart_roadwork',
        'bv_smart_slippery',
        'bv_smart_speedcamera',
        'bv_smart_stop',
        'bv_smart_tiredness',
        'bv_smart_trafficahead',
    },

    -- Here are the offsets for the placement of the letter objects
    -- We highly recommend not editing this section unless you know what you are doing
    -- Configuration of this section requires absolute precision
    letterPositions = {
        rotation = {0.0, 0.0, 0.0},
        mainLevel = {
            ["left"] = {
                {0.57, -0.7, 9.1},
                {1.02, -0.7, 9.1},
                {1.47, -0.7, 9.1},
                {1.92, -0.7, 9.1},
                {2.37, -0.7, 9.1},
                {2.82, -0.7, 9.1},
                {3.27, -0.7, 9.1},
                {3.72, -0.7, 9.1},
                {4.17, -0.7, 9.1},
                {4.62, -0.7, 9.1},
                {5.07, -0.7, 9.1},
                {5.52, -0.7, 9.1},
                {5.97, -0.7, 9.1},
                {6.42, -0.7, 9.1},
                {6.87, -0.7, 9.1},
            },
            ["right"] = {
                {-7.07, -0.7, 9.1},
                {-6.62, -0.7, 9.1},
                {-6.17, -0.7, 9.1},
                {-5.72, -0.7, 9.1},
                {-5.27, -0.7, 9.1},
                {-4.82, -0.7, 9.1},
                {-4.37, -0.7, 9.1},
                {-3.92, -0.7, 9.1},
                {-3.47, -0.7, 9.1},
                {-3.02, -0.7, 9.1},
                {-2.57, -0.7, 9.1},
                {-2.12, -0.7, 9.1},
                {-1.67, -0.7, 9.1},
                {-1.22, -0.7, 9.1},
                {-0.77, -0.7, 9.1},
            }
        },
        levelOffset = 0.6,
        numberOfLines = 3,
    },
}