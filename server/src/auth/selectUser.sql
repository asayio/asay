select
  firstname
  ,lastname
from public.user
where email = $/email/
