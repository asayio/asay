// Import
const db = require('../db');
const selectCommitteeCategory = db.sql('./preference/sql/selectCommitteeCategory.sql');

// Functions
async function lookupComitteeCategory(committeeId) {
  const category = await db.cx.query(selectCommitteeCategory, {
    committee: committeeId
  });
  return category[0]['category_id'];
}

// Export
module.exports = lookupComitteeCategory;
