CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK(price >=0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    sku TEXT UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO products (name, category, price, stock, is_active, sku, description)
VALUES
('Coding Laptop', 'electronics', 105000, 12, true, 'ELEC-KEY-001', 'light weight laptop with gaming power'),
('Football', 'sports', 90000, 2, false, 'SPORT-019', 'best material soccerr ball'),
('Noodles', 'fast food', 55, 45, true, 'SNA-CKES-101', 'instant noodles'),
('Power Bank', 'electronics', 2000, 0, false, 'ELEC-KEY-002', 'fast charging');

SELECT * FROM products;
