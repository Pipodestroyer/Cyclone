const { Client, Collection, IntentsBitField, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,] });
require('dotenv').config();

const fs = require('fs');
let { readdirSync } = require("fs");

function ClientPrescence(){
  client.user.setPresence({
    status: "STREAMING",
    activities: [{
      name: "Making Backups",
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/pipoxdretroyer"
    }]
  })
}

client.once('ready', () => {
  console.log(`Client logged in as ${client.user.tag}, logged in ${client. guilds. cache. size} servers. `);
  console.log(`Cyclone id: ${client.user.id}`);
  ClientPrescence();
});

client.slashcommands = new Collection();
client.subCommands = new Collection();

const slashcommandsFiles = fs.readdirSync("./Comandos").filter(file => file.endsWith("js"))

for(const file of slashcommandsFiles){
  const slash = require(`./Comandos/${file}`)
  client.slashcommands.set(slash.data.name, slash)
}

const subcommandsFiles = fs.readdirSync("./Subcommands").filter(file => file.endsWith("js"))

for(const file of subcommandsFiles){
  const subSlash = require(`./Subcommands/${file}`)
  client.subCommands.set(subSlash.subCommand, subSlash);
};


client.on("interactionCreate", async(interaction) => {
  if(!interaction.isCommand()) return

  try{
    const subCommand = interaction.options.getSubcommand();

  if(subCommand){
   const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);

    subCommandFile.run(client, interaction)
  }
  } catch(e){

  const slashcmds = client.slashcommands.get(interaction.commandName)

  if(!slashcmds) return;

  try{
    await slashcmds.run(client, interaction)
  }catch(e) {
    console.error(e)
    interaction.reply({ content:"Algo salio mal, si eres un usuario porfavor contacta a Pokita#1234 inmediatamente.", ephemeral:true})
  }

}
})

client.on('messageCreate', message => {

  //check if the mention requirments are correct.
if(message.mentions.everyone === true || message.mentions.here === true) {
  return;
} else {

  if(message.mentions.has(client.user.id) && message.type == 'REPLY') {
    return;
  } else {


 //warn
  if(message.mentions.has(client.user.id)) { 
    message.channel.send("Parece que es tu primera vez usando **Cyclone**, Cyclone esta hecho en base de slash commands `/`\nPara usarlos escribe `/` en el chat más el comando que quieres usar.")
  }

}}});

//login

client.login(process.env.discord_token);
console.log("Todo esta funcionando correctamente.");