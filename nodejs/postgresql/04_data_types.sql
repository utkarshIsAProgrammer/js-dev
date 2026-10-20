DROP TABLE IF EXISTS basics.products_basics;

CREATE TABLE basics.products_basics (
    id SERIAL PRIMARY KEY,

    -- characters with max length of 100
    name VARCHAR(100) NOT NULL,
    description TEXT,

    -- integer with default value 0
    stock INTEGER DEFAULT 0,

    -- store larger whole integer
    total_views BIGINT DEFAULT 0,

    -- exact decimal values
    -- 10 total digits
    -- 2 deciaml points
    -- example: 99999999.99
    price NUMERIC(10,2),

    is_active BOOLEAN DEFAULT FALSE
);

INSERT INTO basics.products_basics
(name, description, stock,total_views, price, is_active)
VALUES
(
    'product 1',
    'product desc',
    1250,
    89256,
    3000,
);

SELECT * FROM basics.products_basics;


-- show data when the is_active field is true
SELECT id, name, price, is_active
FROM basics.products_basics
WHERE is_active;
