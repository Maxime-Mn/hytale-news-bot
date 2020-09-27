const axios = require('axios');
const fs = require('fs');
const path = require('path');
const URL = "https://hytale.com/api/blog/post/published";
const LAST_FILE = "../config/last.json";

module.exports = {
    pollNewPost: async function (bot) {
        const lastElement = await getLastPost();
        const { last } = lastSaved();

        if (lastElement._id !== last) {
            bot.guilds.cache.forEach(server => {
                server.channels.cache.forEach(channel => {
                    if (channel.name === "hytale-news") {
                        bot.channels.cache.get(channel.id).send(formatElement(lastElement));
                    }
                });
            });
            saveLast(lastElement._id);
        }
    },
    sendFormattedLastPost: async function(message){
        const data = await getLastPost();
        const formattedMessage = formatElement(data);
        message.channel.send(formattedMessage);
    }
}

async function getLastPost(){
    return (await axios.get(URL)).data[0];
}

function formatElement(data){
    return {
        embed: {
            color: 3447003,
            author: {
                name: 'New Hytale news !',
            },
            title: data.title,
            url: `https://hytale.com/news/${new Date(data.publishedAt).getFullYear()}/${new Date(data.publishedAt).getMonth() + 1}/${data.slug}`,
            description: data.bodyExcerpt,
            timestamp: new Date(),
            image: {
                url: `https://cdn.hytale.com/variants/blog_thumb_${data.coverImage.s3Key}`,
            },
            footer: {
                text: "© Hytale bot by maxime-mn"
            }
        }
    }
}

function lastSaved() {
    let rawdata = fs.readFileSync(path.resolve(__dirname, LAST_FILE));
    let last = JSON.parse(rawdata);
    return last;
}

function saveLast(id) {
    let data = { "last": id };
    fs.writeFileSync(path.resolve(__dirname, LAST_FILE), JSON.stringify(data));
}
