module.exports = {
    name: 'backup',
    description: "this command backup a member!",
    execute(message, args, Client){
  const { MessageEmbed } = require('discord.js');

  const Discord = require("discord.js");
       
  const backup = require("discord-backup");
  backup.setStorageFolder(__dirname+"/backups/");




	  
    let perms = message.member.hasPermission("ADMINISTRATOR");

    const missingperms = new MessageEmbed()
    .setDescription(
      "<:x_x:891468430027407391> | **Lo siento "+`${message.author}`+", Necesitas un rol de `administrador` para hacer eso!**"
    );

    if (!perms)
      return message.channel.send(
       missingperms
      );
    backup
      .create(message.guild, {
        jsonBeautify: true
      })
      .then(backupData => {
        // And send informations to the backup owner
        message.author.send(
          new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setTitle("<:tick_verification_black:891468428500664341> Esta va a ser la ID de este backup!")
          .setDescription("<:locked_channel:891468444439031838> Para cargar el backup, usa `"+`!!backupload ${backupData.id}`+"`")
          )
        message.channel.send(//backupData.id
          new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setTitle("<:tick_verification_black:891468428500664341> El backup fue creado con exito.")   
          .setDescription("<:member_list:891468437296128010> **La `ID` del nuevo backup ya fue generada! `revisa tu bandeja de mensajes...`**")
        );
      });
    }
}