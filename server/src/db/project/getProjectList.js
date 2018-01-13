// Import
const db = require('../db');
const selectProjects = db.sql('./project/sql/selectProjects.sql');

// Functions
async function getProjectList(userId) {
  const projects = await db.cx.query(selectProjects, {
    user: userId
  });
  return projects;
}

// Export
module.exports = getProjectList;
