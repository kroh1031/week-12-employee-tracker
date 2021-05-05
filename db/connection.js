require("dotenv").config({ path: "../.env" });

const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: process.env.DB_USERNAME,

  // Be sure to update with your own MySQL password!
  password: process.env.DB_PASSWORD,

  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected as id ${connection.threadId}`);
  start();
});

// TODO: Create a prompt asking what the user would like to do.
const start = () => {
  inquirer
    .prompt({
      name: "userChoice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Update Employee Role",
        "Quit",
      ],
    })
    .then((response) => {
      switch (response.userChoice) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        default:
          connection.end();
          break;
      }
    });
};

const addDepartment = () => {
  connection.query("SELECT name FROM department", (err) => {
    if (err) throw err;
    inquirer
      .prompt({
        name: "departmentName",
        type: "input",
        message: "What is the name of the department?",
      })
      .then((response) => {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: response.departmentName,
          },
          (err) => {
            if (err) throw err;
            console.log(`Added ${response.departmentName} to the database`);
            start();
          }
        );
      });
  });
};

const addRole = () => {
  connection.query("SELECT name, id FROM department", (err, results) => {
    if (err) throw err;
    // console.log(results);
    const mappedResults = results.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
    console.table(mappedResults);
    inquirer
      .prompt([
        {
          name: "roleName",
          type: "input",
          message: "What is the name of the role?",
        },
        {
          name: "roleSalary",
          type: "input",
          message: "What is the salary of the role?",
        },
        {
          name: "roleDept",
          type: "list",
          message: "Which department does the role belong to?",
          choices: mappedResults,
        },
      ])
      .then((response) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: response.roleName,
            salary: response.roleSalary,
            department_id: response.roleDept,
          },
          (err) => {
            if (err) throw err;
            console.log(`Added ${response.roleName} to the database`);
            start();
          }
        );
      });
  });
};
const addEmployee = () => {};
const viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};
const viewRoles = () => {};
const viewEmployees = () => {};
const updateEmployeeRole = () => {};
// Build a command-line application that at a minimum allows the user to:
// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles

//What would you like to do?
//Choices
//Add Department
//Add Role
//Add Employee
//View All Departments
//View All Roles
//View All Employees
//Update Employee Role
//Quit
