DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  productName VARCHAR(100) NOT NULL,
  departmentName VARCHAR(45) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stockQuantity INTEGER (10) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Nike Sweater", "clothing", 10.50, 1000),
("Amazon Echo", "electronics", 99.99 , 75),
("Redbull", "food", 2.50, 6000),
("Rayban Sunglasses", "accessories", 99.99, 1000),
("Tide Pods", "household", 3.50, 6000),
("KitchenAid Mixer", "household", 229.99, 300),
("Predator Drone", "electronics", 500000, 1),
("Purina Dog Food", "pet supplies", 20.00, 3000),
("Fire TV Stick", "electronics", 39.99, 50),
("Beats By Dr. Dre", "electronics", 240.00, 1000);