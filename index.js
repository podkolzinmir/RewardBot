const SlackBot = require('slackbots');
const axios = require('axios');
var mysql = require('mysql');

// Initialize slackbot
const bot = new SlackBot({
token: 'xoxb-1055511604102-1072423454231-W37mANVpfbUrMiEACvsy4Noj',
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

  bot.postMessageToChannel('general', 'Hello! I\'m here to help you record your accomplishments and see where you stack up!');
  bot.postMessageToChannel('general', 'Say: \"Show me the leaderboard\" to see the leaderboard for the day. '+
  '\nSay: \"I finished a problem\" to let me add to your point value. \n'+
  'Say: \"I started a problem\" to let me add to your point value. \nMake sure to @ me!');
});

// Error handler
bot.on('error', (err) => console.log(err));

function addUser(User,Score){
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
  if(message.includes('Handle: ')){
    bot.postMessageToChannel('general', 'Your handle is '+message.substring(message.indexOf('Handle: ')+8));
  }
  if(message.includes('Show me the leaderboard')){
    bot.postLeaderboard();
  }
  if(message.includes('I finished a problem')){
    bot.postMessageToChannel('general', 'Great Job! +3 Points');
    //point addition here
  }
  if(message.includes('I started a problem')){
    bot.postMessageToChannel('general', 'Great Job! +1 Point');
    //point addition here
  }
}

// TopCoder stuff
function getTopCoder(handle){
  var request = require('request');
  request('http://api.topcoder.com/v2/users/'+handle, function (err, response, body) {
    len=JSON.parse(body).Achievements.length;
    return callback(handle,len);
    if(err) throw err;
  });
}

function postLeaderboard(){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM scores ORDER BY score DESC", function (err, result,) {
      if (err) throw err;
      bot.postMessageToChannel('general', 'Leaderboard:\n'+result);
    });
  });
}
  // TopCoder stuff
function getTopCoder(handle){
  var request = require('request');
  request('http://api.topcoder.com/v2/users/'+handle, function (err, response, body) {
    len=JSON.parse(body).Achievements.length;
    return addUser(handle,len);
    if(err) throw err;
  });
}
function postLeaderboard(){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM scores ORDER BY score DESC", function (err, result,) {
      if (err) throw err;
      bot.postMessageToChannel('general', 'Leaderboard:\n'+result);
    });
  });
}
