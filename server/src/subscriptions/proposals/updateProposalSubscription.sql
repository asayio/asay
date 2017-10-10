update proposal_subscription
  set subscription = $/subscription/
  where user_id = $/user/
  and proposal_id = $/proposal/
