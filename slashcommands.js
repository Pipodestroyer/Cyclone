const { REST } = require('@discordjs/rest');
const { Routes, Collection, SlashCommandStringOption } = require('discord.js');
const { token } = require('./config.json');

require('dotenv').config();
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./Comandos').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '911022283068436550';

for (const file of commandFiles) {
	const command = require(`./Comandos/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(`${process.env.discord_token}`);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	} 
})();