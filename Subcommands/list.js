const { SlashCommandBuilder } = require("discord.js")
const { EmbedBuilder } = require("discord.js")
const backup = require("discordio-backup");
const { PermissionsBitField, IntentsBitField } = require('discord.js')
const { awaitMessages } = require('discord.js');
const { config } = require("dotenv");
config.env
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fastFolderSizeSync = require('fast-folder-size/sync')
const fs = require('node:fs');
module.exports = {
  
   subCommand: "backup.list",
    

    async run(client, interaction, message){

        let Autor = interaction.member
        let Permisos = Autor.permissions.has(PermissionsBitField.Flags.Administrator)

        const user = client.users.cache.get(interaction.member.user.id);

        const guildsave = interaction.guild.id

        const botperms = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Cyclone requiere de permisos de administrador para funcionar.```");

        const somethingwentbad = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Algo parece estar mal, revisa si cyclone tiene permisos de administrador.```");
        
       

        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)){
         return interaction.reply({ embeds:[botperms], ephemeral: false })
        }

        const Code404 = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```"+"Tienes que primero registrar un codigo con el comando "+"/configuration code"+" antes de poder usar cyclone, solo el propietario puede hacer este registro.```");


        if(!fs.existsSync(__dirname+"/Data/ServerData"+`/${guildsave}/`)){
          return interaction.reply({embeds: [Code404] , ephemeral: false });
       }

        const missingperms = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```No tienes los permisos necesarios para usar este comando.```");

        const think = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Generando lista...```");

        const list404 = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Este servidor no tiene ninguna copia de seguridad.```");

        backup.setStorageFolder(__dirname+"/Data/backups"+`/${guildsave}/`);

        const backuplisting = __dirname+"/Data/backups"+`/${guildsave}/`

        if(!fs.existsSync(__dirname+"/Data/backups"+`/${guildsave}/`)){
           return interaction.reply({embeds: [list404] , ephemeral: false });
        } else

        if(fs.readdirSync(__dirname+"/Data/backups"+`/${guildsave}/`).length === 0){

          return interaction.reply({embeds: [list404] , ephemeral: false });

        }

       const sizeoffolder = fs.readdirSync(__dirname+"/Data/backups"+`/${guildsave}/`).length

       const sizemb =  fs.statSync(__dirname+"/Data/backups"+`/${guildsave}/`)

       const sizeinmb = sizemb.size

       const bytes = fastFolderSizeSync(__dirname+"/Data/backups"+`/${guildsave}/`)


        if (!Permisos){
          return interaction.reply({
          embeds: [missingperms], ephemeral: true
          });
        } else 
        


        backup.list().then((backups) => {

        const answerbasic = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .addFields(
          { name: "Cantidad de Backups:" , value: "```" + `${sizeoffolder}/5`+ "```", inline: true },

          { name: "Tamaño de los Backups:" , value: "```"+`${(bytes /1024/1024 ).toFixed(3)} MB`+"```", inline: true },

          { name: "Todas las copias de seguridad:", value: "```" + `${backups}` + "```" },
          )
       interaction.reply({ embeds: [answerbasic], ephemeral: false })
        });
        

    }

}