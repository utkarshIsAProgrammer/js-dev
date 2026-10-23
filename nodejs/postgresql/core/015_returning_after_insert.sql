-- RETURNING return the rows back immediate after INSERT, UPDATE, DELETE

-- insert
INSERT INTO products (name, category, price, stock, sku, description)
VALUES ('web camera', 'electronics', 20000, 92, 'ELEC-KEY', 'high quality webcamera')
RETURNING id, name, category, price, stock, created_at;

-- update
UPDATE products
SET stock = stock - 55
WHERE sku = 'ELEC-KEY'
RETURNING id, name, category, price, stock, created_at;

-- delete
DELETE FROM products
WHERE sku = 'ELEC-KEY'
RETURNING id, name, sku;
