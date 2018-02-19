update candidate_commitment
  set
    category_id = $/category/,
    commitment = $/commitment/
  where candidate_id = $/candidate/
    and priority = $/priority/
