update project
set
  category_id = $/category/
  ,initiator_bio = $/bio/
  ,title = $/title/
  ,description = $/description/
  ,budget = $/budget/
  ,argument = $/argument/
  ,risk = $/risk/
  ,modifiedon = now()
  ,version = $/version/
where id = $/project/
