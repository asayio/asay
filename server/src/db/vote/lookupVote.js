// Import
const db = require('../db')
const selectVote = db.sql('./vote/sql/selectVote.sql')

// Functions
async function lookupVote (userId, proposalId) {
  const vote = await db.cx.query(selectVote,
    {
      user: userId,
      proposal: proposalId,
    }
  );
  return vote
}

// Export
module.exports = lookupVote
