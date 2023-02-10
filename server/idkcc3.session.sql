-- @block
-- could use a block comment to run stuff individually
-- create table is is statement to create a table 
CREATE TABLE Users(
    rollnum BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    course VARCHAR(255) NOT NULL,
    phone BIGINT NOT NULL UNIQUE,
    -- BIGINT is a data type to store large numbers upto 19 digits
    session VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    fathername VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- @block
INSERT INTO Users(rollnum, name, course, phone, session, address, fathername, email)
VALUES (2104920100096, 'SAHAJ SINGH', 'B.Tech(CSE)', 1234567891, '2021-2025', 'DELHI', 'Rakesh Kumar Singh', 'sahajssingh2001@gmail.com');


-- @block
ALTER TABLE Users ADD COLUMN image BLOB;


-- @block
SELECT * FROM users;


