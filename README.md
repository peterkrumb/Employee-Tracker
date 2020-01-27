# Employee-Tracker

## First Steps
Initially we need to connect to MySQL, a database we work with to hold data. For this project there are only a few although in the real world we might have thousands of data points. Since we're running this application through node we need to require npm package mysql, as well as inquirer since we're inquiring what the user of the app wants to do. Next we set up the connection to mysql through lines 6 - 22. We then run our prompts.

## Viewing
One of the primary functions was to view employees, roles, and departments. The syntax SELECT was used here. SELECT grabs all values from whichever table was called in the query. I had to use LEFT JOIN in order to connect the role's department id to the name of the department.

## Adding
INSERT INTO was the SQL command here. It utilized the syntax we learned in class of connection.query, then INSERT INTO [name of table] SET ? then creating an object setting the table data to answer.whichever.

## Issues
If I had more time I'd update the AddRole function to where the departments are constantly updated whenever a new one is added as opposed to manually writing them. I played around with it and know it requires a for loop but couldnt exactly nail it