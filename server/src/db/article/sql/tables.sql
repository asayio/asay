CREATE TABLE article_source(
   id                     serial      PRIMARY KEY,
   name                   text,
   description            text,
   logo                   text,
   url                    text        UNIQUE
);

CREATE TABLE article_item(
   id                     serial      PRIMARY KEY,
   headline               text,
   description            text,
   image                  text,
   url                    text        UNIQUE,
   article_source_id      int         REFERENCES article_source(id)
);

CREATE TABLE article_submission(
   status                 text        DEFAULT 'pending',
   proposal_id            int         REFERENCES proposal(id),
   article_item_id        int         REFERENCES article_item(id),
   user_id                int         REFERENCES public.user(id),
   CONSTRAINT pk_article_submission PRIMARY KEY (proposal_id, article_item_id)
);


CREATE TABLE article_approval(
   civil                  boolean,
   article_submission_id  int         REFERENCES article_submission(comp_pk_article_submission),
   user_id                int         REFERENCES public.user(id),
   CONSTRAINT pk_article_approval PRIMARY KEY (article_submission_id, user_id)
);