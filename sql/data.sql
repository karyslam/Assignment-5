-- Sample INSERT Statements for Flower Shop
use flowershop;

-- Inserting data into Categories
INSERT INTO
    Categories (category_name)
VALUES
    ('Graduation'),
    ('Engagement'),
    ('Appreciation');

-- Inserting data into Products
INSERT INTO
    Products (name, description, category_id)
VALUES
    (
        'Bouquet of Roses',
        'Consists of 6 fresh roses',
        1
    ),
    (
        'Graduation Bouquet',
        'Mix of fresh sunflowers and baby breaths',
        2
    ),
    (
        'Engagement Bouquet',
        'Consists of 50 fresh roses',
        3
    );

-- Inserting data into Customers
INSERT INTO
    Customers (first_name, last_name, email)
VALUES
    ('Jane', 'Street', 'jane22@gmail.com'),
    ('Avery', 'Smith', 'avery25@gmail.com'),
    ('John', 'Boey', 'johnyy@gmail.com');

-- Inserting data into Employees
INSERT INTO
    Employees (first_name, last_name)
VALUES
    ('Emily', 'Brown'),
    ('Vanessa', 'Davis'),
    ('Joseph', 'Wilson');

-- Inserting data into Sales
INSERT INTO
    Sales (
        product_id,
        employee_id,
        customer_id,
        quantity,
        sale_date
    )
VALUES
    (1, 1, 1, 1, '2024-02-14'),
    (2, 1, 2, 2, '2024-02-10'),
    (3, 2, 3, 2, '2024-03-15');