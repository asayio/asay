// Import
const db = require('../db')
const selectCommitteeCategoryList = db.sql('./preference/sql/selectCommitteeCategoryList.sql')

async function getCommitteeCategoryList () {
  const committeeCategoryList = await db.cx.query(selectCommitteeCategoryList);
  return committeeCategoryList
}

// Export
module.exports = getCommitteeCategoryList
