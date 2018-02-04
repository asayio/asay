// Import
const db = require('../db');
const selectProjectList = db.sql('./project/sql/selectProjectList.sql');

// Functions
async function getProjectList(userId) {
  const projects = await db.cx.query(selectProjectList, {
    user: userId
  });
  return projects;
}

// Export
module.exports = getProjectList;
