const config = require("../../../config.json");
const { EmbedBuilder } = require('discord.js')
const moment = require('moment')
module.exports = {
  cmd: ["trackinfo"],
  run: async (client, message, args, cmd) => {
    if(!message.member.voice.channel) return message.reply({content : ":x: You need to be in a voicechannel to run this command."});
    const queue = await client.player.getQueue(message.guild);
    if(!queue) return message.reply({content : ":x: There is not music playing in this server."});
    let currentTrack = await queue.getCurrentTrack();
    if(currentTrack.tracks){
        currentTrack.tracks[0].requester = currentTrack.requester
        currentTrack = currentTrack.tracks[0]  
    }
    console.log(currentTrack)
    if(currentTrack.source === "YouTube"){
    const YOUTUBEembed = new EmbedBuilder()
            .setTitle(`Track Info`)
            .addFields(
                { name : `Requested by`, value : `${currentTrack.requester}` },
                { name : `Source`, value : `${currentTrack.source}` },
                { name : `Name`, value : `${currentTrack.name}` },
                { name : `Description`, value : `${currentTrack.descrition}` },
                { name : `Lenght video`, value : `${currentTrack.duration.formatted}` },
                { name : `Views`, value : `${currentTrack.rawData.views}` },
                { name : `Uploaded at`, value : `${currentTrack.rawData.uploadedAt || "A long time ago"}` },
                { name : `Video url`, value : `[Url to the video](${currentTrack.url} "This link brings you to the video")` },
                { name : `Channel name`, value : `${currentTrack.rawData.channel.name}` },
                { name : `Channel Url`, value : `[Url to the channel](${currentTrack.rawData.channel.url} "This link brings you to the channel of this video")` },
                { name : `Channel picture`, value : `[Url to the channel picture](${currentTrack.author.thumbnail} "This url brings you to the picture of this channel")` },
                { name : `Thumbnail url`, value : `[Url to the video thumbnail](${currentTrack.thumbnail} "This link brings you to the video thumbnail")` },
                { name : `\u200b`, value : `**Thumbnail**` },
            )
            .setImage(`${currentTrack.thumbnail}`)
            .setColor("#8d3e95")
            .setTimestamp()
        return message.reply({ embeds : [ YOUTUBEembed ]});
    } else if(currentTrack.source === "Spotify") {
        const SPOTIFYembed = new EmbedBuilder()
        .setTitle(`Track Info`)
        .addFields(
                { name : `Requested by`, value : `${currentTrack.requester}` },
                { name : `Source`, value : `${currentTrack.source}` },
                { name : `Name`, value : `${currentTrack.name}` },
                { name : `Lenght video`, value : `${currentTrack.duration.formatted}` },
                { name : `Uploaded at`, value : `${moment(`${currentTrack.rawData.releaseDate.isoString}`).utc().format('DD-MM-YYYY') || "A long time ago"}` },
                { name : `Artist`, value : `${currentTrack.author.name}` },
                { name : `Track url`, value : `[Url to the Track](${currentTrack.url} "This link brings you to the Track")` },
                { name : `Thumbnail url`, value : `[Url to the thumbnail](${currentTrack.thumbnail} "This link brings you to the video thumbnail")` },
                { name : `\u200b`, value : `**Thumbnail**` },
        )
        .setImage(`${currentTrack.thumbnail}`)
        .setColor("#8d3e95")
        .setTimestamp()
    return message.reply({ embeds : [ SPOTIFYembed ]});
    }
  }
};
