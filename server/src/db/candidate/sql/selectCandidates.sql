select
  id,
  constituency_id,
  email,
  firstname,
  lastname,
  gender,
  phone,
  birthday,
  picture,
  facebook,
  twitter,
  linkedin,
  youtube,
  story,
  motivation,
  threat
from candidate
  inner join public.user on candidate.user_id = "user".id
  where active = true or id = $/user/
