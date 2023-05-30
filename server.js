const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { async } = require('jshint/src/prod-params');
require('dotenv').config();


// Connect to database

const database = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

const questions = [
    {
      name: 'selection',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'View all departments',
          value: 'viewDepartments',
        },
        {
          name: 'View all roles',
          value: 'viewRoles',
        },
        {
          name: 'View all employees',
          value: 'viewEmployees',
        },
        {
          name: 'Add a department',
          value: 'addDepartment',
        },
        {
          name: 'Add a role',
          value: 'addRole',
        },
        {
          name: 'Add an employee',
          value: 'addEmployee',
        },
        {
          name: 'Update an employee role',
          value: 'updateEmployeeRole',
        },
        {
          name: 'Exit',
          value: 'exit',
        },
      ],
    },
  ];
  
  async function init() {
    try {
      const response = await inquirer.prompt(questions);
      switch (response.selection) {
        case 'View all departments':
          await viewDepartments();
          break;
        case 'View all roles':
          await viewRoles();
          break;
        case 'View all employees':
          await viewEmployees();
          break;
        case 'Add a department':
          await addDepartment();
          break;
        case 'Add a role':
          await addRole();
          break;
        case 'Add an employee':
          await addEmployee();
          break;
        case 'Update an employee role':
          await updateEmployeeRole();
          break;
        case 'Exit':
          db.end();
          break;
      }
    } catch (error) {
      console.error('Error occurred:', error);
      init();
    }
  }

  function viewDepartments() {
    const data = `SELECT * FROM department`;
    return new Promise((resolve, reject) => {
      db.query(data, (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.table(res);
          resolve();
        }
      });
    });
  }

  function viewRoles() {
    const data = `SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id;`;
    return new Promise((resolve, reject) => {
      db.query(data, (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.table(res);
          resolve();
        }
      });
    });
  }

function viewEmployees() {
    const data = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    return new Promise((resolve, reject) => {
        db.query(data, (err, res) => {
            if (err) {
                reject(err);
            } else {
                console.table(res);
                resolve();
            }
        });
    });
}

function addDepartment() {
    return inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What is the name of the department?',
        },
    ])
        .then((answer) => {
            const data = `INSERT INTO department (name) VALUES (?)`;
            db.query(data, answer.department, (err, res) => {
                if (err) throw err;
                console.log('Department added.');
                init();
            });
        }
        );
}

function addRole() {
    const data = `SELECT * FROM department`;
    return new Promise((resolve, reject) => {
        db.query(data, (err, res) => {
            if (err) {
                reject(err);
            } else {
                const departments = res.map((department) => {
                    return {
                        name: department.name,
                        value: department.id,
                    };
                });
                inquirer.prompt([
                    {
                        name: 'role',
                        type: 'input',
                        message: 'What is the name of the role?',
                    },
                    {
                        name: 'salary',
                        type: 'input',
                        message: 'What is the salary of the role?',
                    },
                    {
                        name: 'department',
                        type: 'list',
                        message: 'What department does the role belong to?',
                        choices: departments,
                    },
                ])
                    .then((answer) => {
                        const data = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                        db.query(data, [answer.role, answer.salary, answer.department], (err, res) => {
                            if (err) throw err;
                            console.log('Role added.');
                            init();
                        });
                    }
                    );
            }
        });
    });
}
