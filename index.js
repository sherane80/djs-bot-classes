const CustomClient = require("./src/classes/CustomClient");
const { join } = require("path");
const { config } = require("dotenv");

config({ path: join(process.cwd(), "./.env") });

new CustomClient({
  token: process.env.TOKEN,
  clientId: "993157549379563580",
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "DIRECT_MESSAGES",
  ],
}).init();
