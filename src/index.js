require('dotenv').config();

const utils = require('./utils.js')
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.DISCORD_TOKEN;
const POLLING_TIME =  5 * 60000; // => x * 60000 where x is the time in minutes

if (!TOKEN) throw "Missing bot token !!";

bot.on('ready', async () => {
    console.info('Bot is ready')
    setInterval(utils.pollNewPost, POLLING_TIME, bot);
});

bot.on('message', async (message) =>{
    if(message.author.bot) return;
    switch (message.content) {
        case ";lastpost":
            await utils.sendFormattedLastPost(message);
            break;
        default:
            break;
    }
});

bot.login(TOKEN);