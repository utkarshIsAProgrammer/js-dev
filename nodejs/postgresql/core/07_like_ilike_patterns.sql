-- % means anything can come after that
-- LIKE means case-sensitive
-- ILIKE means case-insensitive

-- LIKE
-- SELECT name, price FROM products WHERE category LIKE 'Electronics%';

-- ILIKE
SELECT name, price FROM products WHERE category ILIKE 'Electronics%';
