USE marketing_db;

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
    
