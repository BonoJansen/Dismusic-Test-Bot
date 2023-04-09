const config = require("../../../config.json");
const { SlashCommandBuilder } = require('discord.js')
const {} = require("dismusic");
module.exports = {
  cmd: [`${__filename.toLowerCase().split('music\\')[1].slice(0,[1].length-4)}`],
  slashcommand : 
    new SlashCommandBuilder()
      .setName(`${__filename.toLowerCase().split('music\\')[1].slice(0,[1].length-4)}`)
      .setDescription(`see what track is playingplay a song by providing the url to the song (lists also works)`)
      .addStringOption(options => options.setName("url").setDescription("The url of the song you want to play.").setRequired(true)),
  run: async (client, interaction, options, cmd) => {
    if(!interaction.member.voice.channel) return interaction.reply({content : "<a:crossmark:1055843467760242738> You need to be in a voicechannel to run this command."});

    let res
    try {
      res = await client.player.search(options.getString('url'));
    } catch (e) {
      return interaction.reply("<a:crossmark:1055843467760242738> Someting went wrong");
    }
    if(!res) return interaction.reply("<a:crossmark:1055843467760242738> Someting went wrong");
    res[0].requester = interaction.member.nickname || interaction.member.user.username
    const existsQueue = await client.player.existsQueue(interaction.guild);
    if (existsQueue) {
      const queue = await client.player.getQueue(interaction.guild);
      await interaction.reply("<a:loading:1055843500966555698> Adding track(s)");
      queue.addTrack(res[0]);
      interaction.editReply("<a:loading:1055843500966555698> Added track(s)!")
    } else {
      const queue = await client.player.createQueue(interaction.guild, {
        // metadata will stay with the queue until it is destroyed
        metadata: {
          channel: interaction.channel,
        },
      });
      
      await queue.connectTo(interaction.member.voice.channel);
      queue.play(res[0]);
      interaction.reply("<a:checkmark:1055843502585565235> Playing track: **" + res[0].name + "**");
    }
  },
};
