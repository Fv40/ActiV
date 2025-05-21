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
    activity_date timestamp DEFAULT CURRENT_TIMESTAMP,
    thumbnail_src TEXT,
    activity_description TEXT,
    duration_m int
    );

CREATE TABLE friendgroups (
    group_id SERIAL PRIMARY KEY,
    group_name TEXT NOT NULL,
    group_description TEXT,
    group_picture_source VARCHAR(255),
    owner_id INT NOT NULL REFERENCES users(user_id),
    friendgroup_members INT[] DEFAULT '{}'
    );

CREATE TABLE meals (
    meal_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    calories INT NOT NULL,
    meal_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL
);

CREATE TABLE friendgroupInvities (
    invite_id SERIAL PRIMARY KEY,
    group_id INT NOT NULL REFERENCES friendgroups(group_id),
    user_id INT NOT NULL REFERENCES users(user_id),
    invite_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);