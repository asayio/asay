// Import
const db = require('../db');
const updateProject = db.sql('./project/sql/updateProject.sql');

// Functions
async function changeProject(project) {
  await db.cx.query(updateProject, {
    project: project.id,
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
module.exports = changeProject;
