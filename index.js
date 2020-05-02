const SlackBot = require('slackbots');
const axios = require('axios');
var mysql = require('mysql');

// Initialize slackbot
const bot = new SlackBot({
token: 'Insert token here',
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
  //Timer to show leaderboard at the end of the workday
  // var d = new Date();
  // var millisTill5 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 17, 0, 0, 0 ) - d;
  // if (millisTill5 < 0) {
  //   millisTill5 += 86400000
  // }
  // setTimeout(bot.postMessageToChannel('general','It\'s 5:00 PM, end of the workday! Time to post the leaderboard.'), millisTill5);


  //Introduction
  bot.postMessageToChannel('general', 'Hello! I\'m here to help you record your accomplishments and see where you stack up!');
  bot.postMessageToChannel('general', "Say: \"Leaderboard\" to see the leaderboard for the day."
  + "\nSay: \"Fin\" to let me add to your finished problem point value."
  + "\nSay: \"Started\" to let me add a started problem to your point value. \nMake sure to @ me!");

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
  if(message.includes(' hey bot')){
    bot.postMessageToChannel('general', 'Omg hey');
  }
  if(message.includes('Leaderboard')){
    bot.postLeaderboard();
  }
  if(message.includes('Fin')){
    bot.postMessageToChannel('general', 'Great Job! +3 Points');
    //point addition here
  }
  if(message.includes('Started')){
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
});
}
