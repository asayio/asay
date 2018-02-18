// Import
const db = require('../db');
const insertUser = db.sql('./user/sql/insertUser.sql');

// Functions
async function createCandidate(userId, candidate) {
  await db.cx.query(insertCandidate, {
    user: userId,
    gender: candidate.gender,
    phone: candidate.phone,
    address: candidate.address,
    birthday: candidate.birthday,
    picture: candidate.picture,
    constituity: candidate.constituity,
    facebook: candidate.facebook,
    twitter: candidate.twitter,
    linkedin: candidate.linkedin,
    youtube: candidate.youtube,
    story: candidate.story,
    motivation: candidate.motivation,
    threat: candidate.threat
  });
}

// Export
module.exports = createCandidate;
