// Import
const db = require('../../../db.js');

// Queries
const selectPolls = db.sql('./src/proposal/polls/selectProposalPolls.sql');

// Functions
async function getPolls (request, response) {
  const polls = await db.cx.query(selectPolls,
    {
      proposal: 1, // request.body.proposalId
      user: 1 // request.body.userId
    });
  return polls
}

// Export
module.exports = {
  getPolls
}
