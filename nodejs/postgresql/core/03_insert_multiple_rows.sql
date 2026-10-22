INSERT INTO products (name, category, price, stock, sku, description)
VALUES
('Laptop Stand 1', 'electronics', 1000, 19, 'ELEC-001', 'durable laptop stand'),
('Laptop Stand 2', 'electronics', 445, 04, 'ELEC-002', 'durable laptop stand'),
('Laptop Stand 3', 'electronics', 290, 06, 'ELEC-003', 'durable laptop stand'),
('Laptop Stand 4', 'electronics', 739, 82, 'ELEC-004', 'durable laptop stand');

SELECT name, category, price, stock, sku
FROM products
WHERE sku IN ('ELEC-001', 'ELEC-002', 'ELEC-003')
