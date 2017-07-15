// Import
const db = require('../../../db.js');

// Queries
const selectAttachments = db.sql('./src/proposal/attachments/selectProposalAttachments.sql');

// Functions
async function getAttachments (request, response) {
  const attachments = await db.cx.query(selectAttachments,
    {
      proposal: 1, // request.body.proposalId
    });
  return attachments
}

// Export
module.exports = {
  getAttachments
}
