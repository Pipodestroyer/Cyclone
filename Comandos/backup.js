const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const backup = require("discord-backup");
backup.setStorageFolder(__dirname+"/backups/");
const { Permissions } = require('discord.js')

module.exports = { //esto es nescesario, es lo que necesita slashcommands.js para poner la info de tu comando
    
    

    data: new SlashCommandBuilder()
    .setName("backup") // nombre del slash
    .setDescription("Hace una copia de seguridad."), //descripcion

    async run(client, interaction, message){ //va asta aqui luego de esta linea empieza tu codigo.
        
        let Autor = interaction.member

        let Permisos = Autor.permissions.has(Permissions.FLAGS.ADMINISTRATOR)

        const user = client.users.cache.get(interaction.member.user.id);



        const missingperms = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```No tienes los permisos necesarios para usar este comando.```");

        const think = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Generando el Backup...```");

        const rest = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```El bot no cuenta con los permisos de Administrador para hacer esto.```");

        if (!Permisos){
          return interaction.reply({
          embeds: [missingperms], ephemeral: true
          });
        } else 
        interaction.reply({ embeds:[think], ephemeral: false})
        
        backup.create(interaction.guild, {
            jsonBeautify: true,
            saveImages: "base64",
            maxMessagesPerChannel: 3
        }).then((backupData) => {

        const answerbasic = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Backup: "+backupData.id+"```");

       interaction.editReply({ embeds: [answerbasic], ephemeral: false })
        });

    } //termina aqui

}