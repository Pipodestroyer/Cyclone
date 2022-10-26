module.exports = {
    name: 'kick',
    description: "this command kicks a member!",
    run: async (message, args, Client) => {
        const { Discord, MessageEmbed } = require("discord.js");

        const MissingPermspubloc = new MessageEmbed()
        .setAuthor(`${message.author.tag}  |  No tienes los permisos para hacer esto.` , message.author.displayAvatarURL({ dynamic: true }))

        if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(MissingPermspubloc);

        let arg = args[0];

        const MissingArguments = new MessageEmbed()
        .setAuthor(`${message.author.tag}  |  Especifica un usuario al que hacerle kick.` , message.author.displayAvatarURL({ dynamic: true }))
        const Nouser = new MessageEmbed()
        .setAuthor(`${message.author.tag}  |  Usa la `+"ID"+` del usuario o mencionalo.` , message.author.displayAvatarURL({ dynamic: true }))
        const Missinguser = new MessageEmbed()
        .setAuthor(`${message.author.tag}  |  Parece que al usuario que buscas no existe o no se encuentra en este servidor.` , message.author.displayAvatarURL({ dynamic: true }))
        const missingpermissions = new MessageEmbed()
        .setAuthor(`${message.author.tag}  |  No cuentas con los permisos nescesarios para hacer esto.` , message.author.displayAvatarURL({ dynamic: true }))
        const Nous = new MessageEmbed()
        .setAuthor(`${message.author.tag}  |  No te puedes hacer kick a ti mismo!` , message.author.displayAvatarURL({ dynamic: true }))
        const Nopermissionsbot = new MessageEmbed()
        .setAuthor(`${message.author.tag}  |  Me hacen falta permisos para poder hacer esta accion.` , message.author.displayAvatarURL({ dynamic: true }))

        if(!arg)
        return message.channel.send(
            MissingArguments
        )

        const argusuario = arg.replace(/[\\<>@#&!]/g, "");
        console.log(argusuario)

        if(isNaN(argusuario)) return message.channel.send(Nouser)
        

        const Usuariokick = Client.users.cache.find(user => user.id === `${argusuario}`)
        console.log(Usuariokick)

        const Userisnan = new MessageEmbed()
        .setAuthor(`${message.author.tag}  |  No puedes hacerle kick a este usuario porque es de rango mayor o igual al tuyo.` , message.author.displayAvatarURL({ dynamic: true }))


        const usertagfromkick = Usuariokick.tag
        console.log(usertagfromkick)


        if(!Usuariokick)A
        return message.channel.send(
            (Missinguser)
        )

        let perms = message.member.hasPermission("KICK_MEMBERS");
        
        if(!perms)
        return message.channel.send(
            missingpermissions
        );

        if(Usuariokick === message.author)
        return message.channel.send(
            Nous
        );


        let missing = message.guild.me.hasPermission("KICK_MEMBERS");
        if(!missing)
        return message.channel.send(
            Nopermissionsbot
        );

        let notadmin = message.guild.me.hasPermission("ADMIN");
        if(!notadmin)
        return message.channel.send(
            Nopermissionsbot
        );

        const Userisnanperodos = new MessageEmbed()
        .setAuthor(`${message.author.tag}  |  No puedo hacerle kick a este usuario porque los roles de el son mayores a los mios!.` , message.author.displayAvatarURL({ dynamic: true }))

        if(message.guild.members.resolve(Usuariokick).roles.highest.position > message.guild.members.resolve(message.author).roles.highest.position)
        return message.channel.send(Userisnan);

        if(message.guild.members.resolve(Usuariokick).roles.highest.position > message.guild.members.resolve(Client.user).roles.highest.position)
        return message.channel.send(Userisnanperodos);

        const memberTarger = message.guild.members.cache.get(argusuario);
        let reazon = args.slice(1).join(" ");
        if(!reazon) reason = "No se especifico una razon.";

        const urmoma = new MessageEmbed()
        .setAuthor(`${message.author.tag}  |  El usuario ${Usuariokick.tag} ha sido expulsado del servidor!` , message.author.displayAvatarURL({ dynamic: true }))

        const response = new MessageEmbed()
        .setAuthor(message.author.username , message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(Client.user.displayAvatarURL())
             .setDescription(`<:Ax_IconDiscordStaff:865075182053490710> Has sido Expulsado de **${message.guild.name}**\n<:Ax_IconLockedTextChannel:865075182464401458> | **Razon:** ${reazon} \n <:Ax_IconPin:865078462394269706> | **Moderador:** ${message.author.tag}`)


        if(Usuariokick){
            memberTarger.send(response) 
            memberTarger.kick({reason: `${reazon}`});
            message.channel.send(urmoma)
        }

        

    

    }
}