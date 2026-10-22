INSERT INTO products (name, category, price, stock, sku, description)
VALUES ('temp product', 'electronics', 34.5, 29, 'TECH', 'temp item');

SELECT name, sku FROM products WHERE sku='TECH';

-- delete rows
DELETE FROM products WHERE sku = 'TECH';

SELECT * FROM products;
