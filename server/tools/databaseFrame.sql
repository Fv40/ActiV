-- Creation statements for DB tables
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    profile_picture_source VARCHAR(255),
    email VARCHAR(100) NOT NULL UNIQUE,
    friendgroups INT[] DEFAULT '{}',
    isAdmin BOOLEAN DEFAULT FALSE
    );
