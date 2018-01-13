select
  max(version) as version
from project_history
where project_id = $/project/
