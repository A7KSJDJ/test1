const Command = require("../../Structures/Command");
const { MessageAttachment } = require("discord.js");
const { Canvacord } = require("canvacord");

module.exports = new Command({
  name: "circle",
  description: "Turn images to a circle",
  category: "fun",
  cooldown: 10,
  usage: "<@user/userID/username/attachment>",
  run: async ({ message, args }) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((m) => m.user.username === args[0]) || message.guild.members.cache.find((m) => m.user.tag === args[0]) || message.member
    
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png", size: 4096 })

    let image = await Canvacord.circle(avatar)
    let circle = new MessageAttachment(image, 'circle.png')
    message.reply({ files: [circle] })
  },
});