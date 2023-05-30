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

