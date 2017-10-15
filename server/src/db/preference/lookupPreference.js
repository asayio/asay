// Import
const db = require('../db')
const selectPreference = db.sql('./preference/sql/selectPreference.sql')

// Functions
async function lookupPreference (userId, categoryId) {
  const preference = await db.cx.query(selectPreference,
    {
      user: userId,
      category: categoryId,
    }
  );
  return preference
}

// Export
module.exports = lookupPreference
