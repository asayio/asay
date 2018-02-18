// Import
const db = require('../db');
const selectCandidates = db.sql('./user/sql/selectCandidates.sql');

// Functions
async function getCandidateList(tokenInfo) {
  return await db.cx.query(selectCandidates);
}

// Export
module.exports = getCandidateList;
