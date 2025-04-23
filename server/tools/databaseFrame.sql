-- Creation statements for DB tables
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    profile_picture_source VARCHAR(255),
    email VARCHAR(100) NOT NULL UNIQUE,
    friendgroups INT[] DEFAULT '{}',
    isAdmin BOOLEAN DEFAULT FALSE
    );

CREATE TABLE activities (
    activity_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    activity_type VARCHAR(50) NOT NULL,
    activity_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    thumbnail_src TEXT,
    activity_description TEXT,
    duration_m INT(2)
    );