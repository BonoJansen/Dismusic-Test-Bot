const config = require("../../config.json");
const botMode = config["pubic?"] ? "public" : "private";
module.exports = (client) => {
  client.once("ready", async () => {
    console.log(
      `\n[Info]`,
      `Client connection to Discord established. As: ${
        client.user.username + " • " + client.user.id
      } in ${botMode} mode\n${new Date()} `
    );
  });
};
