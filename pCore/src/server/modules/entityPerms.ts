import { Groups, VehiclesBlockedForAI } from '../../configs/vehiclePerms';
import { getPlayerRolesAndCategories, getDiscordId } from './playerPerms';
import { sendWebhookEmbed } from './events';
import { EmbedBuilder, WebhookMessageCreateOptions, AttachmentBuilder } from 'discord.js';
import { entityPermsConfig } from '../../configs/entityPerms';

let bannedVehiclesArr: string[] = [];

// Get the vehicles only for staff, and add them to the banned vehicles list
bannedVehiclesArr = Groups.staff.concat(Groups['group.fullaccess'], Groups.headadmin);

// Go through the rest of the categories, and remove if from the staff list if it's there
// This is to prevent banning vehicles *if* they are restricted to staff AND another group
for (const x in Groups) {
    if (x !== 'staff' && x !== 'group.fullaccess' && x !== 'headadmin') {
        // @ts-ignore
        bannedVehiclesArr = bannedVehiclesArr.filter((item) => Groups[x].includes(item) === false);
    }
}

let bannedVehicles = new Map<number, string>();
let aiList = new Map<number, string>();
// Add the vehicles to the map
for (const x in bannedVehiclesArr) {
    bannedVehicles.set(GetHashKey(bannedVehiclesArr[x]), bannedVehiclesArr[x]);
}
for (const x in VehiclesBlockedForAI) {
    aiList.set(GetHashKey(VehiclesBlockedForAI[x]), VehiclesBlockedForAI[x]);
}

export const initEntityPerms = () => {
    on('entityCreating', async (entityHandle: number) => {
        // First we get some info
        const firstOwner = NetworkGetEntityOwner(entityHandle);
        const entityType = GetEntityType(entityHandle);
        const entityModel = GetEntityModel(entityHandle);

        switch (entityType) {
            case 1:
                // The entity is a ped or player
                // For now we do nothing
                break;
            case 2:
                // 2 is an automobile, bike, boat, helicopter, plane, submarine, trailer, or train
                // Check if the vehicle is in the ai list
                if (aiList.has(entityModel)) {
                    // If the vehicle is in the list, delete it
                    CancelEvent();
                    return;
                }

                // Check if the vehicle is in the banned vehicles list
                if (bannedVehicles.has(entityModel)) {
                    // Do a permission check
                    await getPlayerRolesAndCategories(firstOwner.toString()).then((perms) => {
                        if ((perms.includes('group.fullaccess') || perms.includes('group.headadmin') || perms.includes('group.staff'))) {
                            return;
                        } else {
                            CancelEvent();
                            // If the player doesn't have the perms, delete the vehicle
                            screenshotAndSend(firstOwner.toString(), entityModel);
                        }
                    });
                }
                break;
            case 3:
                // 3 is an object, door, or pickup
                // For now we do nothing
                break;
        }
    });
}

const screenshotAndSend = async (player: string, entityModel: number) => {
    // Get the player's name
    const playerName = GetPlayerName(player);
    // Get the player's identifiers
    // @ts-ignore
    const playerIdentifiers = getIdentifiers(player);

    // Get the player's discord id
    let discordId = getDiscordId(player);
    
    // Get the vehicle name
    const modelName = bannedVehicles.get(entityModel);

    // Get screenshot from the player
    await exports['screenshot-basic'].requestClientScreenshot(player, {}, (err: boolean | string, data: string) => {
        if (err) {
            console.log(err)
        }

        const extension = data.substring(data.indexOf('/') + 1, data.indexOf(';'));

        const imageStream = Buffer.from(data.split("base64,")[1],'base64');

        // Create a new embed
        const embed = new EmbedBuilder()
            .setTitle('A player tried to spawn a banned vehicle!')
            .setDescription(`**Player**: ${player} | ${playerName} (<@${discordId}>)\n**Model**: ${modelName} (Hash: ${entityModel})`)
            .addFields([
                { name: 'Player Identifiers', value: playerIdentifiers }
            ])
            .setColor(5158332)
            .setFooter({text: 'pCore © Petrikov'})
            .setImage('attachment://' + `screenshot.${extension}`)

        // Build new attachment
        const attachment = new AttachmentBuilder(imageStream, { name: `screenshot.${extension}` })

        // Create new message
        const message: WebhookMessageCreateOptions = {
            embeds: [embed],
            files: [attachment]
        }
        
        const webhook = entityPermsConfig.spawnLogsWebhook;

        try {
            // Send the embed
            sendWebhookEmbed(webhook.id, webhook.token, message);
        } catch (error) {
            console.log(error);
        }       
    });

    
}

//simple function to grab all of a user's identifiers
const getIdentifiers = (src: string) => {
    let x;
    for(let i = 0; i < GetNumPlayerIdentifiers(src) - 1; i++) {
      if(i === 0) {
        x = GetPlayerIdentifier(src, i);
      } else {
        x = x + `\n${GetPlayerIdentifier(src, i)}`
      }
    }
    return x === undefined ? '' : x;
  }