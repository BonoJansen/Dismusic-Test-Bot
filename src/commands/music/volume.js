const config = require("../../../config.json");
const { SlashCommandBuilder } = require('discord.js')
const {} = require("dismusic");
module.exports = {
  cmd: [`${__filename.toLowerCase().split('music\\')[1].slice(0,[1].length-4)}`],
  slashcommand : 
    new SlashCommandBuilder()
      .setName(`${__filename.toLowerCase().split('music\\')[1].slice(0,[1].length-4)}`)
      .setDescription(`change the volume to the given volume`)
      .addNumberOption(options => options.setName("volume").setDescription("The value you want the volume to be set to.").setMinValue(1).setMaxValue(100).setRequired(true)),
  run: async (client, interaction, options, cmd) => {
    if(!interaction.member.voice.channel) return interaction.reply({content : "<a:crossmark:1055843467760242738> You need to be in a voicechannel to run this command."});
    const newVolume = options.getNumber('volume');
    if (newVolume < 0 || newVolume > 100) {
      return interaction.reply({content : "<a:crossmark:1055843467760242738> The volume must be a value between 1 and 100"});
    }
    const queue = await client.player.getQueue(interaction.guild);
    if(!queue) return interaction.reply({content : "<a:crossmark:1055843467760242738> There is not music playing in this server."});
    queue.setVolume(newVolume);

    interaction.reply("<a:checkmark:1055843502585565235> Changed the volume to **" + newVolume + "**");
  },
};
