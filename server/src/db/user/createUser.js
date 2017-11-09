// Import
const db = require('../db')
const insertUser = db.sql('./user/sql/insertUser.sql')

// Functions
async function createUser (tokenInfo) {
  const firstname = tokenInfo.given_name ? tokenInfo.given_name : tokenInfo.user_metadata.firstname
  const lastname = tokenInfo.family_name ? tokenInfo.family_name : tokenInfo.user_metadata.lastname
  await db.cx.query(insertUser, {
      email: tokenInfo.email,
      firstname: firstname,
      lastname: lastname
    }
  );
}

// Export
module.exports = createUser
