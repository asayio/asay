select
  id
  ,email
  ,firstname
  ,lastname
  ,onboarded
  ,terms_accepted  as termsAccepted
  ,email_notification as emailNotification
from public.user
where email = $/email/
