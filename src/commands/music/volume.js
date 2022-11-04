const config = require("../../../config.json");
const {} = require("dismusic");
module.exports = {
  cmd: ["volume"],
  run: async (client, message, args, cmd) => {
    if(!message.member.voice.channel) return message.reply({content : ":x: You need to be in a voicechannel to run this command."});
    const newVolume = args[0];
    if (newVolume < 0 || newVolume > 100) {
      return message.reply({content : ":x: The volume must be a value between 1 and 100"});
    }
    const queue = await client.player.getQueue(message.guild);
    if(!queue) return message.reply({content : ":x: There is not music playing in this server."});
    queue.setVolume(newVolume);

    message.reply(":white_check_mark: Changed the volume to **" + newVolume + "**");
  },
};
