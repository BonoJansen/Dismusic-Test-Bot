const config = require("../../../config.json");
const {} = require("dismusic");
module.exports = {
  cmd: ["play"],
  run: async (client, message, args, cmd) => {
    if(!message.member.voice.channel) return message.reply({content : ":x: You need to be in a voicechannel to run this command."});

    const res = await client.player.search(args.join(" "));
    if(!res) return message.reply(":x: Someting went wrong");
    res[0].requester = message.member.nickname || message.member.user.username
    const existsQueue = await client.player.existsQueue(message.guild);
    if (existsQueue) {
      const queue = await client.player.getQueue(message.guild);
      message.reply(":white_check_mark: Adding track(s): **" + res[0].name + "**");
      queue.addTrack(res[0]);
    } else {
      const queue = await client.player.createQueue(message.guild, {
        // metadata will stay with the queue until it is destroyed
        metadata: {
          channel: message.channel,
        },
      });
      
      await queue.connectTo(message.member.voice.channel);
      queue.play(res[0]);
      message.reply(":white_check_mark: Playing track: **" + res[0].name + "**");
    }
  },
};
