const SlackBot = require('slackbots');
const axios = require('axios');
var mysql = require('mysql');

// Initialize slackbot
const bot = new SlackBot({
token: 'xoxb-1055511604102-1072423454231-zyPLNHE0c2nazAoMCcQGku6Y',
name: 'RewardBot'
});

// Create start handler
bot.on('start',() =>{
  bot.postMessageToChannel('general', 'Hello! I\'m here to help you record your accomplishments and see where you stack up!');
  bot.postMessageToChannel('general', 'Say: \"Show me the leaderboard\" to see the leaderboard for the day.\n'+
  'Say: \"Add me to the leaderboard Handle:(TopCoder Username)\" to let me add you to the database.\n'+
  'Say: \"I finished a problem Handle:(TopCoder Username)\" to let me add to your point value. \n'+
  'Say: \"I started a problem Handle:(TopCoder Username)\" to let me add to your point value. \nMake sure to @ me!');
});

// Error handler
bot.on('error', (err) => console.log(err));
// Message Handler
bot.on('message', data =>{
  if(data.type !== 'message'){
    return;
  }
  if(data.subtype=='bot_message'){
    return;
  }
  handleMessage(data.text)
})

// Response to data
function handleMessage(message){
  user="";
  if(message.includes('Handle: ')){
    user=message.substring(message.indexOf('Handle: ')+8);
  }
  if(message.includes('Add me to the leaderboard ')){
    getTopCoder(user);
  }
  if(message.includes('Show me the leaderboard')){
    postLeaderboard();
  }
  if(message.includes('I finished a problem')){
    bot.postMessageToChannel('general', 'Great Job! +3 Points');
    addPoints(user,3);
  }
  if(message.includes('I started a problem')){
    bot.postMessageToChannel('general', 'Great Job! +1 Point');
    addPoints(user,1);
  }
}

// TopCoder stuff
function getTopCoder(handle){
  var request = require('request');
  request('http://api.topcoder.com/v2/users/'+handle, function (err, response, body) {
    len=JSON.parse(body).Achievements.length;
    return addPoints(handle,len);
    if(err) throw err;
  });
}
// MySQL stuff
function postLeaderboard(){
  var con = mysql.createConnection({
    host: "localhost",
    user: "RewardBot",
    password: "password",
    database: "userscores"
  });
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM scores ORDER BY score DESC LIMIT 5", function (err, result,) {
      if (err) throw err;
      message="Leaderboard:\n"
      for(i=0;i<result.length;i++){
        message+=result[i].user_id+" : "+result[i].score+(i+1==result.length? "":"\n");
      }
      bot.postMessageToChannel('general',message);
      con.end();
    });
  });
}
function addPoints(User,Score){
  var con = mysql.createConnection({
    host: "localhost",
    user: "RewardBot",
    password: "password",
    database: "userscores"
  });
  con.connect(function(err) {
    if (err) throw err;
    con.query("INSERT INTO scores(user_id,score) values('"+User+"',"+Score+") ON DUPLICATE KEY UPDATE score=score+"+Score+";", function (err, result,) {
      if (err) throw err;
      bot.postMessageToChannel('general', 'User "'+User+'" has been added with a score of '+Score+'.');
      con.end();
    });
  });
}