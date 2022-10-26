module.exports = {
    name: 'backupload',
    description: "this command loads a backup. need the ID",
    execute(message, args, Client){
        const { MessageEmbed } = require('discord.js');
        const Discord = require("discord.js");
        const backup = require("discord-backup");
          backup.setStorageFolder(__dirname+"/backups/");
        
        //
        
        const emojicheck = Client.emojis.cache.find(emoji => emoji.name === "check");

        const missingpermissions = new MessageEmbed()
        .setDescription("<:x_x:891446871862685757> | ¡Lo siento pero debes de tener el acceso privado a este comando!")
        const missingargs = new MessageEmbed()
        .setDescription(`<:x_x:891446871862685757> | ¡Necesito que especifiques una ID valida!`)
        const accept = new MessageEmbed()
        .setDescription(`<:neutral:891446863042080839> | ¿Estas seguro? ¡cuando se carge el backup todo va a ser reemplazado! Para continuar reacciona con <:check:891468434855055370>`)
        const timederror = new MessageEmbed()
        .setDescription("<:x_x:891446871862685757> | ¡Tardaste demasiado! `cancelare la accion...`")
        const backupready = new MessageEmbed()
        .setDescription("<:tick_verification_black:891468428500664341> | ¡Listo! `Esta operacion tomara unos minutos en completarse...`")
        const catcherr = new MessageEmbed()
        .setDescription("<:x_x:891446871862685757> | Ah ocurrido un error durante la carga, esto pudo suceder por falta del permisos como `{ADMINISTRATOR}` verifica que los tengo.")

        
              
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        if(!message.author.id === "844571216856875058"){
                    return message.channel.send(missingpermissions);
                }
                if(!message.author.id === "356428292158390282"){
                    return message.channel.send(missingpermissions);
                } 
                if(!message.author.id === "774108598912942122"){
                    return message.channel.send(missingpermissions);
                } 
                let backupID = args[0];
                if(!backupID){
                    return message.channel.send(missingargs);
                }
                backup.fetch(backupID).then(async () => {
                    message.channel.send(accept).then(m => {
                        m.react(emojicheck)
                    const filtro = (reaction, user) => {
                    return [emojicheck].includes(reaction.emoji) && user.id == message.author.id;
                    };
                        m.awaitReactions(filtro, {
                            max: 1,
                            time: 20000,
                            errors: ["time"]
                        }).catch(() => {
                            m.edit(timederror);
                        }).then(coleccionado => {
                        const reaccion = coleccionado.first();
                        if(reaccion.emoji = emojicheck){

                          message.author.send(backupready);
                          backup.load(backupID, message.guild).then(() => {
                              backup.remove(backupID);
                          }).catch((err) => {
                              return message.author.send(catcherr);
                          });
                };
                        })
                    })
            });
    } 
}