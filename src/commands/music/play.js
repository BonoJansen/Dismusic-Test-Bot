const config = require("../../../config.json");
const {} = require("dismusic");
module.exports = {
  cmd: ["play", "p"],
  run: async (client, message, args, cmd) => {
    if(!message.member.voice.channel) return message.reply({content : "<a:crossmark:1055843467760242738> You need to be in a voicechannel to run this command."});

    let res
    try {
      res = await client.player.search(args.join(" "));
    } catch (e) {
      return message.reply("<a:crossmark:1055843467760242738> Someting went wrong");
    }
    if(!res) return message.reply("<a:crossmark:1055843467760242738> Someting went wrong");
    res[0].requester = message.member.nickname || message.member.user.username
    const existsQueue = await client.player.existsQueue(message.guild);
    if (existsQueue) {
      const queue = await client.player.getQueue(message.guild);
      const msg = await message.reply("<a:loading:1055843500966555698> Adding track(s)");
      queue.addTrack(res[0]);
      msg.edit("<a:loading:1055843500966555698> Added track(s)!")
    } else {
      const queue = await client.player.createQueue(message.guild, {
        // metadata will stay with the queue until it is destroyed
        metadata: {
          channel: message.channel,
        },
      });
      
      await queue.connectTo(message.member.voice.channel);
      queue.play(res[0]);
      message.reply("<a:checkmark:1055843502585565235> Playing track: **" + res[0].name + "**");
    }
  },
};
