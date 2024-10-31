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


function destructureEmployee(answers: any) {
    const { id } = answers;
    return id;
}


function viewDepartments() {
  pool.query('SELECT departments.id AS "ID", departments.name AS "Department" FROM departments', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.table(result.rows);
    }
  })
};

function viewRoles() {
  pool.query('SELECT roles.title AS "Job Title", roles.id AS "Role ID", departments.name AS "Department", roles.salary AS "Salary" FROM roles JOIN departments ON roles.department = departments.id', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.table(result.rows);
              
            }
          })
};

function viewEmployees() {
  pool.query(`SELECT employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Job Title", roles.salary AS "Salary", departments.name AS "Department", manager.first_name || ' ' || manager.last_name AS "Manager"  FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department = departments.id LEFT JOIN employees manager ON employees.manager_id = manager.id`, (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.table(result.rows);
              
            }
          })
};

const viewEmployeesByManager = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'manager',
        message: 'Enter the last name of the manager: '
      }
    ]);
    const man_id = await pool.query('SELECT employees.id FROM employees WHERE employees.last_name = $1', [answers.manager]); 
    const { id } = man_id.rows[0];
    const result = await pool.query(`SELECT employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Job Title", roles.salary AS "Salary", departments.name AS "Department", manager.first_name || ' ' || manager.last_name AS "Manager"  FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department = departments.id LEFT JOIN employees manager ON employees.manager_id = manager.id WHERE employees.manager_id = $1`, [id]);
    console.table(result.rows);
    performTasks();
  } catch (err) {
    console.error(err);
  }
};

const viewEmployeesByDepartment = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'department',
        message: 'Enter the name of the department: '
      }
    ]);
    const dep_id = await pool.query('SELECT departments.id FROM departments WHERE departments.name = $1', [answers.department]); 
    const id = destructureEmployee(dep_id.rows[0]);
    const result = await pool.query(`SELECT employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Job Title", roles.salary AS "Salary", departments.name AS "Department", manager.first_name || ' ' || manager.last_name AS "Manager"  FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department = departments.id LEFT JOIN employees manager ON employees.manager_id = manager.id WHERE roles.department = $1`, [id]);
    console.table(result.rows);
    performTasks();
  } catch (err) {
    console.error(err);
  }
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

async function addRoles() {
  try {
    let answers = await inquirer.prompt([
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
    ])
    const fetchDepId = await pool.query('SELECT departments.id FROM departments WHERE departments.name = $1', [answers.department]);
    const parseId = destructureEmployee(fetchDepId.rows[0]);
    const result = await pool.query('INSERT INTO roles (title, salary, department) VALUES ($1, $2, $3)', [answers.role, answers.salary, parseId]);
        if (result) {
        console.log(`Role ${answers.role} added!`);
        performTasks();
      }
    } catch (err) {
  console.error(err);
}
};

async function addEmployees() {
  try {
    let answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the employee: '
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the employee: '
      },
      {
        type: 'input',
        name: 'manager',
        message: 'Enter the last name of the manager for the new employee: '
      },
      {
        type: 'input',
        name: 'role',
        message: 'Enter the job title of the employee: '
      }
    ]);
    const manager_id = await pool.query('SELECT employees.id FROM employees WHERE employees.last_name = $1', [answers.manager]);
    const parsedManID = destructureEmployee(manager_id.rows[0]);
    const role_id = await pool.query('SELECT roles.id FROM roles WHERE roles.title = $1', [answers.role]);
    const parsedRoleID = destructureEmployee(role_id.rows[0]);
    const result = await pool.query('INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ($1, $2, $3, $4)', [answers.first_name,answers.last_name,parsedManID,parsedRoleID])
        if (result) {
        console.log(`Employee ${answers.first_name} ${answers.last_name} added!`);
        performTasks();
      }
    }
    catch (err) {
    console.error(err);
  }
};

async function updateEmployee(){
  try {
    let answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'employee',
        message: 'Enter the last name of the employee to update: '
      },
      {
        type: 'input',
        name: 'role',
        message: 'Enter the new Role: '
      }
    ])
    const oldID = await pool.query(`SELECT employees.id FROM employees WHERE employees.last_name = $1`, [answers.employee]);
    const emp_id = destructureEmployee(oldID.rows[0]);
    const newID = await pool.query(`SELECT roles.id FROM roles WHERE roles.title = $1`, [answers.role]);
    const role_id = destructureEmployee(newID.rows[0]);
    const result = await pool.query(`UPDATE employees SET role_id = $1 WHERE id = $2`, [role_id, emp_id]);
    if (result) {
      console.log('Employee updated!');
      performTasks();
    }
  }catch (err) {
    console.error(err);
  }
};

async function updateEmployeeManager(){
  try {
    let answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'employee',
        message: 'Enter the last name of the employee to update: '
      },
      {
        type: 'input',
        name: 'manager',
        message: 'Enter the last name of the new manager: '
      }
    ])
    const oldID = await pool.query(`SELECT employees.id FROM employees WHERE employees.last_name = $1`, [answers.employee]);
    const emp_id = destructureEmployee(oldID.rows[0]);
    const newID = await pool.query(`SELECT employees.id FROM employees WHERE employees.last_name = $1`, [answers.manager]);
    const man_id = destructureEmployee(newID.rows[0]);
    const result = await pool.query(`UPDATE employees SET manager_id = $1 WHERE id = $2`, [man_id, emp_id]);
    if (result) {
      console.log('Employee updated!');
      performTasks();
    }
  }catch (err) {
    console.error(err);
  }
};

async function deleteDepartment(){
  try{
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'department',
        message: 'Enter the name of the department to delete: '
      },
    ]);
    const id = await pool.query(`SELECT departments.id FROM departments WHERE departments.name = $1`, [answers.department]);
    const delId = destructureEmployee(id.rows[0]);
    const result = await pool.query(`DELETE FROM departments WHERE id = $1`, [delId])
    if (result) {
      console.log(`Department Deleted!`);
      performTasks();
    }
  }
  catch (err) {
    console.error(err);
  }
};

async function deleteRole(){
  try{
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'role',
        message: 'Enter the name of the role to delete: '
      },
    ]);
    const id = await pool.query(`SELECT roles.id FROM roles WHERE roles.title = $1`, [answers.role]);
    const delId = destructureEmployee(id.rows[0]);
    const result = await pool.query(`DELETE FROM roles WHERE id = $1`, [delId])
    if (result) {
      console.log(`Role Deleted!`);
      performTasks();
    }
  }
  catch (err) {
    console.error(err);
  }
};

async function deleteEmployee(){
  try{
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'employee',
        message: 'Enter the last name of the employee to delete: '
      },
    ]);
    const id = await pool.query(`SELECT employees.id FROM employees WHERE employees.last_name = $1`, [answers.employee]);
    const delId = destructureEmployee(id.rows[0]);
    const result = await pool.query(`DELETE FROM employees WHERE id = $1`, [delId])
    if (result) {
      console.log(`Employee Deleted!`);
      performTasks();
    }
  }
  catch (err) {
    console.error(err);
  }
};

function deleteActions() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select department, role, or employee: ',
      choices: [
        'Department',
        'Role',
        'Employee'
      ]
    }
  ]) .then((answers) => {
      if (answers.action === 'Department') {
        deleteDepartment();
        return;
      }
      else if (answers.action === 'Role') {
        deleteRole();
        return;
      } else {
        deleteEmployee();
        return;
      }
})
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
          'Delete a Department, Role, or Employee',
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
        return;
      }
      else if (answers.action === 'View Employees by Department') {
        viewEmployeesByDepartment();
        return;
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
      else if (answers.action === 'Delete a Department, Role, or Employee') {
        deleteActions();
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

