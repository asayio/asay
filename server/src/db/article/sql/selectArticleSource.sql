SELECT *
FROM article_source
WHERE url = CASE
  WHEN $/url/ = null
  THEN *
  ELSE $/url/
END