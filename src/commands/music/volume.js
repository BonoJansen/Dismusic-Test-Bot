const config = require("../../../config.json");
const {} = require("dismusic");
module.exports = {
  cmd: ["volume", "vol"],
  run: async (client, message, args, cmd) => {
    if(!message.member.voice.channel) return message.reply({content : "<a:crossmark:1055843467760242738> You need to be in a voicechannel to run this command."});
    const newVolume = args[0];
    if (newVolume < 0 || newVolume > 100) {
      return message.reply({content : "<a:crossmark:1055843467760242738> The volume must be a value between 1 and 100"});
    }
    const queue = await client.player.getQueue(message.guild);
    if(!queue) return message.reply({content : "<a:crossmark:1055843467760242738> There is not music playing in this server."});
    queue.setVolume(newVolume);

    message.reply("<a:checkmark:1055843502585565235> Changed the volume to **" + newVolume + "**");
  },
};
