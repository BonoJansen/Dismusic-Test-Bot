//gets fired when a track/new track starts playing in a voicechannel
const { EmbedBuilder } = require('discord.js')
const config = require("../../config.json");
module.exports = (client) => {
  client.player.on("trackStart", async (queue, track) => {
    const embed = new EmbedBuilder()
      .setTitle("Started playing: " + track.name)
      .setDescription("By: " + track.author.name)
      .addFields(
        { name : `Requested by`, value : `${track.requester}` },
        { name : `Lenght`, value : `${track.duration.formatted}` },
        { name : `Track url`, value : `[Track](${track.url} "This link brings you to the Track")` },
      )
      .setThumbnail(track.thumbnail)
      .setColor("#8d3e95")
      .setFooter({text : "Discord Bot made by BonoJansen_#3176", iconURL : "https://cdn.discordapp.com/avatars/624934684597551116/1f8f278896d7147939b2befb3196370c.png"})
      .setTimestamp()
    queue.metadata.channel.send({ embeds : [embed]})
  });
};
