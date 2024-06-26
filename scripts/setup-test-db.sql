CREATE DATABASE IF NOT EXISTS test_db;

USE test_db;

CREATE TABLE IF NOT EXISTS natural_person (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cpf VARCHAR(11) NOT NULL,
  name VARCHAR(255) NOT NULL,
  cellPhone VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  cep VARCHAR(10) NOT NULL,
  street VARCHAR(255) NOT NULL,
  number INT NOT NULL,
  complement VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  neighborhood VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS legal_person (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cnpj VARCHAR(14) NOT NULL,
  responsibleCpf VARCHAR(11) NOT NULL,
  name VARCHAR(255) NOT NULL,
  cellPhone VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  cep VARCHAR(10) NOT NULL,
  street VARCHAR(255) NOT NULL,
  number INT NOT NULL,
  complement VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  neighborhood VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS errors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stack TEXT NOT NULL,
  date DATETIME NOT NULL
);
