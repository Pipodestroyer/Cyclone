const { SlashCommandBuilder } = require("discord.js")
const { EmbedBuilder } = require("discord.js")
const { PermissionsBitField, IntentsBitField } = require('discord.js')
const { awaitMessages } = require('discord.js');
const { config } = require("dotenv");
config.env
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,] });
const fs = require('node:fs');

module.exports = {
  
    data: new SlashCommandBuilder()
	.setName('configuration')
	.setDescription('ON TESTING')
	.addSubcommand(subcommand =>
		subcommand
			.setName('code')
			.setDescription('Añadir o cambiar el codigo de seguridad.'))
    
    
        
    }