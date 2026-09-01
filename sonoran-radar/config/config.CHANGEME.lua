Config = {
    debug_mode = false,
    configuration_version = 1.0,
    auto_update = true,
    cars = {
        addonCars = {
            ['19tahoec3'] = {
                active = false,
                name = '19tahoec3',
                redneckCar = true
            }
        },
        blacklistedCars = {
            "FIRETRUK",
            "LGUARD",
            "PBUS",
            "POLMAV",
            "POLICET",
            "PRANGER",
            "PREDATOR",
            "RIOT",
            "RIOT2",
            "AMBULAN"
        },
        bones = {'chassis'}
    },
    update_speeds = {
        patrol_speed = 100, -- Time in MS between each update for the patrol speed
        target_speed = 250, -- Time in MS between each update for the target speed
        lock_speed = 250 -- Time in MS between each update for the lock speed
    },
    stalker = {
        default_ant = 'front' -- The default antenna to pull data from | Options: 'front' or 'back'
    },
    commands = {
        addNewRadar = 'addnewradar', -- The command to add a new radar
        restricted = false, -- restrict this command - you want this
        allowedToPlace = 'radar.admin' -- Ace group allowed to place the radar
    },
    lang = {
        addNewRadarHelp = 'Open the menu to begin spawning a new radar model',
        notInEmergency = 'You must be in a Emergency vehicle to use this!',
        vehNotCompatible = 'This vehicle is not compatible with the radar placement system!',
        vehAlrRadar = 'This vehicle already has a valid radar!'
    }
}
