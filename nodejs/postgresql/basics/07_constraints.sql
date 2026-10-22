DROP TABLE IF EXISTS basics.accounts;

CREATE TABLE basics.accounts (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    age INTEGER CHECK(age>=18),
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO basics.accounts (full_name, email, age)
VALUES
('jane doe', 'jane@gmail.com', 45),
('john doe', 'john@gmail.com', 23),
('will doe', 'will@gmail.com', 61);

SELECT * FROM basics.accounts;
