-- Created by @holgerthorup
-- Last modification date: 2017-07-12 10:19:37.17

-- foreign keys
ALTER TABLE articleVote
    DROP CONSTRAINT articleVote_article;

ALTER TABLE articleVote
    DROP CONSTRAINT articleVote_user;

ALTER TABLE article
    DROP CONSTRAINT article_proposal;

ALTER TABLE attachment
    DROP CONSTRAINT attachment_proposal;

ALTER TABLE commentVote
    DROP CONSTRAINT commentVote_comment;

ALTER TABLE commentVote
    DROP CONSTRAINT commentVote_user;

ALTER TABLE comment
    DROP CONSTRAINT comment_comment;

ALTER TABLE comment
    DROP CONSTRAINT comment_proposal;

ALTER TABLE comment
    DROP CONSTRAINT comment_user;

ALTER TABLE parliamentVote
    DROP CONSTRAINT parlament_results_poll;

ALTER TABLE pollVote
    DROP CONSTRAINT pollVote_poll;

ALTER TABLE pollVote
    DROP CONSTRAINT pollVote_user;

ALTER TABLE poll
    DROP CONSTRAINT poll_proposal;

ALTER TABLE poll
    DROP CONSTRAINT poll_status;

ALTER TABLE proposalTag_map
    DROP CONSTRAINT proposalTag_map_proposal;

ALTER TABLE proposalTag_map
    DROP CONSTRAINT proposalTag_map_tag;

ALTER TABLE proposal
    DROP CONSTRAINT proposal_session;

ALTER TABLE proposal
    DROP CONSTRAINT proposal_status;

ALTER TABLE proposal
    DROP CONSTRAINT proposal_type;

-- tables
DROP TABLE article;

DROP TABLE articleVote;

DROP TABLE attachment;

DROP TABLE comment;

DROP TABLE commentVote;

DROP TABLE parliamentVote;

DROP TABLE poll;

DROP TABLE pollVote;

DROP TABLE proposal;

DROP TABLE proposalTag_map;

DROP TABLE session;

DROP TABLE status;

DROP TABLE tag;

DROP TABLE type;

DROP TABLE "user";

-- End of file.
