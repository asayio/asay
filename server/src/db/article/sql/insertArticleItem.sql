INSERT INTO article_source (headline, description, url, image, article_source_id)
VALUES ($/headline/, $/description/, $/url/, $/image/, $/articleSourceId/)
ON CONFLICT (url) DO NOTHING
RETURNING *