import express from 'express';
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
}

function viewRoles() {
  pool.query('SELECT * FROM roles', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
    }
  })
}

function viewEmployees() {
  pool.query('SELECT * FROM employees', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
    }
  })
}

function addDepartments(department: string) {
  pool.query('INSERT INTO departments (name) VALUES ($1)', [department],(err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
    }
  })
}

function addRoles(title: string, salary: number, department: number) {
  pool.query('INSERT INTO roles (title, salary, department) VALUES ($1, $2, $3)', [title,salary,department],(err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
    }
  })
}

function addEmployees(first_name: string, last_name: string, manager_id: number, role_id: number) {
  pool.query('INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ($1, $2, $3, $4)', [first_name,last_name,manager_id,role_id],(err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
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

