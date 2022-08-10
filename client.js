const Discord = require('discord.js');
const { Client, Intents, WebhookClient } = require('discord.js');

const client = new Client({
   intents:
      [
         Intents.FLAGS.GUILDS,
         Intents.FLAGS.GUILD_MEMBERS,
         Intents.FLAGS.GUILD_BANS,
         Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
         Intents.FLAGS.GUILD_INTEGRATIONS,
         Intents.FLAGS.GUILD_WEBHOOKS,
         Intents.FLAGS.GUILD_INVITES,
         Intents.FLAGS.GUILD_VOICE_STATES,
         Intents.FLAGS.GUILD_PRESENCES,
         Intents.FLAGS.GUILD_MESSAGES,
         Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
         Intents.FLAGS.GUILD_MESSAGE_TYPING
      ]
});

const interactionCommands = [];

  
client.settings = {
  token: "YOUR CLIENT TOKEN HERE"
};

async function startUp() {
  
  //Events
  let eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
  for (let eventFile of eventFiles) {
    let event = require(`./events/${eventFile}`);
    let eventName = eventFile.split(".")[0];
    client.on(eventName, event.bind(null, client));
  }

  //Commands
  let commandCategories = await readdir("./commands/");
  commandCategories.forEach(commandCategory => {
    fs.readdir(`./commands/${commandCategory}/`, (err, commandCategoryFiles) => {
      if (err) console.error(err);
      for (let commandFile of commandCategoryFiles) {
        let command = require(`./commands/${commandCategory}/${commandFile}`);
        client.commands.set(command.interaction ? command.interaction.name : command.name, command);
        if (command.interaction)
          interactionCommands.push(command.interaction);
      };
    });
  });

  await client.login(client.settings.token);
  
}; startUp();
