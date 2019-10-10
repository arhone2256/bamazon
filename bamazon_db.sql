DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
    item_id INT(40) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(40) NOT NULL,
    department_name VARCHAR(40) NULL,
    price DECIMAL(10,2) NULL,
    product_quantity INT(20) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, product_quantity)
VALUES ("Camera", "Technology", 699.89, 50), ("Microphone", "Technology", 58.99, 70), ("X-Box", "Technology", 367.69, 30), ("PlayStation", "Technology", 399.89, 45);
INSERT INTO products (product_name, department_name, price, product_quantity)
VALUES ("Soccer Ball", "Athletic Equipment", 15.50, 40), ("Shin Gaurds", "Athletic Equipment", 20.99, 30), ("Tennis Balls", "Athletic Equipment", 16.80, 25), ("Tennis Racket", "Athletic Equipment", 34.99, 19);
INSERT INTO products (product_name, department_name, price, product_quantity)
VALUES ("Notebook", "Supplies", 1.99, 55), ("Pens", "Supplies", 5.88, 300), ("Paper", "Supplies", 2.99, 100), ("Tabs", "Supplies", 2.30, 150);
