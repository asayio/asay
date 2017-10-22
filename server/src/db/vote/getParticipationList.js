// Import
const db = require('../db')
const selectParticipationList = db.sql('./vote/sql/selectParticipationList.sql')

// Functions
async function getParticipationList () {
  const participationList = await db.cx.query(selectParticipationList)
  console.log(participationList);
  return participationList
}

// Export
module.exports = getParticipationList
