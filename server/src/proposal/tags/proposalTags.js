// Import
const db = require('../../../db.js');

// Queries
const selectTags = db.sql('./src/proposal/tags/selectProposalTags.sql');

// Functions
async function getTags (proposalId) {
  const tags = await db.cx.query(selectTags,
    {
      proposal: proposalId,
    });
  return tags
}

// Export
module.exports = {
  getTags
}
