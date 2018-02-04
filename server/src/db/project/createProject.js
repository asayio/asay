// Import
const db = require('../db');
const insertProject = db.sql('./project/sql/insertProject.sql');

// Functions
async function createProject(user, project) {
  const newProject = await db.cx.one(insertProject, {
    initiator: user.id,
    category: project.category,
    bio: project.bio,
    title: project.title,
    description: project.description,
    budget: project.budget,
    argument: project.argument,
    risk: project.risk,
    published: project.published
  });
  return newProject;
}

// Export
module.exports = createProject;
