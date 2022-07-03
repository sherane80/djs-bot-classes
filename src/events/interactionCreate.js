module.exports = class {
  constructor(client) {
    this.client = client;
  }

  execute(interaction) {
    if (interaction.isCommand()) {
      if (!interaction.guild || interaction.user.bot) return;
      const command = this.client.commands.get(interaction.commandName)
      if (command) return command.execute(interaction);
    }
  }
};
