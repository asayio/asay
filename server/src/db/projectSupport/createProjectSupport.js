// Import
const db = require('../db');
const insertProjectSupport = db.sql('./projectSupport/sql/insertProjectSupport.sql');

// Functions
async function createProjectSupport(userId, projectId, support) {
  await db.cx.query(insertProjectSupport, {
    user: userId,
    project: projectId,
    support: support
  });
}

// Export
module.exports = createProjectSupport;
