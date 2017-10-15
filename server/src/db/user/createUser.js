// Import
const db = require('../db')
const insertUser = db.sql('./user/sql/insertUser.sql')

// Functions
async function createUser (tokenInfo) {
  await db.cx.query(insertUser, {
      email: tokenInfo.email,
      firstname: tokenInfo.user_metadata.firstname,
      lastname: tokenInfo.user_metadata.lastname
    }
  );
}

// Export
module.exports = createUser
