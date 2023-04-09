const config = require("../../../config.json");
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const createProgressBar = require('../../functions/createProgressBar')
const getPlayerTimestamp = require('../../functions/getPlayerTimestamp')
module.exports = {
  cmd: [`${__filename.toLowerCase().split('music\\')[1].slice(0,[1].length-4)}`],
  slashcommand : 
    new SlashCommandBuilder()
      .setName(`${__filename.toLowerCase().split('music\\')[1].slice(0,[1].length-4)}`)
      .setDescription(`see what track is playing`),
  run: async (client, interaction, options, cmd) => {
    if(!interaction.member.voice.channel) return interaction.reply({content : "<a:crossmark:1055843467760242738> You need to be in a voicechannel to run this command."});

    const queue = await client.player.getQueue(interaction.guild);
    if(!queue) return interaction.reply({content : "<a:crossmark:1055843467760242738> There is not music playing in this server."});
    let currentTrack = await queue.getCurrentTrack();
    

    const progress = await createProgressBar(currentTrack);
    const perc = await getPlayerTimestamp(currentTrack);

        const embed = new EmbedBuilder()
            .setTitle(`Now Playing`)
            .setDescription(`🎶 | **${currentTrack.name}**! (\`${perc.progress}%\`)`)
            .addFields(
                { name : `\u200b`, value : `${progress}` },
                { name : `Requested by: `, value : `${currentTrack.requester}` }
            )
            .setColor("#8d3e95")
            .setFooter({text : `Discord Bot made by BonoJansen_#3176`, iconURL : "https://cdn.discordapp.com/avatars/624934684597551116/1f8f278896d7147939b2befb3196370c.png"})
            .setTimestamp()
        
        return interaction.reply({ embeds : [ embed ]});
    }
}
