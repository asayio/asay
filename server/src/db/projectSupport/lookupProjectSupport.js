// Import
const db = require('../db');
const selectProjectSupport = db.sql('./projectSupport/sql/selectProjectSupport.sql');

// Functions
async function lookupProjectSupport(userId, projectId) {
  const support = await db.cx.query(selectProjectSupport, {
    user: userId,
    project: projectId
  });
  return support;
}

// Export
module.exports = lookupProjectSupport;
