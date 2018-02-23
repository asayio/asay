// Import
const db = require('../db');
const updateCandidateCommitment = db.sql('./candidate/sql/updateCandidateCommitment.sql');

// Functions
async function changeCandidateCommitment(userId, candidate) {
  await db.cx.query(updateCandidateCommitment, {
    candidate: userId,
    category: candidate.commitment.category,
    commitment: candidate.commitment.commitment,
    priority: candidate.commitment.priority
  });
}

// Export
module.exports = changeCandidateCommitment;
