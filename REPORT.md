# Milestone: Report


## The problem Reward Bot solved
Crowdsourcing is a modern solution to challenges of a modern technical world. It allows companies to reach a wide variety of ideas at an extremely low cost, since they no longer are tied to the solutions of a couple salaried workers. However, issues arise when trying to make cohesive solutions from scattered ideas. We aim to address two closely related issues, that of low audience participation and the quality of solutions submitted, viewed through the frame of TopCoder, a software crowdsourcing platform. 

TopCoder is a great platform to encompass real coding challenges, but as a freelance type forum it faces issues with priority. Many people can contribute, but when they have other jobs or life commitments to attend outside of the TopCoder challenges, these projects can fall to the wayside. When priority suffers, even when developers manage to devote time to solving an issue, since the feeling of responsibility is eroded in this low stakes environment, the solution achieved may not be practical, efficient, or effective. These issues of quality and quantity are intertwined, and we hope to contribute to a solution with our reward bot. 

## Primary features and screenshots

#### 1. Ability to add a TopCoder username to the leaderboard. The bot will calculate the user's starting score via TopCoder API then display it. 
#### 2. Ability to view the leaderboard at any time. 

![](https://github.com/podkolzinmir/RewardBot/blob/master/Primary%20Features/Add_ViewLeaderboard.jpg)

#### 3. Ability to reward points to a specified user for starting / finishing a TopCoder problem. 
Note: Starting a problem is awarded less points as it is a minor action whereas finishing a problem is a major action. 

![](https://github.com/podkolzinmir/RewardBot/blob/master/Primary%20Features/Finishing.jpg)

![](https://github.com/podkolzinmir/RewardBot/blob/master/Primary%20Features/Starting.jpg)

#### 4. Ability to make a user private. Making a user private will take them off the public leaderboard. 

![](https://github.com/podkolzinmir/RewardBot/blob/master/Primary%20Features/Privacy_setting.jpg)

## Our reflection on the development process and project
While the overall development process was hindered due to the remote learning switch, we also were learning the valuable skills it takes to commmunicate and develop effectively online. Thankfully, most of our work was already online as we made use of shared document editing websites and github as an online storage vessel for the code we were writing. For our meetings, we used zoom to have a semblance of face to face contact. Due to modern technology, it is much easier to work remotely than ever before. We believe the pandemic is changing what people believe is necessary "in the office" work. Since many people are adjusting to working remotely, this may be a future we need to be equipped to handle. 

During the planning stages, after significant brainstorming we felt as if we had a good grip on not only understanding the problem we are solving, but the technology needed to do it. It wasn't until the iteration that the project started becoming less realistic due to our technical knowledge and third party permission issues. However, we were able to pivot the project into something much more doable, and worked quickly to make up for the lost time spent on the other idea. Through collaboration with each other, the professor, and the teaching assistant, we were able to come up with a working product that contained most of our original ideas.

## Any limitations and future work
Since we were unable to access a full list of users from the TopCoder network, we had to use a local database in order to test our code. Additionally, we wanted to have the bot acting in the background, but due to technical knowledge restraints and being unable to access blocks of user information from TopCoder, we had to make it user driven. The user would be their own monitor, reporting to the bot whenever they had started or completed a project. 

For the future, we would like to pull away from the slack implementation, and move to a desktop bot, or web browser bot that does not need user action to work. We would like to be able to monitor the users work, as well as implement the quality monitor on the completed problems. Doing all of this may require special permissions from TopCoder. However, we believe we could greatly improve the quality of this bot to make it a truly helpful feature for TopCoder users. 
