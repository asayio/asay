select firstname, lastname, picture, motivation
from candidate
left join public."user" on candidate.user_id = "user".id
  where user_id = $/user/
