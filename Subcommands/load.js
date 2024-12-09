const { SlashCommandBuilder } = require("discord.js")
const { EmbedBuilder } = require("discord.js")
const backup = require("discordio-backup");
const { PermissionsBitField, IntentsBitField } = require('discord.js')
const { awaitMessages } = require('discord.js');
const { config } = require("dotenv");
config.env
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
      
      subCommand:"backup.load",
    

    async run( client, interaction, message ){ //este codigo mayormente es funcional, no hay nada necesario de añadir.

      // Definitions

      const fs = require('node:fs');

        const id = interaction.options.getString('backup')

        const password = interaction.options.getString('codigo')

        const clearbefore = interaction.options.getString('limpiar')

        let Autor = interaction.member

        let Permisos = Autor.permissions.has(PermissionsBitField.Flags.Administrator)
        const guildsave = interaction.guild.id

        const user = client.users.cache.get(interaction.member.user.id);
        const Code404 = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```"+"Tienes que primero registrar un codigo con el comando "+"/configuration code"+" antes de poder usar cyclone, solo el propietario puede hacer este registro.```");


        if(!fs.existsSync(__dirname+"/Data/ServerData"+`/${guildsave}/`)){
          return interaction.reply({embeds: [Code404] , ephemeral: true });
       }
        const parsenot = fs.readFileSync(__dirname+"/Data/ServerData"+`/${guildsave}/${guildsave}.json`)
        let keystring = JSON.parse(parsenot)
        let key = `${keystring.codigo}`

      // Embeds

      const botperms = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Cyclone requiere de permisos de administrador para funcionar.```");

        const somethingwentbad = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Algo parece estar mal, revisa si cyclone tiene permisos de administrador.```")
        
       

        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)){
         return interaction.reply({ embeds:[botperms], ephemeral: true })
        }

        const Confidencial = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Estamos haciendo unos ajustes, espera.```")

        const Keyaccept = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```llave correcta, El Backup se esta cargando.```")

        const Keywrong = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```llave incorrecta, El Backup no se cargara.```")

        const missingperms = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```No tienes los permisos necesarios para ejecutar este comando.```")

        const missingbcks = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```El backup especificado no es valido.```")

        const list404 = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```Este servidor no tiene ninguna copia de seguridad.```");


      // Permissions
        backup.setStorageFolder(__dirname+"/Data/backups/"+`/${guildsave}/`);

        const backuplisting = __dirname+"/Data/backups/"+`/${guildsave}/`

        if(!fs.existsSync(__dirname+"/Data/backups/"+`/${guildsave}/`)){
           return interaction.reply({embeds: [list404] , ephemeral: true });
        } else

        if(fs.readdirSync(__dirname+"/Data/backups/"+`/${guildsave}/`).length === 0){

          return interaction.reply({embeds: [list404] , ephemeral: true });

        }

        
        if (!Permisos)
          return interaction.reply({
          embeds: [missingperms], ephemeral: true
        });

        



      // Code 
        

    backup.fetch(id).then(async () => {

          if(password !== key){
            return interaction.reply({ embeds:[Keywrong] , ephemeral: true })
          } else
          interaction.reply({ embeds:[Keyaccept] , ephemeral: true })
          backup.load(id, interaction.guild, { clearGuildBeforeRestore: clearbefore});
        }).catch((err) => { return interaction.reply({embeds: [missingbcks], ephemeral: true})});
    
    }
}

          
        
    

        
  
  
  

