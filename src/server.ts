import express from 'express';
import inquirer from 'inquirer';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



function viewDepartments() {
  pool.query('SELECT * FROM departments', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
    }
  })
};

function viewRoles() {
  pool.query('SELECT * FROM roles', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
    }
  })
};

function viewEmployees() {
  pool.query('SELECT * FROM employees', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
    }
  })
};

function addDepartments() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'Enter the name for the new department: '
    }
  ]) .then((answers) => 
  
  pool.query('INSERT INTO departments (name) VALUES ($1)', [answers.department],(err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
    }
  })
)
};

function addRoles() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: 'Enter the name for the new role: '
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the new role: '
    },
    {
      type: 'input',
      name: 'department',
      message: 'Enter the department the new role belongs to: '
    }
  ]) .then((answers) => 
  
  pool.query('INSERT INTO roles (title, salary, department) VALUES ($1, $2, $3)', [answers.role, answers.salary, answers.department],(err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
    }
  })
)
};

function addEmployees() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee: '
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last_name of the employee: '
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager for the new employee: '
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the job title of the employee: '
    }
  ]) .then((answers) => 
  pool.query('INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ($1, $2, $3, $4)', [answers.first_name,answers.last_name,answers.manager_id,answers.role_id],(err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
    }
  })
)
};

function updateEmployee(){

};

function performTasks() {
  let exit: boolean = false;
  inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update the Role of an Employee',
          'Exit',
        ],
    },
  ]) .then((answers) =>{
      if (answers.action === 'View All Departments') {
        viewDepartments();
      }
      else if (answers.action === 'View All Roles') {
        viewRoles();
      }
      else if (answers.action === 'View All Employees') {
        viewEmployees();
      }
      else if (answers.action === 'Add a Department') {
        addDepartments();
      }
      else if (answers.action === 'Add a Role') {
        addRoles();
      }
      else if (answers.action === 'Add an Employee') {
        addEmployees();
      }
      else if (answers.action === 'Update the Role of an Employee') {
        updateEmployee();
      }
      else {
        exit = true;
      }
      if (!exit){
          performTasks();
      }
      
  })
}

// Default response for any other request (Not Found)
app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
performTasks();

