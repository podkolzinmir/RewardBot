const SlackBot = require('slackbots');
const axios = require('axios');
var mysql = require('mysql');

// Initialize slackbot
const bot = new SlackBot({

token: 'Insert token here',

name: 'RewardBot'
});

// Create start handler
bot.on('start',() =>{

  //Timer to show leaderboard at the end of the workday
  // var d = new Date();
  // var millisTill5 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 17, 0, 0, 0 ) - d;
  // if (millisTill5 < 0) {
  //   millisTill5 += 86400000
  // }
  // setTimeout(bot.postMessageToChannel('general','It\'s 5:00 PM, end of the workday! Time to post the leaderboard.'), millisTill5);


  //Introduction
  bot.postMessageToChannel('general', 'Hello! I\'m here to help you record your accomplishments and see where you stack up!');
  bot.postMessageToChannel('general', "Say: \"!Leaderboard\" to see the leaderboard for the day."
  + "\nSay: \"!Add\" to let me add you to the leaderboard."
  + "\nSay: \"!Private\" to remove/add yourself from/to the public leaderboard."
  + "\nSay: \"!Finish\" to let me add to your finished problem point value."
  + "\nSay: \"!Start\" to let me add a started problem to your point value. "
  + "\nMake sure to @ me and end all messages with Handle:(TopCoder Username) to let me know who you are!");


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
  if(message.includes('!Add')){
    getTopCoder(user);
  }
  if(message.includes('!Private')){
    setPrivate(user);
  }
  if(message.includes('!Leaderboard')){
    postLeaderboard();
  }
  if(message.includes('!Finish')){
    bot.postMessageToChannel('general', 'Great Job! +3 Points');
    addPoints(user,3);
  }
  if(message.includes('!Start')){
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
    con.query("SELECT * FROM scores WHERE private = 0 ORDER BY score DESC LIMIT 10", function (err, result,) {
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
    con.query("INSERT INTO scores(user_id,score,private) values('"+User+"',"+Score+",0) ON DUPLICATE KEY UPDATE score=score+"+Score+";", function (err, result,) {
      if (err) throw err;
      bot.postMessageToChannel('general', 'User "'+User+'" has been added with a score of '+Score+'.');
      con.end();
    });
  });
}
function setPrivate(handle){
  var con = mysql.createConnection({
    host: "localhost",
    user: "RewardBot",
    password: "password",
    database: "userscores"
  });
  con.connect(function(err) {
    if (err) throw err;
    con.query("UPDATE scores SET private=1-private WHERE user_id=\""+handle+"\""+";", function (err, result,) {
      if (err) throw err;
      bot.postMessageToChannel('general', 'Your privacy setting has changed.');
      con.end();
    });
  });
}