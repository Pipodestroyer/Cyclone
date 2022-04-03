const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const backup = require("discord-backup");
backup.setStorageFolder(__dirname+"/backups/");
const { Permissions } = require('discord.js')
const { awaitMessages } = require('discord.js');
const { watchFile } = require("fs");
const client = new Discord.Client({ intents: 13839 });

module.exports = {
      
      data: new SlashCommandBuilder()
     .setName("infbackup")
     .setDescription("Informacion de un backup.")
     .addStringOption(option => option.setName("backup").setDescription("Id del Backup a Cargar").setRequired(true)),
    

    async run( client, interaction, message ){

      // Definitions

        const id = interaction.options.getString('backup')

        let Autor = interaction.member

        let Permisos = Autor.permissions.has(Permissions.FLAGS.ADMINISTRATOR)

        const user = client.users.cache.get(interaction.member.user.id);

      // Embeds

        const Confidencial = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```La siguiente parte es confidencial, se procedera en tu MD```")

        const Keym = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Esperando entrada de llave...```")

        const Keytime = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```No se recibio llave, Deteniendo Backup```")

        const Keyaccept = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```llave correcta, el proceso empezara dentro de poco.```")

        const Keywrong = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```llave incorrecta, el proceso se cancelara.```")

        let key = "JK3M9_8MLNH3_NMRFA42"

        const missingperms = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```No tienes los permisos necesarios para ejecutar este comando.```")

        const missingbcks = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```El backup especificado no es valido.```")


      // Permissions

        
        if (!Permisos)
          return interaction.reply({
          embeds: [missingperms], ephemeral: true
        });



      // Code 
      
      
      backup.fetch(id).then((backupInfos) => {
        const date = new Date(backupInfos.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formatedDate = `${(dd[1]?dd:"0"+dd[0])}/${(mm[1]?mm:"0"+mm[0])}/${yyyy}`;
        let informacion = new Discord.MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            // Display the backup ID
            .addField("Id del backup:", "```"+backupInfos.id+"```", true)
            // Displays the server from which this backup comes
            .addField("Id del servidor:", "```"+backupInfos.data.guildID+"```", true)
            // Display the size (in mb) of the backup
            .addField("Tamaño:", "```"+`${backupInfos.size} kb`+"```", true)
            // Display when the backup was created
            .addField("Creado el:", "```"+formatedDate+"```", true)
            .setColor("#2F3136");

            interaction.reply({
                embeds: [informacion], ephemeral: true
            })
      }).catch((err) => { return interaction.reply({embeds: [missingbcks], ephemeral: true})});
    

        
    
  }
  
}
