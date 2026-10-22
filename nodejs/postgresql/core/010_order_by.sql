-- ORDER BY sort in the ascending order

-- descending order
-- SELECT name, price FROM products ORDER BY price DESC;

-- ascending order
SELECT name, price FROM products ORDER BY price;

-- mixed order
SELECT name, category, price FROM products ORDER BY category ASC, price DESC;
