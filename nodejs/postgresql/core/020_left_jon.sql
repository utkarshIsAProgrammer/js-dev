-- LEFT JOIN return all rows from the left table
-- plus the matched rows from the right table
-- if no matching data on the right then null is returned

-- posts left table
-- comments right table


-- return all posts
SELECT posts.title AS post_title,
    comments.body AS comment_body
FROM posts
LEFT JOIN comments
ON posts.id = comments.post_id
ORDER BY posts.title;
