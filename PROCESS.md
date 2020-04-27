# Milestone: Process 


## Documentation on Story Creation and Assignment 

Below is a screenshot of the team's kanban board at the end of iteration 1. Each team member was given two tasks. 

![](https://github.com/podkolzinmir/RewardBot/blob/master/Meeting%20Notes/first%20kanban.PNG)

At the beginning of the second iteration the team was considering which platform to use (botpress, discord, etc). After reevaluations and help from Professor Yang the team decided to create a slack topcoder bot. Thus, the team did not use botpress. This task was eliminated from the kanban board. 

Below is a screenshot of the team's kanban board at the beginning of iteration 2. Tasks were reassigned and a few tasks were added. 

![](https://github.com/podkolzinmir/RewardBot/blob/master/Meeting%20Notes/Iteration%202%20kanban.PNG)

## Scrum Meeting Notes

### **Meeting Notes: April 8, 2020**
![](https://github.com/podkolzinmir/RewardBot/blob/master/Meeting%20Notes/team%20meeting%204.8.PNG)



### **Meeting Notes: April 14, 2020**

Decided to pivot from separately hosted bot to slack bot
  Possibly still connection firebase to save user scores if possible. If not, leaderboard will hopefully come from topcoder api

Decided to continue to try using topcoder api to access requests from slackbot

Shifted priorities with use cases, will no longer monitor the quality of the submissions 
  However, can get descriptions of the achievements. will if get time assign points to achievements 
  
Will attempt to still monitor user submissions and leaderboard.



### **Meeting Notes: April 17, 2020**

[Here.pdf](https://github.com/podkolzinmir/RewardBot/blob/master/Meeting%20Notes/Meeting%20Notes%204.17.pdf)

## Documentation of Iteration Endings
**Iteration 1**

At the end of iteration 1 the team had its first meeting. The team divided its use cases into stories/tasks. This helped to visualize individual tasks. We had an overall very postive experience with the process phase. Assigning points to tasks helped the team prioritize tasks. At this point the team was still unsure of who was going to do which tasks therefore the team somewhat assigned tasks randomly. Although the process was helpful we were still unsure of how to begin the project. The lack of experience with javascript and bots among the team was also quickly discovered. The team joined in on Prof. Yang's Q/A session to explore options on getting started. All tasks at the end of iteration 1 were still incomplete. 

**Iteration 2** 

The team thought the frequent scum meetings were useful. It helped refocus the group on upcoming tasks and in progress tasks. It also gave an opportunity to bounce ideas off one another for tasks. During iteration 2 there were some hiccups the team faced. The bot token was consistently giving a "not_allowed_token_type" error. Additionally the team couldn't clearly understand how to use Firebase. Both obstacles were overcome. A new app was created within Slack API using the older version of slack api since it was uncovered that the new version of the apps are not compatible with RTM API, which the team needed. As for the Firebase problem, the team turned to MySQL and set up a MySQL database. 

## Status of Tasks

Below is the status of tasks at the end of iteration 2. 
![](https://github.com/podkolzinmir/RewardBot/blob/master/Meeting%20Notes/kanban%20iteration%202%20end.PNG)

**In Progress Tasks**
1. Sarah is still working on having the team's bot interact with TopCoder's API. She is also continuing research on useful information TopCoder can provide for our bot. 
2. The team is consistantly working to ensure correct interactions. Eric has ensured correct interaction between the bot and the database. 
3. Miriam and Eric have started creating code to catch errors. Code has been implemented to catch error with turning the bot on and with connecting to MySQL database. More code still needs to be put in. 

**Completed Tasks**
1. Miriam has set up the Slack API app where the bot will be hosted.
2. Eric has created a database to hold user points and has connected it to the bot. 
