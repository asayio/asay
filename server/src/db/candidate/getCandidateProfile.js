// Import
const db = require('../db');
const selectCandidateProfile = db.sql('./candidate/sql/selectCandidateProfile.sql');

// Functions
async function getCandidateProfile(candidateId) {
  const candidateProfile = await db.cx.query(selectCandidateProfile, {
    user: candidateId
  });
  return candidateProfile[0];
}

// Export
module.exports = getCandidateProfile;
