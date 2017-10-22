select
  proposal_id as proposal
  ,cast(count(*) as int) as participation
from vote
group by proposal_id
