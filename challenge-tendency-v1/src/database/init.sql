-- This script use the default database defined by MYSQL_DATABASE in docker-compose.yml

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    img_profile VARCHAR(255)
);

-- Create catalog_products table
CREATE TABLE IF NOT EXISTS catalog_products (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    height FLOAT,
    length FLOAT,
    width FLOAT
);

-- Create access_tokens table
-- Here a new row has been added to store the creation time
CREATE TABLE IF NOT EXISTS access_tokens (
    id CHAR(36) PRIMARY KEY ,
    user_id CHAR(36) NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- My first option was to create a trigger to delete each token exactly one hour after its creation, but in MySQL, triggers do not support dynamic SQL.
-- So I had to create a stored procedure to schedule the deletion of the token and have it called by the trigger

DELIMITER $$
CREATE PROCEDURE schedule_token_deletion(IN token_id CHAR(36), IN created_at TIMESTAMP)
BEGIN
    SET @delete_time = DATE_ADD(created_at, INTERVAL 3 MINUTE);
    SET @event_name = CONCAT('delete_token_', REPLACE(token_id, '-', '_'));
    SET @delete_query = CONCAT('CREATE EVENT IF NOT EXISTS ', @event_name, 
                               ' ON SCHEDULE AT \'', @delete_time, 
                               '\' DO DELETE FROM access_tokens WHERE id = \'', token_id, '\'');
    PREPARE stmt FROM @delete_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;


-- the trigger will call the stored procedure
DELIMITER $$
CREATE TRIGGER delete_token_after_insert
AFTER INSERT ON access_tokens
FOR EACH ROW
BEGIN
    CALL schedule_token_deletion(NEW.id, NEW.created_at);
END$$
DELIMITER ;