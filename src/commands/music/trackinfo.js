const config = require("../../../config.json");
const { EmbedBuilder } = require('discord.js')
const moment = require('moment')
module.exports = {
  cmd: ["trackinfo", "info"],
  run: async (client, message, args, cmd) => {
    if(!message.member.voice.channel) return message.reply({content : "<a:crossmark:1055843467760242738> You need to be in a voicechannel to run this command."});
    const queue = await client.player.getQueue(message.guild);
    if(!queue) return message.reply({content : "<a:crossmark:1055843467760242738> There is not music playing in this server."});
    let currentTrack = await queue.getCurrentTrack();
    if(currentTrack.tracks){
        currentTrack.tracks[0].requester = currentTrack.requester
        currentTrack = currentTrack.tracks[0]  
    }
    if(currentTrack.source === "YouTube"){
      const YOUTUBEembed = new EmbedBuilder()
        .setTitle(`Track Info`)
        .addFields(
            { name : `Requested by`, value : `${currentTrack.requester || "none"}` },
            { name : `Source`, value : `${currentTrack.source || "none"}` },
            { name : `Name`, value : `${currentTrack.name || "none"}` },
            { name : `Description`, value : `${currentTrack.descrition || "none"}` },
            { name : `Lenght video`, value : `${currentTrack.duration.formatted || "none"}` },
            { name : `Views`, value : `${currentTrack.rawData.views || "none"}` },
            { name : `Uploaded at`, value : `${currentTrack.rawData.uploadedAt || "A long time ago"}` },
            { name : `Video url`, value : `[Url to the video](${currentTrack.url} "This link brings you to the video")` },
            { name : `Channel name`, value : `${currentTrack.rawData.channel.name || "none"}` },
            { name : `Channel Url`, value : `[Url to the channel](${currentTrack.rawData.channel.url} "This link brings you to the channel of this video")` },
            { name : `Channel picture`, value : `[Url to the channel picture](${currentTrack.author.thumbnail} "This url brings you to the picture of this channel")` },
            { name : `Thumbnail url`, value : `[Url to the video thumbnail](${currentTrack.thumbnail} "This link brings you to the video thumbnail")` },
            { name : `\u200b`, value : `**Thumbnail**` },
        )
        .setImage(`${currentTrack.thumbnail}`)
        .setColor("#8d3e95")
        .setFooter({text : "Discord Bot made by BonoJansen_#3176", iconURL : "https://cdn.discordapp.com/avatars/624934684597551116/1f8f278896d7147939b2befb3196370c.png"})
        .setTimestamp()
        return message.reply({ embeds : [ YOUTUBEembed ]});
    } else if(currentTrack.source === "Spotify") {
      const SPOTIFYembed = new EmbedBuilder()
        .setTitle(`Track Info`)
        .addFields(
          { name : `Requested by`, value : `${currentTrack.requester || "none"}` },
          { name : `Source`, value : `${currentTrack.source || "none"}` },
          { name : `Name`, value : `${currentTrack.name || "none"}` },
          { name : `Lenght video`, value : `${currentTrack.duration.formatted || "none"}` },
          { name : `Uploaded at`, value : `${moment(`${currentTrack.rawData.releaseDate.isoString}`).utc().format('DD-MM-YYYY') || "A long time ago"}` },
          { name : `Artist`, value : `${currentTrack.author.name || "none"}` },
          { name : `Track url`, value : `[Url to the Track](${currentTrack.url} "This link brings you to the Track")` },
          { name : `Thumbnail url`, value : `[Url to the thumbnail](${currentTrack.thumbnail} "This link brings you to the video thumbnail")` },
          { name : `\u200b`, value : `**Thumbnail**` },
        )
        .setImage(`${currentTrack.thumbnail}`)
        .setColor("#8d3e95")
        .setFooter({text : "Discord Bot made by BonoJansen_#3176", iconURL : "https://cdn.discordapp.com/avatars/624934684597551116/1f8f278896d7147939b2befb3196370c.png"})
        .setTimestamp()
      return message.reply({ embeds : [ SPOTIFYembed ]});
    } else {
      return message.reply({ content : ["This song is not yet supported by the **trackinfo** command because it used another search engine as Youtube of Spotify"]});
    }
  }
};
