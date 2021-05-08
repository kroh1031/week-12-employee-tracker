const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./db/connection");

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
          console.log("Goodbye");
          connection.end();
          break;
      }
    })
    .catch((err) => console.log(err));
};

// Add new department
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

// Add new role
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
    // console.table(mappedResults);
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

// Add new employee
const addEmployee = () => {
  connection.query("SELECT * from role", (err, results) => {
    if (err) throw err;
    console.table(results);
    const mappedRoles = results.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });

    connection.query("SELECT * from employee", (err, results2) => {
      if (err) throw err;
      const mappedManagers = results2.map((manager) => {
        return {
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id,
        };
      });
      // Includes duplicates
      // console.table(mappedRoles);
      // Includes null
      // console.table(mappedManagers);
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "employeeRole",
            type: "list",
            message: "What is the employee's role?",
            choices: mappedRoles,
          },
          {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: mappedManagers,
          },
        ])
        .then((response) => {
          // console.log("manager", response.manager);
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: response.firstName,
              last_name: response.lastName,
              role_id: response.employeeRole,
              manager_id: response.manager,
            },
            (err, res) => {
              if (err) throw err;
              console.log(
                `Added ${response.firstName} ${response.lastName} to the database`
              );
              start();
            }
          );
        });
    });
  });
};

// View all departments
const viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// View all roles
const viewRoles = () => {
  connection.query(
    "SELECT r.id, r.title AS role, d.name AS department, r.salary FROM role r LEFT JOIN department d ON r.department_id = d.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
};

// View all employees
const viewEmployees = () => {
  connection.query(
    "SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'manager' FROM employee e  LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON m.id = e.manager_id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
};

// Update an employee role
const updateEmployeeRole = () => {
  connection.query(`SELECT * FROM role`, (err, results) => {
    if (err) throw err;
    // console.log(results);
    const mappedRoles = results.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });

    connection.query(`SELECT * FROM employee`, (err, results2) => {
      if (err) throw err;
      const mappedEmployees = results2.map((employee) => {
        // console.log("id", employee.employee_id);
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        };
      });

      // console.log(mappedEmployees);
      // console.log(mappedRoles);
      inquirer
        .prompt([
          {
            name: "updatedEmployee",
            type: "list",
            message: "Which employee's role do you want to update?",
            choices: mappedEmployees,
          },
          {
            name: "employeeRole",
            type: "list",
            message: "Which role do you want to assign the selected employee?",
            choices: mappedRoles,
          },
        ])
        .then((response) => {
          // console.log("role_id", response.employeeRole);
          // console.log("id", response.updatedEmployee);
          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [response.employeeRole, response.updatedEmployee],
            (err) => {
              if (err) throw err;
              console.log(`Updated employee's role`);
              start();
            }
          );
        });
    });
  });
};

connection.connect((err) => {
  if (err) throw err;
  // console.log(`Connected as id ${connection.threadId}`);
  start();
});
