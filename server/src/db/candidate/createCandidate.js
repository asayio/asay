// Import
const db = require('../db');
const insertCandidate = db.sql('./candidate/sql/insertCandidate.sql');

// Functions
async function createCandidate(userId, candidate) {
  await db.cx.query(insertCandidate, {
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
module.exports = createCandidate;
