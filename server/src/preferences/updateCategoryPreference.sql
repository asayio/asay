update category_preferences
set preference = $/preference/
where user_id = $/user/
  and category_id = $/category/
