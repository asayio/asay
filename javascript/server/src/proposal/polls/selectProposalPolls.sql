select
  id
  due
  ,(
    select count(*)
    from pollvote where pollvote.poll_id = poll.id
    and result = true
  ) as platformvotesfor
  ,(
    select count(*)
    from pollvote where pollvote.poll_id = poll.id
    and result = false
  ) as platformvotesagainst
  ,(
    select mandates
    from parliamentvote where parliamentvote.poll_id = poll.id
    and result = true
  ) as parliamentvotesfor
  ,(
    select mandates
    from parliamentvote where parliamentvote.poll_id = poll.id
    and result = false
  ) as parliamentvotesagainst
  ,(
    select result
    from pollvote
    where user_id = $/user/
    and pollvote.poll_id = poll.id
  ) as userVote
from poll
where proposal_id = $/proposal/
