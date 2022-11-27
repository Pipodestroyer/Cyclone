const { Client, Collection, IntentsBitField, GatewayIntentBits, ActivityType, MessageType, EmbedBuilder } = require('discord.js');
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
      name: "Run the command, we handle the rest.",
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/pipoxdretroyer"
    }]
  })
}

var estado = {
  status:[]
}

console.log(estado.status)


const package = require("./package.json");
let version = package.version


client.once('ready', () => {
  
 console.log(chalk.whiteBright.bgBlueBright(`🔁 |Client logged in as ${client.user.tag} | logged in ${client. guilds. cache. size} servers. | Running v${version} Beta.`));
  ClientPrescence();
  console.log(chalk.whiteBright.bgGreenBright.bold("✅ | Index.js | Working As Intended."));
  estado.status.push("ready")

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

  if(estado.status == "ready"){
    console.log("Cliente listo a tiempo.")
  } else {
    await(10000);
    if(estado.status == "ready"){
      console.log("cliente listo.")
    }
  }

})

process.on('rejectionHandled' , (reason, promise) => {

  console.log(chalk.whiteBright.bgHex('#ebff69').bold("⚠️ | Warning | Rejection | rejectionHandled"))
  console.log(chalk.whiteBright.bgHex('#ebff69')(`${reason} \n ${promise}`))
  
})

process.on('uncaughtException' , (err, origin) => {

  console.log(chalk.whiteBright.bgRedBright.bold("❌ | Error | Catched | uncaughtException"))
  console.log(chalk.whiteBright.bgRedBright(`${err} \n ${origin}`))

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

  if(message.content !== "<@911022283068436550>"){
   return;
  } 

 //warn

  if(message.mentions.has(client.user.id)) { 
    message.channel.send("Parece que es tu primera vez usando **Cyclone**, Cyclone esta hecho en base de slash commands `/`\nPara usarlos escribe `/` en el chat más el comando que quieres usar.")
  }

}});

//login

client.login(process.env.discord_token);