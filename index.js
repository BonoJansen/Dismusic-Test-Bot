const Discord = require("discord.js");
const { GatewayIntentBits } = require("discord.js");
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});
const config = require("./config.json");
const { eventLoader, commandLoader } = require("./src/functions/loaders");
const { Player } = require("dismusic");
client.commands = new Discord.Collection();
client.player = new Player(client);
console.log("Spotify data is no longer needed, you can ignore the -> [Dismusic Warning]")

eventLoader(client);
commandLoader(client);

client.login(config.token);
