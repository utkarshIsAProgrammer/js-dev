CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users;

-- 1. Create Tables
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);


-- ON DELETE CASCADE ensure if user record is deleted
-- all other related data will also be deleted
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
    views INTEGER NOT NULL DEFAULT 0 CHECK(views >= 0)
);

CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    body TEXT NOT NULL
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE post_tags (
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,

    -- ensure exact same tags won't be assigned again
    PRIMARY KEY (post_id, tag_id)
);

-- 2. Insert Users
INSERT INTO users (name)
VALUES
('Alex'),
('Jane');

-- 3. Insert Posts
INSERT INTO posts (user_id, title, status, views)
SELECT id, 'PG learning', 'published', 299 FROM users WHERE name = 'Alex';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'Node learning', 'published', 42 FROM users WHERE name = 'Alex';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'Express learning', 'draft', 0 FROM users WHERE name = 'Alex';

-- 4. Insert Comments
INSERT INTO comments (post_id, body)
SELECT id, 'Nice explanation' FROM posts WHERE title = 'PG learning';

INSERT INTO comments (post_id, body)
SELECT id, 'Add more real life examples' FROM posts WHERE title = 'Node learning';

-- 5. Insert Tags
INSERT INTO tags (name)
VALUES
('pgsql'),
('backend');

-- 6. Insert Into post_tags
-- Link 'PG learning' to both 'pgsql' and 'backend'
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p
CROSS JOIN tags t
WHERE p.title = 'PG learning' AND t.name IN ('pgsql', 'backend');

-- Link 'Node learning' to 'backend'
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'Node learning' AND t.name = 'backend';

-- Link 'Express learning' to 'backend'
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'Express learning' AND t.name = 'backend';

-- 7. Query posts with their author, tags, and comment count
SELECT
    p.title AS post_title,
    u.name AS author,
    p.status,
    p.views,
    COALESCE(string_agg(DISTINCT t.name, ', '), 'None') AS tags,
    COUNT(DISTINCT c.id) AS total_comments
FROM posts p
JOIN users u ON p.user_id = u.id
LEFT JOIN post_tags pt ON p.id = pt.post_id
LEFT JOIN tags t ON pt.tag_id = t.id
LEFT JOIN comments c ON p.id = c.post_id
GROUP BY p.id, p.title, u.name, p.status, p.views
ORDER BY p.views DESC;
