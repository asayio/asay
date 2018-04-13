select category.*
  ,case
    when preference is null then false
    else preference
  end as preference
from category
  left join category_preferences
    on category.id = category_id
    and user_id = $/user/
