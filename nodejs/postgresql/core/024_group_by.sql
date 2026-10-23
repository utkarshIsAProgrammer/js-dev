-- GROUP BY clause collapse multiple rows sharing same values in the specified columns
-- into summary rows, allowing us to run aggregate functions

-- HAVING filters after grouping
-- WHERE filters before grouping

SELECT
    u.name AS author_name,
    COUNT (p.id) AS total_posts,
    SUM (p.views) AS total_views
FROM users AS u
LEFT JOIN posts as p
    ON u.id = p.user_id
GROUP BY u.id,u.name
HAVING COUNT (p.id)>= 2
ORDER BY total_posts DESC;
