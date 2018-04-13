// Import
const db = require('../db')
const insertVote = db.sql('./vote/sql/insertVote.sql')

// Functions
async function createVote (userId, proposalId, voteResult) {
  await db.cx.query(insertVote,
    {
      user: userId,
      proposal: proposalId,
      result: voteResult,
    }
  )
}

// Export
module.exports = createVote
