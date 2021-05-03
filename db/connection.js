require("dotenv").config({ path: "../.env" });

const mysql = require("mysql");

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
  connection.end();
});

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