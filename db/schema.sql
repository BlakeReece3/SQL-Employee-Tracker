DROP DATABASE IF EXISTS marketing_db;
CREATE DATABASE marketing_db;

USE marketing_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

