select
  id
  ,firstname
  ,lastname
  ,pictureurl
from public.user
where email = $/email/
