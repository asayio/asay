// Import
const db = require('../../../db.js');

// Queries
const selectTags = db.sql('./src/proposal/tags/selectProposalTags.sql');

// Functions
async function getTags (request, response) {
  const tags = await db.cx.query(selectTags,
    {
      proposal: 1, // request.body.proposalId
    });
  return tags
}

// Export
module.exports = {
  getTags
}
