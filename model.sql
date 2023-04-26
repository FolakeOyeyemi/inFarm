-- Active: 1682449495010@@127.0.0.1@3306@infarm
create table
    farm_users(
        id int auto_increment primary key,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        googleId VARCHAR(255) NOT NULL,
        photo VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )


    create table
    farm_investments(
        ID INT AUTO_INCREMENT PRIMARY KEY,
        package_name VARCHAR(255) NOT NULL,
        location_of_farm VARCHAR(255) NOT NULL,
        duration VARCHAR(255) NOT NULL,
        amount_per_unit VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
