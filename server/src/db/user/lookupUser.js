// Import
const db = require('../db')
const selectUser = db.sql('./user/sql/selectUser.sql')

// Functions
async function lookupUser (tokenInfo) {
  const userList = await db.cx.query(selectUser, {
      email: tokenInfo.email
    }
  );
  const user = userList ? userList[0] : null;
  return user;
}

// Export
module.exports = lookupUser
