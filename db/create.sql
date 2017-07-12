-- Created by @holgerthorup
-- Last modification date: 2017-07-12 10:19:37.17

-- tables
-- Table: article
CREATE TABLE article (
    id serial  NOT NULL,
    publisher text  NOT NULL,
    title text  NOT NULL,
    preview text  NOT NULL,
    imgURL text  NOT NULL,
    linkURL text  NOT NULL,
    proposal_id int  NOT NULL,
    CONSTRAINT article_constraint UNIQUE (linkURL, proposal_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT article_pk PRIMARY KEY (id)
);

-- Table: articleVote
CREATE TABLE articleVote (
    id serial  NOT NULL,
    result boolean  NULL,
    article_id int  NOT NULL,
    user_id int  NOT NULL,
    modifiedOn timestamp  NOT NULL DEFAULT NOW(),
    CONSTRAINT articleVote_constraint UNIQUE (article_id, user_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT articleVote_pk PRIMARY KEY (id)
);

-- Table: attachment
CREATE TABLE attachment (
    id serial  NOT NULL,
    title text  NOT NULL,
    URL text  NOT NULL,
    proposal_id int  NOT NULL,
    sortOrder int  NOT NULL,
    CONSTRAINT attachment_pk PRIMARY KEY (id)
);

-- Table: comment
CREATE TABLE comment (
    id serial  NOT NULL,
    comment text  NOT NULL,
    argument boolean  NULL,
    createdOn timestamp  NOT NULL DEFAULT NOW(),
    proposal_id int  NOT NULL,
    parent_id int  NULL DEFAULT null,
    user_id int  NOT NULL,
    CONSTRAINT comment_pk PRIMARY KEY (id)
);

-- Table: commentVote
CREATE TABLE commentVote (
    id serial  NOT NULL,
    result boolean  NULL,
    comment_id int  NOT NULL,
    user_id int  NOT NULL,
    modifiedOn timestamp  NOT NULL DEFAULT NOW(),
    CONSTRAINT commentVote_constraint UNIQUE (user_id, comment_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT commentVote_pk PRIMARY KEY (id)
);

-- Table: parliamentVote
CREATE TABLE parliamentVote (
    id serial  NOT NULL,
    mandates int  NOT NULL,
    result boolean  NULL,
    poll_id int  NOT NULL,
    CONSTRAINT parliamentVote_constraint UNIQUE (poll_id, result) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT parliamentVote_pk PRIMARY KEY (id)
);

-- Table: poll
CREATE TABLE poll (
    id serial  NOT NULL,
    due timestamp  NULL,
--    testURL text  NOT NULL,
    proposal_id int  NOT NULL,
    status_id int  NOT NULL,
    CONSTRAINT poll_constraint UNIQUE (proposal_id, status_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT poll_pk PRIMARY KEY (id)
);

-- Table: pollVote
CREATE TABLE pollVote (
    id serial  NOT NULL,
    result boolean  NULL,
    user_id int  NOT NULL,
    poll_id int  NOT NULL,
    modifiedOn timestamp  NOT NULL DEFAULT NOW(),
    CONSTRAINT pollVote_constraint UNIQUE (poll_id, user_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT pollVote_pk PRIMARY KEY (id)
);

-- Table: proposal
CREATE TABLE proposal (
    id serial  NOT NULL,
    ref text  NOT NULL,
    title text  NOT NULL,
    subtitle text  NOT NULL,
    type_id int  NOT NULL,
    session_id int  NOT NULL,
    status_id int  NOT NULL,
    CONSTRAINT proposal_constraint UNIQUE (ref, session_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT proposal_pk PRIMARY KEY (id)
);

-- Table: proposalTag_map
CREATE TABLE proposalTag_map (
    id serial  NOT NULL,
    tag_id int  NOT NULL,
    proposal_id int  NOT NULL,
    CONSTRAINT proposalTag_map_constraint UNIQUE (tag_id, proposal_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT proposalTag_map_pk PRIMARY KEY (id)
);

-- Table: session
CREATE TABLE session (
    id serial  NOT NULL,
    session text  NOT NULL,
    CONSTRAINT session_pk PRIMARY KEY (id)
);

-- Table: status
CREATE TABLE status (
    id serial  NOT NULL,
    status text  NOT NULL,
    CONSTRAINT status_pk PRIMARY KEY (id)
);

-- Table: tag
CREATE TABLE tag (
    id serial  NOT NULL,
    tag text  NOT NULL,
    CONSTRAINT tag_pk PRIMARY KEY (id)
);

-- Table: type
CREATE TABLE type (
    id serial  NOT NULL,
    type text  NOT NULL,
    CONSTRAINT type_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE "user" (
    id serial  NOT NULL,
    email text  NOT NULL,
    firstName text  NOT NULL,
    lastName text  NOT NULL,
    pictureURL text  NOT NULL,
    CONSTRAINT user_constraint UNIQUE (email) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: articleVote_article (table: articleVote)
ALTER TABLE articleVote ADD CONSTRAINT articleVote_article
    FOREIGN KEY (article_id)
    REFERENCES article (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: articleVote_user (table: articleVote)
ALTER TABLE articleVote ADD CONSTRAINT articleVote_user
    FOREIGN KEY (user_id)
    REFERENCES "user" (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: article_proposal (table: article)
ALTER TABLE article ADD CONSTRAINT article_proposal
    FOREIGN KEY (proposal_id)
    REFERENCES proposal (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: attachment_proposal (table: attachment)
ALTER TABLE attachment ADD CONSTRAINT attachment_proposal
    FOREIGN KEY (proposal_id)
    REFERENCES proposal (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: commentVote_comment (table: commentVote)
ALTER TABLE commentVote ADD CONSTRAINT commentVote_comment
    FOREIGN KEY (comment_id)
    REFERENCES comment (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: commentVote_user (table: commentVote)
ALTER TABLE commentVote ADD CONSTRAINT commentVote_user
    FOREIGN KEY (user_id)
    REFERENCES "user" (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: comment_comment (table: comment)
ALTER TABLE comment ADD CONSTRAINT comment_comment
    FOREIGN KEY (parent_id)
    REFERENCES comment (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: comment_proposal (table: comment)
ALTER TABLE comment ADD CONSTRAINT comment_proposal
    FOREIGN KEY (proposal_id)
    REFERENCES proposal (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: comment_user (table: comment)
ALTER TABLE comment ADD CONSTRAINT comment_user
    FOREIGN KEY (user_id)
    REFERENCES "user" (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: parlament_results_poll (table: parliamentVote)
ALTER TABLE parliamentVote ADD CONSTRAINT parlament_results_poll
    FOREIGN KEY (poll_id)
    REFERENCES poll (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: pollVote_poll (table: pollVote)
ALTER TABLE pollVote ADD CONSTRAINT pollVote_poll
    FOREIGN KEY (poll_id)
    REFERENCES poll (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: pollVote_user (table: pollVote)
ALTER TABLE pollVote ADD CONSTRAINT pollVote_user
    FOREIGN KEY (user_id)
    REFERENCES "user" (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: poll_proposal (table: poll)
ALTER TABLE poll ADD CONSTRAINT poll_proposal
    FOREIGN KEY (proposal_id)
    REFERENCES proposal (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: poll_status (table: poll)
ALTER TABLE poll ADD CONSTRAINT poll_status
    FOREIGN KEY (status_id)
    REFERENCES status (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: proposalTag_map_proposal (table: proposalTag_map)
ALTER TABLE proposalTag_map ADD CONSTRAINT proposalTag_map_proposal
    FOREIGN KEY (proposal_id)
    REFERENCES proposal (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: proposalTag_map_tag (table: proposalTag_map)
ALTER TABLE proposalTag_map ADD CONSTRAINT proposalTag_map_tag
    FOREIGN KEY (tag_id)
    REFERENCES tag (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: proposal_session (table: proposal)
ALTER TABLE proposal ADD CONSTRAINT proposal_session
    FOREIGN KEY (session_id)
    REFERENCES session (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: proposal_status (table: proposal)
ALTER TABLE proposal ADD CONSTRAINT proposal_status
    FOREIGN KEY (status_id)
    REFERENCES status (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: proposal_type (table: proposal)
ALTER TABLE proposal ADD CONSTRAINT proposal_type
    FOREIGN KEY (type_id)
    REFERENCES type (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- End of file.
