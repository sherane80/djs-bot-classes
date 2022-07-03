const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

class CustomClient extends Client {
  constructor({ prefix, intents, clientId }) {
    super({ intents, allowedMentions: { repliedUser: false } });
    this.clientId = clientId;
    this.prefix = prefix;
    this.commands = new Collection();
    this.logger = require("./Logger");
  }

  init() {
    this._resolveCommands();
    this._resolveEvents();
    this.login(this.token);
    return this;
  }

  _resolveCommands() {
    const slashCommandsData = [];
    const commandsFolders = readdirSync(join(process.cwd(), "./src/commands"));
    const rest = new REST({ version: "9" }).setToken(this.token);

    for (const fileName of commandsFolders) {
      try {
        const commandFile = new (require(join(
          process.cwd(),
          `./src/commands/${fileName}`
        )))(this);
        this.commands.set(commandFile.data.toJSON().name, commandFile);
        slashCommandsData.push(commandFile.data.toJSON());

        (async () => {
          await rest.put(Routes.applicationCommands(this.clientId), {
            body: slashCommandsData,
          });
        })();
      } catch (error) {
        this.logger.log("ERR", error.message);
      }
    }
  }

  _resolveEvents() {
    const eventsFolders = readdirSync(join(process.cwd(), "./src/events"));

    for (const fileName of eventsFolders) {
      const eventName = fileName.split(".")[0];
      const eventFile = new (require(join(
        process.cwd(),
        `./src/events/${fileName}`
      )))(this);
      this.on(eventName, (...args) => eventFile.execute(...args));
    }
  }
}

module.exports = CustomClient;
