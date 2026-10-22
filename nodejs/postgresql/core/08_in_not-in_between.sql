-- IN must match atleast one item from the list
-- NOT IN must not present in the list
-- BETWEEN must lie in the range

-- SELECT name, category, price FROM products WHERE category IN ('fast food', 'sports');

-- SELECT name, category, price FROM products WHERE category NOT IN ('dairy', 'electronics');

SELECT name, category, price FROM products WHERE price BETWEEN 1000 AND 50000;
