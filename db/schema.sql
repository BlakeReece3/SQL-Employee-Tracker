DROP DATABASE IF EXISTS marketing_db;
CREATE DATABASE marketing_db;

USE marketing_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (role_id) REFERENCES role(id),
--   FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name) VALUES
  ('Sales'),
  ('Research'),
  ('Finance'),
  ('Marketing');

INSERT INTO role (id, salary, title, department_id) VALUES
  (1, 100000, 'Sales Lead', 1),
  (2, 80000, 'Research Manager', 1),
  (3, 90000, 'Finance Director', 2),
  (4, 60000, 'Marketing Lead', 2);

  INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
  (1, 'John', 'Doe', 1, NULL),
  (2, 'Jim', 'Chance', 2, 1),
  (3, 'Anne', 'Smith', 3, 1),
  (4, 'Tim', 'Black', 4, 1);
  
 