create table
    farm_users(
        id int auto_increment primary key,
        username varchar(255) not null,
        googleId varchar(255) not null,
        photo varchar(255) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
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
