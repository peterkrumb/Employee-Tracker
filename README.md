# Employee-Tracker

## First Steps
Initially we need to connect to MySQL, a database we work with to hold data. For this project there are only a few although in the real world we might have thousands of data points. Since we're running this application through node we need to require npm package mysql, as well as inquirer since we're inquiring what the user of the app wants to do. Next we set up the connection to mysql through lines 6 - 22. We then run our prompts.