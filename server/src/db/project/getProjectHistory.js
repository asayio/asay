// Import
const db = require('../db');
const selectProjectHistory = db.sql('./project/sql/selectProjectHistory.sql');

// Functions
async function getProjectHistory(projectId) {
  const projectHistory = await db.cx.query(selectProjectHistory, {
    project: projectId
  });
  return projectHistory[0];
}

// Export
module.exports = getProjectHistory;
