select
  id
  ,email
  ,firstname
  ,lastname
  ,onboarded
  ,terms_accepted  as termsasccepted
  ,email_notification as emailnotification
  ,result_notification as resultnotification
from public.user
where email = $/email/
