import { buildAllowList, buildGroupsWithInheritance, AccessGroup, ConfigGroups } from "./builders/entityPerms.builders";

// Player permission stuff
interface PlayerPerms {
    permissionObject: {
        [key: string]: boolean;
    };
    rolesAndCategories: string[];
    rolesIDs: string[];
}

let recivedPlayerPerms: boolean = false;

let playerPerms: string[] = [];

onNet('pDiscord:setPerms', (perms: PlayerPerms) => {
    playerPerms = perms.rolesAndCategories;
    recivedPlayerPerms = true;
});

//#region Vehicle spawning
// Specific to vehicle spawning

// Vehicle allow list for the client
let vehicleGroups: AccessGroup = {};

// Variable to store the previous vehicle we checked
let prevCheckedVehicle: number | null = null;

const checkVehicle = (vehicle: number): void => {
    // Check if we've already checked this vehicle
    if (prevCheckedVehicle === vehicle) return;

    // Get the vehicle model hash
    const model = GetEntityModel(vehicle);

    // Check if the vehicle is in the allow list
    if (!vehicleGroups[model]) {
        // If it's not, we return
        prevCheckedVehicle = vehicle;
        return;
    }

    // Check if the client has the role to spawn the vehicle
    if (vehicleGroups[model].some(role => playerPerms.includes(role))) {
        // If they do, we return
        prevCheckedVehicle = vehicle;
        return;
    }

    // The client doesn't have permission to use the vehicle
    DeleteEntity(vehicle);
    ShowNotification(`You do not have permission to spawn this vehicle.`);
};

//#endregion

//#region Weapon spawning
// Specific to weapons

// Weapon allow list for the client
let weaponGroups: AccessGroup = {};

// Variable to store the previous weapon we checked
let prevCheckedWeapon: number | null = null;

const checkWeapon = (weapon: number, ped: number): void => {
    // If the player isn't holding a weapon, we return
    if (weapon === -1569615261) {
        prevCheckedWeapon = null;
        return;
    }

    // Check if we've already checked this weapon
    if (prevCheckedWeapon === weapon) return;

    // Check if the weapon is in the allow list
    if (!weaponGroups[weapon]) {
        // If it's not, we return
        prevCheckedWeapon = weapon;
        return;
    }

    // Check if the client has the role to use the weapon
    if (weaponGroups[weapon].some(role => playerPerms.includes(role)) ) {
        // If they do, we return
        prevCheckedWeapon = weapon;
        return;
    }

    // The client doesn't have permission to use the weapon
    RemoveWeaponFromPed(ped, weapon);
    ShowNotification(`You do not have permission to use this weapon.`);
}
//#endregion

//#region Permission checking
// Interval for checking vehicles and weapons
setInterval(() => {
    // Check if the player has received their permissions
    if (!recivedPlayerPerms) return;

    // Get the player's ped
    const ped = PlayerPedId();

    // Get the player's current vehicle
    let vehicle = GetVehiclePedIsIn(ped, false);

    // If the player is not currently in a vehicle, check if they're entering one
    if(vehicle === 0) vehicle = GetVehiclePedIsEntering(ped);

    // Check the vehicle
    if(vehicle != 0) checkVehicle(vehicle);

    // Get the player's current weapon
    const weapon = GetSelectedPedWeapon(ped);

    // Check the weapon
    checkWeapon(weapon, ped);
}, 1000);
//#endregion

// Function for player notification
const ShowNotification = (message: string) => {
    SetNotificationTextEntry('STRING');
    AddTextComponentSubstringPlayerName(message);
    DrawNotification(false, false);
}

// Initialize the script

interface Config {
    Inheritances: {
        [key: string]: string[];
    };
    Groups: ConfigGroups;
}

export const init = (vehicleConfig: Config, weaponConfig: Config): void =>  {
    // Build groups with inheritance
    const vehicleInheritances = buildGroupsWithInheritance(vehicleConfig.Groups, vehicleConfig.Inheritances);
    const weaponInheritances = buildGroupsWithInheritance(weaponConfig.Groups, weaponConfig.Inheritances);

    // Build allow lists
    vehicleGroups = buildAllowList(vehicleInheritances);
    weaponGroups = buildAllowList(weaponInheritances);

    // Wait for 10 seconds for permissions to be received
    setTimeout(() => {
        // Request the player's permissions
        if (!recivedPlayerPerms) {
            emitNet('pDiscord:getPerms');

            // Wait 10 more seconds for the permissions to be received
            setTimeout(() => {
                // Either the permissions were recieved or we proceed without them
                recivedPlayerPerms = true;
            }, 10000);
        }
    }, 10000);
}