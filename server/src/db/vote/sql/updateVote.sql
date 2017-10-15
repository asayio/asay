update vote
  set result = $/result/
    ,modifiedon = now()
  where user_id = $/user/
  and proposal_id = $/proposal/
