SELECT name, price, category, is_active FROM products WHERE category = 'electronics';

-- update multiple row
UPDATE products
SET price = ROUND(price*1.10,2)
WHERE category = 'electronics';

SELECT name, price, category, is_active FROM products WHERE category = 'electronics';
