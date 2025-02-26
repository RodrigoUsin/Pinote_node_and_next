DROP DATABASE IF EXISTS pinotenext;
CREATE DATABASE pinotenext;
USE pinotenext;

-- tablas independientes

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(300) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images (
	id INT PRIMARY KEY AUTO_INCREMENT,
    url TEXT NOT NULL,
    description VARCHAR (250) NULL,
    uploaded_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
	id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR (50) NOT NULL UNIQUE
);

CREATE TABLE states (
	id INT PRIMARY KEY AUTO_INCREMENT,
    state ENUM ('publica', 'privada') NOT NULL DEFAULT 'privada'
);


-- tablas dependientes de una o más FK

CREATE TABLE notes (
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (50) NOT NULL,
    content TEXT NOT NULL,
    category_id INT,
    user_id INT,
    image_id INT,
    state_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (image_id) REFERENCES images(id),
    FOREIGN KEY (state_id) REFERENCES states(id),
    published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);