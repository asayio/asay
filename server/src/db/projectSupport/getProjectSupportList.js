// Import
const db = require('../db');
const selectProjectSupportList = db.sql('./projectSupport/sql/selectProjectSupportList.sql');

// Functions
async function getProjectSupportList() {
  const projectSupportList = await db.cx.query(selectProjectSupportList);
  return projectSupportList;
}

// Export
module.exports = getProjectSupportList;
