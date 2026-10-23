-- a record of table A can relate to multiple records of table B
-- and record of table B can relate to multiple records of table A

SELECT
    posts.title AS post_title,
    tags.name AS tags_name
FROM posts
INNER JOIN post_tags
ON posts.id = post_tags.post_id
INNER JOIN tags
ON post_tags.tag_id = tags.id
ORDER BY posts.title, tags.name;
