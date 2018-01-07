// Import
const db = require('../db');
const selectProject = db.sql('./project/sql/selectProject.sql');

// Functions
async function getProjectList() {
  const projects = await db.cx.query(selectProject);
  return projects;
}

// Export
module.exports = getProjectList;
