import { permsConfig } from '../../configs/playerPerms';
import { userStructure} from './events';
import { buildPlayerPermissionObject, buildPlayerRolesAndCategories } from './builders/playerPerms.builders';
import { playerConnecting } from './queue';

interface map_structure {
    permissionObject: player_permission_object;
    rolesAndCategories: string[];
    rolesIDs: string[];
}

export interface player_permission_object {
    [key: string]: boolean;
}

export interface role_config {
    [key: string]: {
        [key: string]: string;
    };
}

// Set up player permission map
let player_perms = new Map<string, map_structure>();

// Gets roles from discord, builds the player permission object, and sets the ace permissions.
const getPerms = async (src: string): Promise<map_structure> => {
    try {
            // Get the user ID.
            const userId = getDiscordId(src);
            // If the user ID is null, return no perms.
            if(!userId) {
                console.log(`^7[^6Perms^7] ${GetPlayerName(src)}^8's Discord ID could not be found. Returning no perms.^7`);
                const perms = {
                    permissionObject: buildPlayerPermissionObject([], permsConfig),
                    rolesAndCategories: [],
                    rolesIDs: [],
                };
                player_perms.set(src, perms);
                return perms;
            }

            // Get the user data.
            const userData = await exports.pCore.getUserData(userId);

            // If we got the user data, build the perms.
            if(userData) {
                console.log(`^7[^6Perms^7] ${GetPlayerName(src)}^7's Discord roles found. Building perms.`);
                const perms = {
                    permissionObject: buildPlayerPermissionObject(userData.roles, permsConfig),
                    rolesAndCategories: buildPlayerRolesAndCategories(userData.roles, permsConfig),
                    rolesIDs: userData.roles,
                };
                // Set the perms in the map.
                player_perms.set(src, perms);
                // Set the ace perms.
                addAcePerms(userId, perms.permissionObject, src);
                // Return the perms.
                return perms;
            }
    } catch (err) {
        console.error(`^7[^6Perms^7] Error getting perms for ${GetPlayerName(src)}^7: ${err}`);
    }

    // We did not get the userdata. Return no perms.
    console.log(`^7[^6Perms^7] ${GetPlayerName(src)}^8's Discord roles could not be found. Returning no perms.^7`);

    const perms = {
        permissionObject: buildPlayerPermissionObject([], permsConfig),
        rolesAndCategories: [],
        rolesIDs: [],
    }
    player_perms.set(src, perms);
    return perms;
}

// If the resource is started after players have joined, get their perms.
on('pDiscord:ready', async () => {
    // Get all players.
    const players = getPlayers();
    if(players.length > 0) console.log(`^7[^6Perms^7] ${players.length} players found. Getting perms.`);
    else console.log(`^7[^6Perms^7] No players found. NOT GETTING ANY PERMS @STEVENS!!!`)
    // Loop through all players.
    for(const player of players) {
        // Get the player's perms.
        const perms = await getPerms(player);
        // Emit the perms to the client.
        emitNet('pDiscord:setPerms', player, perms);
    }
});

// Register the perms command. Which is used to update the player's permissions. (Mostly for testing purposes, i.e. if resource is started after player has joined)
RegisterCommand('perms', async (source: string) => {
    // Get the users perms. Also emits the perms to any client listeners.
    console.log(`^7[^6Perms^7] ${GetPlayerName(source)}^7 ran /perms. Getting perms.`);
    const perms = await getPerms(source);
    emitNet('pDiscord:setPerms', source, perms);
}, false);

// Set perms when a player join the server
on('playerConnecting', (name: string, setKickReason: (reason: string) => void, deferrals: { defer: any, done: any, handover: any, presentCard: any, update: any}) => {
    const src = source.toString();
    deferrals.defer();
    console.log(`^7[^6Perms^7] ${name}^7 is joining. Getting perms.`);
    const userId = getDiscordId(src);
    if(userId == null) {
        console.log(`^7[^6Perms^7] ${name}^8 does not have a discord ID. Closing connection.^7`);
        deferrals.done('You must have a Discord account linked to join this server.');
        return;
    }
    getPerms(src).then(perms => {
        // Check if the player has the staff role.
        if(!checkName(name, perms.permissionObject['group.staff']) && !checkName(name, perms.permissionObject['group.fullaccess']))
        {
            console.log(`^7[^6Perms^7] ${name}^8's name contains forbidden chars. Closing connection.^7`);
            deferrals.done('You must have a valid name to join this server. Your name can only contain the following characters: letters (a-z, A-Z), numbers (0-9), pipes (|), periods (.), and spaces');
            console.log(`^7[^6Perms^7] ${GetPlayerName(src)}^8 dropped. Removing perms.^7`);
            if(userId) removeAcePerms(userId, player_perms.get(src)?.permissionObject || {});
            player_perms.delete(src);
            return;
        }

        playerConnecting(deferrals, src, userId, name);
    });
});

// The ID from playerConnecting is a tempID. Whent the player joins we need to associate the perms with the real ID.
on('playerJoining', async (oldId: string, _: string) => {
    // Get the new ID.
    const newId = source.toString();
    // Get the perms.
    let perms = player_perms.get(oldId)
    // Set the perms with the new ID.
    if(!perms) perms = await getPerms(newId);
    player_perms.set(newId, perms);
    
    // Delete the old ID.
    player_perms.delete(oldId);

    console.log(`^7[^6Perms^7] Associating ${GetPlayerName(newId)}^7's perms with their real ID (Temp ID: ${oldId}, Real ID: ${newId})`);
});

// When the player spawns, emit their perms.
onNet('pDiscord:playerSpawned', (_: string) => {
    const src = source.toString();
    let perms = player_perms.get(src);
    emitNet('pDiscord:setPerms', src, perms);
});

// If this event is called, retrive the player's perms from the map.
onNet('pDiscord:getPerms', (_: string) => {
    let perms = player_perms.get(source.toString());
    emitNet('pDiscord:setPerms', source.toString(), perms);
});

// When a player joins, get their perms.
on('pDiscord:guildMemberUpdate', (member: userStructure) => {
    // Loop through all players.
    player_perms.forEach(async (_, source) => {
        // Get the user ID.
        const userId = getDiscordId(source);
        // If the user ID matches the member ID, update the perms.
        if(userId == member.id) {
            console.log(`^7[^6Perms^7] ${GetPlayerName(source)}^7's Discord roles changed. Updating perms.`);
            const perms = await getPerms(source);
            emitNet('pDiscord:setPerms', source, perms);
        }
    });
});

// When a player drops, remove their ace perms and remove their data from the maps.
on('playerDropped', () => {
    const src = source.toString();
    const userId = getDiscordId(src);
    console.log(`^7[^6Perms^7] ${GetPlayerName(src)}^7 dropped. Removing perms.`);
    if(userId) removeAcePerms(userId, player_perms.get(src)?.permissionObject || {});
    player_perms.delete(src);
});

// Export for use in other modules.
exports('getPlayerPerms', async (source: string) => {
    return getPlayerPerms(source);
});

export const getPlayerPerms = async (source: string) => {
    if(!player_perms.has(source)) {
        const perms = getPerms(source);
        emitNet('pDiscord:setPerms', source, perms);
    }
    return player_perms.get(source)?.permissionObject;
}

// Export for use in other modules.
exports('getPlayerRolesAndCategories', async (source: string) => {
    return getPlayerRolesAndCategories(source);
});

export const getPlayerRolesAndCategories = async (source: string) => {
    if(!player_perms.has(source)) {
        const perms = await getPerms(source);
        emitNet('pDiscord:setPerms', source, perms);
    }
    return player_perms.get(source)?.rolesAndCategories || [];
}

// Export for use in other modules.
exports('getPlayerDiscordRoles', async (source: string) => {
    return getPlayerDiscordRoles(source);
});

export const getPlayerDiscordRoles = async (source: string) => {
    if(!player_perms.has(source)) {
        const perms = await getPerms(source);
        emitNet('pDiscord:setPerms', source, perms);
    }
    return player_perms.get(source)?.rolesIDs;
}

// Export for use in other modules.
exports('getPlayerPerms', async (source: string) => {
    if(!player_perms.has(source)) {
        const perms = getPerms(source);
        emitNet('pDiscord:setPerms', source, perms);
    }
    return player_perms.get(source)?.permissionObject;
});

// Export for use in other modules.
exports('getPlayerRolesAndCategories', async (source: string) => {
    if(!player_perms.has(source)) {
        const perms = await getPerms(source);
        emitNet('pDiscord:setPerms', source, perms);
    }
    return player_perms.get(source)?.rolesAndCategories || [];
});

// Export for use in other modules.
exports('getPlayerDiscordRoles', async (source: string) => {
    if(!player_perms.has(source)) {
        const perms = await getPerms(source);
        emitNet('pDiscord:setPerms', source, perms);
    }
    return player_perms.get(source)?.rolesIDs;
});

export const getDiscordId = (source: string): string | null => {
    // @ts-ignore
    const id = GetPlayerIdentifierByType(source, 'discord')
    return id ? id.replace('discord:', ''): null;
}

const command_add = "add_principal identifier.discord:";
const command_remove = "remove_principal identifier.discord:";

const addAcePerms = (userID: string, perms: player_permission_object, src: string) => {
    // Clear all ace permissions.
    for(const group of Object.keys(permsConfig)) {
        ExecuteCommand(`${command_remove}${userID} ${group}`);
    }

    // Get the permission_object entries
    for(const [group, value] of Object.entries(perms)) {
        // Check if the value is true.
        if(value) {
            // Add the ace permission.
            ExecuteCommand(`${command_add}${userID} ${group}`);
            console.log(`^7[^6Perms^7] Added ${group} to ${GetPlayerName(src)}^7`)
        }
    }
    // If vMenu is running, update the player's permissions.
    if(GetResourceState('vMenu') == 'started') {
        if(IsDuplicityVersion()) emit('vMenu:RequestPermissions', parseInt(src));
        else emitNet('vMenu:RequestPermissions', parseInt(src));
        console.log(`^7[^6Perms^7] vMenu perms synced ${GetPlayerName(src)}^7.`);
    }
}

const removeAcePerms = (userID: string, perms: player_permission_object) => {
    // Get the permission entries
    for(const [group, value] of Object.entries(perms)) {
        // Check if the value is true.
        if(value) {
            // Add the ace permission.
            ExecuteCommand(`${command_remove}${userID} ${group}`);
        }
    }
}

const checkName = (name: string, staff: boolean): boolean => {
    // Only allow letters, numbers, spaces and pipes.
    const regex = /^[a-zA-Z0-9\|\.\_\/\-\/(\/) \/[ \]\+ ]+$/;
    const regex_staff = /^[a-zA-Z0-9\|\.\_\/\-\/(\/) \/[ \]\^\~ ]+$/;
    if(staff) return regex_staff.test(name);
    else return regex.test(name);
}

// Empty function. When the init func is imported and ran, it will run all code in the file.
export const init = () => {}