const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const backup = require("discord-backup");
backup.setStorageFolder(__dirname+"/backups/");
const { Permissions } = require('discord.js')
const { awaitMessages } = require('discord.js')
const client = new Discord.Client({ intents: 13839 });

module.exports = {
      
      data: new SlashCommandBuilder()
     .setName("delbackup")
     .setDescription("Borra un backup.")
     .addStringOption(option => option.setName("backup").setDescription("Id del Backup que se va a Borrar.").setRequired(true)),
    

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
        .setDescription("```No se recibio llave, El Backup no se eliminara.``")

        const Keyaccept = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```llave correcta, El Backup fue eliminado.```")

        const Keywrong = new MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```llave incorrecta, el proceso se cancelara.```")

        let key = "JK3M9_8MLNH3_NMRFA42"

        const missingperms = new MessageEmbed()
        .setColor("#c7b9b1")
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
        

    backup.fetch(id).then(async () => {

      interaction.reply({embeds: [Confidencial], ephemeral: true})
        let firstMsg = await user.send({ embeds: [Keym] })

        let filter = () => true;


        firstMsg.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] }).then(collected => {
          console.log(collected.first().content)
          let password = collected.first().content
          if(password !== key){
            return firstMsg.edit({ embeds:[Keywrong]})
          } else
          firstMsg.edit({ embeds:[Keyaccept] })
          backup.remove(id);
        }).catch(collected => {
          firstMsg.edit({ embeds:[Keytime]})
        });

          
        
       
        
      }).catch((err) => { return interaction.reply({embeds: [missingbcks], ephemeral: true})});
    
    }
}