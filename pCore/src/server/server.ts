import { Client, GatewayIntentBits } from 'discord.js';
import { discordConfig } from '../configs/discord';
import { register_discord_events, register_fxserver_events_exports } from './modules/events';
import { init } from './modules/playerPerms';
import { initEntityPerms } from './modules/entityPerms';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildModeration],
});

register_discord_events(client);
register_fxserver_events_exports(client);

client.on('ready', () => {
  console.log('^7[^6Discord^7] Bot is logged in as', client.user?.tag);
  emit('pDiscord:ready');
});

init();
initEntityPerms();

client.login(discordConfig.botToken);