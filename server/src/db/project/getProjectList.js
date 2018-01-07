// Import
const db = require('../db');

// Functions
async function getProjectList() {
  const projects = await db.cx.query('select * from project');
  return projects;
}

// Export
module.exports = getProjectList;
