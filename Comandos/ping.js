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

module.exports = { //este comando esta solo para funciones de desarrollo no deberia de estar para cuando v.0.1.0 este lista.
    
    

    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Tiempo de respuesta del sevidor en ms."),

    async run(client, interaction, message){ //por alguna razon la latencia actual esta dando valores negativos, seria bueno hecharle un vistazo a eso.
        
        let Autor = interaction.member

        console.log(Autor.username)
        
        const userbeforechek = client.users.cache.get(interaction.member.user.id);

        console.log(userbeforechek.username)

        const errorchecknan = new EmbedBuilder()
        .setAuthor({ name: `${userbeforechek.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setColor("#2b2d31")
        .setDescription("```"+`Pong!🏓 Latencia actual: ${Date.now() - interaction.createdTimestamp}ms. | 🛠️ La latencia de la API es: ${Math.round(client.ws.ping)}ms`+"```");  

        interaction.reply({ embeds: [errorchecknan], ephemeral: false })

    } //termina aqui

}