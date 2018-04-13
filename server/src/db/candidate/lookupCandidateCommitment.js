// Import
const db = require('../db');
const selectCandidateCommitment = db.sql('./candidate/sql/selectCandidateCommitment.sql');

// Functions
async function lookupCandidateCommitment(userId, priority) {
  const candidateCommitmentList = await db.cx.query(selectCandidateCommitment, {
    candidate: userId,
    priority: priority
  });
  const candidateCommitment = candidateCommitmentList ? candidateCommitmentList[0] : null;
  return candidateCommitment;
}

// Export
module.exports = lookupCandidateCommitment;
