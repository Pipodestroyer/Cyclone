module.exports = {
    name: "clear",
    description: "this command kicks a member!",
    run: async (message, args, Client) => {

    const { Discord, MessageEmbed } = require("discord.js");

    let cantidad = args[0];

    const missingperms = new MessageEmbed()
    .setDescription(`<:Ax_XSign:865072335874162708> | Hey **${message.author.tag}** Para usar este comando debes de tener permisos de `+"`{MANAGE_MESSAGES}`"+`!`)
    const errorembed = new MessageEmbed()
    .setDescription(`<:Ax_XSign:865072335874162708> | Hey **${message.author.tag}** especifica numeros validos!`)
    const errorembeddos = new MessageEmbed()
    .setDescription(`<:Ax_XSign:865072335874162708> | Hey **${message.author.tag}** Algo ha salido mal, verifica que los mensajes aun se pueden borrar! `)

    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(missingperms).then(msg => {
        message.delete();
        msg.delete({ timeout: 10000 });
    });

    if(isNaN(cantidad) || cantidad < 1 || cantidad > 99 ) return message.channel.send(errorembed).then(msg => {
        message.delete();
        msg.delete({ timeout: 10000 });
    });

    message.channel.messages.fetch({limit: 100}).then( async e => {

        try{

            if( cantidad > e.size ){
                const amountone = new MessageEmbed()
                .setDescription(`<:Ax_CheckSign:865072335841132574> | Se eliminaron **${e.size}** mensajes!`)
                message.channel.bulkDelete(e.size).then( () =>{
                    return message.channel.send(amountone).then(msg => {
                        msg.delete({ timeout: 3000 });
                    });
                })
            } else {
                const amounttwo = new MessageEmbed()
                .setDescription(`<:Ax_CheckSign:865072335841132574> | Se eliminaron **${cantidad}** mensajes!`)
                message.channel.bulkDelete(parseFloat(cantidad) + parseFloat(1)).then( () =>{
                    return message.channel.send(amounttwo).then(msg => {
                        msg.delete({ timeout: 3000 });
                    });
                })
            }

        }catch(err){
            return message.channel.send(errorembeddos).then(msg => {
                message.delete();
                msg.delete({ timeout: 10000 });
            });
        }






























    })


        
    }
}