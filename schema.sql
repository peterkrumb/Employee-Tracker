CREATE DATABASE Employee_TrackerDB;
USE Employee_TrackerDB;

CREATE TABLE department
(
	id int NOT NULL,
	name varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE roles
(
	id int NOT NULL,
	title varchar(30) NOT NULL,
    salary decimal(10, 3),
    department_id INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE employee
(
	id int NOT NULL,
	first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
	PRIMARY KEY (id)
);

