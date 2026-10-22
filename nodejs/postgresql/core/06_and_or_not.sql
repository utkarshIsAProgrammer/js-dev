-- AND
-- SELECT name, category, price FROM products WHERE category = 'electronics' AND price > 1000 ;

-- OR
-- SELECT name, category, price FROM products WHERE category = 'sports' OR price > 5000 ;

-- NOT
SELECT name, category, price FROM products WHERE NOT category = 'electronics' ;
