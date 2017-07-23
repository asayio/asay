select
  proposal.id
  ,ref
  ,title
  ,subtitle
  ,session.label as session
  ,type.label as type
  ,status.label as status
from proposal
left join type on type.id = type_id
left join session on session.id = session_id
left join status on status.id = status_id
where proposal.id = $/proposal/
