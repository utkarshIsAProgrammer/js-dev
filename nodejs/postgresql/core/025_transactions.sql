-- Atomicity
-- Consistency
-- Isolation
-- Durability


BEGIN;

UPDATE posts
SET STATUS = 'published'
WHERE title = 'Express learning'
AND status = 'draft';

UPDATE posts
SET views = views+50
WHERE title = 'Express learning';

SELECT title, status, views
FROM posts
WHERE title = 'Express learning';

COMMIT;
