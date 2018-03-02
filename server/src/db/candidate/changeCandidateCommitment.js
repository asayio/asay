// Import
const db = require('../db');
const updateCandidateCommitment = db.sql('./candidate/sql/updateCandidateCommitment.sql');

// Functions
async function changeCandidateCommitment(userId, commitment) {
  await db.cx.query(updateCandidateCommitment, {
    candidate: userId,
    category: commitment.category,
    commitment: commitment.commitment,
    priority: commitment.priority
  });
}

// Export
module.exports = changeCandidateCommitment;
