// Import
const db = require('../db');
const selectProjectHistoryVersion = db.sql('./project/sql/selectProjectHistoryVersion.sql');

// Functions
async function getProjectHistoryVersion(projectId) {
  const projectHistoryVersion = await db.cx.query(selectProjectHistoryVersion, {
    project: projectId
  });
  return projectHistoryVersion[0].version;
}

// Export
module.exports = getProjectHistoryVersion;
