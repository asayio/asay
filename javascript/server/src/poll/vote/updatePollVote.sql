update pollVote
  set result = $/result/
    ,modifiedon = now()
  where user_id = $/user/
  and poll_id = (select max (id) from poll where proposal_id = $/proposal/)
