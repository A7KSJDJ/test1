const Client = require("./Structures/Client");
const client = new Client();
module.exports = client;

client.start();

client.on("messageCreate", (msg) => {
    if (msg.content == `${client.id}`)
    msg.reply(`hi`);
})
