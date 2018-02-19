// Import
const db = require('../db');
const updateCandidate = db.sql('./candidate/sql/updateCandidate.sql');

// Functions
async function changeCandidate(userId, candidate) {
  await db.cx.query(updateCandidate, {
    user: userId,
    phone: candidate.phone,
    picture: candidate.picture,
    constituency: candidate.constituency === '' ? null : candidate.constituency,
    facebook: candidate.facebook,
    twitter: candidate.twitter,
    linkedin: candidate.linkedin,
    youtube: candidate.youtube,
    story: candidate.story,
    motivation: candidate.motivation,
    threat: candidate.threat,
    experience: candidate.experience,
    active: candidate.active
  });
}

// Export
module.exports = changeCandidate;
