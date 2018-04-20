select
  candidate_id as candidate,
  category_id as category,
  commitment,
  priority
from candidate_commitment as commitment
  inner join candidate on commitment.candidate_id = candidate.user_id
  where candidate.active = true or candidate.user_id = $/user/
