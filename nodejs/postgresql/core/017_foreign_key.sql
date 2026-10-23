-- FOREIGN KEY is a column that points to the primary key of another table
-- it prevents orphaned or invalid data


-- example
-- user.id parent key
-- user.post_id foreign key
-- every post must belongs to the user

SELECT id, name FROM users;
SELECT id, user_id, title FROM posts;
