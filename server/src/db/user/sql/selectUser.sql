select
  id
  ,email
  ,firstname
  ,lastname
  ,onboarded
  ,decleration_given as decleration
  ,terms_accepted  as termsasccepted
  ,email_notification as emailnotification
  ,result_notification as resultnotification
  ,supports_candidate_id as supportscandidate
from public.user
where email = $/email/
