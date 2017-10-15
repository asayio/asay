// Import
const db = require('../db')
const updateVote = db.sql('./vote/sql/updateVote.sql')

// Functions
async function changeVote (userId, proposalId, voteResult) {
  await db.cx.query(updateVote,
    {
      user: userId,
      proposal: proposalId,
      result: voteResult,
    }
  )
}

// Export
module.exports = changeVote
