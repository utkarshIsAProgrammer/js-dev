-- SELECT * FROM products;
-- SELECT name, category, price FROM products;

-- AS creates an alias for the output of the column name
-- makes the column name easier to read
SELECT
    name AS product_name,
    price AS product_price
FROM products;
