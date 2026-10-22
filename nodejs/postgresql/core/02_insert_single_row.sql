INSERT INTO products (name, category, price, stock, sku, description)
VALUES ('Cricket Bat', 'Sports', 5500, 22, 'SPORT-020', 'leather 8 size bat for professional cricket');

SELECT * FROM products WHERE sku = 'SPORT-020';
