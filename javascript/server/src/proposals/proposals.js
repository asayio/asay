// Import
const db = require('../../db.js');

// Queries
const selectProposals = db.sql('./src/proposals/selectProposals.sql');

// Functions
async function getProposals (request, response) {
  const proposals = await db.cx.query(selectProposals);
  response.send(proposals);
}

// Export
module.exports = {
  getProposals
}
