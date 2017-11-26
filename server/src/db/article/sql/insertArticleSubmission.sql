INSERT INTO article_submission (status, proposal_id, article_item_id, user_id)
VALUES ($/status/, $/proposal_id/, $/article_item_id/, $/user_id/)
ON CONFLICT (comp_pk_article_submission) DO NOTHING
RETURNING *