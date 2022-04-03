const Discord = require('discord.js');
const intents = new Discord.Intents();
const client = new Discord.Client({ intents: 13839 });
require('dotenv').config();

const fs = require('fs');
let { readdirSync } = require("fs");

//Prescencia

function prescence(){
  client.user.setPresence({
    status: "STREAMING",
    activities: [{
      name: "First Stable Release!",
      type: "STREAMING",
      url: "https://www.twitch.tv/pipoxdretroyer"
    }]
  })
}

client.on('ready', () => {
  console.log(`Bot Now Online`);
  prescence();
});

client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync("./Comandos").filter(file => file.endsWith("js"))

for(const file of slashcommandsFiles){
  const slash = require(`./Comandos/${file}`)
  client.slashcommands.set(slash.data.name, slash)
}

client.on("interactionCreate", async(interaction) => {
  if(!interaction.isCommand()) return;

  const slashcmds = client.slashcommands.get(interaction.commandName)

  if(!slashcmds) return;

  try{
    await slashcmds.run(client, interaction)
  }catch(e) {
    console.error(e)
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
