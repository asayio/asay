update project_support
  set support = $/support/
    ,modifiedon = now()
  where user_id = $/user/
  and project_id = $/project/
