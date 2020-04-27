const SlackBot = require('slackbots');
const axios = require('axios');
var mysql = require('mysql');

// Initialize slackbot
const bot = new SlackBot({
<<<<<<< HEAD
token: 'xoxb-1055511604102-1072423454231-v6agLEf4y1QAEDQbXdPohfzp',
=======
token: 'xoxb-1055511604102-1064351790406-2Hs8LyvfWo164M6IseH69Wuz',
>>>>>>> 0e7016485e26a425d8230774c3de783e99f6c59d
name: 'RewardBot'
});

var con = mysql.createConnection({
    host: "localhost", 
    user: "RewardBot", 
    password: "password", 
    database: "userscores"
  });
  
// Create start handler
bot.on('start',() =>{
   // addUser("TestUser",42);
  
  //  bot.postMessageToChannel('general', 'Test');
});


// Error handler
bot.on('error', (err) => console.log(err));

function addUser(User, Score){
    con.connect(function(err) {
        if (err) throw err;
        con.query("INSERT INTO scores (user_id,score) values ('"+User+"','"+Score+"')", function (err, result,) {
          if (err) throw err;
          bot.postMessageToChannel('general', 'User "'+User+'" has been added with a score of '+Score+'.');
        });
      });
}

// Message Handler
bot.on('message', data =>{
  if(data.type !== 'message'){
    return;
  }
  handleMessage(data.text)
})

// Response to data
function handleMessage(message){
  if(message.includes(' hey bot')){
    bot.postMessageToChannel('general', 'Omg hey');
  }

  // TopCoder stuff
function getTopCoder(handle){
  var request = require('request');
  request('http://api.topcoder.com/v2/users/'+handle, function (err, response, body) {
    if(err) throw err;
    return JSON.parse(body).Achievements.length;
  });
}