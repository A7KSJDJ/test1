const Command = require("Path To Command Structure") // ../../Structures/Command;
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "", // Command Name
  description: "", // Command Description
  aliases: [], // Command Aliases
  category: "", // Command Category
  usage: "", // Command Usage
  cooldown: 10, // Coooldown time
  premium: false, //If you want this code for premium member be this true
  botPermissions: [], // Bot Permissions Checking
  userPermissions: [], // User Permissions Checking
  devOnly: false, // If The User Is The Developer
  guildOnly: false, // If The Command Is A Guild Only or Global Command
  inDevelopment: true, // If The Command Is Still In Development
  run: async ({}) => {}, // Can Be ({ client, message, args }), ({ client, message }), ({ message, args }), ({ client, args }), ({ client }), ({ message }),  ({ args })
});

// Slash Command Handling
const SlashCommand = require("Path To Slash Command Structure"); // ../../Structures/slashCommand
const { MessageEmbed } = require("discord.js");

module.exports = new SlashCommand({
  name: "", // Command Name
  description: "", // Command Description
  botPermissions: [], // Bot Permissions Checking
  userPermissions: [], // User Permissions Checking
  options: [{}], // Command Options
  type: "CHAT_INPUT", // Command Type
  run: async ({}) => {}, // Can Be ({ client, interaction, args }), ({ client, interaction }), ({ interaction, args }), ({ client, args }), ({ client }), ({ interaction }),  ({ args })
});

const SlashContextCommand = require("Path To Context Command Structure"); // ../../Structures/ContextCommand
const { MessageEmbed } = require("discord.js")

module.exports = new SlashContextCommand({
  name: "", //Command Name
  type: "", // Command Type
  run: async ({}) => {}, // Only ({ client, interaction }) nothing else
});