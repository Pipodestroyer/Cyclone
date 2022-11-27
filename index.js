<<<<<<< Updated upstream
const { Client, Collection, IntentsBitField, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');
=======
const { Client, Collection, IntentsBitField, GatewayIntentBits, ActivityType, MessageType, EmbedBuilder, MessageMentions } = require('discord.js');
>>>>>>> Stashed changes
const client = new Client({ intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,] });
require('dotenv').config();
const chalk = require('chalk')

const fs = require('fs');
let { readdirSync } = require("fs");
const process = require('process');

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

<<<<<<< Updated upstream
=======
var estado = {
  status:[]
}

>>>>>>> Stashed changes
const package = require("./package.json");
let version = package.version
let branch = package.branch


client.once('ready', () => {
  
<<<<<<< Updated upstream
 console.log(chalk.whiteBright.bgBlueBright(`🔁 |Client logged in as ${client.user.tag} | logged in ${client. guilds. cache. size} servers. | Running ${version}ver.`));
  ClientPrescence();
  console.log(chalk.whiteBright.bgGreenBright.bold("✅ | Index.js | Working As Intended."));
=======
 console.log(chalk.whiteBright.bgBlueBright(`🔁 |Client logged in as ${client.user.tag} | logged in ${client. guilds. cache. size} servers. | Running v${version} ${branch}.`));
  ClientPrescence();
  console.log(chalk.whiteBright.bgGreenBright.bold("✅ | Index.js | Working As Intended."));
  estado.status.push("ready")
  console.log(chalk.whiteBright.bgGreenBright.bold("✅ | Client Status: Ready."));
>>>>>>> Stashed changes

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

    subCommandFile.run(client, interaction, process)
  }
  } catch(e){

  const slashcmds = client.slashcommands.get(interaction.commandName)

  if(!slashcmds) return;

  try{
    await slashcmds.run(client, interaction)
  }catch(e) {
    console.log(chalk.whiteBright.bgYellowBright.bold("✴️ | Command Error | Catched "))
    console.log(chalk.whiteBright.bgYellowBright(`${e} \n ${e.reason.message}`))
    interaction.reply({ content:"Algo salio mal, si eres un usuario porfavor contacta a Pokita#1234 inmediatamente.", ephemeral:true})
  }
}
})

process.on('unhandledRejection' , (reason, promise) => {

  console.log(chalk.whiteBright.bgRedBright.bold("❌ | Error | Catched | unhandledRejection"))
  console.log(chalk.whiteBright.bgRedBright(`${reason} \n ${promise}`))

})

process.on('rejectionHandled' , (reason, promise) => {

  console.log(chalk.whiteBright.bgHex('#ebff69').bold("⚠️ | Warning | Rejection | rejectionHandled"))
  console.log(chalk.whiteBright.bgHex('#ebff69')(`${reason} \n ${promise}`))
  
})

process.on('uncaughtException' , (err, origin) => {

  console.log(chalk.whiteBright.bgRedBright.bold("❌ | Error | Catched | uncaughtException"))
  console.log(chalk.whiteBright.bgRedBright(`${err} \n ${err.message}`))

})
process.on('warning' , (warning) => {

  console.log(chalk.whiteBright.bgMagentaBright.bold("🚨 | Warning | Node Warning"))
  console.log(chalk.whiteBright.bgMagentaBright(`${warning.name} \n ${warning.message}`))

})


client.on('messageCreate', message => {

  //check if the mention requirments are correct.

  let user = message.author

if(message.mentions.everyone === true || message.mentions.here === true) {
  return;
} else {
<<<<<<< Updated upstream

  if(message.mentions.has(client.user.id) && message.type == 'REPLY') {
    return;
  } else {


 //warn
  if(message.mentions.has(client.user.id)) { 
=======
 //warn
  if(message.content !== "<@911022283068436550>"){
    return; 
  }

  if(message.mentions.has(client.user.id)) {
>>>>>>> Stashed changes
    message.channel.send("Parece que es tu primera vez usando **Cyclone**, Cyclone esta hecho en base de slash commands `/`\nPara usarlos escribe `/` en el chat más el comando que quieres usar.")
  }

}}});

//login

client.login(process.env.discord_token);