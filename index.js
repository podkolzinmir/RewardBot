const SlackBot = require('slackbots');
const axios = require('axios');

// Initialize slackbot
const bot = new SlackBot({
token: 'xoxb-1055511604102-1074899502657-DQevF53q7jPdw3YMZeoUgc3B',
name: 'RewardBot'
});


// Create start handler
bot.on('start',() =>{
    const params = {
        icon_emoji: ':bar_chart:'
    }

    bot.postMessageToChannel('general', 'Hello!', params);
});


// Error handler
bot.on('error', (err) => console.log(err));