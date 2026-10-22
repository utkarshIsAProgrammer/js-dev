SELECT name, price, stock, sku FROM products WHERE sku = 'ELEC-KEY-001';

-- update single row
UPDATE products
SET price = 95000, stock = 4
WHERE sku = 'ELEC-KEY-001';


SELECT name, price, stock, sku FROM products WHERE sku = 'ELEC-KEY-001';
