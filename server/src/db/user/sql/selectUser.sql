select
  id
  ,email
  ,firstname
  ,lastname
  ,onboarded
  ,onboarded_candidates as onboardedcandidates
  ,onboarded_insights as onboardedinsights
  ,onboarded_projects as onboardedprojects
  ,onboarded_proposals as onboardedproposals
  ,decleration_given as decleration
  ,terms_accepted  as termsaccepted
  ,email_notification as emailnotification
  ,result_notification as resultnotification
  ,supports_candidate_id as supportscandidate
from public.user
where email = $/email/
