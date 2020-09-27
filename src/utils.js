const axios = require('axios');
const fs = require('fs');
const path = require('path');
const CHANNEL_ID = process.env.CHANNEL_ID;
const URL = "https://hytale.com/api/blog/post/published";
const LAST_FILE = "../config/last.json";

module.exports = {
    getLastPost: async function (bot) {

        const lastElement = (await axios.get(URL)).data[0];
        const {last} = lastSaved();

        if (lastElement._id !== last) {
            bot.channels.cache.get(CHANNEL_ID).send({
                embed: {
                    color: 3447003,
                    author: {
                        name: 'New Hytale news !',
                    },
                    title: lastElement.title,
                    url: `https://hytale.com/news`,
                    description: lastElement.bodyExcerpt,
                    timestamp: new Date(),
                    image: {
                        url: `https://cdn.hytale.com/variants/blog_thumb_${lastElement.coverImage.s3Key}`,
                    },
                    footer: {
                        text: "© Hytale bot by maxime-mn"
                    }
                }
            });
        }
        saveLast(lastElement._id);
    }
}

function lastSaved(){
    let rawdata = fs.readFileSync(path.resolve(__dirname, LAST_FILE));
    let last = JSON.parse(rawdata);
    return last;
}

function saveLast(id){
    let data = { "last": id };
    fs.writeFileSync(path.resolve(__dirname, LAST_FILE), JSON.stringify(data));
}
