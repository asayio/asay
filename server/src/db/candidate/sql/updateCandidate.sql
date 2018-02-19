update candidate
  set
    phone = $/phone/,
    picture = $/picture/,
    constituency_id = $/constituency/,
    facebook = $/facebook/,
    twitter = $/twitter/,
    linkedin = $/linkedin/,
    youtube = $/youtube/,
    story = $/story/,
    motivation = $/motivation/,
    threat = $/threat/,
    experience = $/experience/,
    active = $/active/
  where user_id = $/user/
