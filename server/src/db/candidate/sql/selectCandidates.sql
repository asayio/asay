select
  id,
  constituency_id as constituency,
  email,
  firstname,
  lastname,
  phone,
  picture,
  facebook,
  twitter,
  linkedin,
  youtube,
  story,
  motivation,
  threat,
  experience,
  active
from candidate
  inner join public.user on candidate.user_id = "user".id
  where active = true or id = $/user/
