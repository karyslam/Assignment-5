DROP DATABASE flowershop;

-- SQL Schema for Flower Shop
CREATE DATABASE IF NOT EXISTS flowershop;

USE flowershop;

-- Creating Categories Table
CREATE TABLE
    Categories (
        category_id INT AUTO_INCREMENT PRIMARY KEY,
        category_name VARCHAR(255) NOT NULL
    );

-- Creating Products Table
CREATE TABLE
    Products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category_id INT,
        FOREIGN KEY (category_id) REFERENCES Categories (category_id)
    );

-- Creating Customers Table
CREATE TABLE
    Customers (
        customer_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    );



-- Creating Employees Table
CREATE TABLE
    Employees (
        employee_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL
    );

-- Creating Sales Table
CREATE TABLE
    Sales (
        sale_id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT,
        employee_id INT,
        customer_id INT,
        quantity INT,
        sale_date DATE,
        FOREIGN KEY (product_id) REFERENCES Products (product_id),
        FOREIGN KEY (employee_id) REFERENCES Employees (employee_id),
        FOREIGN KEY (customer_id) REFERENCES Customers (customer_id)
    )