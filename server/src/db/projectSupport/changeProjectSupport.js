// Import
const db = require('../db');
const updateProjectSupport = db.sql('./projectSupport/sql/updateProjectSupport.sql');

// Functions
async function changeProjectSupport(userId, projectId, support) {
  await db.cx.query(updateProjectSupport, {
    user: userId,
    project: projectId,
    support: support
  });
}

// Export
module.exports = changeProjectSupport;
