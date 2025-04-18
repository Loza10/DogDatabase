-- CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
CREATE USER IF NOT EXISTS shelterUser@localhost IDENTIFIED BY 'shelter123';
DROP DATABASE IF EXISTS `cs6400_2025_01_Team025`;
SET default_storage_engine=InnoDB;
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS cs6400_2025_01_Team025
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;
USE cs6400_2025_01_Team025;
GRANT SELECT, INSERT, UPDATE, DELETE, FILE ON *.* TO 'shelterUser'@'localhost';
GRANT ALL PRIVILEGES ON `shelterUser`.* TO 'shelterUser'@'localhost';
GRANT ALL PRIVILEGES ON `cs6400_2025_01_Team025`.* TO 'shelterUser'@'localhost';
FLUSH PRIVILEGES;

-- Tables
CREATE TABLE `User`(
    email varchar(250) NOT NULL,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    phone varchar(10) NOT NULL,
    password varchar(60) NOT NULL,
    PRIMARY KEY (email)
);

CREATE TABLE Director(
    email varchar(250) UNIQUE NOT NULL DEFAULT ('daboss\@example.com'),
    CONSTRAINT DirectorSingleton CHECK (email = 'daboss\@example.com')
);

CREATE TABLE Volunteer(
    email varchar(250) UNIQUE NOT NULL,
    birth_date date NOT NULL
);

CREATE TABLE Dog(
    email varchar(250) NOT NULL,
    dogID int(16) NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    description varchar(250) NULL,
    age int(16) NOT NULL,
    sex ENUM('Male', 'Female', 'UNKNOWN') NOT NULL,
    altered boolean DEFAULT FALSE NOT NULL,
    surrender_date date NOT NULL,
    surrender_phone varchar(10) NULL,
    by_animal_control boolean DEFAULT 0 NOT NULL,
    PRIMARY KEY (dogID),
    CONSTRAINT phone_by_animal_control CHECK (by_animal_control = 0 OR surrender_phone IS NOT NULL)
);

CREATE TABLE DogBreed(
    dogID int(16) NOT NULL,
    name varchar(100) NOT NULL,
    PRIMARY KEY (dogID, name)
);

CREATE TABLE Breed(
    name varchar(100) NOT NULL,
    PRIMARY KEY (name)
);

CREATE TABLE DogMicrochip(
    dogID int(16) NOT NULL,
    microchipID varchar(100) NOT NULL,
    PRIMARY KEY (dogID)
);

CREATE TABLE Microchip(
    microchipID varchar(100) NOT NULL,
    manufacturer varchar(250) NOT NULL,
    PRIMARY KEY (microchipID)
);

CREATE TABLE Manufacturer(
    name varchar(250) NOT NULL,
    PRIMARY KEY (name)
);

CREATE TABLE Expense(
    dogID int(16) NOT NULL,
    vendor varchar(250) NOT NULL,
    date date NOT NULL,
    amount decimal(10,2) NOT NULL,
    category varchar(250) NOT NULL,
    PRIMARY KEY (dogID, vendor, date)
);

CREATE TABLE Category(
    name varchar(250) NOT NULL,
    PRIMARY KEY (name)
);

CREATE TABLE Adopter(
    email varchar(250) NOT NULL,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    phone varchar(10) NOT NULL,
    street varchar(100) NOT NULL,
    city varchar(60) NOT NULL,
    zip varchar(10) NOT NULL,
    `state` varchar(60) NOT NULL,
    household int(16) NOT NULL,
    PRIMARY KEY (email)
);

CREATE TABLE Application(
    email varchar(250) NOT NULL,
    date date NOT NULL,
    PRIMARY KEY (email, date)
);

CREATE TABLE Adoption(
    email varchar(250) NOT NULL,
    date date NOT NULL,
    fee decimal(10,2) DEFAULT 0 NOT NULL,
    is_fee_waived boolean DEFAULT 0 NOT NULL,
    decision_date date NULL,
    dogID int(16) UNIQUE NOT NULL,
    PRIMARY KEY (email, date)
);

CREATE TABLE Rejection(
    email varchar(250) NOT NULL,
    date date NOT NULL,
    PRIMARY KEY (email, date)
);

-- Constraints Foreign Keys
ALTER TABLE Director
ADD CONSTRAINT fk_Director_email_User_email FOREIGN KEY (email) REFERENCES
`User` (email);

ALTER TABLE Volunteer
ADD CONSTRAINT fk_Volunteer_email_User_email FOREIGN KEY (email) REFERENCES
`User` (email);

ALTER TABLE Dog
ADD CONSTRAINT fk_Dog_email_User_email FOREIGN KEY (email) REFERENCES
`User` (email);

ALTER TABLE DogBreed
ADD CONSTRAINT fk_DogBreed_dogID_Dog_dogID FOREIGN KEY (dogID) REFERENCES
`Dog` (dogID),
ADD CONSTRAINT fk_DogBreed_name_Breed_name FOREIGN KEY (name) REFERENCES
`Breed` (name);

ALTER TABLE DogMicrochip
ADD CONSTRAINT fk_DogMicrochip_dogID_Dog_dogID FOREIGN KEY (dogID) REFERENCES
`Dog` (dogID);

ALTER TABLE Microchip
ADD CONSTRAINT fk_Microchip_manufacturer_Manufacturer_name FOREIGN KEY (manufacturer) REFERENCES
`Manufacturer` (name);

ALTER TABLE Expense
ADD CONSTRAINT fk_Expense_dogID_Dog_dogID FOREIGN KEY (dogID) REFERENCES
`Dog` (dogID),
ADD CONSTRAINT fk_Expense_category_Category_name FOREIGN KEY (category) REFERENCES
`Category` (name);

ALTER TABLE Application
ADD CONSTRAINT fk_Application_email_Adopter_email FOREIGN KEY (email) REFERENCES
`Adopter` (email);

ALTER TABLE Adoption
ADD CONSTRAINT fk_Adoption_email_Adopter_email FOREIGN KEY (email) REFERENCES
`Adopter` (email),
ADD CONSTRAINT fk_Adoption_dogID_Dog_dogID 
FOREIGN KEY (dogID) REFERENCES Dog (dogID);

ALTER TABLE Rejection
ADD CONSTRAINT fk_Rejection_email_Adopter_email FOREIGN KEY (email) REFERENCES
`Adopter` (email);
