import { APIEmbedField, ChannelType, Client, EmbedBuilder, GuildBan, GuildMember } from 'discord.js';
import { discordConfig } from '../../configs/discord';
import { getDiscordId } from './playerPerms';

let client: Client;

// Set up discord event listeners.
export const register_discord_events = (client: Client) => {
    client.on('guildMemberUpdate', (_, member) => {
        // Check if the old member is cached.
        if (!_.roles.cache.size) _.fetch();
        // Check that it's the correct guild.
        if (member.guild.id !== discordConfig.guildId) return;
        // Check if the roles have changed.
        if (_.roles.cache.size == member.roles.cache.size) return;
        // Structure the data.
        const m = structureMember(member);

        emit('pDiscord:guildMemberUpdate', m);
    });

    // Drop the player if they are banned from the Discord server.
    client.on('guildBanAdd', (ban: GuildBan) => {
        // Get the ID of the banned user.
        const id = ban.user.id;

        // Check if the user is currently in the game server.
        getPlayers().forEach((player) => {
           if(getDiscordId(player) === id) DropPlayer(player, 'You have been banned from our Discord server.');
        });
    });
};

export const getUserData = async (user_id: string)  => {
    try {
        // Get the guild.
        const guild = await client.guilds.fetch(discordConfig.guildId);

        if (!guild) {
            console.log("^7[^6Discord^7] Failed to fetch guild.");
            return null;
        }

        // Get the member.
        const member = await guild.members.fetch(user_id);

        if (!member) {
            console.log("^7[^6Discord^7] ^8Failed to fetch member.^7");
            return null;
        }

        return structureMember(member);
    } catch (err) {
        console.log("^7[^6Discord^7] ^8Member is not found in guild.^7")
        return null;
    }
};

export const sendDiscordMessage = async (channel_id: string, message: string) => {
    try {
        // Get the channel.
        const channel = await client.channels.fetch(channel_id);

        if (!channel) {
            console.log("^7[^6Discord^7] ^8Failed to fetch channel.^7");
            return;
        }

        // Check if the channel is a text channel.
        if (channel.type == ChannelType.GuildText) {
            // Send the message.
            await channel.send(message);
        } else if (channel.type == ChannelType.DM) {
            // Send the DM
            await channel.send(message);
        } else {
            console.log("^7[^6Discord^7] ^8Channel is not a text channel or DM.^7");
            return;
        }
    } catch (err) {
        console.log("^7[^6Discord^7] ^8Failed to send message.^7 Error: " + err);
    }
};

export const sendDiscordEmbed = async (channel_id: string, embed: any) => {
    try {
        // Get the channel.
        const channel = await client.channels.fetch(channel_id);

        if (!channel) {
            console.log("^7[^6Discord^7] ^8Failed to fetch channel.^7");
            return;
        }

        // Check if the channel is a text channel.
        if (channel.type == ChannelType.GuildText) {
            // Send the message.
            await channel.send(embed);
        } else if (channel.type == ChannelType.DM) {
            // Send the DM
            await channel.send(embed);
        } else {
            console.log("^7[^6Discord^7] ^8Channel is not a text channel or DM.^7");
            return;
        }
    } catch (err) {
        console.log("^7[^6Discord^7] ^8Failed to send message.^7 Error: " + err);
    }
};

export const sendWebhookMessage = async (webhook_id: string, webhook_token: string, message: string) => {
    try {
        // Get the webhook.
        const webhook = await client.fetchWebhook(webhook_id, webhook_token);

        if (!webhook) {
            console.log("^7[^6Discord^7] ^8Failed to fetch webhook.^7");
            return;
        }

        // Send the message.
        await webhook.send(message);
    } catch (err) {
        console.log("^7[^6Discord^7] ^8Failed to send message.^7 Error: " + err);
    }
};


export const sendWebhookEmbed = async (webhook_id: string, webhook_token: string, message: any) => {
    try {
        // Get the webhook.
        const webhook = await client.fetchWebhook(webhook_id, webhook_token);

        if (!webhook) {
            console.log("^7[^6Discord^7] ^8Failed to fetch webhook.^7");
            return;
        }

        // Send the message.
        await webhook.send(message);
    } catch (err) {
        console.log("^7[^6Discord^7] ^8Failed to send message.^7 Error: " + err);
    }
};

// Set up FxServer event listeners and exports.
export const register_fxserver_events_exports = (newclient: Client) => {
    client = newclient;

    exports('getUserData', getUserData);
    exports('sendDiscordMessage', sendDiscordMessage);
    exports('sendDiscordEmbed', sendDiscordEmbed);
    exports('sendWebhookMessage', sendWebhookMessage);
    exports('sendWebhookEmbed', sendWebhookEmbed);
};

export interface userStructure {
    id: string,
    username: string,
    nickname: string,
    joinedAt: Date,
    roles: string[],
    avatarURL: string,
}

// Helper functions.
const structureMember = (member: GuildMember) => {
    // Get ID and username.
    const id = member.id;
    // Get Username.
    const username = member.user.username;
    // Get nickname.
    const nickname = member.nickname || username;
    // Get joinedAt.
    const joinedAt = member.joinedAt || new Date();
    // Get roles.
    const roles = member.roles.cache.map(role => role.id);
    // Get avatarURL.
    const avatarURL = member.user.avatarURL() || member.user.defaultAvatarURL;
    // Return the structured data.
    return { id, username, nickname, joinedAt, roles, avatarURL };
}