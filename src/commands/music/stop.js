const config = require("../../../config.json");
const { SlashCommandBuilder } = require('discord.js')
const {} = require("dismusic");
module.exports = {
  cmd: [`${__filename.toLowerCase().split('music\\')[1].slice(0,[1].length-4)}`],
  slashcommand : 
    new SlashCommandBuilder()
      .setName(`${__filename.toLowerCase().split('music\\')[1].slice(0,[1].length-4)}`)
      .setDescription(`stop the music entirely`),
  run: async (client, interaction, options, cmd) => {
    if(!interaction.member.voice.channel) return interaction.reply({content : "<a:crossmark:1055843467760242738> You need to be in a voicechannel to run this command."});
    const queue = await client.player.getQueue(interaction.guild);
    if(!queue) return interaction.reply({content : "<a:crossmark:1055843467760242738> There is not music playing in this server."});
    await queue.kill();
    interaction.reply("<a:checkmark:1055843502585565235> Stopped the music");
  },
};
