// Import
const db = require('../db');
const updateUserCandidateSupport = db.sql('./user/sql/updateUserCandidateSupport.sql');

// Functions
async function changeUserCandidateSupport(userId, candidateId) {
  await db.cx.query(updateUserCandidateSupport, {
    user: userId,
    candidate: candidateId
  });
}

// Export
module.exports = changeUserCandidateSupport;
