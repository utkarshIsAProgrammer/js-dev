-- don't do in production
DROP TABLE IF EXISTS basics.students;

-- creating table
CREATE TABLE basics.students (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER CHECK(age >=18 ),
    creadted_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- insert data
INSERT INTO basics.students (name, email, age)
VALUES
    ('indiedev', 'indiedev@gmail.com', 21),
    ('duodev', 'duodev@gmail.com', 29),
    ('alexa', 'alexa@gmail.com', 42),
    ('kevin', 'kevin@gmail.com', 19);

-- show the students table from the basics schema
SELECT * FROM basics.students;
