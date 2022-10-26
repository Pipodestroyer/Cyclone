
//Notes by the dev: Pokita#1224

module.exports = {
    name: 'maybe',
    description: "this command kicks a member!",
    run: async (message, args, Client) => {
        
        const configuracion = require("./config.json")

        let old = configuracion.key;

        let canaloficial = configuracion.canaldeenvio;


        //if the member don't have the nescesary perms send an a error message.

        const { Discord, MessageEmbed } = require("discord.js");

        const permissionslost = new MessageEmbed()
         .setDescription(`<:Ax_XSign:865072335874162708> | Hey **${message.author.tag}** no tienes los permisos nescesarios para hacer eso!.`)

        if(!message.member.permissions.has("ADMINISTRATOR")) return user.send(permissionslost).then(msg => {
            message.delete();
            msg.delete({ timeout: 10000 });
        });

        //now get the args and define the reason.
        const messageID = args[0];
        const maybesuggest = args.slice(1).join(" ");

        //If the message ID doesn't exist.
        const MissingIDArgs = new MessageEmbed()
         .setDescription(`<:Ax_XSign:865072335874162708> | Porfavor especifica una ID valida **${message.author.tag}**`)

        if(!messageID) return message.reply(MissingIDArgs).then(msg => {
            message.delete();
            msg.delete({ timeout: 10000 });
        });

        //if the reason was not specified.
        const MissingArguments = new MessageEmbed()
         .setDescription(`<:Ax_XSign:865072335874162708> | Porfavor especifica una razon **${message.author.tag}**`)

        if(!maybesuggest) return message.reply(MissingArguments).then(msg => {
            message.delete();
            msg.delete({ timeout: 10000 });
        });

        //If everything goes nice try{}.
        try{
            const suggestionChannel = message.guild.channels.cache.get(
                canaloficial
            );
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
            console.log(suggestedEmbed)
            const data = suggestedEmbed.embeds[0];
            const maybeEmbed = new MessageEmbed()
             .setAuthor(data.author.name, data.author.iconURL)
             .setDescription(data.description)
             .setColor("#ffee30")
             .addField(`Sugerencia respondida: (por ${message.author.tag})`, `> ${maybesuggest}`)
             .setFooter("La sugerencia ha sido dejada en posibilidad!")
             .setTimestamp()
            suggestedEmbed.edit(maybeEmbed).then(m => {
                m.reactions.removeAll();
            });

            //Now find who is the author of the message.

            const user = await Client.users.cache.find(
                (u) => u.tag === data.author.name
            );

            const catchederruno = new MessageEmbed()
                .setDescription(`<:Ax_IconWarning:868350055323680769> | Parece que **${data.author.name}** ha cambiado de tag o nombre, no se le podra avisar que su sugerencia fue respondida.`)

            if(!user) return (
                message.channel.send(catchederruno).then(msg => {
                    message.delete();
                    msg.delete({ timeout: 10000 });
                })
            )
    

            const response = new MessageEmbed()
             .setDescription(`<:Ax_IconServerInsights:865381706139435018> | **Tu sugerencia ha quedado como una posibilidad!**\n<:Ax_IconLockedTextChannel:865075182464401458> | **Razon:** ${maybesuggest} \n <:Ax_IconPin:865078462394269706> | **Administrador:** ${message.author.tag}`)

            user.send(response).then(m => {
                message.delete();
            });

            //If there was an error just send this.

        } catch (err) {
            const catchederr = new MessageEmbed()
             .setDescription(`<:Ax_XSign:865072335874162708> | Hey **${message.author.tag}** Esa sugerencia no existe.`)

            console.log(err);
            message.channel.send(catchederr).then(msg => {
                message.delete();
                msg.delete({ timeout: 10000 });
            });
        }



        
    }
}