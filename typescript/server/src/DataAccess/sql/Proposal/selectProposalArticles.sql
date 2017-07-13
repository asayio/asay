select
  id
  ,publisher
  ,title
  ,preview
  ,imgurl
  ,linkurl
  ,(
    select sum(case
      when result=true then 1
      when  result is false then -1
      else null end)
    from articlevote where articlevote.article_id = article.id
  ) as score
  ,(
    select result
    from articleVote
    where user_id = $/user_id/
    and articlevote.article_id = article.id
  ) as userVote
from article
where proposal_id = $/proposal_id/
