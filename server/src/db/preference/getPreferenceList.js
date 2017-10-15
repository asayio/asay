// Import
const db = require('../db')
const selectPreferenceList = db.sql('./preference/sql/selectPreferenceList.sql')

// Functions
async function getPreferenceList (userId) {
  const preferenceList = await db.cx.query(selectPreferenceList,
    {
      user: userId,
    }
  );
  return preferenceList
}

// Export
module.exports = getPreferenceList
