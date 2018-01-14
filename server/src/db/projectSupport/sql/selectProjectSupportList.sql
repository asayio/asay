select
  project_id as project
  ,cast(count(*) as int) as support
from project_support
where support = true
group by project_id
