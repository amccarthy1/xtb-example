const xtb = require("xtb");
const tmi = require("tmi.js");

const auth = require("./auth.json");
const botconfig = require("./botconfig.json");

const options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: auth,
    channels: [botconfig.channel]
};

const client = tmi.client(options);

const bot = new xtb(client, botconfig.channel);
bot.load(botconfig.commands);

bot.registerGlobalListener(m => {
  const name = m.user['display-name'];
  console.log(`Logging message: [${name}]: ${m.contents}`);
});

bot.connect();
