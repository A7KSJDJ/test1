const client = require("../index");
const Discord = require("discord.js");
const premiumSystem = require("../Database/premiumSystem");
const ms = require("ms")
const blacklistSchema = require("../Database/blacklistSystem");
const Schema = require("../Database/cooldowns");
const prettyMs = require("pretty-ms");
const { MessageEmbed } = require("discord.js");


client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(client.config.prefix)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.get(client.aliases.get(cmd.toLowerCase()));

  if (!command) { return;
  } else {
    let data = await blacklistSchema.findOne({ userID: message.author.id })
    if (data) {
      const isBlacklisted = new MessageEmbed()
         .setTitle("BLACKLISTED")
        .setDescription(`
        Sorry but you have been blacklisted from using my commands
        **Reason:** \`${data.reason}\`
        you take this blacklist in \`${data.Date}\``)
        .setColor("RED")
        .setTimestamp()
        return message.channel.send({ embeds: [isBlacklisted] })
      }
  ///
  if (command.cooldown) {
    let cooldown;
    try {
      cooldown = await Schema.findOne({
        userID: message.author.id,
        commandName: command.name,
      });
      if (!cooldown) {
        cooldown = await Schema.create({
          userID: message.author.id,
          commandName: command.name,
          cooldown: 0,
        });
        cooldown.save();
      }
    } catch (error) {
      console.log(error);
    }

    if (
      !cooldown ||
      command.cooldown * 1000 - (Date.now() - cooldown.cooldown) > 0
    ) {
      let CommandTime = prettyMs(command.cooldown * 1000, {
        verbose: true,
      });
      const timeleft = prettyMs(
        command.cooldown * 1000 - (Date.now() - cooldown.cooldown),
        { verbose: true }
      );
      let cooldownMsg = new MessageEmbed()
        .setTitle("COOLDOWN A BIT")
        .setDescription(
          `${message.author}, you can use **${command.name}** every **${CommandTime}** try again in **${timeleft}**`
        )

        .setColor("RANDOM")
        .setFooter({
          text: `${client.user.tag}`,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });
      return message.reply({ embeds: [cooldownMsg] });
    } else {
      await Schema.findOneAndUpdate(
        {
          userID: message.author.id,
          commandName: command.name,
        },
        {
          cooldown: Date.now(),
        }
      );
    }
  }
  ///
  if (!message.member.permissions.has(command.userPermissions || [])) {
    const userPermission = new Discord.MessageEmbed()
      .setTitle("MISSING PERMISSIONS")
      .setDescription(`❌ | You are missing \`${command.userPermissions.join(", ").replace(/\_/g, " ")}\``)
      .setColor(client.colors.silver)
      .setTimestamp()
    return message.channel.send({ embeds: [userPermission] })
  }

  if (!message.guild.me.permissions.has(command.botPermissions || [])) {
    const userPermission = new Discord.MessageEmbed()
      .setTitle("MISSING PERMISSIONS")
      .setDescription(`❌ | I am missing \`${command.botPermissions.join(", ").replace(/\_/g, " ")}\``)
      .setColor(client.colors.silver)
      .setTimestamp()
    return message.channel.send({ embeds: [userPermission] })
  }
///
  if (command.premium &&!(await premiumSystem.findOne({ userID: message.author.id }))
  ) {
    const PremiumEmbed = new Discord.MessageEmbed()
      .setTitle("PREMIUM COMMAND")
      .setDescription(`This command is only for the premium members.`)
      .setColor(client.colors.indianred)
      .setTimestamp();
    return message.reply({ embeds: [PremiumEmbed] });
  }
///
///
///
const devs = ["829276614051364874"];
if (command.devOnly == true && !devs.includes(message.author.id)){
    const devOnlyCommand = new Discord.MessageEmbed()
    .setTitle("Developer Only Command")
    .setDescription(`❌ | This command is only for the developer`)
    .setColor("RED")
    .setTimestamp()
    return message.reply({ embeds: [devOnlyCommand] })
}
  if (command.guildOnly == true && message.guildId !== "915264986350239786") {
    const guildOnlyCommand = new Discord.MessageEmbed()
      .setTitle("Guild Only Command")
      .setDescription(`❌ | This command is only for \`${client.guilds.cache.get("915264986350239786").name}\` server`)
      .setColor("RED")
      .setTimestamp()
    return message.reply({ embeds: [guildOnlyCommand] })
  }

  if (command.inDevelopment == true && message.author.id !== "895772680865861654") {
    const inDevelopment = new Discord.MessageEmbed()
      .setTitle("Command In Development")
      .setDescription(`❌ | ${command.name} is still in development. Stay Tuned`)
      .setColor("RED")
      .setTimestamp()
    return message.reply({ embeds: [inDevelopment] })
  }
  
  

  await command.run({ client, message, args });
}});
