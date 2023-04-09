const config = require("../../../config.json");
const { EmbedBuilder, SlashCommandBuilder} = require('discord.js')
const {} = require("dismusic");
module.exports = {
  cmd: [`${__filename.toLowerCase().split('music\\')[1].slice(0,[1].length-4)}`],
  slashcommand : 
    new SlashCommandBuilder()
      .setName(`${__filename.toLowerCase().split('music\\')[1].slice(0,[1].length-4)}`)
      .setDescription(`add a list of songs by providing the url`)
      .addStringOption(options => options.setName("url").setDescription("The url of the list you want to add.").setRequired(true)),
  run: async (client, interaction, options, cmd) => {
    if(!interaction.member.voice.channel) return interaction.reply({content : "<a:crossmark:1055843467760242738> You need to be in a voicechannel to run this command."});

    let res
    try {
      res = await client.player.search(options.getString('url'));
    } catch (e) {
      return interaction.reply("<a:crossmark:1055843467760242738> Someting went wrong");
    }
    if(!res) return interaction.reply("<a:crossmark:1055843467760242738> Someting went wrong");
    res.requester = interaction.member.nickname || interaction.member.user.username
    const existsQueue = await client.player.existsQueue(interaction.guild);
    if (existsQueue) {
      const queue = await client.player.getQueue(interaction.guild);
      interaction.reply("<a:loading:1055843500966555698> Adding track(s)");
      try {
      queue.addTracks(res);
      } catch (e) {
        return interaction.reply("<a:crossmark:1055843467760242738> Someting went wrong");
      }
    } else {
      const queue = await client.player.createQueue(interaction.guild, {
        // metadata will stay with the queue until it is destroyed
        metadata: {
          channel: interaction.channel,
        },
      });
      await queue.connectTo(interaction.member.voice.channel);
      queue.play(res.tracks[1]);
      queue.addTracks(res.tracks)
      interaction.reply("<a:checkmark:1055843502585565235> Playing track: **" + res.tracks[0].name + "**");
    }
  },
};
