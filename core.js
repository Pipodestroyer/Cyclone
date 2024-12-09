const { Client, Collection, IntentsBitField, GatewayIntentBits, ActivityType, MessageType, EmbedBuilder, Emoji } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,] });
require('dotenv').config();
const chalk = require('chalk')

//Este es en nucleo del cliente.
//Filesystem es necesario AUNQUE NO SE LEA.
//hay notas en cada archivo para guiarme, las ire borrando segun vaya arreglando el codigo.
//este codigo lo escribi hace mucho, asi que hay mucho por aprender y por donde arreglar.

const fs = require('fs');
let { readdirSync } = require("fs");
const process = require('process');

//trate de leer documentacion, si alguien gusta explicar como funciona la propiedad emoji de la prescencia, con gusto puedes añadir al codigo.

function ClientPrescence(){
  client.user.setPresence({
    status: "online",
    activities: [{
      name: "🔒 Creando copias de seguridad...",
      type: ActivityType.Custom
    }]
  })
}

var estado = {
  status:[]
}


const package = require("./package.json");
const { trace } = require('console');
let version = package.version
let branch = package.branch

//Informacion para saber que el cliente logro iniciar sesion y que la version de desarrollo junto al token son los correctos.

client.once('ready', () => {
  
 console.log(chalk.whiteBright.bgBlueBright(`🔁 |Client logged in as ${client.user.tag} | logged in ${client. guilds. cache. size} servers. | Running v${version}-${branch}.`));
  ClientPrescence();
  console.log(chalk.whiteBright.bgGreenBright.bold("✅ | Core.js | Working As Intended."));
  estado.status.push("ready")

});

//en general seria positivo NO tocar esto.

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
    interaction.reply({ content:"Algo salio mal, si eres un usuario porfavor contacta a `.pokita` inmediatamente.", ephemeral:true})
  }
}
})

//El error handler es ineficiente para produccion, no debe ser usado como referencia para su version en servidor pero para su uso en prueba.

process.on('unhandledRejection' , (reason, promise) => {

  console.log(chalk.whiteBright.bgRedBright.bold("❌ | Error | Catched | unhandledRejection"))
  console.log(chalk.whiteBright.bgRedBright(`${reason} \n ${promise} \n ${trace}`))

})

process.on('rejectionHandled' , (reason, promise) => {

  console.log(chalk.whiteBright.bgHex('#ebff69').bold("⚠️ | Warning | Rejection | rejectionHandled"))
  console.log(chalk.whiteBright.bgHex('#ebff69')(`${reason} \n ${promise} \n ${trace}`))
  
})

process.on('uncaughtException' , (err, origin) => {

  console.log(chalk.whiteBright.bgRedBright.bold("❌ | Error | Catched | uncaughtException"))
  console.log(chalk.whiteBright.bgRedBright(`${err} \n ${origin} \n ${trace}`))

})
process.on('warning' , (warning) => {

  console.log(chalk.whiteBright.bgMagentaBright.bold("🚨 | Warning | Node Warning"))
  console.log(chalk.whiteBright.bgMagentaBright(`${warning.name} \n ${warning.message}`))

})

//El mensaje de error al tratar de enviar mensajes comunes a el bot.


client.on('messageCreate', message => {

  //check if the mention requirments are correct.

  let user = message.author

if(message.mentions.everyone === true || message.mentions.here === true) {
  return;
} else {

  if(message.content !== "<@911022283068436550>"){
   return;
  } 

 //este mensaje aun se puede mejorar.

  if(message.mentions.has(client.user.id)) { 
    message.channel.send("Cyclone esta hecho para uso con slash commands.\nPara usarlos, escribe `/` en el chat, más el comando que quieres usar.")
  }

}});

//login

client.login(process.env.discord_token);