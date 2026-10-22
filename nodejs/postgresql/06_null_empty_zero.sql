DROP TABLE IF EXISTS basics.null_empty_zero;

CREATE TABLE basics.null_empty_zero (
    id SERIAL PRIMARY KEY,
    nickname TEXT,
    bio TEXT,
    score INTEGER
);

INSERT INTO basics.null_empty_zero (nickname, bio, score)
VALUES
(null, 'learning postgres', 10),
('', 'empty nick name', 24),
('indiedev', '', 0);

SELECT * FROM basics.null_empty_zero;

SELECT * FROM basics.null_empty_zero WHERE nickname IS NULL;
SELECT * FROM basics.null_empty_zero WHERE score = 0;
