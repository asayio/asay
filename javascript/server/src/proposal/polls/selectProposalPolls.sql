select
  poll.id
  ,poll.due
  ,status
  ,case when (
    select count(*)
    from poll as temp
    where temp.proposal_id = poll.proposal_id
    and temp.due > poll.due
  ) < 1 then true else false end as current
  ,(
    select cast(count(*) as int)
    from pollvote where pollvote.poll_id = poll.id
    and result = true
  ) as platformvotesfor
  ,(
    select cast(count(*) as int)
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
left join status on status.id = status_id
where proposal_id = $/proposal/
