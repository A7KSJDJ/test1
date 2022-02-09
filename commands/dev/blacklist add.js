const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const balcklistSchema = require("../../Database/blacklistSystem");

module.exports = new Command({
  name: "blacklist",
  description: "Blacklist a user from using commands",
  category: "developer",
  devOnly: false,
  guildOnly: false,
  inDevelopment: true,
  usage: "<userID> <time> <reason>",
  run: async ({ client, message, args }) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((m) => m.user.username === args[0]) || message.guild.members.cache.find((m) => m.user.tag === args[0]) || message.member
    let reason;
    let filter = (m) => m.author.id === message.author.id

    let data = await balcklistSchema.findOne({ userID: user })
    if (data) return message.reply({ content: "This user is already blacklisted" })
    else {
      await message.channel.send({ content: "Who are you trying to blacklist?" }).then(async (msg) => {
        await msg.channel.awaitMessages({
          filter,
          max: 1,
        }).then(async (value) => {
          user = value.first().mentions.users.first()
          if (!user) return message.reply({ content: "That user does not exist in discord." })
        })
      })
  
      await message.channel.send("What is the reason for blacklisting this user?").then(async (msg) => {
        await msg.channel.awaitMessages({
          filter,
          max: 1,
        }).then(async (value) => {
          reason = value.first().content
        })
      })


      data = await balcklistSchema.create({
        userID: user.id,
        reason: reason,
        Date: new Date().toLocaleDateString()
      })
      data.save()

      const id = user.id
      const blacklisted = new MessageEmbed()
        .setTitle("BLACKLISTED")
        .setDescription(`
        **User:** \`(${id}) ${client.users.cache.get(id).username}\`
        **Reason:** \`${reason}\`
        `)
      message.channel.send({ embeds: [blacklisted] })
    }
  },
});