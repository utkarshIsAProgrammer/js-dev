-- LIMIT -> how many rows we wanna return
-- OFFSET -> how many rows we wanna skip

SELECT name, price FROM products ORDER BY name LIMIT 3 OFFSET 0;
SELECT name, price FROM products ORDER BY name LIMIT 3 OFFSET 3;

-- (page - 1) * limit = offset
