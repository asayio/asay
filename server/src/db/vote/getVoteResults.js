// Import
const db = require('../db')
const selectResults = db.sql('./vote/sql/selectResults.sql')

// Functions
async function getVoteResults (proposalId) {
  const voteResults = await db.cx.query(selectResults, {proposal: proposalId});
  return voteResults
}

// Export
module.exports = getVoteResults
