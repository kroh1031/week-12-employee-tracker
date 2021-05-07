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

-- SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'manager'
-- FROM employee e 
-- LEFT JOIN employee m
--    ON e.id = m.manager_id
-- LEFT JOIN role r
--    ON e.role_id = r.id
-- LEFT JOIN department d 
--    ON r.department_id = d.id

-- -- need to get name of department, not department_id
-- SELECT r.id, r.title AS role, d.name AS department, r.salary 
-- FROM role r
-- LEFT JOIN department d
--    ON r.department_id = d.id

-- -- need to ask user who the employee's manager 
-- -- TODO: join role table from employee table 
-- SELECT r.id, r.title, CONCAT(m.first_name, ' ', m.last_name) AS 'manager' 
-- FROM employee e 
-- LEFT JOIN employee m 
--    ON e.id = m.manager_id 
-- LEFT JOIN role r 
--    ON e.role_id = r.id

-- TODO: What do you need to update employee role? 
-- SELECT r.title, e.first_name, e.last_name 
-- FROM employee e 
-- LEFT JOIN role r 
--    ON e.role_id = r.id

-- Trying to update an employee's role by joining the employee table with the role table so that based on the input of which employee the user wants to update, the title of the role from the role table can be updated as well.
-- The employee table only has the role_id, and not the title of the role, which is only in the role table.
-- UPDATE employee SET role_id = 8 WHERE id = 4

-- need to get role id and role title and employee first and last name and employee id
-- SELECT r.id AS "role id", r.title, e.id AS "employee id", e.first_name, e.last_name FROM employee e LEFT JOIN role r ON e.role_id = r.id