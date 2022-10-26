const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'log',
    description: "this command kicks a member!",
    execute(message, args, Client){

        const Discord = require("discord.js");

        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(Client.user.username, Client.user.displayAvatarURL())
            .setTitle("<:Ax_IconTickBlack:867490398208655400> __**Actualizacion de cambios en The Backup Boi**__ <:Ax_IconTickBlack:867490398208655400> ")
            .setDescription("\n**__Anuncio De Cambios__** <:Ax_IconDev:865313443070345276> \n \n<:Ax_IconTextChannel:865075182472790058> Se mejoro la experiencia al navegar con el comando help. \n \n<:Ax_IconMemberList:865078462304747550> Ahora el canal para enviar tus sugerencias podra cambiar. \n<:Ax_IconWarning:868350055323680769> **Funcion de cambiarlo solo disponible para administradores**. \n \n<:Ax_IconPin:865078462394269706> Ahora el prefix del bot puede cambiar!\n <:Ax_IconWarning:868350055323680769> **Puedes revisar el prefix actual usando help**. \n \n<:Ax_IconLockedTextChannel:865075182464401458> Ahora se podran eliminar mensajes con el nuevo comando `clear`.  \n \n __**Futuras actualizaciones**__ <:Ax_IconBot:865313442985803796> \n \n<:Ax_AnnoucementsChannel:865075183471427594> Se esta trabajando en una futura actualizacion para agregar los comandos: `kick`, `ban` y `warn`.")
            .setThumbnail("https://cdn.discordapp.com/attachments/774809444064297000/866163735562289193/865381669295882301.png")
            .setFooter("Actualizaciones Backup Boi")
            .setImage("https://cdn.discordapp.com/attachments/784985912185847820/866197608279048192/BannerOficial.png")
            .setTimestamp()



        )
        
    }
}