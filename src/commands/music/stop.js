const config = require("../../../config.json");
const {} = require("dismusic");
module.exports = {
  cmd: ["stop", "quit"],
  run: async (client, message, args, cmd) => {
    if(!message.member.voice.channel) return message.reply({content : "<a:crossmark:1055843467760242738> You need to be in a voicechannel to run this command."});
    const queue = await client.player.getQueue(message.guild);
    if(!queue) return message.reply({content : "<a:crossmark:1055843467760242738> There is not music playing in this server."});
    await queue.kill();
    message.reply("<a:checkmark:1055843502585565235> Stopped the music");
  },
};
