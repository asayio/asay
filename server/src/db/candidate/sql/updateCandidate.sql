update candidate
  set
    gender = $/gender/,
    phone = $/phone/,
    address = $/address/,
    birthday = $/birthday/,
    picture = $/picture/,
    constituity_id = $/constituity/,
    facebook = $/facebook/,
    twitter = $/twitter/,
    linkedin = $/linkedin/,
    youtube = $/youtbe/,
    story = $/story/,
    motivation = $/motivation/,
    threat = $/threat/
  where user_id = $/user/
