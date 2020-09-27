require('dotenv').config();

const utils = require('./utils.js')
const Discord = require('discord.js');

const bot = new Discord.Client();
const TOKEN = process.env.DISCORD_TOKEN;
if (!TOKEN) throw "Missing bot token !!";

const POLLING_TIME =  5 * 60000; // => x * 60000 where x is the time in minutes

bot.on('ready', async () => {
    setInterval(utils.getLastPost, POLLING_TIME, bot);
});

bot.login(TOKEN);