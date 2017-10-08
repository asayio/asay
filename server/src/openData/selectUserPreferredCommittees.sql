select ft_committee_id as committee
from category_map
  inner join category
  on category_map.category_id = category.id
  inner join category_preferences
  on category.id = category_preferences.category_id
where user_id = $/user/
