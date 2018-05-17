select *
from proposal_notification
where user_id = $/user/
  and proposal_id = $/proposal/
  and type = $/type/
