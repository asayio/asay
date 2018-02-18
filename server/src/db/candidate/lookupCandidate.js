// Import
const db = require('../db');
const selectCandidate = db.sql('./user/sql/selectCandidate.sql');

// Functions
async function lookupCandidate(candidateId) {
  const candidateList = await db.cx.query(selectCandidate, {
    user: candidateId
  });
  const candidate = candidateList ? candidateList[0] : null;
  return candidate;
}

// Export
module.exports = lookupCandidate;
