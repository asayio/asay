INSERT INTO article_source (name, description, url, logo)
VALUES ($/name/, $/description/, $/url/, $/logo/)
ON CONFLICT (url) DO NOTHING
RETURNING *