DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE department (
   id INT AUTO_INCREMENT,
   name VARCHAR(30) NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE role (
   id INT AUTO_INCREMENT,
   title VARCHAR(30) NOT NULL,
   salary DECIMAL NOT NULL,
   department_id INT NOT NULL,
   FOREIGN KEY (department_id) REFERENCES department(id),
   PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);

-- SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, e.manager_id FROM role r LEFT JOIN department d ON r.department_id = d.id LEFT JOIN employee e ON r.id = e.role_id

SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'manager' FROM employee e LEFT JOIN employee m ON e.id = m.manager_id LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id