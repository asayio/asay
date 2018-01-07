select
  project.id
  ,project.category_id as category
  ,project.initiator_bio as bio
  ,project.title
  ,project.description
  ,project.budget
  ,project.argument
  ,project.risk
  ,"user".email
  ,"user".firstname
  ,"user".lastname
from project
  left join "user" on project.initiator_id = "user".id
