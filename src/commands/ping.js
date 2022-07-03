const Command = require("../classes/Command");
const { SlashCommandBuilder } = require("@discordjs/builders");

class Ping extends Command {
  constructor(client) {
    super(client, {
      data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("🏓 Sends ping"),
    });
  }

  async execute(interaction) {
    console.log(this.client.ws);
    interaction.reply({
      content: `:ping_pong: Pong !`,
      embeds: [
        {
          color: 0xf54949,
          fields: [
            {
              name: "**WebSocket ping**",
              value: `${this.client.ws.ping}ms`,
            },
            {
              name: "**Client ping**",
              value: `${Date.now() - interaction.createdTimestamp}ms`,
            },
          ],
        },
      ],
    });
  }
}

module.exports = Ping;
