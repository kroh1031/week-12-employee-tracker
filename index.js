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
          console.log("managed", response.manager);
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
