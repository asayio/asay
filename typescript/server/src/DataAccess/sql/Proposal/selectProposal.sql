select
  proposal.id
  ,ref
  ,title
  ,subtitle
  ,session
  ,type
  ,status
from proposal
left join type on type.id = type_id
left join session on session.id = session_id
left join status on status.id = status_id
where proposal_id = $/proposal_id/
