// Import
const db = require('../db');
const selectUserProjectSupportList = db.sql('./projectSupport/sql/selectUserProjectSupportList.sql');

// Functions
async function getUserProjectSupportList(userId) {
  const supportList = await db.cx.query(selectUserProjectSupportList, {
    user: userId
  });
  return supportList;
}

// Export
module.exports = getUserProjectSupportList;
