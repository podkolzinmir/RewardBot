const SlackBot = require('slackbots');
const axios = require('axios');
var mysql = require('mysql');

// Initialize slackbot
const bot = new SlackBot({
token: 'xoxb-1055511604102-1064351790406-ge5ku3crxpwcACmioyDFEF3f',
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
    addUser("TestUser",42);
});


// Error handler
bot.on('error', (err) => console.log(err));

function addUser(User, Score){
    con.connect(function(err) {
        if (err) throw err;
        con.query("INSERT INTO scores (user_id,score) values ('"+User+"','"+Score+"')", function (err, result,) {
          if (err) throw err;
          console.log(result);
        });
      });
}