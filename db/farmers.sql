CREATE TABLE IF NOT EXISTS `farmers` (
    `id` INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `first_name` VARCHAR(150) NOT NULL,
    `last_name` VARCHAR(150) NOT NULL,
    `phone_number` VARCHAR(150) NOT NULL,
    `age` INT(11) NOT NULL,
    `address` VARCHAR(150) NOT NULL,
    `crops` JSON NOT NULL,
    UNIQUE (`phone_number`)
)