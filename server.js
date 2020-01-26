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
                "View All Employees By Manager",
                "View Departments",
                "View Roles",
                //"Update Employee Role",
                //"Update Employee Manager"
            ]
        })
        .then(function(answer) {
            switch (answer.userInput) {
                case "View All Employees":
                    viewEmployees();
                    break;

                case "View All Employees By Department":
                    viewEmpByDept();
                    break;

                case "View Departments":
                    viewDepts();
                    break;

                case "View Roles":
                    viewRoles();
                    break;

                    // case "Find artists with a top song and top album in the same year":
                    //     songAndAlbumSearch();
                    //     break;
            }
        });
}

function viewEmployees() {
    //<--Manager isn't a table, so we set it to a temporary alias manager which gets set to a manager id on line 73-->
    var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager `
        //<--Connects employee's role id to corresponding id-->
    query += "FROM employee LEFT JOIN role ON employee.role_id = role.id ";
    //<--Connects the role to its corresponding department-->
    query += "LEFT JOIN department ON department.id = role.department_id ";
    //<-- Connects the employee's manager id to the corresponding manager-->
    query += "LEFT JOIN employee AS manager ON manager.id = employee.manager_id";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res)
        runSearch();
    })
}

function viewEmpByDept() {
    inquirer.prompt({
            name: "departments",
            type: "list",
            message: "Please select the department of the employee",
            choices: ["Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]
        })
        .then(function(answer) {
            const department = answer.departments;
            var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary `
            query += `FROM employee LEFT JOIN role ON employee.role_id = role.id `;
            query += `LEFT JOIN department ON role.department_id = department.id WHERE department.name="${department}"`;
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.table(res);
                runSearch();
            })
        })

}

function viewDepts() {
    connection.query(`SELECT department.id, department.name FROM department`, function(err, res) {
        if (err) throw err;

        console.table(res);
        runSearch();
    });
}

function viewRoles() {
    connection.query(`SELECT role.id, role.title FROM role`, function(err, res) {
        if (err) throw err;

        console.table(res);
        runSearch();
    });
}

// function ViewEmpByMan() {
//     inquirer.prompt({
//             name: "manager",
//             type: "list",
//             message: "Please select the manager of the employee",
//             choices: ["Ashley Rodriguez",
//                 "John Doe",
//                 "Sarah Lourd",
//                 "Mike Chan"
//             ]
//         })
//         .then(function(answer) {
//             const manager = answer.manager;
//             var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary `
//             query += `FROM employee LEFT JOIN role ON employee.role_id = role.id `;
//             query += `LEFT JOIN employee AS manager ON manager.id = employee.manager_id"${manager}"`;
//             connection.query(query, function(err, res) {
//                 if (err) {
//                     throw err
//                 }
//                 // LOGS RESULTS
//                 console.table(res);
//             })
//         })

//     }