const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const backup = require("discord-backup");
backup.setStorageFolder(__dirname+"/backups/");
const { Permissions } = require('discord.js');
const { watchFile } = require("fs");
const client = new Discord.Client({ intents: 13839 });

module.exports = {
    
    

    data: new SlashCommandBuilder()
    .setName("backuplist")
    .setDescription("lista de los backups."),

    async run(client, interaction, message){
        
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
        .setDescription("```Cargando los backups...```");

        if (!Permisos){
          return interaction.reply({
          embeds: [missingperms], ephemeral: true
          });
        } else 
        


        backup.list().then((backups) => {

        const answerbasic = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Lista de Todos los Backups.```\n"+"```Backups: \n"+backups+"```");

       interaction.reply({ embeds: [answerbasic], ephemeral: false })
        });
        

    }

}