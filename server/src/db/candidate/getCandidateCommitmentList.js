// Import
const db = require('../db');
const selectCandidateCommitments = db.sql('./candidate/sql/selectCandidateCommitments.sql');

// Functions
async function getCandidateCommitmentList(userId) {
  return await db.cx.query(selectCandidateCommitments, {
    user: userId
  });
}

// Export
module.exports = getCandidateCommitmentList;
