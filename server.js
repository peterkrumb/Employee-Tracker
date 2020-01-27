const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const departments = ["Sales", "Engineering", "Finance", "Legal"];
const roles = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"];
const managers = ["Ashley Rodriguez", "John Doe", "Sarah Lourd", "Mike Chan"]
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
                "View Departments",
                "View Roles",
                "Add Role",
                "Add Department",
                "Add Employee",
                //"Update Employee Manager"
                //"Update Employee Manager"
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
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDept();
                    break;
                case "Add Employee":
                    addEmp();
                    break;

                    // case "Find artists with a top song and top album in the same year":
                    //     songAndAlbumSearch();
                    //     break;
            }
        });
}

function viewEmployees() {
    //<--Rendering all employee stats. AS keyword sets the column to a temporary alias which lasts the duration of the query. Otherwise the department will just show up as "name"-->
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

//<--These lines are similar to the view employees, only now we're gathering the preferred Department, setting it to a variable, and templating it into the department name-->
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
    var query = `SELECT department.id, department.name FROM department`;
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
}

function viewRoles() {
    var query = `SELECT role.id, role.title, role.salary, department.name as department FROM role
    LEFT JOIN department ON role.department_id = department.id`;
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
}

function addRole() {
    inquirer.prompt([{
            name: "role",
            type: "input",
            message: "Which role would you like to add?"
        }, {
            name: "dept",
            type: "list",
            message: "Into which department would you like to assign this role?",
            choices: departments
        }, {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?",
        }])
        .then(function(answer) {
            if (answer.dept === "Sales") {
                var depID = "1"
            } else if (answer.dept === "Engineering") {
                var depID = "2"
            } else if (answer.dept === "Finance") {
                var depID = "3"
            } else if (answer.dept === "Legal") {
                var depID = "4"
            }
            connection.query(
                `INSERT INTO role SET ?`, {
                    title: answer.role,
                    salary: answer.salary,
                    department_id: depID
                },
                function(err) {
                    if (err) throw err;
                    console.log("Role Created Successfully");
                    viewRoles();

                }
            );

        })

}

function addDept() {
    inquirer.prompt([{
            name: "dep",
            type: "input",
            message: "Which department would you like to add?"
        }])
        .then(function(answer) {
            connection.query(
                `INSERT INTO department SET ?`, {
                    name: answer.dep,
                },
                function(err) {
                    if (err) throw err;
                    console.log("Department Created Successfully");
                    viewDepts();
                }
            )
        })
}

function addEmp() {
    inquirer.prompt([{
            name: "first",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: roles
        },
        {
            name: "man",
            type: "list",
            message: "Who is the employee's manager?",
            choices: managers
        }
    ]).then(function(answer) {
        if (answer.role === "Sales Lead") {
            var roleid = "5"
        } else if (answer.role === "Salesperson") {
            var roleid = "6"
        } else if (answer.role === "Lead Engineer") {
            var roleid = "7"
        } else if (answer.role === "Software Engineer") {
            var roleid = "8"
        } else if (answer.role === "Accountant") {
            var roleid = "9"
        } else if (answer.role === "Legal Team Lead") {
            var roleid = "10"
        } else if (answer.role === "Lawyer") {
            var roleid = "11"
        };
        if (answer.man === "Ashley Rodriguez") {
            var manid = "3"
        } else if (answer.man === "John Doe") {
            var manid = "1"
        } else if (answer.man === "Sarah Lourd") {
            var manid = "6"
        } else if (answer.man === "Mike Chan") {
            var manid = "2"
        }
        connection.query(
            `INSERT INTO employee SET ?`, {
                first_name: answer.first,
                last_name: answer.last,
                role_id: roleid,
                manager_id: manid,
            },
            function(err) {
                if (err) throw err;
                console.log("Employee Added Successfully");
                viewEmployees();
            }
        )
    })
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