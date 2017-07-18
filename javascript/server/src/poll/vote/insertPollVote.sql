insert into pollvote (result, user_id, poll_id)
  values (
    $/result/
    ,$/user/
    ,(select max (id) from poll where proposal_id = $/proposal/)
  )
