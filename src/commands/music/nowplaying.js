const config = require("../../../config.json");
const { EmbedBuilder} = require('discord.js')
const createProgressBar = require('../../functions/createProgressBar')
const getPlayerTimestamp = require('../../functions/getPlayerTimestamp')
module.exports = {
  cmd: ["nowplaying"],
  run: async (client, message, args, cmd) => {
    if(!message.member.voice.channel) return message.reply({content : ":x: You need to be in a voicechannel to run this command."});

    const queue = await client.player.getQueue(message.guild);
    if(!queue) return message.reply({content : ":x: There is not music playing in this server."});
    let currentTrack = await queue.getCurrentTrack();
    // if(currentTrack.tracks){
    //     currentTrack.tracks[0].requester = currentTrack.requester
    //     currentTrack = currentTrack.tracks[0]  
    // }

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
            .setTimestamp()
        
        return message.reply({ embeds : [ embed ]});
    }
}
