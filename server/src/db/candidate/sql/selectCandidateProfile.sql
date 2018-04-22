select firstname, lastname, picture
from candidate
left join public."user" on candidate.user_id = "user".id
  where user_id = $/user/
