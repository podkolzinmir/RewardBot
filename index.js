const SlackBot = require('slackbots');
const axios = require('axios');

// Initialize slackbot
const bot = new SlackBot({
token: 'xoxb-1055511604102-1064351790406-bvZBow5OaznH98HFM0VsBvXn',
name: 'RewardBot'
});


// Create start handler
bot.on('start',() =>{
  
    bot.postMessageToChannel('general', 'Hello!');
});


// Error handler
bot.on('error', (err) => console.log(err));