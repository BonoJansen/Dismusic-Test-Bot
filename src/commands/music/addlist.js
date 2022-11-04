const config = require("../../../config.json");
const {} = require("dismusic");
module.exports = {
  cmd: ["addlist"],
  run: async (client, message, args, cmd) => {
    if(!message.member.voice.channel) return message.reply({content : ":x: You need to be in a voicechannel to run this command."});

    const res = await client.player.search(args.join(" "));
    if(!res) return message.reply(":x: Someting went wrong");
    res.requester = message.member.nickname || message.member.user.username
    const existsQueue = await client.player.existsQueue(message.guild);
    if (existsQueue) {
      const queue = await client.player.getQueue(message.guild);
      message.reply(":white_check_mark: Adding track(s) **" + res.tracks[0].name + "**");
      try {
      queue.addTracks(res);
      } catch (e) {
        return message.reply(":x: Someting went wrong");
      }
    } else {
      const queue = await client.player.createQueue(message.guild, {
        // metadata will stay with the queue until it is destroyed
        metadata: {
          channel: message.channel,
        },
      });
      await queue.connectTo(message.member.voice.channel);
      queue.play(res.tracks[1]);
      queue.addTracks(res.tracks)
      message.reply(":white_check_mark: Playing track: **" + res.tracks[0].name + "**");
    }
  },
};
