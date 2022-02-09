const { ContextMenuInteraction } = require("discord.js");
const Client = require("./Client");

/**
 * @typedef {{ client: Client, interaction: ContextMenuInteraction }} RunOptions
 * @param {RunOptions} param0 
 */
async function runFunction({ client, interaction }) {}

class contextCommand {
  /**
   * @typedef {{name: string, type: "MESSAGE" | "USER", run: runFunction }} Run
   * @param {Run} option
   */
  constructor(option) {
    this.name = option.name;
    this.premium = options.premium;
    this.type = option.type;
    this.run = option.run;
  }
}

module.exports = contextCommand;