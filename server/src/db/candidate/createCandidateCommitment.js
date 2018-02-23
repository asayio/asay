// Import
const db = require('../db');
const insertCandidateCommitment = db.sql('./candidate/sql/insertCandidateCommitment.sql');

// Functions
async function createCandidateCommitment(userId, candidate) {
  await db.cx.query(insertCandidateCommitment, {
    candidate: userId,
    category: candidate.commitment.category,
    commitment: candidate.commitment.commitment,
    priority: candidate.commitment.priority
  });
}

// Export
module.exports = createCandidateCommitment;
