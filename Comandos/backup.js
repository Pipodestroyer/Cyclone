const { SlashCommandBuilder } = require("discord.js")
const { EmbedBuilder } = require("discord.js")
const backup = require("discordio-backup");
const { PermissionsBitField, IntentsBitField } = require('discord.js')
const { awaitMessages } = require('discord.js');
const { config } = require("dotenv");
config.env
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fastFolderSizeSync = require('fast-folder-size/sync')
const fs = require('node:fs');

module.exports = {
  
    data: new SlashCommandBuilder()
	.setName('backup')
	.setDescription('Testing')
	.addSubcommand(subcommand =>
		subcommand
			.setName('create')
			.setDescription('Crea un backup solo para la guild actual.')
            .addStringOption(option => option.setName("mensajes")
            .setDescription("Cantidad de mensajes por canal.")
                 .setRequired(true))
   
       .addStringOption(option => option.setName("imagenes")
             .setDescription("Tipo de guardado de imagen.")
                .setRequired(true).addChoices(
           { name: 'Base64', value: 'base64' },
           { name: 'Url', value: 'url' },
       )
       )
       .addStringOption(option => option.setName("canales")
             .setDescription("¿Se deben de guardar los canales?.")
                .setRequired(true).addChoices(
           { name: 'si', value: 'null' },
           { name: 'no', value: 'channels' },
       )
       )
       .addStringOption(option => option.setName("emojis")
             .setDescription("¿Se deben de guardar los emojis?.")
                .setRequired(true).addChoices(
           { name: 'si', value: 'null' },
           { name: 'no', value: 'emojis' },
       )
       )
       .addStringOption(option => option.setName("bans")
             .setDescription("¿Se deben de guardar los bans?.")
                .setRequired(true).addChoices(
           { name: 'si', value: 'null' },
           { name: 'no', value: 'bans' },
       )
       )
       .addStringOption(option => option.setName("roles")
             .setDescription("¿Se deben de guardar los roles?.")
                .setRequired(true).addChoices(
           { name: 'si', value: 'null' },
           { name: 'no', value: 'roles' },
       ))
       )
	.addSubcommand(subcommand =>
		subcommand
			.setName('delete')
			.setDescription('Elimina un backup del servidor.')
            .addStringOption(option => option.setName("backup").setDescription("Id del Backup que se va a Borrar.").setRequired(true))
     .addStringOption(option => option.setName("codigo")
            .setDescription("Codigo de seguridad proporcionado por el propietadio de el servidor.")
                 .setRequired(true))
                 .addStringOption(option => option.setName("limpiar")
            .setDescription("¿Se deben de eliminar todas las copias de seguridad? (solo disponible para propietario del servidor)")
                 .setRequired(false).addChoices(
                  { name: 'si', value: 'si' },
                  { name: 'no', value: 'no' },
              ))
    )
    .addSubcommand(subcommand =>
                subcommand
                    .setName('list')
                    .setDescription('Lista de copias de seguridad.'))
    .addSubcommand(subcommand =>
                subcommand
                    .setName('load')
                    .setDescription('Carga un backup asociado al servidor.')
                    .addStringOption(option => option.setName("backup").setDescription("Id del Backup que se va a Cargar.").setRequired(true))
     .addStringOption(option => option.setName("codigo")
            .setDescription("Codigo de seguridad proporcionado por el propietadio de el servidor.")
                 .setRequired(true))
                 .addStringOption(option => option.setName("limpiar")
            .setDescription("¿Se debe de limpiar todo el servidor antes de cargar el backup? [Por defecto: NO]")
                 .setRequired(false).addChoices(
                  { name: 'si', value: 'true' },
                  { name: 'no', value: 'null' },
              )))
    .addSubcommand(subcommand =>
                        subcommand
                            .setName('information')
                            .setDescription('Informacion sobre un backup en especifico.')
                            .addStringOption(option => option.setName("backup").setDescription("Id del Backup que se va a revisar informacion.").setRequired(true))),
    
    
   
        
    }