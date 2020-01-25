const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");

//<--Running code to connect with mySQL database-->
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Employee_TrackerDB"
});

connection.connect(function(err) {

    if (err) {
        console.error("Error connecting: " + err.stack);
        return;
    }
    console.log("Connected as id " + connection.threadId);
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "userInput",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                //"View All Employees By Manager",
                //"Add Employee",
                //"Update Employee Role",
                //"Update Employee Manager"
            ]
        })
        .then(function(answer) {
            switch (answer.userInput) {
                case "View All Employees":
                    viewEmployees();
                    break;

                    // case "Find all artists who appear more than once":
                    //     multiSearch();
                    //     break;

                    // case "Find data within a specific range":
                    //     rangeSearch();
                    //     break;

                    // case "Search for a specific song":
                    //     songSearch();
                    //     break;

                    // case "Find artists with a top song and top album in the same year":
                    //     songAndAlbumSearch();
                    //     break;
            }
        });
}

function viewEmployees() {

}