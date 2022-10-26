module.exports = {
    name: 'backupinfo',
    description: "this command kicks a member!",
    execute(message, args, Client){

        const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const backup = require("discord-backup");
  backup.setStorageFolder(__dirname+"/backups/");

//Codigo



        let backupID = args[0];
        if(!backupID){
            return message.channel.send(
                new Discord.MessageEmbed()
                .setDescription("<:Ax_XSign:865072335874162708> | Necesitas especificar un ID valido!")
            )

        }
        // Fetch the backup
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
            let embed = new Discord.MessageEmbed()
                .setAuthor(Client.user.username, Client.user.displayAvatarURL())
                .setTitle("<:Ax_IconTickBlack:867490398208655400> **Informacion asociada a esa ID**")
                .addField("ID del backup:", "`"+`${backupInfos.id}`+"`", false)
                .addField("ID del servidor:", "`"+`${backupInfos.data.guildID}`+"`", false)
                .addField("Tamaño:", "`"+`${backupInfos.size} mb`+"`", false)
                .addField("Creado el:", "`"+`${formatedDate}`+"`", false)
            message.channel.send(embed);
        }).catch((err) => {
            // if the backup wasn't found
            return message.channel.send(
                 new Discord.MessageEmbed() 
                 .setDescription("<:Ax_XSign:865072335874162708> | Hey `"+`${message.author.tag}`+"No eh podido encontrar un backup con la ID:`"+backupID+"`!")
            )
        });
    }
}