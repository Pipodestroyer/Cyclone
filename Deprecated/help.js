const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'help',
    description: "this command kicks a member!",
    execute(message, args, Client){

        let defaultPrefix = "!!";

        const emojicheck = Client.emojis.cache.find(emoji => emoji.name === "Ax_GreenIndicator");

        let guildPrefix = "!"
        if (!guildPrefix) guildPrefix = defaultPrefix;

        const ayudamoderacion = new MessageEmbed()
        .setAuthor(`Comandos de TheBackupBoi`, Client.user.displayAvatarURL())
            .addField("<:member_list:891468437296128010> **Moderación**",`Ayuda detallada sobre un comando: `+"`"+`${guildPrefix}`+"help <comando>` \nPara ayuda adicional, abre un ticket en <#870798234178686977>")
            .addField("<:rules:891468433709994055> **Comandos**","```clear```")

        const ayudaconfig = new MessageEmbed()
        .setAuthor(`Comandos de TheBackupBoi`, Client.user.displayAvatarURL())
            .addField("<:neutral:891468428060282890> **Configuración**",`Ayuda detallada sobre un comando: `+"`"+`${guildPrefix}`+"help <comando>` \nPara ayuda adicional, abre un ticket en <#870798234178686977>")
            .addField("<:rules:891468433709994055> **Comandos**","```setprefix           setsuggestions           setsuggest"+"\nlog```")


        const ayudabackups = new MessageEmbed()
        .setAuthor(`Comandos de TheBackupBoi`, Client.user.displayAvatarURL())
            .addField("<<:tick_verification_black:891468428500664341> **Copias De Seguridad**",`Ayuda detallada sobre un comando: `+"`"+`${guildPrefix}`+"help <comando>` \nPara ayuda adicional, abre un ticket en <#870798234178686977>")
            .addField("<:rules:891468433709994055> **Comandos**","```backup            backupinfo             backupload```")

        const ayudasuggestions = new MessageEmbed()
        .setAuthor(`Comandos de TheBackupBoi`, Client.user.displayAvatarURL())
            .addField("<:text_channel:891468445777006602> **Sugerencias**",`Ayuda detallada sobre un comando: `+"`"+`${guildPrefix}`+"help <comando>` \nPara ayuda adicional, abre un ticket en <#870798234178686977>")
            .addField("<:rules:891468433709994055> **Comandos**","```suggest              accept                 deny"+"\nmaybe```")

        const ayudabasica = new MessageEmbed()
            .setAuthor(Client.user.username + `✨`, Client.user.displayAvatarURL())
            .setTitle(`${emojicheck} **Menú Help**`)
            .setDescription("Mi prefix actual es: "+"`"+`${guildPrefix}`+"`"+" \nTengo `4` categorias y `12` comandos para usar.\n \nLista de comandos: "+"`"+`${guildPrefix}help <categoria>`+"`"+"\nComando en detalle: `"+`${guildPrefix}help <comando>`+"` \n")
            .addField(`${emojicheck} **Categorías**`, "`"+`${guildPrefix}help backups`+"` ∷ <:tick_verification_black:891468428500664341> Copias De Seguridad \n"+"`"+`${guildPrefix}help suggestions`+"` ∷ <:text_channel:891468445777006602> Sugerencias\n"+"`"+`${guildPrefix}help mod`+"` ∷ <:member_list:891468437296128010> Moderación\n"+"`"+ `${guildPrefix}help config`+"` ∷ <:neutral:891468428060282890> Configuración")
            .addField(`${emojicheck} **Enlaces útiles**`, `[@Twitter](https://twitter.com/NPokita) | [Github](https://github.com/Pipodestroyer)`)

        let ayuda = args[0];    
        if(!ayuda) return message.channel.send(ayudabasica)
        if(ayuda === "backups")return message.channel.send(ayudabackups)
        if(ayuda === "suggestions")return message.channel.send(ayudasuggestions)
        if(ayuda === "mod")return message.channel.send(ayudamoderacion)
        if(ayuda === "config")return message.channel.send(ayudaconfig)

        const ayudasuggest = new MessageEmbed()
        .setAuthor(`Comando suggest`, Client.user.displayAvatarURL())
        .setDescription("Aporta al server con tu sugerencia.")
        .addField("**Uso**","`"+`${guildPrefix}suggest <sugerencia>`+"`")
        .addField("**Ejemplos**","`"+`${guildPrefix}suggest Nuevos colores para los roles!`+"`")
        .addField("**Permisos del bot**","Leer Mensajes \nEnviar mensajes", true)
        .addField("**Permisos del usuario**", "Cualquiera", true)
        .setFooter("Sintaxis: <requerido> [opcional]")

        const ayudaaccept = new MessageEmbed()
        .setAuthor(`Comando accept`, Client.user.displayAvatarURL())
        .setDescription("Accepta una sugerencia.")
        .addField("**Uso**","`"+`${guildPrefix}accept <ID de la sugerencia> <razon>`+"`")
        .addField("**Ejemplos**","`"+`${guildPrefix}accept 871229056769749002 Definitivamente lo haremos!.`+"`")
        .addField("**Permisos del bot**","Leer Mensajes \nEnviar mensajes", true)
        .addField("**Permisos del usuario**", "Administrador", true)                                                                   
        .setFooter("Sintaxis: <requerido> [opcional]")

        const ayudadeny = new MessageEmbed()
        .setAuthor(`Comando deny`, Client.user.displayAvatarURL())
        .setDescription("Deniega una sugerencia.")
        .addField("**Uso**","`"+`${guildPrefix}deny <ID de la sugerencia> <razon>`+"`")
        .addField("**Ejemplos**","`"+`${guildPrefix}deny 871229056769749002 No, en este momento no.`+"`")
        .addField("**Permisos del bot**","Leer Mensajes \nEnviar mensajes", true)
        .addField("**Permisos del usuario**", "Administrador", true)                                                                   
        .setFooter("Sintaxis: <requerido> [opcional]")

        const ayudamaybe = new MessageEmbed()
        .setAuthor(`Comando maybe`, Client.user.displayAvatarURL())
        .setDescription("Deja una sugerencia en posibilidad.")
        .addField("**Uso**","`"+`${guildPrefix}maybe <ID de la sugerencia> <razon>`+"`")
        .addField("**Ejemplos**","`"+`${guildPrefix}maybe 871229056769749002 Puede que lo hagamos en el futuro.`+"`")
        .addField("**Permisos del bot**","Leer Mensajes \nEnviar mensajes", true)
        .addField("**Permisos del usuario**", "Administrador", true)                                                                   
        .setFooter("Sintaxis: <requerido> [opcional]")

        const ayudaclear = new MessageEmbed()
        .setAuthor(`Comando clear`, Client.user.displayAvatarURL())
        .setDescription("Elimina mensajes en un instante.")
        .addField("**Uso**","`"+`${guildPrefix}clear <cantidad>`+"`")
        .addField("**Ejemplos**","`"+`${guildPrefix}clear 32`+"`")
        .addField("**Permisos del bot**","Leer Mensajes \nEnviar mensajes\nEliminar mensajes", true)
        .addField("**Permisos del usuario**", "Gestionar mensajes", true)
        .setFooter("Sintaxis: <requerido> [opcional]")

        const ayudabackup = new MessageEmbed()
        .setAuthor(`Comando backup`, Client.user.displayAvatarURL())
        .setDescription("Crea una copia de seguridad.")
        .addField("**Uso**","`"+`${guildPrefix}backup`+"`")
        .addField("**Ejemplos**","`"+`${guildPrefix}backup`+"`")
        .addField("**Permisos del bot**","Administrador", true)
        .addField("**Permisos del usuario**", "Administrador", true)
        .setFooter("Sintaxis: <requerido> [opcional]")

        const ayudabackupload = new MessageEmbed()
        .setAuthor(`Comando backupload`, Client.user.displayAvatarURL())
        .setDescription("Carga una copia de seguridad existente.")
        .addField("**Uso**","`"+`${guildPrefix}backupload <ID del backup>`+"`")
        .addField("**Ejemplos**","`"+`${guildPrefix}backupload 871928509692510208`+"`")
        .addField("**Permisos del bot**","Administrador", true)
        .addField("**Permisos del usuario**", "Este comando es privado.", true)
        .setFooter("Sintaxis: <requerido> [opcional]")

        const ayudabackupinfo = new MessageEmbed()
        .setAuthor(`Comando backupinfo`, Client.user.displayAvatarURL())
        .setDescription("Obten informacion sobre un backup.")
        .addField("**Uso**","`"+`${guildPrefix}backupinfo <ID del backup>`+"`")
        .addField("**Ejemplos**","`"+`${guildPrefix}backupinfo 871928509692510208`+"`")
        .addField("**Permisos del bot**","Administrador", true)
        .addField("**Permisos del usuario**", "Administrador", true)
        .setFooter("Sintaxis: <requerido> [opcional]")

        const ayudasetprefix = new MessageEmbed()
        .setAuthor(`Comando setprefix`, Client.user.displayAvatarURL())
        .setDescription("Cambia el prefix del servidor.")
        .addField("**Uso**","`"+`${guildPrefix}setprefix <prefix[default]>`+"`")
        .addField("**Ejemplos**","`"+`${guildPrefix}setprefix !!`+"`")
        .addField("**Permisos del bot**","Leer Mensajes \nEnviar mensajes", true)
        .addField("**Permisos del usuario**", "Administrador", true)
        .setFooter("Sintaxis: <requerido> [opcional]")

        const ayudasetsuggest = new MessageEmbed()
        .setAuthor(`Comando setsuggest`, Client.user.displayAvatarURL())
        .setDescription("Elige el canal para enviar sugerencias.")
        .addField("**Uso**","`"+`${guildPrefix}setsuggest <ID del canal>`+"`")
        .addField("**Ejemplos**","`"+`${guildPrefix}setsuggest 774809444064297000`+"`")
        .addField("**Permisos del bot**","Leer Mensajes \nEnviar mensajes", true)
        .addField("**Permisos del usuario**", "Administador", true)
        .setFooter("Sintaxis: <requerido> [opcional]")

        const ayudasetsuggestions = new MessageEmbed()
        .setAuthor(`Comando setsuggestions`, Client.user.displayAvatarURL())
        .setDescription("Elige el canal para enviar los mensajes de sugerencias.")
        .addField("**Uso**","`"+`${guildPrefix}setsuggestions <ID del canal>`+"`")
        .addField("**Ejemplos**","`"+`${guildPrefix}setsuggestions 774809444064297000`+"`")
        .addField("**Permisos del bot**","Leer Mensajes \nEnviar mensajes", true)
        .addField("**Permisos del usuario**", "Administador", true)
        .setFooter("Sintaxis: <requerido> [opcional]")

        const ayudalogs= new MessageEmbed()
        .setAuthor(`Comando logs`, Client.user.displayAvatarURL())
        .setDescription("Obten la ultima actualizacion de backup!.")
        .addField("**Uso**","`"+`${guildPrefix}logs`+"`")
        .addField("**Ejemplos**","`"+`${guildPrefix}logs`+"`")
        .addField("**Permisos del bot**","Leer Mensajes \nEnviar mensajes", true)
        .addField("**Permisos del usuario**", "Administador", true)
        .setFooter("Sintaxis: <requerido> [opcional]")


    

        if(ayuda === "suggest")return message.channel.send(ayudasuggest)
        if(ayuda === "accept")return message.channel.send(ayudaaccept)
        if(ayuda === "deny")return message.channel.send(ayudadeny)
        if(ayuda === "maybe")return message.channel.send(ayudamaybe)
        if(ayuda === "clear")return message.channel.send(ayudaclear)
        if(ayuda === "backup")return message.channel.send(ayudabackup)
        if(ayuda === "backupload")return message.channel.send(ayudabackupload)
        if(ayuda === "backup-info")return message.channel.send(ayudabackupinfo)
        if(ayuda === "setprefix")return message.channel.send(ayudasetprefix)
        if(ayuda === "setsuggest")return message.channel.send(ayudasetsuggest)
        if(ayuda === "setsuggestions")return message.channel.send(ayudasetsuggestions)
        if(ayuda === "log")return message.channel.send(ayudalogs)

        
    }
}
