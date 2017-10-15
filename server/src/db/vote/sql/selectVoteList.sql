select proposal_id as proposal
from vote
where user_id = $/user/
  and result is not null
