const { SlashCommandBuilder, Sticker } = require("discord.js")
const { EmbedBuilder } = require("discord.js")
const { PermissionsBitField, IntentsBitField, ActionRowBuilder, SelectMenuBuilder, ComponentType } = require('discord.js')
const { awaitMessages } = require('discord.js');
const { config } = require("dotenv");
config.env
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,] });
const fs = require('node:fs');
const fastFolderSizeSync = require('fast-folder-size/sync');
const { time } = require("node:console");

module.exports = {
  
    subCommand: "configuration.code",
    

    async run(client, interaction, message, process){

        let Autor = interaction.member
        let Permisos = Autor.permissions.has(PermissionsBitField.Flags.Administrator)
        const guildsave = interaction.guild.id

        const user = client.users.cache.get(interaction.member.user.id);

        const botperms = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Cyclone requiere de permisos de administrador para funcionar.```");

        const missingperms = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```No tienes los permisos necesarios para usar este comando.```");

        const somethingwentbad = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Algo parece estar mal, revisa si cyclone tiene permisos de administrador.```");

        const privado = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```La siguiente configuracion es importante, se procedera mediante mensajes privados.```");

        const mensajeusuario = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Escribe aqui porfavor el codigo que se usara en el servidor, ten cuidado porque cualquier mensaje apartir de ahora se guardara como el codigo, tienes 60 segundos para elegir un codigo, maximo 12 caracteres.```");
        
        const timeout = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Se acabo el tiempo de espera.```");

        const muylargo = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Este codigo exede los 12 caracteres maximos, no es valido.```");

  

        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)){
         return interaction.reply({ embeds:[botperms], ephemeral: false })
        }
        if (interaction.guild.ownerId !== interaction.member.user.id){
          return interaction.reply({
          embeds: [missingperms], ephemeral: true
          });
        }



        if(!fs.existsSync(__dirname+"/Data/ServerData"+`/${guildsave}/`)){

          fs.mkdirSync(__dirname+"/Data/ServerData"+`/${guildsave}/`)

          var caja = {
            codigo:[

            ]
          }

          interaction.reply({ embeds:[mensajeusuario], ephemeral: true})

          const filter = interaction => {
            return interaction.member.user.id === interaction.member.user.id;
          };

          interaction.channel.awaitMessages({filter, max: 1, time: 60000, errors: ['time'] }).then(collected => {
            let codeending = collected.first().content
            if(12 < codeending.length){
              return fs.rmSync(__dirname+"/Data/ServerData"+`/${guildsave}/`, { recursive: true, force: true }),
              collected.first().delete(),
              interaction.editReply({ embeds:[muylargo], ephemeral: true })
              
            }
            collected.first().delete()

            caja.codigo.push(`${codeending}`);

            var json = JSON.stringify(caja);

            const finalmente = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```"+`Vale el codigo configurado para este servidor sera: ${codeending} \nEl codigo se recomienda escribirlo en un papel y solo darselo a administradores de alta confianza.`+"```");

            fs.writeFileSync(__dirname+"/Data/ServerData"+`/${guildsave}/${guildsave}.json`, json);

            interaction.editReply({ embeds:[finalmente] , ephemeral: true })

          }).catch((err) => {
            interaction.editReply({ embeds:[timeout]})
            fs.rmSync(__dirname+"/Data/ServerData"+`/${guildsave}/`, { recursive: true, force: true })
          });
          

       } else {

        //
        //Definiciones
        //

        const package = require("./package.json");
        let version = package.version
        let branch = package.branch
        let keystring = fs.readFileSync(__dirname+"/Data/ServerData"+`/${guildsave}/${guildsave}.json`)
        const bytes = fastFolderSizeSync(__dirname+"/Data/backups"+`/${guildsave}/`)
        const sizeoffolder = fs.readdirSync(__dirname+"/Data/backups"+`/${guildsave}/`).length
        let student = JSON.parse(keystring);
        let keyending = student.codigo
        var key = `${student.codigo}`
        const filter = i => i.customId === 'owneroption';
        const filtermessages = i => {
          return i.user.id === interaction.user.id;
        };
        var caja = {
          codigo:[]
        }

        //
        //Component
        //

        const opcionesowner = new ActionRowBuilder()
        .addComponents(
          new SelectMenuBuilder()
          .setCustomId('owneroption')
          .setPlaceholder('¿Que quieres hacer?')
          .addOptions(
            {
              label: "Cambiar el codigo.",
              description:"Cambia el codigo actual de seguridad.",
              value:"opcion_uno"
            },
          )
        );

        //
        //Embeds
        //
      
        const advicecode = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Escribe el nuevo codigo del servidor, tienes un maximo de 12 caracteres y 60s para enviar el codigo, todo mensaje tuyo apartir de ahora se guardara como el codigo.```")

        const codigosiexiste = new EmbedBuilder()
        .setAuthor({ name: `Bienvenido Denuevo ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .addFields(
          { name: "Codigo de seguridad del servidor:" , value: "```" + `${key}`+ "```", inline: true },

          { name: "Peso de todas las copias de seguridad:" , value: "```"+`${(bytes /1024/1024 ).toFixed(3)}MB`+"```", inline: true },

          { name: "Cantidad de copias de seguridad:", value: "```" + `${sizeoffolder}/5` + "```", inline: true },
          )
        .setFooter({ text:`Running v${version} ${branch}. `});

        const finalmente = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```"+`Vale el nuevo codigo para este servidor sera: ${changecode} \nEl codigo se recomienda escribirlo en un papel y solo darselo a administradores de alta confianza.`+"```");

        //
        //Codigo
        //

        dashboard = await interaction.reply({ embeds:[codigosiexiste], components:[opcionesowner] ,ephemeral: true, fetchReply: true })

        dashboard.awaitMessageComponent({
           filter,
           max: 1, 
           componentType: ComponentType.StringSelect, 
           time: 300000, 
           errors: ['time'] 
          }).then(interaction => {
          interaction.reply({ embeds:[advicecode], ephemeral:true })

            interaction.channel.awaitMessages({filtermessages, max: 1, time: 60000, errors: ['time'] }).then(collected => {

             let changecode = collected.first().content
             if(12 < changecode.length){ return collected.first().delete(), interaction.editReply({ embeds:[muylargo], ephemeral: true }) }
             collected.first().delete()
             caja.codigo.push(`${changecode}`);
             var json = JSON.stringify(caja);
             fs.unlinkSync(__dirname+"/Data/ServerData"+`/${guildsave}/${guildsave}.json`)
             fs.writeFileSync(__dirname+"/Data/ServerData"+`/${guildsave}/${guildsave}.json`, json);
             interaction.editReply({ embeds:[finalmente], ephemeral:true})

            }).catch((err) =>{

            console.log(err)
            interaction.editReply({ emebeds:[timeout], ephemeral: true})

           })

        }).catch((err) =>{

          console.log(chalk.whiteBright.bgRedBright.bold("❌ | Error | Catched"))
          console.log(chalk.whiteBright.bgRedBright(`${err}`))

        })
    }
  }
}