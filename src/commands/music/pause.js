const config = require("../../../config.json");
const {} = require("dismusic");
module.exports = {
  cmd: ["pause"],
  run: async (client, message, args, cmd) => {
    if(!message.member.voice.channel) return message.reply({content : ":x: You need to be in a voicechannel to run this command."});
    
    const queue = await client.player.getQueue(message.guild);
    if(!queue) return message.reply({content : ":x: There is not music playing in this server."});
    queue.pause();

    message.reply(":white_check_mark: Paused the music");
  },
};
