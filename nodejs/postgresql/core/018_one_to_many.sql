-- one parent rows can have many child rows

-- users -> parent table
-- posts -> child table

-- posts.user_id -> user.id
-- user_id is the original user id
-- posts.user_id stores that original user id inside the posts table

SELECT users.name AS author_name,
    posts.title AS post_title,
    posts.status
FROM users
INNER JOIN posts
ON users.id = posts.user_id
ORDER BY users.name, posts.title;
