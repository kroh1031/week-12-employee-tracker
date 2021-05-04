SELECT * FROM department;
INSERT INTO department (name)
VALUES 
("Engineering"),
("Finance"), 
("Legal"),
("Sales");

SELECT * FROM role;
INSERT INTO role (title, department_id, salary)
VALUES 
("Sales Lead", "Sales", 100000)
("Salesperson", "Sales", 80000)
("Lead Engineer", "Engineering", 150000)
("Software Engineer", "Engineering", 120000)
("Account Manager", "Finance", 160000)
("Accountant", "Finance", 125000)
("Legal Team Lead", "Legal", 250000)
("Lawyer", "Legal", 190000)

SELECT * FROM employee;
INSERT INTO employee (first_name, last_name, role_id)
VALUES 
("John", "Doe", "Sales Lead (title)", "Sales(department)", "100000 (salary)")
("Mike", "Chan", "Salesperson", "Sales", 80000)
("Ashley", "Rodriguez", "Lead Engineer", "Engineering", 150000)
("Kevin", "Tupik", "Software Engineer", "Engineering", 120000)
("Kunal", "Singh", "Account Manager", "Finance", 160000)
("Malia", "Brown", "Accountant", "Finance", 125000)
("Sarah", "Lourd", "Legal Team Lead", "Legal", 250000)
("Tom", "Allen", "Lawyer", "Legal", 190000)

