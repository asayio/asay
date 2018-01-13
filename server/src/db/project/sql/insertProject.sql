insert into project (
  initiator_id
  ,category_id
  ,initiator_bio
  ,title
  ,description
  ,budget
  ,argument
  ,risk
  ,published
) values (
  $/initiator/
  ,$/category/
  ,$/bio/
  ,$/title/
  ,$/description/
  ,$/budget/
  ,$/argument/
  ,$/risk/
  ,$/published/
) returning id
