// Import
const db = require('../db');
const selectProject = db.sql('./project/sql/selectProject.sql');

// Functions
async function getProjectProfile(projectId) {
  const project = await db.cx.query(selectProject, {
    project: projectId
  });
  return project[0];
}

// Export
module.exports = getProjectProfile;
