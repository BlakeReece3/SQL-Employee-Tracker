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

  
