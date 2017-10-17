// Import
const db = require('../db')
const updateUserOnboarding = db.sql('./user/sql/updateUserOnboarding.sql')

// Functions
async function createUser (userId) {
  await db.cx.query(updateUserOnboarding, {
    user: userId
  });
}

// Export
module.exports = createUser
