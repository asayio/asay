select
  a.id,
  constituency_id as constituency,
  a.email,
  a.firstname,
  a.lastname,
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
  active,
  candidate.terms_accepted as terms,
  cast(count(b.*) as int) as support
from candidate
  inner join public.user a on candidate.user_id = a.id
  left join public.user b on candidate.user_id = b.supports_candidate_id
  where active = true or a.id = $/user/
group by
  a.id,
  constituency_id,
  a.email,
  a.firstname,
  a.lastname,
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
  active,
  candidate.terms_accepted
