select
  project_id as project
  ,count(*) as support
from project_support
where support = true
group by project_id
