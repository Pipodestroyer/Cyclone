const { SlashCommandBuilder } = require("discord.js")
const { EmbedBuilder } = require("discord.js")
const backup = require("discordio-backup");
backup.setStorageFolder(__dirname+"/backups/");
const { awaitMessages } = require('discord.js');
const { config } = require("dotenv");
config.env
const { PermissionsBitField, IntentsBitField } = require('discord.js')
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = { //esto es nescesario, es lo que necesita slashcommands.js para poner la info de tu comando
    
    

    data: new SlashCommandBuilder()
    .setName("ping") // nombre del slash
    .setDescription("Tiempo de respuesta del sevidor en ms."),

    async run(client, interaction, message){ //va asta aqui luego de esta linea empieza tu codigo.
        
        let Autor = interaction.member

        console.log(Autor.username)
        
        const userbeforechek = client.users.cache.get(interaction.member.user.id);

        console.log(userbeforechek.username)

        const errorchecknan = new EmbedBuilder()
        .setAuthor({ name: `${userbeforechek.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2F3136")
        .setDescription("```"+`Pong!🏓 Latencia actual: ${Date.now() - interaction.createdTimestamp}ms. | 🛠️ La latencia de la API es: ${Math.round(client.ws.ping)}ms`+"```");  

        interaction.reply({ embeds: [errorchecknan], ephemeral: false })

    } //termina aqui

}