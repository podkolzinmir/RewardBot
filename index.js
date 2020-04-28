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
    bot.postMessageToChannel('general', 'Hello!');
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