select
  tag.id
  ,tag
from tag
inner join proposaltag_map on tag.id = proposaltag_map.tag_id
where proposaltag_map.proposal_id = $/proposal_id/
