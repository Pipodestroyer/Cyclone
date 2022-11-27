
const { Client, Collection, IntentsBitField, GatewayIntentBits, ActivityType, MessageType, EmbedBuilder, MessageMentions } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers] });
const process = require('process');

module.exports = {

    async run(client, process){

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
        console.log(chalk.whiteBright.bgRedBright(`${err} \n ${origin}`))
      
      })
      process.on('warning' , (warning) => {
      
        console.log(chalk.whiteBright.bgMagentaBright.bold("🚨 | Warning | Node Warning"))
        console.log(chalk.whiteBright.bgMagentaBright(`${warning.name} \n ${warning.message}`))
      
      })
    }
      
}