select project_history.*, project.initiator_id as initiator
from project_history
  left join project on project_history.project_id = project.id
where project_id = $/project/
  order by version desc
limit 1
