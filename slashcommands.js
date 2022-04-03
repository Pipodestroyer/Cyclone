const fs = require("fs")
const Discord = require("discord.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { CycloneId, guild } = require("./config.json")
const { config } = require("dotenv");
const commands = []
const slashcommandsFiles = fs.readdirSync("./Comandos").filter(file => file.endsWith("js"))

for(const file of slashcommandsFiles){
    const slash = require(`./Comandos/${file}`)
    commands.push(slash.data.toJSON())
}

const rest = new REST({ version: "9" }).setToken("OTExMDIyMjgzMDY4NDM2NTUw.YZbVng.n0Ev696dPoyM3ra6QCkqthwto4c")

createSlash()

async function createSlash(){
    try{
        await rest.put(
            Routes.applicationCommands(CycloneId), { //no puedo usar el nombre, el id es el id del bot. para que discord entienda que es tu bot, solo pon la id de tu cliente en config.json y reemplaza la de cylone
                body: commands

            }
        )
        console.log("A new command was created.")
    } catch(e) {
        console.error(e)
    }
}