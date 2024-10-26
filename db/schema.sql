DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE departments (
  department_id SERIAL PRIMARY KEY NOT NULL,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY NOT NULL,
    role_name VARCHAR(60) NOT NULL,
    salary INT NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL
    FOREIGN KEY (department_id)
    REFERENCES departments(department_id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    role_name VARCHAR(60) NOT NULL,
    manager VARCHAR(100) NOT NULL,
    role_id INT NOT NULL
    FOREIGN KEY (role_id)
    REFERENCES roles(role_id)
    ON DELETE SET NULL
);