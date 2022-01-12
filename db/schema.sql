DROP DATABASE IF EXISTS typing_db;
CREATE DATABASE typing_db;

USE typing_db;

CREATE TABLE user (
    id  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30)
    score INT
);
CREATE TABLE english (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prompt TEXT 
);
CREATE TABLE javascript (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prompt TEXT 
);
CREATE TABLE html (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prompt TEXT 
);
CREATE TABLE css (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prompt TEXT 
);

