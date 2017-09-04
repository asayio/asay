// Import
const db = require('../../../db.js');

// Queries
const selectAttachments = db.sql('./src/proposal/attachments/selectProposalAttachments.sql');

// Functions
async function getAttachments (proposalId) {
  const attachments = await db.cx.query(selectAttachments,
    {
      proposal: proposalId,
    });
  return attachments
}

// Export
module.exports = {
  getAttachments
}
