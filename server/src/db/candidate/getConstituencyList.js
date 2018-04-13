// Import
const db = require('../db');

// Functions
async function getConstituencyList() {
  return await db.cx.query('select * from constituency');
}

// Export
module.exports = getConstituencyList;
