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
      console.table(result.rows);
    }
  })
};

function viewRoles() {
  pool.query('SELECT * FROM roles JOIN departments ON roles.department = departments.id', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.table(result.rows);
              
            }
          })
};

function viewEmployees() {
  pool.query('SELECT * FROM employees', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.table(result.rows);
              
            }
          })
};

function viewEmployeesByManager() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'manager',
      message: 'Enter the name of the manager: '
    }
  ]) .then((answers) => 
  
  pool.query('SELECT * FROM employees WHERE manager_id = $1', [answers.manager],(err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.table(result.rows);
    }
  })
)
};

function viewEmployeesByDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'Enter the name of the department: '
    }
  ]) .then((answers) => 
  
  pool.query('SELECT * FROM employees WHERE department = $1', [answers.department],(err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.table(result.rows);
    }
  })
)
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
      console.log(`Department ${answers.department} added!`);
      performTasks();
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
      console.log(`Role ${answers.role} added!`);
      performTasks();
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
      message: 'Enter the manager id for the new employee: '
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the job title id of the employee: '
    }
  ]) .then((answers) => 
  pool.query('INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ($1, $2, $3, $4)', [answers.first_name,answers.last_name,answers.manager_id,answers.role_id],(err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(`Employee ${answers.first_name} ${answers.last_name} added!`);
      performTasks();
    }
  })
)
};

function updateEmployee(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee',
      message: 'Enter the name of the employee to update: '
    },
    {
      type: 'input',
      name: 'role',
      message: 'Enter the new role for the employee: '
    }
  ]) .then((answers) => 
  
  pool.query(`UPDATE employees SET role_id = '$1' WHERE id = $2`, [answers.role, answers.employee],(err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(`Employee updated!`);
      performTasks();
    }
  })
)
};

function updateEmployeeManager(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee',
      message: 'Enter the name of the employee to update: '
    },
    {
      type: 'input',
      name: 'manager',
      message: 'Enter the new manager for the employee: '
    }
  ]) .then((answers) => 
  
  pool.query(`UPDATE employees SET manager_id = '$1' WHERE id = $2`, [answers.manager, answers.employee],(err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(`Employee updated!`);
      performTasks();
    }
  })
)
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
          'View Employees by Manager',
          'View Employees by Department',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update the Role of an Employee',
          'Update the Manager of an Employee',
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
      else if (answers.action === 'View Employees by Manager') {
        viewEmployeesByManager();
      }
      else if (answers.action === 'View Employees by Department') {
        viewEmployeesByDepartment();
      }
      else if (answers.action === 'Add a Department') {
        addDepartments();
        return;
      }
      else if (answers.action === 'Add a Role') {
        addRoles();
        return;
      }
      else if (answers.action === 'Add an Employee') {
        addEmployees();
        return;
      }
      else if (answers.action === 'Update the Role of an Employee') {
        updateEmployee();
        return;
      }
      else if (answers.action === 'Update the Manager of an Employee') {
        updateEmployeeManager();
        return;
      }
      else {
        exit = true;
        console.log('Thank you for using Managed!')
        console.log('Goodbye!')
        process.exit(0);

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

