INSERT INTO article_approval (civic, article_submission_id, user_id)
VALUES ($/civic/, $/article_submission_id/, $/user_id/)
ON CONFLICT (comp_pk_article_approval) DO UPDATE SET civic = $/civic/
RETURNING *