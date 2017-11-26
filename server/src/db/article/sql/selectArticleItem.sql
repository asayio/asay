SELECT *
FROM article_item
WHERE url = CASE
  WHEN $/url/ = null
  THEN *
  ELSE $/url/
END