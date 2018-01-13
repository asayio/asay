// Import
const db = require('../db');
const updateProject = db.sql('./project/sql/updateProject.sql');

// Functions
async function changeProject(project, version) {
  await db.cx.query(updateProject, {
    project: project.id,
    version: version,
    category: project.category,
    bio: project.bio,
    title: project.title,
    description: project.description,
    budget: project.budget,
    argument: project.argument,
    risk: project.risk,
    published: project.published
  });
}

// Export
module.exports = changeProject;
