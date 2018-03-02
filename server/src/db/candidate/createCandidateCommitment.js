// Import
const db = require('../db');
const insertCandidateCommitment = db.sql('./candidate/sql/insertCandidateCommitment.sql');

// Functions
async function createCandidateCommitment(userId, commitment) {
  await db.cx.query(insertCandidateCommitment, {
    candidate: userId,
    category: commitment.category,
    commitment: commitment.commitment,
    priority: commitment.priority
  });
}

// Export
module.exports = createCandidateCommitment;
