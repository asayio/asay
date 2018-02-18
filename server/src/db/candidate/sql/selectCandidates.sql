select
  id,
  constituity_id,
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
  inner join public.user
