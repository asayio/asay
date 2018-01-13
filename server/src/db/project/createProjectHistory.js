// Import
const db = require('../db');
const insertProjectHistory = db.sql('./project/sql/insertProjectHistory.sql');

// Functions
async function createProjectHistory(projectId, project, version) {
  await db.cx.query(insertProjectHistory, {
    project: projectId,
    version: version,
    category: project.category,
    bio: project.bio,
    title: project.title,
    description: project.description,
    budget: project.budget,
    argument: project.argument,
    risk: project.risk
  });
}

// Export
module.exports = createProjectHistory;
