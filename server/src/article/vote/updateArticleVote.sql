update articleVote
  set result = $/result/
    ,modifiedon = now()
  where user_id = $/user/
  and article_id = $/article/
