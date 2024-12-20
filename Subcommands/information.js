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
  
   subCommand: "backup.information",
    

    async run(client, interaction, message){
      //pronto este comando quedara descontinuado, no se debe tomar mas de lo obligatoriamente necesario de estos datos.

        let Autor = interaction.member
        let Permisos = Autor.permissions.has(PermissionsBitField.Flags.Administrator)

        const id = interaction.options.getString('backup')

        const user = client.users.cache.get(interaction.member.user.id);

        const guildsave = interaction.guild.id

        const botperms = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2b2d31")
        .setDescription("```Cyclone requiere de permisos de administrador para funcionar.```");

        const somethingwentbad = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2b2d31")
        .setDescription("```Algo parece estar mal, revisa si cyclone tiene permisos de administrador.```");
        
    

        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)){
         return interaction.reply({ embeds:[botperms], ephemeral: false })
        }
        const think = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2b2d31")
        .setDescription("```Generando informacion...```");

        await interaction.reply({ embeds:[think], ephemeral: false })

        const Code404 = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2b2d31")
        .setDescription("```"+"Para usar Cyclone la instancia de este servidor debe ser registrada. "+"Usa `/configuration code`"+", Solo el propietario del servidor puede hacer el registro.```");


        if(!fs.existsSync(__dirname+"/Data/ServerData"+`/${guildsave}/`)){
          return interaction.editReply({embeds: [Code404] , ephemeral: false });
       }

        const missingperms = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2b2d31")
        .setDescription("```No tienes los permisos necesarios para usar este comando.```");

        const missingbcks = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2b2d31")
        .setDescription("```La id proporcionada no existe o no es valida.```");

        const list404 = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2b2d31")
        .setDescription("```Este servidor no tiene ninguna copia de seguridad.```");

        backup.setStorageFolder(__dirname+"/Data/backups"+`/${guildsave}/`);

        const backuplisting = __dirname+"/Data/backups"+`/${guildsave}/`

        if(!fs.existsSync(__dirname+"/Data/backups"+`/${guildsave}/`)){
           return interaction.editReply({embeds: [list404] , ephemeral: false });
        } else

        if(fs.readdirSync(__dirname+"/Data/backups"+`/${guildsave}/`).length === 0){

          return interaction.editReply({embeds: [list404] , ephemeral: false });

        }

       const sizeoffolder = fs.readdirSync(__dirname+"/Data/backups"+`/${guildsave}/`).length

       const sizemb =  fs.statSync(__dirname+"/Data/backups"+`/${guildsave}/`)

       const sizeinmb = sizemb.size

       const bytes = fastFolderSizeSync(__dirname+"/Data/backups"+`/${guildsave}/`)
 


        if (!Permisos){
          return interaction.editReply({
          embeds: [missingperms], ephemeral: false
          });
        }


        backup.fetch(id).then((backupInfos) => {
          const date = new Date(backupInfos.data.createdTimestamp);
          const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
          const formatedDate = `${(dd[1]?dd:"0"+dd[0])}/${(mm[1]?mm:"0"+mm[0])}/${yyyy}`;
        const answerbasic = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2b2d31")
        .addFields(
          { name: "Id del Backup:" , value: "```" + `${backupInfos.id}`+ "```", inline: true },

          { name: "Tamaño de los Backup:" , value: "```"+`${backupInfos.size} kb`+"```", inline: true },

          { name: "Creado el:", value: "```" + `${formatedDate}` + "```", inline: true},
          );    
       interaction.editReply({ embeds: [answerbasic], ephemeral: false })
        }).catch((err) => { return interaction.editReply({embeds: [missingbcks], ephemeral: false})});
        

    }

}