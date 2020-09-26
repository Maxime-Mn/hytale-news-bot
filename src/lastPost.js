const axios = require('axios');
const CHANNEL_ID = process.env.CHANNEL_ID;
const URL = "https://hytale.com/api/blog/post/published";
var ID_LAST_POST = 0;

module.exports = {
    getLastPost: async function (bot) {
        const { data } = await axios.get(URL);
        const lastElement = data[0];

        if (lastElement._id !== ID_LAST_POST) {
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
        ID_LAST_POST = lastElement._id;
    }
}
