SELECT *
FROM article_submission
WHERE proposalId = $/proposalId/ AND id = CASE
  WHEN $/articleId/ = null
  THEN *
  ELSE $/articleId/
END