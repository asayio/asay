select proposal_id
from vote
where user_id = $/user/
  and result is not null
