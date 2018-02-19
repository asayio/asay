// Import
const db = require('../db');
const updateCandidate = db.sql('./candidate/sql/updateCandidate.sql');

// Functions
async function changeCandidate(userId, candidate) {
  await db.cx.query(updateCandidate, {
    user: userId,
    gender: candidate.gender,
    phone: candidate.phone,
    address: candidate.address,
    birthday: candidate.birthday,
    picture: candidate.picture,
    constituency: candidate.constituency,
    facebook: candidate.facebook,
    twitter: candidate.twitter,
    linkedin: candidate.linkedin,
    youtube: candidate.youtube,
    story: candidate.story,
    motivation: candidate.motivation,
    threat: candidate.threat,
    active: candidate.active
  });
}

// Export
module.exports = changeCandidate;
