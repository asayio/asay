select proposal_id as propsal
from vote
where user_id = $/user/
  and result is not null
