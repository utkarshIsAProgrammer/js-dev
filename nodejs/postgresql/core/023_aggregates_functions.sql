-- aggregate functions are used to calculate one result from many rows

SELECT
    COUNT(*) AS total_posts,
    COUNT(*) FILTER (WHERE status = 'published') AS published_posts,
    SUM (views) AS total_views
FROM posts;
