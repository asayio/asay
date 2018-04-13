// Import
const db = require('../db');
const selectCandidates = db.sql('./candidate/sql/selectCandidates.sql');

// Functions
async function getCandidateList(userId) {
  return await db.cx.query(selectCandidates, {
    user: userId
  });
}

// Export
module.exports = getCandidateList;
