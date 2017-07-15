// Import
const db = require('../../../db.js');

// Queries
const selectPolls = db.sql('./src/proposal/polls/selectProposalPolls.sql');

// Functions
async function getPolls (proposalId, userId) {
  const polls = await db.cx.query(selectPolls,
    {
      proposal: proposalId,
      user: userId,
    });
  return polls
}

// Export
module.exports = {
  getPolls
}
