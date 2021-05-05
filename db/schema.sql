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

-- SELECT role.title AS role, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id