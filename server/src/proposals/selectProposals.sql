/*
NOTES (by @holgerthorup)
> add subselect for participation (avg. no of vote per poll) and activity (no of comments)
> add join to tag and add where in range of values for tags
> add where clause for type, session, status
? add uservote as result or binary (did/did not vote)
*/

select
  proposal.id
  ,ref
  ,title
  ,subtitle
  ,session.label as session
  ,type.label as type
  ,status.label as status
  ,(
  select max (due)
  from poll
  where poll.proposal_id = proposal.id
  ) as duedate
from proposal
left join type on type.id = type_id
left join session on session.id = session_id
left join status on status.id = status_id
