// Import
const db = require('../db');
const updateUserOnboarding = db.sql('./user/sql/updateUserOnboarding.sql');

// Functions
async function changeUserOnboarding(userId) {
  await db.cx.query(updateUserOnboarding, {
    user: userId
  });
}

// Export
module.exports = changeUserOnboarding;
