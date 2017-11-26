// Import
const db = require('../db')
const selectUsers = db.sql('./user/sql/selectUsers.sql')

// Functions
async function getUserList (tokenInfo) {
  return await db.cx.query(selectUsers, {});
}

// Export
module.exports = getUserList
