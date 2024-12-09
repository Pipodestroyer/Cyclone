const { SlashCommandBuilder } = require("discord.js")
const { EmbedBuilder } = require("discord.js")
const backup = require('discordio-backup');
backup.setStorageFolder(__dirname+"/Data/backups");
const { PermissionsBitField, IntentsBitField } = require('discord.js')
const { awaitMessages } = require('discord.js');
const { config } = require("dotenv");
config.env
const { Client, GatewayIntentBits } = require('discord.js');
const { fdatasync, existsSync } = require("node:fs");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('node:fs');
const chalk = require('chalk');

module.exports = { //este comando requiere una renovacion de sus fields.

    subCommand: "backup.create",

    async run(client, interaction, message, process){ //sera bueno organizar las constantes.
        
        let Autor = interaction.member
        const userbeforechek = client.users.cache.get(interaction.member.user.id);
        const guildsave = interaction.guild.id
        const mensajespercanal = interaction.options.getString('mensajes')
        const tipodeimagen = interaction.options.getString('imagenes')
        const canalessiono = interaction.options.getString('canales')
        const emojissiono = interaction.options.getString('emojis')
        const banssiono = interaction.options.getString('bans')
        const rolessiono = interaction.options.getString('roles')

        const botperms = new EmbedBuilder()
        .setAuthor({ name: `${userbeforechek.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Cyclone requiere de permisos de administrador para funcionar.```");

        const somethingwentbad = new EmbedBuilder()
        .setAuthor({ name: `${userbeforechek.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Algo parece estar mal, revisa si cyclone tiene permisos de administrador.```");

        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)){
         return interaction.reply({ embeds:[botperms], ephemeral: false })
        }

        const user = client.users.cache.get(interaction.member.user.id);
        let Permisos = Autor.permissions.has(PermissionsBitField.Flags.Administrator)
        backup.setStorageFolder(__dirname+"/Data/backups"+`/${guildsave}/`);
        if(!fs.existsSync(__dirname+"/Data/backups"+`/${guildsave}/`)){
            fs.mkdirSync(`${guildsave}`)
            
        }

        const Exeso = new EmbedBuilder()
        .setAuthor({ name: `${userbeforechek.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```"+"El servidor llego al limite de 5 copias de seguridad, elimina una para poder continuar.```");

        const sizeoffolder = fs.readdirSync(__dirname+"/Data/backups"+`/${guildsave}/`).length
        if("5" == `${sizeoffolder}`){
            return interaction.reply({ embeds:[Exeso], ephemeral: false })
        }

        const Code404 = new EmbedBuilder()
        .setAuthor({ name: `${userbeforechek.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```"+"Tienes que primero registrar un codigo con el comando "+"/configuration code"+" antes de poder usar cyclone, solo el propietario puede hacer este registro.```");


        if(!fs.existsSync(__dirname+"/Data/ServerData"+`/${guildsave}/`)){
          return interaction.reply({embeds: [Code404] , ephemeral: false });
       }

        const errorchecknan = new EmbedBuilder()
        .setAuthor({ name: `${userbeforechek.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```"+mensajespercanal+" no es un numero de mensajes validos."+"```");

        const overlimit = new EmbedBuilder()
        .setAuthor({ name: `${userbeforechek.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```"+mensajespercanal+" exede el limite de 13 mensajes por canal."+"```");

        if(mensajespercanal === NaN){
            return interaction.reply({ embeds: [errorchecknan], ephemeral: false })
        }

        if( 13 < mensajespercanal){
            return interaction.reply({ embeds: [overlimit], ephemeral: false })
        }

        const missingperms = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```No tienes los permisos necesarios para usar este comando.```");

        const think = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Estamos preparando algunas cosas...```");

        const rest = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```El bot no cuenta con los permisos de Administrador para hacer esto.```");

        const notice = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Este codigo es usado para cargar la copia de seguridad.```");

        var estadofinal = `${canalessiono}, ${rolessiono}, ${banssiono}, ${emojissiono}`

        var regex = /([crbe])\w+/g;

        if(estadofinal === "null, null, null, null"){
            var matches_array = "Todo el servidor fue guardado."
        } else {

            var matches_array = estadofinal.match(regex);

        }

        if (!Permisos){
          return interaction.reply({
          embeds: [missingperms], ephemeral: true
          });
        } 
        await interaction.reply({ embeds:[think], ephemeral: false})

       await backup.create(interaction.guild, {
            jsonBeautify: true,
            saveImages: `${tipodeimagen}`,
            doNotBackup: [ `${canalessiono}`,  `${rolessiono}`, `${banssiono}`, `${emojissiono}` ],
            maxMessagesPerChannel: mensajespercanal
        }).then((backupData) => {

            const answerbasic = new EmbedBuilder()
            .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setColor("#2F3136")
            .addFields(
                { name: "Codigo de la Copia de seguridad:" , value: "```" + `${backupData.id}`+ "```", inline: true },
                { name: "Tipo de Imagenes:" , value: "```"+tipodeimagen+"```", inline: true },
                { name: "Mensajes por canal:" , value: "```"+mensajespercanal+"```", inline: true },
                { name: "Uso:" , value: "```Este codigo es usado para cargar la copia de seguridad.```", inline: true },
                { name: "No se guardo:" , value: "```"+`${matches_array}`+"```", inline: false },
                )
            .setFooter({ text: "Recuerda que puedes revisar todas las copias de seguridad con: /backup list"})

            //por privacdad esto sera eliminado en produccion, esto solo esta para asegurarse que las copias de seguridad si se esten creando y si tengan las propiedades correctas.

            console.log(chalk.whiteBright.bgHex('#ebff69').bold("🚦 | New System Message"))
            console.log(chalk.whiteBright.bgHex('#ebff69')(`The backup was succesful | guild: "${interaction.guild.name}" | Backup id: "${backupData.id}" | user: "${user.username}" `))
    
           interaction.editReply({ embeds: [answerbasic], ephemeral: false })
            })
            
        

    } //termina aqui




}